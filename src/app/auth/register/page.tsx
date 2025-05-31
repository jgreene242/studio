
import RegisterForm from "@/components/auth/register-form";
import { redirect } from 'next/navigation';
import { auth } from '@/lib/firebase'; // For checking initial auth state (server-side if possible)

export default function RegisterPage() {
  // This server-side check is limited as auth state is primarily client-side
  // For a more robust solution, middleware or client-side checks in AuthProvider are better.
  // if (auth.currentUser) {
  //   redirect('/app/dashboard');
  // }
  return <RegisterForm />;
}
