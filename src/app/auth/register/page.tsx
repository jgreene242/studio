
import RegisterForm from "@/components/auth/register-form";
 
export default function RegisterPage() {
  // This server-side check is limited as auth state is primarily client-side
  // For a more robust solution, middleware or client-side checks in AuthProvider are better.
  // if (auth.currentUser) {
  //   redirect('/app/dashboard');
  // }
  return <RegisterForm />;
}
