import { render as testingLibraryRender } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // 1. Importamos el objeto userEvent
import axe from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { theme } from '@/theme';

export * from '@testing-library/react';

export { userEvent };
export { axe };


export function render(ui: React.ReactNode, options?: any) {
  return testingLibraryRender(<>{ui}</>, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <MantineProvider theme={theme}>{children}</MantineProvider>
    ),
    ...options,
  });
}
