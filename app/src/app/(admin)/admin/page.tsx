'use client';

import { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  GridCol,
  Paper,
  Text,
  Group,
  Stack,
  Title,
  ThemeIcon,
  SimpleGrid,
  Badge,
  Box,
  Skeleton,
} from '@mantine/core';
import { AreaChart, DonutChart } from '@mantine/charts';
import {
  IconTicket,
  IconTrendingUp,
  IconUsers,
  IconMovie,
  IconArrowUpRight,
  IconArrowDownRight,
} from '@tabler/icons-react';

// Estilos necesarios para las gráficas
import '@mantine/charts/styles.css';

// --- DATA DUMMY ---
const SALES_DATA = [
  { date: 'Mar 18', ventas: 2400 },
  { date: 'Mar 19', ventas: 1900 },
  { date: 'Mar 20', ventas: 4000 },
  { date: 'Mar 21', ventas: 3500 },
  { date: 'Mar 22', ventas: 5200 },
  { date: 'Mar 23', ventas: 4800 },
  { date: 'Mar 24', ventas: 6100 },
];

const GENRE_DATA = [
  { name: 'Acción', value: 400, color: 'blue.6' },
  { name: 'Ciencia Ficción', value: 300, color: 'cyan.6' },
  { name: 'Comedia', value: 200, color: 'teal.6' },
  { name: 'Drama', value: 100, color: 'indigo.6' },
];

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);

  // Hook para asegurar que el componente está en el cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        {/* Cabecera */}
        <Group justify="space-between" align="flex-end">
          <Stack gap={0}>
            <Title order={2}>Panel de Control</Title>
            <Text c="dimmed" size="sm">
              Análisis de rendimiento y ventas de Cinemo
            </Text>
          </Stack>
          <Badge size="lg" variant="dot" color="blue">
            Actualizado: hoy
          </Badge>
        </Group>

        {/* KPIs */}
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
          <StatCard
            title="Boletos Vendidos"
            value="1,284"
            diff={12.5}
            icon={IconTicket}
            color="blue"
          />
          <StatCard
            title="Ingresos Totales"
            value="$158,400"
            diff={8.2}
            icon={IconTrendingUp}
            color="green"
          />
          <StatCard
            title="Nuevos Usuarios"
            value="+420"
            diff={-3.1}
            icon={IconUsers}
            color="orange"
          />
          <StatCard
            title="Funciones Hoy"
            value="32"
            diff={0}
            icon={IconMovie}
            color="indigo"
          />
        </SimpleGrid>

        {/* Gráficas con Renderizado Condicional (Solución width -1) */}
        <Grid gap="lg">
          <GridCol span={{ base: 12, lg: 8 }}>
            <Paper withBorder p="md" radius="md" shadow="xs" h={420}>
              <Text fw={700} size="lg" mb="xl">
                Tendencia de Ventas (7 días)
              </Text>

              {mounted ? (
                <AreaChart
                  h={300}
                  data={SALES_DATA}
                  dataKey="date"
                  series={[
                    { name: 'ventas', color: 'blue.6', label: 'Ventas ($)' },
                  ]}
                  curveType="monotone"
                  tickLine="y"
                  gridAxis="xy"
                  valueFormatter={(value) => `$${value.toLocaleString()}`}
                />
              ) : (
                <Skeleton h={300} radius="md" />
              )}
            </Paper>
          </GridCol>

          <GridCol span={{ base: 12, lg: 4 }}>
            <Paper withBorder p="md" radius="md" shadow="xs" h={420}>
              <Text fw={700} size="lg" mb="xl">
                Géneros más vistos
              </Text>

              <Stack align="center" justify="center" h={250}>
                {mounted ? (
                  <DonutChart
                    data={GENRE_DATA}
                    withLabelsLine
                    labelsType="percent"
                    withLabels
                    size={160}
                    thickness={20}
                  />
                ) : (
                  <Skeleton circle h={160} w={160} />
                )}
              </Stack>

              <Stack gap={8} mt="md">
                {GENRE_DATA.slice(0, 3).map((item) => (
                  <Group key={item.name} justify="space-between">
                    <Group gap="xs">
                      <Box
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          backgroundColor: `var(--mantine-color-${item.color.split('.')[0]}-6)`,
                        }}
                      />
                      <Text size="xs" fw={500}>
                        {item.name}
                      </Text>
                    </Group>
                    <Text size="xs" c="dimmed">
                      {item.value} tix
                    </Text>
                  </Group>
                ))}
              </Stack>
            </Paper>
          </GridCol>
        </Grid>
      </Stack>
    </Container>
  );
}

// --- SUB-COMPONENTE STAT CARD ---
interface StatCardProps {
  title: string;
  value: string;
  diff: number;
  icon: any;
  color: string;
}

function StatCard({ title, value, diff, icon: Icon, color }: StatCardProps) {
  const DiffIcon = diff > 0 ? IconArrowUpRight : IconArrowDownRight;

  return (
    <Paper withBorder p="md" radius="md" shadow="xs">
      <Group justify="space-between">
        <ThemeIcon size="xl" radius="md" variant="light" color={color}>
          <Icon size={24} />
        </ThemeIcon>
        <Group gap={4}>
          <Text
            c={diff > 0 ? 'teal' : diff < 0 ? 'red' : 'gray'}
            fw={700}
            size="sm"
          >
            {diff === 0 ? '0%' : `${diff > 0 ? '+' : ''}${diff}%`}
          </Text>
          {diff !== 0 && (
            <DiffIcon size={16} color={diff > 0 ? 'teal' : 'red'} />
          )}
        </Group>
      </Group>

      <Stack gap={0} mt="md">
        <Text size="xs" c="dimmed" fw={700} tt="uppercase">
          {title}
        </Text>
        <Text size="xl" fw={900}>
          {value}
        </Text>
      </Stack>
    </Paper>
  );
}
