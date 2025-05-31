import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import MainHeader from '@/components/navigation/main-header';
import { Car, MapPin, ShieldCheck, Smartphone } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <MainHeader />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl xl:text-6xl/none text-primary">
                    Your Journey, Simplified.
                  </h1>
                  <p className="max-w-[600px] text-foreground/80 md:text-xl">
                    DispatchNow offers reliable and efficient taxi services at your fingertips. Get a ride in minutes, track your driver in real-time, and enjoy a seamless travel experience.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Link href="/register">Get Started</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/dashboard">Request a Ride</Link>
                  </Button>
                </div>
              </div>
              <Image
                src="https://placehold.co/600x400.png"
                alt="Hero"
                width={600}
                height={400}
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square shadow-lg"
                data-ai-hint="city taxi service"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground font-medium">Key Features</div>
                <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Why Choose DispatchNow?</h2>
                <p className="max-w-[900px] text-foreground/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We provide a comprehensive suite of features designed for your convenience and safety.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
              <div className="grid gap-2 p-6 rounded-lg shadow-md bg-card hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-2">
                  <MapPin className="w-8 h-8 text-accent" />
                  <h3 className="text-lg font-bold font-headline">Easy Booking</h3>
                </div>
                <p className="text-sm text-foreground/70">
                  Input your destination with a smart search or pin drop. AI suggests popular spots.
                </p>
              </div>
              <div className="grid gap-2 p-6 rounded-lg shadow-md bg-card hover:shadow-lg transition-shadow">
                 <div className="flex items-center gap-2">
                  <Car className="w-8 h-8 text-accent" />
                  <h3 className="text-lg font-bold font-headline">Vehicle Options</h3>
                </div>
                <p className="text-sm text-foreground/70">
                  Choose from various taxi types with fare estimates and ETAs.
                </p>
              </div>
              <div className="grid gap-2 p-6 rounded-lg shadow-md bg-card hover:shadow-lg transition-shadow">
                 <div className="flex items-center gap-2">
                  <Smartphone className="w-8 h-8 text-accent" />
                  <h3 className="text-lg font-bold font-headline">Real-Time Tracking</h3>
                </div>
                <p className="text-sm text-foreground/70">
                  Track your driver's location, ETA, and vehicle details live on the map.
                </p>
              </div>
              <div className="grid gap-2 p-6 rounded-lg shadow-md bg-card hover:shadow-lg transition-shadow">
                 <div className="flex items-center gap-2">
                  <ShieldCheck className="w-8 h-8 text-accent" />
                  <h3 className="text-lg font-bold font-headline">Secure & Transparent</h3>
                </div>
                <p className="text-sm text-foreground/70">
                  Secure payments, transparent fare breakdowns, and post-ride summaries.
                </p>
              </div>
               <div className="grid gap-2 p-6 rounded-lg shadow-md bg-card hover:shadow-lg transition-shadow">
                 <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><path d="M10.3 21.7c.2-.2.3-.4.3-.7 0-.3-.1-.5-.3-.7l-3.4-3.4c-.4-.4-.4-1 0-1.4l8.8-8.8c.4-.4 1-.4 1.4 0l3.4 3.4c.4.4.4 1 0 1.4l-8.8 8.8c-.2.2-.5.3-.7.3-.3 0-.5-.1-.7-.3Z"/><path d="m7.5 12.5 2 2L14 10"/></svg>
                  <h3 className="text-lg font-bold font-headline">Driver Verified</h3>
                </div>
                <p className="text-sm text-foreground/70">
                  All drivers undergo verification for your safety and peace of mind.
                </p>
              </div>
               <div className="grid gap-2 p-6 rounded-lg shadow-md bg-card hover:shadow-lg transition-shadow">
                 <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
                  <h3 className="text-lg font-bold font-headline">24/7 Support</h3>
                </div>
                <p className="text-sm text-foreground/70">
                  Access our help center and customer support anytime you need assistance.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-foreground/60">&copy; {new Date().getFullYear()} DispatchNow. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-foreground/60">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-foreground/60">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
