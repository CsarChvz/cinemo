'use client'

import { AppShell, UnstyledButton } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { Header } from "../Header/Header"

import classes from './MainLayout.module.css';

interface MainLayoutProps{
    children: React.ReactNode;
}

export function MainLayout({children}: MainLayoutProps){
    const [opened, {toggle}] = useDisclosure();

    return (
      <AppShell
        header={{ height: 60 }}
        padding="md"
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { desktop: true, mobile: !opened },
        }}
      >
        <AppShell.Header>
          <Header opened={opened} onToggle={toggle} />
        </AppShell.Header>

        <AppShell.Navbar py="md" px={4}>
          <UnstyledButton className={classes.control}>Home</UnstyledButton>
          <UnstyledButton className={classes.control}>Blog</UnstyledButton>
          <UnstyledButton className={classes.control}>Contacts</UnstyledButton>
          <UnstyledButton className={classes.control}>Support</UnstyledButton>
        </AppShell.Navbar>
        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    );
}