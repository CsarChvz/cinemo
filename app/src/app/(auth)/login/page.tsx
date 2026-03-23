import { LoginForm } from '@/components/auth/LoginForm/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Iniciar Sesión | Cinemo',
  description: 'Ingresa a tu cuenta para disfrutar de la mejor cartelera.',
};

export default function LoginPage() {
  return <LoginForm />;
}
