import { Metadata } from 'next';
import { RegisterForm } from '@/components/auth/register-form';

export const metadata: Metadata = {
  title: 'Create Account | Notes App',
  description: 'Create a new Notes account',
};

export default function RegisterPage() {
  return <RegisterForm />;
}
