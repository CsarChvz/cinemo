'use client';

import { useState, useMemo } from 'react';
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
  const utils = api.useUtils();
  const [loadingAction, setLoadingAction] = useState(false);
  const [mySelections, setMySelections] = useState<
    { id: number; label: string }[]
  >([]);

  const { data: seats = [], isLoading: loadingSeats } =
    api.seat.getRoomSeats.useQuery({ roomId });
  const { data: statuses = [] } = api.seat.getStatuses.useQuery(
    { movieScreeningId },
    { refetchInterval: 5000 }
  );


  console.log(seats)

  // --- LÓGICA DE BÚSQUEDA EN FRONT ---
  // Mapa de ID -> "A5" para no pedirlo al back cada vez
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
        alert('Asiento no disponible');
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

  if (loadingSeats)
    return (
      <Center h={400}>
        <Loader color="blue" />
      </Center>
    );

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
            >
              <IconArrowBackUp size={18} />
            </Button>
            <Button
              rightSection={<IconArrowRight size={18} />}
              disabled={mySelections.length === 0}
            >
              Continuar
            </Button>
          </Group>
        </Group>
      </Paper>
    </Stack>
  );
}
