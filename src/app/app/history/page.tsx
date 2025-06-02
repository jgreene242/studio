
"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, getDocs, Timestamp} from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from '@/components/ui/button';
import { MapPin, CalendarDays, DollarSign, Star, Loader2, AlertTriangle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { format } from 'date-fns';

interface RideDoc {
  id: string;
  passengerId: string;
  pickupLocation: string;
  destinationLocation: string;
  vehicleId: string;
  vehicleName: string;
  vehicleImage: string;
  fare: string;
  eta?: string;
  status: string;
  createdAt: Timestamp; // Firestore Timestamp
  driverId?: string;
  driverName?: string;
  driverRating?: number; // Passenger's rating for this ride
  passengerName?: string;
}

export default function RideHistoryPage() {
  const { user, initialLoading: authLoading } = useAuth();
  const [rides, setRides] = useState<RideDoc[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) {
      // Wait for auth state to be determined
      return;
    }
    if (!user) {
      setIsLoading(false);
      // Optionally redirect to login or show a message
      // setError("Please log in to view your ride history.");
      return;
    }

    const fetchRides = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const ridesRef = collection(db, "rides");
        const q = query(
          ridesRef,
          where("passengerId", "==", user.uid),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const fetchedRides = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as RideDoc));
        setRides(fetchedRides);
      } catch (e) {
        console.error("Error fetching ride history: ", e);
        setError("Failed to load ride history. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRides();
  }, [user, authLoading]);

  const formatDate = (timestamp: Timestamp | undefined) => {
    if (!timestamp) return 'N/A';
    return format(timestamp.toDate(), "PPpp"); // e.g., Oct 26, 2023, 10:30:00 AM
  };

  if (authLoading || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
        <div className="max-w-3xl mx-auto">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-headline text-primary">Ride History</CardTitle>
                    <CardDescription>Review your past trips and details.</CardDescription>
                </CardHeader>
                <CardContent className="text-center py-8">
                     <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" />
                    <p className="text-destructive font-semibold">{error}</p>
                     <Button onClick={() => window.location.reload()} className="mt-4">Try Again</Button>
                </CardContent>
            </Card>
      </div>
    );
  }
  
  if (!user && !authLoading) {
     return (
        <div className="max-w-3xl mx-auto">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-headline text-primary">Ride History</CardTitle>
                </CardHeader>
                <CardContent className="text-center py-8">
                    <p className="text-muted-foreground">Please <Link href="/auth/login" className="text-primary hover:underline">log in</Link> to view your ride history.</p>
                </CardContent>
            </Card>
        </div>
    );
  }


  return (
    <div className="max-w-3xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-headline text-primary">Ride History</CardTitle>
          <CardDescription>Review your past trips and details.</CardDescription>
        </CardHeader>
        <CardContent>
          {rides.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">You have no past rides.</p>
          ) : (
            <ScrollArea className="h-[60vh] pr-4"> {/* Added pr-4 for scrollbar spacing */}
              <div className="space-y-6">
                {rides.map((ride, index) => (
                  <div key={ride.id}>
                    <Card className="overflow-hidden hover:shadow-md transition-shadow">
                        <Link href={`/app/ride/${ride.id}/summary`} className="block">
                            <CardContent className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4 items-center">
                                <div className="flex md:flex-col items-center md:items-start md:justify-center md:border-r md:pr-6 mr-0 md:mr-4">
                                <Image 
                                    src={ride.vehicleImage || "https://placehold.co/80x48.png?text=Taxi"} 
                                    alt={ride.vehicleName || "Taxi"} 
                                    width={80} 
                                    height={48} 
                                    className="rounded object-contain mb-2 md:mb-0" 
                                    data-ai-hint={`${ride.vehicleName || "taxi"} side view`} 
                                />
                                <div className="ml-4 md:ml-0 md:mt-2 text-center md:text-left">
                                    <p className="text-sm font-medium">{ride.vehicleName}</p>
                                    {ride.driverName && <p className="text-xs text-muted-foreground">{ride.driverName}</p>}
                                    {ride.driverRating && ( // This would be rating given by passenger for this ride
                                        <div className="flex items-center text-xs text-muted-foreground">
                                        <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" /> {ride.driverRating}/5
                                        </div>
                                    )}
                                </div>
                                </div>
                                <div className="space-y-2">
                                <div className="flex items-center text-sm">
                                    <CalendarDays className="w-4 h-4 mr-2 text-accent" />
                                    <span>{formatDate(ride.createdAt)}</span>
                                </div>
                                <div className="flex items-start text-sm">
                                    <MapPin className="w-4 h-4 mr-2 mt-0.5 text-accent shrink-0" />
                                    <div>
                                        <span className="font-medium">From:</span> {ride.pickupLocation}<br/>
                                        <span className="font-medium">To:</span> {ride.destinationLocation}
                                    </div>
                                </div>
                                <div className="flex items-center text-sm pt-1">
                                    <DollarSign className="w-4 h-4 mr-2 text-accent" />
                                    <span className="font-semibold text-lg">{ride.fare}</span>
                                    <span className="capitalize text-xs text-muted-foreground ml-auto bg-primary/10 px-2 py-0.5 rounded-full">{ride.status}</span>
                                </div>
                                </div>
                            </CardContent>
                        </Link>
                    </Card>
                    {index < rides.length - 1 && <Separator className="my-6" />}
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

