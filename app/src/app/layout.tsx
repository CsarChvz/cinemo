import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/schedule/styles.css';
import '@mantine/charts/styles.css';
import 'mantine-datatable/styles.layer.css';
import 'leaflet/dist/leaflet.css';

import React from 'react';
import {
  mantineHtmlProps,
  MantineProvider,
  ColorSchemeScript,
} from '@mantine/core';
import { theme } from '@/theme';
import { Notifications } from '@mantine/notifications';
import { TRPCReactProvider } from '@/trpc-folder/trpc-adaptadores/react';
import { SessionProvider } from 'next-auth/react';

export const metadata = {
  title: 'Cinemo - App',
  description: 'I am using Mantine with Next.js!',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        {/* Mantine necesita esto para evitar el parpadeo de color (FOUC) */}
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
      </head>
      <body suppressHydrationWarning>
        <MantineProvider theme={theme}>
          <Notifications />
          <TRPCReactProvider>
            <SessionProvider>{children}</SessionProvider>
          </TRPCReactProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
