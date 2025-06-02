
"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { MapPin, Clock, User, Car, Phone, MessageSquare, AlertTriangle, Share2, Loader2 } from "lucide-react";
import { doc, onSnapshot } from 'firebase/firestore'; // Removed getDoc and Timestamp
import { db } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

// Define a more specific type for ride details expected on this page
interface RideTrackingDetails {
  id: string;
  driverName?: string; // Assuming this might come from a joined driver profile or denormalized
  driverRating?: number;
  driverPhotoUrl?: string;
  vehicleName?: string; // This should be from the ride document
  vehicleModel?: string; // Could be part of vehicleName or separate
  licensePlate?: string;
  vehicleImage?: string; // This should be from the ride document
  etaPickup?: string; // Will likely become dynamic from driver location
  etaDropoff?: string; // Will become dynamic
  currentStatus: string; // e.g., "requested", "driver_assigned", "en_route_to_pickup", "trip_in_progress", "completed"
  pickupLocation?: string;
  destinationLocation?: string;
  // Add other fields as necessary, like driver's current geopoint for map
}

export default function TrackRidePage() {
  const params = useParams();
  const rideId = params.rideId as string;
  
  const [rideDetails, setRideDetails] = useState<RideTrackingDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user, initialLoading: authLoading } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setError("Please log in to track your ride.");
      setIsLoading(false);
      return;
    }

    if (rideId) {
      setIsLoading(true);
      const rideDocRef = doc(db, "rides", rideId);
      
      // Listen for real-time updates
      const unsubscribe = onSnapshot(rideDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const rideData = docSnapshot.data();
          if (rideData.passengerId !== user.uid) {
            setError("You are not authorized to track this ride.");
            setRideDetails(null);
            setIsLoading(false);
            if(unsubscribe) unsubscribe(); // Stop listening if unauthorized
            return;
          }
          // Map Firestore data to RideTrackingDetails
          // For now, driver details might be placeholders or need to be fetched/denormalized
          setRideDetails({
            id: docSnapshot.id,
            currentStatus: rideData.status || "Status Unknown",
            etaPickup: rideData.eta || "N/A", // Use ETA from ride document
            etaDropoff: "Calculating...", // Placeholder
            vehicleName: rideData.vehicleName || "Vehicle (TBD)",
            vehicleImage: rideData.vehicleImage || "https://placehold.co/120x72.png?text=Taxi",
            driverName: rideData.driverName || "Finding Driver...", // Placeholder
            driverPhotoUrl: rideData.driverPhotoUrl || "https://placehold.co/80x80.png?text=Driver",
            driverRating: rideData.driverRating || 0,
            licensePlate: rideData.licensePlate || "PLATE-TBD",
            pickupLocation: rideData.pickupLocation,
            destinationLocation: rideData.destinationLocation,
          });
          setError(null);
        } else {
          setError("Ride not found.");
          setRideDetails(null);
        }
        setIsLoading(false);
      }, (err) => {
        console.error("Error fetching ride details: ", err);
        setError("Failed to load ride details. Please try again.");
        setIsLoading(false);
      });

      return () => unsubscribe(); // Cleanup listener on component unmount
    } else {
      setError("No ride ID provided.");
      setIsLoading(false);
    }

  }, [rideId, user, authLoading, toast]);


  if (authLoading || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-headline text-destructive flex items-center">
              <AlertTriangle className="mr-3 h-7 w-7" /> Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (!rideDetails) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-muted-foreground py-8">Ride details could not be loaded or ride not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline text-primary">Tracking Ride: #{rideDetails.id.substring(0,8)}...</CardTitle>
          <CardDescription>Current Status: <span className="font-semibold text-primary">{rideDetails.currentStatus}</span></CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Map Placeholder */}
          <div className="aspect-[16/10] w-full bg-muted rounded-lg overflow-hidden border">
            <Image 
              src="https://placehold.co/800x500.png?text=Live+Map+Coming+Soon" 
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
                    <Image src={rideDetails.driverPhotoUrl || "https://placehold.co/64x64.png?text=Driver"} alt={rideDetails.driverName || "Driver"} width={64} height={64} className="rounded-full" data-ai-hint="driver portrait"/>
                    <div>
                        <p className="font-semibold text-lg">{rideDetails.driverName || "Driver (TBD)"}</p>
                        {rideDetails.driverRating && rideDetails.driverRating > 0 ? (
                          <div className="flex items-center text-sm text-muted-foreground">
                              <User className="w-4 h-4 mr-1" /> Rating: {rideDetails.driverRating.toFixed(1)} / 5
                          </div>
                        ) : <p className="text-sm text-muted-foreground">Driver rating not available</p>}
                    </div>
                </div>
                 <div className="flex items-center space-x-4">
                    <Image src={rideDetails.vehicleImage || "https://placehold.co/96x58.png?text=Vehicle"} alt={rideDetails.vehicleName || "Vehicle"} width={96} height={58} className="rounded object-contain" data-ai-hint="vehicle side" />
                    <div>
                        <p className="font-semibold text-lg">{rideDetails.vehicleName || "Vehicle (TBD)"}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                           <Car className="w-4 h-4 mr-1" /> {rideDetails.licensePlate || "PLATE-TBD"}
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
                        <p className="text-lg"><strong className="font-medium">ETA to Pickup:</strong> {rideDetails.etaPickup || "N/A"}</p>
                    </div>
                </CardContent>
            </Card>
             <Card>
                <CardContent className="pt-6">
                    <div className="flex items-center justify-center md:justify-start">
                        <MapPin className="w-6 h-6 mr-2 text-accent" />
                        <p className="text-lg"><strong className="font-medium">ETA to Destination:</strong> {rideDetails.etaDropoff || "N/A"}</p>
                    </div>
                </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4">
            <Button variant="outline" disabled><Phone className="w-4 h-4 mr-0 sm:mr-2" /><span className="hidden sm:inline">Call Driver</span></Button>
            <Button variant="outline" disabled><MessageSquare className="w-4 h-4 mr-0 sm:mr-2" /><span className="hidden sm:inline">Chat</span></Button>
            <Button variant="outline" disabled><Share2 className="w-4 h-4 mr-0 sm:mr-2" /><span className="hidden sm:inline">Share Trip</span></Button>
            <Button variant="destructive" disabled><AlertTriangle className="w-4 h-4 mr-0 sm:mr-2" /><span className="hidden sm:inline">SOS</span></Button>
          </div>
          <div className="text-center">
            <Button variant="link" className="text-primary" disabled>Change Destination?</Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}

    
