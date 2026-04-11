'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/trpc-folder/trpc-adaptadores/react';
import {
  Box,
  Button,
  Group,
  Text,
  Title,
  Stack,
  Paper,
  ActionIcon,
  Tooltip,
  Loader,
  Center,
} from '@mantine/core';
import {
  IconArmchair,
  IconArrowRight,
  IconArrowBackUp,
} from '@tabler/icons-react';
import type { Seat } from '@/schemas/seat';
import type { SeatStatusResponse } from '@/schemas/seatStatus';

interface Props {
  roomId: number;
  movieScreeningId: number;
  userId: number;
}

export function SeatSelectionView({ roomId, movieScreeningId, userId }: Props) {
  const router = useRouter();
  const utils = api.useUtils();

  // 🔥 Bandera para saber si el usuario avanzó al checkout intencionalmente
  const isProceedingToCheckout = useRef(false);

  const [loadingAction, setLoadingAction] = useState(false);
  const [mySelections, setMySelections] = useState<
    { id: number; label: string }[]
  >([]);

  // --- QUERIES ---
  const { data: seats = [], isLoading: loadingSeats } =
    api.seat.getRoomSeats.useQuery({ roomId });

  const { data: statuses = [] } = api.seat.getStatuses.useQuery(
    { movieScreeningId },
    { refetchInterval: 5000 } // Polling cada 5 segundos para ver asientos de otros
  );

  // --- MAPAS PARA UI ---
  const seatNameMap = useMemo(() => {
    const map = new Map<number, string>();
    seats.forEach((s: Seat) => map.set(s.id, `${s.rowLetter}${s.seatNumber}`));
    return map;
  }, [seats]);

  const statusMap = useMemo(() => {
    const map = new Map<number, SeatStatusResponse['status']>();
    statuses.forEach((s: SeatStatusResponse) => map.set(s.seatId, s.status));
    return map;
  }, [statuses]);

  const rows = useMemo(() => {
    const grouped: Record<string, Seat[]> = {};
    seats.forEach((seat: Seat) => {
      if (!grouped[seat.rowLetter]) grouped[seat.rowLetter] = [];
      grouped[seat.rowLetter].push(seat);
    });
    return grouped;
  }, [seats]);

  // --- MUTACIONES ---
  
  const selectMutation = api.seat.selectSeat.useMutation({
    onSuccess: () => utils.seat.getStatuses.invalidate(),
  });

  const undoMutation = api.seat.undoLast.useMutation({
    onSuccess: () => utils.seat.getStatuses.invalidate(),
  });

  // Extraemos mutate directamente para que sea estable en los useEffects
  const { mutate: releaseSession } = api.seat.releaseSession.useMutation();

  // ==========================================
  // 🔥 LÓGICA DE ABANDONO DE CARRITO (ANTI-INFINITE-LOOP)
  // ==========================================

  // 1. Ref para guardar las selecciones sin causar ciclos infinitos
  const selectionsRef = useRef(mySelections);

  // 2. Mantenemos el Ref actualizado silenciosamente
  useEffect(() => {
    selectionsRef.current = mySelections;
  }, [mySelections]);

  // 3. Efecto principal de limpieza
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (selectionsRef.current.length > 0 && !isProceedingToCheckout.current) {
        // Cierre abrupto de pestaña (Usamos sendBeacon o fetch con keepalive)
        const url = `${process.env.NEXT_PUBLIC_API_URL}/seat-status/release-session`;
        fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, movieScreeningId }),
          keepalive: true,
        }).catch(console.error);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup: Se ejecuta al desmontar el componente (SPA navigation)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);

      if (selectionsRef.current.length > 0 && !isProceedingToCheckout.current) {
        // Liberamos usando la mutación de tRPC
        releaseSession({ movieScreeningId, userId });
      }
    };
    // Dependencias estrictas (sin mySelections)
  }, [movieScreeningId, userId, releaseSession]);
  // ==========================================

  const handleSeatClick = async (seatId: number) => {
    if (loadingAction) return;
    const currentStatus = statusMap.get(seatId) || 'AVAILABLE';
    const isAlreadySelected = mySelections.some((s) => s.id === seatId);

    if (isAlreadySelected) return;

    if (currentStatus === 'AVAILABLE') {
      setLoadingAction(true);
      try {
        await selectMutation.mutateAsync({ movieScreeningId, seatId, userId });
        const label = seatNameMap.get(seatId) || '??';
        setMySelections((prev) => [...prev, { id: seatId, label }]);
      } catch (e) {
        alert('Asiento no disponible o en proceso de compra por alguien más.');
      } finally {
        setLoadingAction(false);
      }
    }
  };

  const handleUndo = async () => {
    if (mySelections.length === 0 || loadingAction) return;
    setLoadingAction(true);
    try {
      await undoMutation.mutateAsync({ movieScreeningId, userId });
      setMySelections((prev) => prev.slice(0, -1));
    } finally {
      setLoadingAction(false);
    }
  };

  const handleContinue = () => {
    // 🔥 Levantamos la bandera para evitar que el cleanup borre la sesión
    isProceedingToCheckout.current = true;

    const seatIds = mySelections.map((s) => s.id).join(',');
    const seatLabels = mySelections.map((s) => s.label).join(',');

    router.push(
      `/checkout?functionId=${movieScreeningId}&seatIds=${seatIds}&seatLabels=${seatLabels}`
    );
  };

  if (loadingSeats) {
    return (
      <Center h={400}>
        <Loader color="blue" />
      </Center>
    );
  }

  return (
    <Stack gap="xl" align="center" mt="xl" maw={800} mx="auto">
      <Title order={2} ta="center">
        Selecciona tus asientos
      </Title>

      {/* PANTALLA */}
      <Box
        w="100%"
        h={40}
        bg="gray.2"
        style={{
          borderRadius: '40% 40% 0 0',
          borderBottom: '4px solid #1971c2',
        }}
      >
        <Text fw={700} c="dimmed" ta="center" lh="40px">
          PANTALLA
        </Text>
      </Box>

      {/* FILAS */}
      <Stack gap="xs">
        {Object.entries(rows).map(([row, rowSeats]) => (
          <Group key={row} gap="xs" wrap="nowrap">
            <Text w={20} fw="bold">
              {row}
            </Text>
            {rowSeats.map((seat) => {
              const status = statusMap.get(seat.id) || 'AVAILABLE';
              const isMine = mySelections.some((s) => s.id === seat.id);
              const color = isMine
                ? 'blue'
                : status === 'AVAILABLE'
                  ? 'gray'
                  : 'red';

              return (
                <Tooltip key={seat.id} label={`${row}${seat.seatNumber}`}>
                  <ActionIcon
                    variant={
                      status === 'AVAILABLE' && !isMine ? 'light' : 'filled'
                    }
                    color={color}
                    size="lg"
                    onClick={() => handleSeatClick(seat.id)}
                  >
                    <IconArmchair size={20} />
                  </ActionIcon>
                </Tooltip>
              );
            })}
          </Group>
        ))}
      </Stack>

      {/* FOOTER */}
      <Paper withBorder p="md" radius="md" w="100%">
        <Group justify="space-between">
          <Text size="sm" fw={500}>
            Asientos: {mySelections.map((s) => s.label).join(', ') || 'Ninguno'}
          </Text>
          <Group>
            <Button
              variant="subtle"
              color="red"
              onClick={handleUndo}
              disabled={mySelections.length === 0}
              loading={loadingAction}
            >
              <IconArrowBackUp size={18} />
            </Button>
            <Button
              rightSection={<IconArrowRight size={18} />}
              disabled={mySelections.length === 0}
              loading={loadingAction}
              onClick={handleContinue}
            >
              Continuar
            </Button>
          </Group>
        </Group>
      </Paper>
    </Stack>
  );
}
