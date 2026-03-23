'use client';

import {
  TextInput,
  Button,
  Paper,
  Title,
  Text,
  Stack,
  Divider,
  SimpleGrid,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { PasswordInput } from '../PasswordInput/PasswordInput';
import Link from 'next/link';
import classes from '../AuthForms.module.css';

export function RegisterForm() {
  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },

    validate: {
      firstName: (v) => (v.length < 2 ? 'Nombre muy corto' : null),
      lastName: (v) => (v.length < 2 ? 'Apellido muy corto' : null),
      email: (v) => (/^\S+@\S+$/.test(v) ? null : 'Email inválido'),
      password: (v) => (v.length < 6 ? 'Mínimo 6 caracteres' : null),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    // Aquí conectarás con tu API de Python (FastAPI/Flask)
    console.log('Registrando usuario en Cinemo:', values);
  };

  const inputStyles = {
    input: classes.inputField,
    label: classes.labelCustom,
  };

  return (
    <Paper
      p={40}
      radius="xl"
      className={classes.glassContainer}
      style={{ maxWidth: 500, width: '100%' }}
    >
      <Stack gap="xl">
        <Stack gap={5} ta="center">
          <Title order={2} className={classes.title}>
            Crea tu cuenta
          </Title>
          <Text c="dimmed" size="sm">
            Únete a la comunidad de Cinemo hoy mismo
          </Text>
        </Stack>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md">
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
              <TextInput
                label="Nombre"
                placeholder="Tu nombre"
                variant="filled"
                classNames={inputStyles}
                {...form.getInputProps('firstName')}
              />
              <TextInput
                label="Apellido"
                placeholder="Tu apellido"
                variant="filled"
                classNames={inputStyles}
                {...form.getInputProps('lastName')}
              />
            </SimpleGrid>

            <TextInput
              label="Correo electrónico"
              placeholder="tu@email.com"
              variant="filled"
              classNames={inputStyles}
              {...form.getInputProps('email')}
            />

            {/* Ahora solo pedimos la contraseña una vez */}
            <PasswordInput {...form.getInputProps('password')} />

            <Button
              type="submit"
              fullWidth
              size="md"
              mt="xl"
              variant="gradient"
              gradient={{ from: 'blue.6', to: 'cyan.6', deg: 90 }}
              radius="md"
            >
              Crear cuenta
            </Button>
          </Stack>
        </form>
        <Text ta="center" size="sm" c="gray.5">
          ¿Ya tienes una cuenta?{' '}
          <Text
            component={Link}
            href="/login"
            c="blue.4"
            fw={700}
            style={{ textDecoration: 'none' }}
          >
            Inicia sesión
          </Text>
        </Text>
      </Stack>
    </Paper>
  );
}
