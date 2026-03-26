import { Container, Center, Stack, Title, Button } from "@mantine/core";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface MovieNotFoundProps{
  router: AppRouterInstance
}

export function MovieNotFound({router}: MovieNotFoundProps){
        return (
          <Container size="sm" py={100}>
            <Center>
              <Stack>
                <Title order={2}>Película no encontrada</Title>
                <Button onClick={() => router.push('/movies')}>Volver</Button>
              </Stack>
            </Center>
          </Container>
        );
}