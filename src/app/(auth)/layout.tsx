import Link from "next/link";
import { Car } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 via-background to-background p-4">
       <Link href="/" className="mb-8 flex items-center space-x-2">
          <Car className="h-8 w-8 text-primary" />
          <span className="font-bold font-headline text-3xl text-primary">
            DispatchNow
          </span>
        </Link>
      {children}
    </div>
  );
}
