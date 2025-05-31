
import LoginForm from "@/components/auth/login-form";
import { redirect } from 'next/navigation';
import { auth } from '@/lib/firebase'; // For checking initial auth state

export default function LoginPage() {
  // if (auth.currentUser) {
  //    redirect('/app/dashboard');
  // }
  return <LoginForm />;
}
