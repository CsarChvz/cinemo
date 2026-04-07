'use client'

import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";

export function ButtonNewState(){
    return (
      <Button
        component={Link}
        href="/admin/locations/states/create"
        leftSection={<IconPlus size={18} />}
        variant="filled"
        color="indigo"
      >
        Nuevo Estado
      </Button>
    );

}