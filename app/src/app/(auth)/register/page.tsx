import { RegisterForm } from '@/components/auth/RegisterForm/RegisterForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Iniciar Sesión | Cinemo',
  description: 'Ingresa a tu cuenta para disfrutar de la mejor cartelera.',
};

export default function RegisterPage() {
  return <RegisterForm />;
}
