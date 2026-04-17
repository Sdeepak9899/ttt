import { Metadata } from 'next';
import { LoginForm } from '@/components/auth/login-form';

export const metadata: Metadata = {
  title: 'Sign In | Notes App',
  description: 'Sign in to your Notes account',
};

export default function LoginPage() {
  return <LoginForm />;
}
