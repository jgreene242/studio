
import MainHeader from "@/components/navigation/main-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Car, Users, MapPinIcon } from "lucide-react"; // Using MapPinIcon for clarity if MapPin is a component
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <MainHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary/10 py-16 md:py-24 text-center">
          <div className="container px-4 mx-auto">
            <Car className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold font-headline mb-6 text-primary">
              Welcome to Paradise Rides
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Your reliable and efficient taxi service. Get a ride in minutes, track your journey, and pay seamlessly.
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" asChild className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/auth/login">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
                <Link href="/auth/login">Log In</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12 md:mb-16">
              Why Choose Paradise Rides?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 border bg-card rounded-lg shadow-sm text-center">
                <MapPinIcon className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
                <p className="text-muted-foreground">
                  Request a ride with a few taps using our intuitive interface.
                </p>
              </div>
              <div className="p-6 border bg-card rounded-lg shadow-sm text-center">
                <Users className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Reliable Drivers</h3>
                <p className="text-muted-foreground">
                  Connect with professional and vetted drivers for a safe journey.
                </p>
              </div>
              <div className="p-6 border bg-card rounded-lg shadow-sm text-center">
                <Car className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Track Your Ride</h3>
                <p className="text-muted-foreground">
                  Real-time tracking of your taxi's location and ETA.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Image Banner Section */}
        <section className="py-16 md:py-24 bg-muted">
            <div className="container px-4 mx-auto">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6">
                            Travel with Comfort and Style
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            Whether it's a quick trip across town or a ride to the airport, Paradise Rides ensures a comfortable and timely experience. Our diverse fleet caters to all your needs.
                        </p>
                        <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                            <Link href="/app/dashboard">Book a Ride Now</Link>
                        </Button>
                    </div>
                    <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
                         <Image 
                            src="https://placehold.co/600x400.png" 
                            alt="Comfortable taxi ride" 
                            fill
                            className="object-cover"
                            data-ai-hint="city taxi modern"
                         />
                    </div>
                </div>
            </div>
        </section>

        {/* Call to Action for Drivers */}
        <section className="py-16 md:py-24">
          <div className="container px-4 mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6">
              Are You a Driver?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
              Join our platform and start earning. Benefit from easy onboarding, flexible hours, and a supportive community.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/driver/onboarding">Become a Driver</Link>
            </Button>
          </div>
        </section>
      </main>
      <footer className="border-t py-8 bg-background">
        <div className="container px-4 mx-auto text-center text-sm text-muted-foreground">
          Paradise Rides &copy; {new Date().getFullYear()}. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
