import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Car } from 'lucide-react';

export default function MainHeader() {
  // Placeholder for authentication status
  const isAuthenticated = false; // Replace with actual auth check
  const user = isAuthenticated ? { name: 'John Doe' } : null;

  const navLinks = [
    ...(isAuthenticated
      ? [
          { href: '/dashboard', label: 'Request Ride' },
          { href: '/history', label: 'Ride History' },
          { href: '/profile', label: 'Profile' },
          { href: '/support', label: 'Support' },
        ]
      : []),
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Car className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline sm:inline-block text-xl">
            Paradise Rides
          </span>
        </Link>
        
        <nav className="hidden md:flex flex-1 items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-4">
          {isAuthenticated && user ? (
            <>
              <span className="hidden sm:inline text-sm">Welcome, {user.name}</span>
              <Button variant="outline" size="sm">Logout</Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Log In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/register">Sign Up</Link>
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
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-8">
                <Link href="/" className="mb-4 flex items-center space-x-2">
                  <Car className="h-6 w-6 text-primary" />
                  <span className="font-bold font-headline text-xl">
                    Paradise Rides
                  </span>
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="transition-colors hover:text-primary text-lg"
                  >
                    {link.label}
                  </Link>
                ))}
                 {!isAuthenticated && (
                   <>
                    <Button variant="ghost" asChild className="w-full justify-start text-lg">
                      <Link href="/login">Log In</Link>
                    </Button>
                    <Button asChild className="w-full justify-start text-lg">
                      <Link href="/register">Sign Up</Link>
                    </Button>
                   </>
                 )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
