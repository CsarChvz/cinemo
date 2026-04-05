import type { Meta, StoryObj } from '@storybook/react';
import { DateTimeCell, ActionButtons } from './ScreeningTableCells';
import { MantineProvider, Table, Container } from '@mantine/core';

const meta: Meta = {
  title: 'Components/Movie Screenings/TableCells',
  decorators: [
    (Story) => (
      <MantineProvider>
        <Container size="xs" py="xl">
          <Table withTableBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Dato / Celda</Table.Th>
                <Table.Th style={{ width: 120 }}>Preview</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              <Story />
            </Table.Tbody>
          </Table>
        </Container>
      </MantineProvider>
    ),
  ],
};

export default meta;

export const FechaYHora: StoryObj<typeof DateTimeCell> = {
  render: () => (
    <>
      <Table.Tr>
        <Table.Td>Fecha Actual</Table.Td>
        <Table.Td>
          <DateTimeCell date={new Date()} />
        </Table.Td>
      </Table.Tr>
      <Table.Tr>
        <Table.Td>Fecha Futura (String)</Table.Td>
        <Table.Td>
          <DateTimeCell date="2026-05-15T20:30:00" />
        </Table.Td>
      </Table.Tr>
    </>
  ),
};

// Story para los botones de acción
export const Acciones: StoryObj<typeof ActionButtons> = {
  render: () => (
    <Table.Tr>
      <Table.Td>Iconos de control</Table.Td>
      <Table.Td>
        <ActionButtons id={''} basePath={''} />
      </Table.Td>
    </Table.Tr>
  ),
};
