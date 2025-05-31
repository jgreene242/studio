
"use client";

import { useState, useEffect } from 'react'; 
import { useRouter, useSearchParams } from 'next/navigation'; // Added useSearchParams
import { useAuth } from '@/context/AuthContext'; 
import DestinationInputForm from '@/components/ride/destination-input-form';
import VehicleSelector from '@/components/ride/vehicle-selector';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CreditCard, DollarSign, Zap, Loader2 } from 'lucide-react'; 
import Image from 'next/image';

interface RideDetails {
  pickup: string;
  destination: string;
  vehicleId?: string;
  fare?: string; 
  eta?: string; 
  paymentMethod?: string;
  promoCode?: string;
}

const vehicleFaresAndEtas: Record<string, { fare: string, eta: string }> = {
    'standard': { fare: '$15-20', eta: '5-7 min' },
    'premium': { fare: '$25-35', eta: '8-10 min' },
    'van': { fare: '$30-45', eta: '10-15 min' },
    'accessible': { fare: '$20-28', eta: '12-18 min' },
};


export default function DashboardPage() {
  const [step, setStep] = useState(1); 
  const [rideDetails, setRideDetails] = useState<RideDetails | null>(null);
  const { user, initialLoading: authInitialLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams(); // Get search params

  useEffect(() => {
    if (!authInitialLoading && !user) {
      // Preserve current path for redirection after login
      const currentPath = window.location.pathname + window.location.search;
      router.push(`/auth/login?redirect=${encodeURIComponent(currentPath)}`);
    }
  }, [user, authInitialLoading, router]);

  if (authInitialLoading || !user) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  const handleDestinationSet = (pickup: string, destination: string) => {
    setRideDetails({ pickup, destination });
    setStep(2);
  };

  const handleVehicleSelect = (vehicleId: string) => {
    if (rideDetails) {
      setRideDetails({ ...rideDetails, vehicleId, ...vehicleFaresAndEtas[vehicleId] });
      setStep(3);
    }
  };
  
  const handleConfirmRide = () => {
    // TODO: Implement actual ride confirmation logic
    alert(`Ride requested! Details: \nPickup: ${rideDetails?.pickup}\nDestination: ${rideDetails?.destination}\nVehicle: ${rideDetails?.vehicleId}\nFare: ${rideDetails?.fare}\nETA: ${rideDetails?.eta}`);
    // Example: router.push(`/app/ride/${newRideId}/track`); 
    setStep(1);
    setRideDetails(null);
  };

  const resetFlow = () => {
    setStep(1);
    setRideDetails(null);
  }

  return (
    <div className="space-y-8">
      {step === 1 && (
        <DestinationInputForm onDestinationSet={handleDestinationSet} />
      )}

      {step === 2 && rideDetails && (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold font-headline">Select Vehicle</h2>
            <Button variant="outline" onClick={() => setStep(1)}>Change Locations</Button>
          </div>
          <Card>
            <CardContent className="pt-6">
                <p><strong className="font-medium">From:</strong> {rideDetails.pickup}</p>
                <p><strong className="font-medium">To:</strong> {rideDetails.destination}</p>
            </CardContent>
          </Card>
          <VehicleSelector onVehicleSelect={handleVehicleSelect} />
        </>
      )}

      {step === 3 && rideDetails && rideDetails.vehicleId && (
        <Card className="w-full max-w-lg mx-auto shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-headline text-primary">Confirm Your Ride</CardTitle>
            <CardDescription>Review your trip details and confirm to book.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-1">Trip Details</h3>
              <p><strong className="font-medium">From:</strong> {rideDetails.pickup}</p>
              <p><strong className="font-medium">To:</strong> {rideDetails.destination}</p>
              <p><strong className="font-medium">Vehicle:</strong> {rideDetails.vehicleId.charAt(0).toUpperCase() + rideDetails.vehicleId.slice(1)} Taxi</p>
              <p><strong className="font-medium">Estimated Fare:</strong> {rideDetails.fare}</p>
              <p><strong className="font-medium">Estimated Arrival:</strong> {rideDetails.eta}</p>
            </div>
            
            <Separator />

            <div>
                <h3 className="font-semibold mb-2">Payment Method</h3>
                <div className="flex items-center justify-between p-3 border rounded-md bg-muted/50">
                    <div className="flex items-center">
                        <CreditCard className="w-5 h-5 mr-3 text-primary"/>
                        <span>Visa **** 4242</span>
                    </div>
                    <Button variant="link" size="sm" className="text-primary">Change</Button>
                </div>
                 <Button variant="outline" className="w-full mt-2">
                    <DollarSign className="w-4 h-4 mr-2"/> Add Cash Payment (if available)
                </Button>
            </div>

            <Separator />
            
            <div>
                <h3 className="font-semibold mb-2">Promo Code</h3>
                <div className="flex gap-2">
                     <Button variant="ghost" className="w-full border border-dashed">
                        <Zap className="w-4 h-4 mr-2 text-accent"/> Add Promo Code / Voucher
                    </Button>
                </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-2">
              <Button variant="outline" onClick={() => setStep(2)} className="w-full sm:w-auto">
                Back to Vehicle Selection
              </Button>
              <Button onClick={handleConfirmRide} className="w-full sm:flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                Confirm & Request Ride
              </Button>
            </div>
             <Button variant="link" onClick={resetFlow} className="w-full mt-2 text-sm text-muted-foreground">
                Start Over
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

