'use client'

import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";

export function BackButtonStates(){
    return (
      <Button
        component={Link}
        href="/admin/locations/states"
        variant="subtle"
        color="gray"
        leftSection={<IconArrowLeft size={16} />}
        w="fit-content"
      >
        Volver a la lista
      </Button>
    );
}