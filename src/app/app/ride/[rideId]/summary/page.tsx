
"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Kept for feedback if needed
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Image from 'next/image';
import { MapPin, CalendarDays, DollarSign, Star, User, Car, ThumbsUp, MessageCircle, Loader2, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { doc, getDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface RideDetails {
  id: string;
  pickupLocation: string;
  destinationLocation: string;
  fare: string;
  createdAt: Timestamp;
  vehicleName: string;
  vehicleImage: string;
  // Optional fields that might be populated later or from a driver document
  driverName?: string; 
  driverPhotoUrl?: string;
  vehicleModel?: string; 
  licensePlate?: string;
  paymentMethod?: string; // Assuming this might be added later
  status?: string;
}

export default function RideSummaryPage() {
  const params = useParams();
  const rideId = params.rideId as string;
  
  const [rideDetails, setRideDetails] = useState<RideDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const { user, initialLoading: authLoading } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      // Redirect or show login prompt if user not authenticated
      setError("Please log in to view ride details.");
      setIsLoading(false);
      return;
    }

    if (rideId) {
      const fetchRideDetails = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const rideDocRef = doc(db, "rides", rideId);
          const rideDoc = await getDoc(rideDocRef);

          if (rideDoc.exists()) {
            // Basic security check: ensure the logged-in user is the passenger for this ride
            if (rideDoc.data().passengerId !== user.uid) {
                setError("You are not authorized to view this ride summary.");
                setRideDetails(null);
            } else {
                setRideDetails({ id: rideDoc.id, ...rideDoc.data() } as RideDetails);
            }
          } else {
            setError("Ride not found.");
            setRideDetails(null);
          }
        } catch (e) {
          console.error("Error fetching ride details: ", e);
          setError("Failed to load ride details. Please try again.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchRideDetails();
    }
  }, [rideId, user, authLoading, toast]);

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const submitFeedback = async () => {
    if (!rideDetails || !user) {
        toast({variant: "destructive", title: "Error", description: "Cannot submit feedback."})
        return;
    }
    // TODO: Implement feedback submission to Firestore
    // e.g., update the ride document or create a new feedback document
    console.log({ rideId: rideDetails.id, passengerId: user.uid, rating, feedback });
    toast({ title: "Feedback Submitted!", description: "Thank you for your feedback."});
    // Optionally disable feedback form or show a success message in place
  };

  const formatDate = (timestamp: Timestamp | undefined) => {
    if (!timestamp) return 'N/A';
    return format(timestamp.toDate(), "PPpp 'UTC'"); // e.g., Oct 26, 2023, 10:30:00 AM UTC
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
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-headline text-destructive flex items-center">
              <AlertTriangle className="mr-3 h-7 w-7" /> Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
            <Button asChild className="mt-4">
              <Link href="/app/history">Go to Ride History</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!rideDetails) {
    // Should be caught by error state, but as a fallback
    return (
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-muted-foreground">Ride details could not be loaded.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline text-primary">Ride Summary #{rideDetails.id.substring(0,8)}...</CardTitle>
          <CardDescription>Here are the details of your completed trip.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                 <div className="flex items-center space-x-4">
                    <Image 
                        src={rideDetails.driverPhotoUrl || "https://placehold.co/64x64.png?text=Driver"} 
                        alt={rideDetails.driverName || "Driver"} 
                        width={64} height={64} 
                        className="rounded-full" 
                        data-ai-hint="driver portrait"
                    />
                    <div>
                        <p className="font-semibold text-lg">{rideDetails.driverName || "Driver (TBD)"}</p>
                        <p className="text-sm text-muted-foreground">
                            {rideDetails.vehicleModel || rideDetails.vehicleName || "Vehicle (TBD)"} 
                            {rideDetails.licensePlate && ` (${rideDetails.licensePlate})`}
                        </p>
                    </div>
                </div>
                <Image 
                    src={rideDetails.vehicleImage || "https://placehold.co/120x72.png?text=Vehicle"} 
                    alt={rideDetails.vehicleName || "Vehicle"} 
                    width={120} height={72} 
                    className="rounded-md object-contain mx-auto md:mx-0 md:ml-auto" 
                    data-ai-hint={`${rideDetails.vehicleName || "car"} side view`}
                />
            </div>

            <div className="space-y-2 border-t pt-4">
                 <div className="flex items-center">
                    <CalendarDays className="w-5 h-5 mr-3 text-accent" />
                    <span>{formatDate(rideDetails.createdAt)}</span>
                 </div>
                 <div className="flex items-start">
                    <MapPin className="w-5 h-5 mr-3 text-accent mt-1 shrink-0" />
                    <div>
                        <p><strong className="font-medium">From:</strong> {rideDetails.pickupLocation}</p>
                        <p><strong className="font-medium">To:</strong> {rideDetails.destinationLocation}</p>
                    </div>
                 </div>
                 <div className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-3 text-accent" />
                    <span className="text-xl font-bold">{rideDetails.fare}</span>
                    {rideDetails.paymentMethod && 
                        <span className="text-sm text-muted-foreground ml-2">(Paid with {rideDetails.paymentMethod})</span>
                    }
                 </div>
                  {rideDetails.status && 
                    <p className="text-sm text-muted-foreground">Status: <span className="capitalize font-medium">{rideDetails.status}</span></p>
                  }
            </div>
        </CardContent>
      </Card>

      {rideDetails.status === 'completed' && ( // Only show feedback for completed rides
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl font-headline">Rate Your Driver</CardTitle>
            <CardDescription>Your feedback helps us improve.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Button
                  key={star}
                  variant={rating >= star ? "default" : "outline"}
                  size="icon"
                  onClick={() => handleRating(star)}
                  className={rating >= star ? "bg-accent text-accent-foreground border-accent hover:bg-accent/90" : ""}
                >
                  <Star className={`w-6 h-6 ${rating >= star ? 'fill-current' : ''}`} />
                </Button>
              ))}
            </div>
            <div>
              <Label htmlFor="feedback" className="mb-1 block">Comments (Optional)</Label>
              <Textarea
                id="feedback"
                placeholder="Tell us about your experience..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={3}
              />
            </div>
            <Button onClick={submitFeedback} disabled={rating === 0} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              <ThumbsUp className="w-4 h-4 mr-2"/> Submit Feedback
            </Button>
          </CardContent>
           <CardFooter className="flex-col items-stretch gap-2 text-sm">
              <Button variant="outline" asChild>
                  <Link href={`/app/support?issue=lost_item&rideId=${rideDetails.id}`}>
                      <MessageCircle className="w-4 h-4 mr-2"/> Report Lost Item
                  </Link>
              </Button>
              <Button variant="link" asChild className="text-muted-foreground">
                  <Link href="/app/history">View All Ride History</Link>
              </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}

    