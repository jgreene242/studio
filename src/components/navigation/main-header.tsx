
"use client"; // Required for hooks like useAuth, useRouter

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, type ButtonProps } from '@/components/ui/button'; // Imported ButtonProps
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet'; // Added SheetClose
import { Menu, Car, LogOut, Home, History, UserCog, HelpCircle, ShieldCheck, Loader2, UserPlus } from 'lucide-react'; // Ensured UserPlus is imported, removed UserCircle
import { useAuth } from '@/context/AuthContext'; // Added useAuth
import type { LucideProps } from 'lucide-react'; // Imported LucideProps
import type { ForwardRefExoticComponent, RefAttributes } from 'react'; // Imported ForwardRefExoticComponent and RefAttributes

interface NavLink {
  href: string;
  label: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  variant?: ButtonProps['variant']; // Made variant optional and typed
}


export default function MainHeader() {
  const { user, appSignOut, loading, initialLoading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await appSignOut();
    router.push('/'); // Redirect to homepage after logout
  };

  const commonLinks: NavLink[] = [ // Added type NavLink[]
    { href: '/', label: 'Home', icon: Home, variant: "ghost" }, // Added default variant
  ];

  const guestLinks: NavLink[] = [ // Added type NavLink[]
    ...commonLinks,
    { href: '/auth/login', label: 'Log In', icon: ShieldCheck, variant: "ghost" as const },
    { href: '/auth/register', label: 'Sign Up', icon: UserPlus, variant: "default" as const },
  ];
  
  const passengerNavLinks: NavLink[] = [ // Added type NavLink[]
    { href: '/app/dashboard', label: 'Request Ride', icon: Car, variant: "ghost" },
    { href: '/app/history', label: 'Ride History', icon: History, variant: "ghost" },
    { href: '/app/profile', label: 'Profile', icon: UserCog, variant: "ghost" },
    { href: '/app/support', label: 'Support', icon: HelpCircle, variant: "ghost" },
  ];

  // TODO: Add driver links when driver roles are implemented
  // const driverNavLinks = [ ... ];

  const authenticatedNavLinks = passengerNavLinks; // Default to passenger links for now

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Car className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline sm:inline-block text-xl">
            Paradise Rides
          </span>
        </Link>
        
        <nav className="hidden md:flex flex-1 items-center space-x-4 text-sm font-medium">
          {user && authenticatedNavLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-primary text-foreground/70 flex items-center gap-1.5"
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2">
          {initialLoading ? (
             <Loader2 className="h-5 w-5 animate-spin text-primary" />
          ) : user ? (
            <>
              <span className="hidden sm:inline text-sm text-muted-foreground">
                Hi, {user.displayName || user.email?.split('@')[0]}
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout} disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4 sm:mr-2" />}
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth/login">Log In</Link>
              </Button>
              <Button size="sm" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/auth/register">Sign Up</Link>
              </Button>
            </>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[320px] flex flex-col">
               <div className="border-b pb-4 mb-4">
                <Link href="/" className="flex items-center space-x-2">
                  <Car className="h-7 w-7 text-primary" />
                  <span className="font-bold font-headline text-2xl">
                    Paradise Rides
                  </span>
                </Link>
               </div>
              <nav className="flex flex-col space-y-1 flex-grow">
                {(user ? authenticatedNavLinks : commonLinks).map((link) => (
                  <SheetClose asChild key={link.label}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-3 rounded-md px-3 py-2.5 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <link.icon className="h-5 w-5 text-primary" />
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              
              {/* Auth buttons in sheet footer */}
              {!initialLoading && !user && (
                <div className="mt-auto pt-4 border-t space-y-2">
                  {guestLinks.slice(1).map(link => ( 
                     <SheetClose asChild key={link.label}>
                       <Button variant={link.variant || "ghost"} asChild className="w-full justify-start text-base py-2.5 h-auto">
                         <Link href={link.href} className="flex items-center gap-3">
                           <link.icon className="h-5 w-5 text-primary"/>{link.label}
                         </Link>
                       </Button>
                     </SheetClose>
                  ))}
                </div>
              )}
               {user && (
                <div className="mt-auto pt-4 border-t">
                    <Button variant="outline" onClick={handleLogout} disabled={loading} className="w-full justify-start text-base py-2.5 h-auto">
                         {loading ? <Loader2 className="h-5 w-5 animate-spin mr-3" /> : <LogOut className="h-5 w-5 mr-3 text-destructive"/>}
                         Logout
                    </Button>
                </div>
               )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
