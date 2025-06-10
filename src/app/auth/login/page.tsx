
import React, { Suspense } from 'react';
import LoginForm from "@/components/auth/login-form";
import { Loader2 } from 'lucide-react';

function LoginPageFallback() {
  return (
    <div className="flex justify-center items-center min-h-[300px]">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginPageFallback />}>
      <LoginForm />
    </Suspense>
  );
}
