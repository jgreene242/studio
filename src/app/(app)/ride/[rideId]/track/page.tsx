import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { MapPin, Clock, User, Car, Phone, MessageSquare, AlertTriangle, Share2 } from "lucide-react";

// Placeholder for params type
interface TrackRidePageProps {
  params: { rideId: string };
}

export default function TrackRidePage({ params }: TrackRidePageProps) {
  const { rideId } = params;

  // Placeholder data
  const rideDetails = {
    driverName: "David L.",
    driverRating: 4.8,
    vehicleModel: "Toyota Camry",
    licensePlate: "XYZ 123",
    etaPickup: "3 min", // This would be dynamic
    etaDropoff: "15 min", // This would be dynamic
    driverPhotoUrl: "https://placehold.co/80x80.png",
    vehiclePhotoUrl: "https://placehold.co/120x72.png",
    currentStatus: "En route to pickup" // e.g., "En route to pickup", "Trip in progress"
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline text-primary">Tracking Ride: #{rideId}</CardTitle>
          <CardDescription>Your driver is on the way. Current Status: <span className="font-semibold text-primary">{rideDetails.currentStatus}</span></CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Map Placeholder */}
          <div className="aspect-[16/10] w-full bg-muted rounded-lg overflow-hidden border">
            <Image 
              src="https://placehold.co/800x500.png" 
              alt="Live map tracking placeholder" 
              width={800} 
              height={500}
              className="object-cover w-full h-full"
              data-ai-hint="map route car" 
            />
          </div>
          
          <Card>
            <CardHeader>
                <CardTitle className="text-xl">Driver & Vehicle Details</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-4">
                    <Image src={rideDetails.driverPhotoUrl} alt={rideDetails.driverName} width={64} height={64} className="rounded-full" data-ai-hint="driver portrait"/>
                    <div>
                        <p className="font-semibold text-lg">{rideDetails.driverName}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                            <User className="w-4 h-4 mr-1" /> Rating: {rideDetails.driverRating} / 5
                        </div>
                    </div>
                </div>
                 <div className="flex items-center space-x-4">
                    <Image src={rideDetails.vehiclePhotoUrl} alt={rideDetails.vehicleModel} width={96} height={58} className="rounded" data-ai-hint="car side view"/>
                    <div>
                        <p className="font-semibold text-lg">{rideDetails.vehicleModel}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                           <Car className="w-4 h-4 mr-1" /> {rideDetails.licensePlate}
                        </div>
                    </div>
                </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center md:text-left">
            <Card>
                <CardContent className="pt-6">
                    <div className="flex items-center justify-center md:justify-start">
                        <Clock className="w-6 h-6 mr-2 text-accent" />
                        <p className="text-lg"><strong className="font-medium">ETA to Pickup:</strong> {rideDetails.etaPickup}</p>
                    </div>
                </CardContent>
            </Card>
             <Card>
                <CardContent className="pt-6">
                    <div className="flex items-center justify-center md:justify-start">
                        <MapPin className="w-6 h-6 mr-2 text-accent" />
                        <p className="text-lg"><strong className="font-medium">ETA to Destination:</strong> {rideDetails.etaDropoff}</p>
                    </div>
                </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4">
            <Button variant="outline"><Phone className="w-4 h-4 mr-0 sm:mr-2" /><span className="hidden sm:inline">Call Driver</span></Button>
            <Button variant="outline"><MessageSquare className="w-4 h-4 mr-0 sm:mr-2" /><span className="hidden sm:inline">Chat</span></Button>
            <Button variant="outline"><Share2 className="w-4 h-4 mr-0 sm:mr-2" /><span className="hidden sm:inline">Share Trip</span></Button>
            <Button variant="destructive"><AlertTriangle className="w-4 h-4 mr-0 sm:mr-2" /><span className="hidden sm:inline">SOS</span></Button>
          </div>
          <div className="text-center">
            <Button variant="link" className="text-primary">Change Destination?</Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
