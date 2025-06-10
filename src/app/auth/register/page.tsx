
import React, { Suspense } from 'react';
import RegisterForm from "@/components/auth/register-form";
import { Loader2 } from 'lucide-react';
 
function RegisterPageFallback() {
  return (
    <div className="flex justify-center items-center min-h-[300px]">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<RegisterPageFallback />}>
      <RegisterForm />
    </Suspense>
  );
}
