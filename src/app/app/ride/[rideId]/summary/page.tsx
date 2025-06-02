
"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; import { Label } from "@/components/ui/label";import Link from 'next/link';
import Image from 'next/image';
import { MapPin, CalendarDays, DollarSign, Star, ThumbsUp, MessageCircle, Loader2, AlertTriangle } from "lucide-react";
import { doc, getDoc, updateDoc, Timestamp, serverTimestamp } from 'firebase/firestore';
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
  driverName?: string;
  driverPhotoUrl?: string;
  vehicleModel?: string;
  status?: string;
  passengerRating?: number;
  passengerFeedback?: string;
}

export default function RideSummaryPage() {
  const params = useParams();
  const rideId = params.rideId as string;

  const [rideDetails, setRideDetails] = useState<RideDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false);

  const { user, initialLoading: authLoading } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
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
            const rideData = rideDoc.data();
            if (rideData.passengerId !== user.uid) {
              setError("You are not authorized to view this ride summary.");
              setRideDetails(null);
            } else {
              const details = { id: rideDoc.id, ...rideData } as RideDetails;
              setRideDetails(details);
              if (details.passengerRating) {
                setRating(details.passengerRating);
                setFeedback(details.passengerFeedback || "");
                setIsFeedbackSubmitted(true);
              }
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
  }, [rideId, user, authLoading]);

  const handleRating = (rate: number) => {
    if (isFeedbackSubmitted) return;
    setRating(rate);
  };

  const submitFeedback = async () => {
    if (!rideDetails || !user || rating === 0) {
      toast({ variant: "destructive", title: "Error", description: "Please select a rating to submit feedback." });
      return;
    }
    setIsSubmittingFeedback(true);
    try {
      const rideDocRef = doc(db, "rides", rideDetails.id);
      await updateDoc(rideDocRef, {
        passengerRating: rating,
        passengerFeedback: feedback,
        passengerFeedbackAt: serverTimestamp()
      });
      toast({ title: "Feedback Submitted!", description: "Thank you for your feedback." });
      setIsFeedbackSubmitted(true);
    } catch (error) {
        console.error("Error submitting feedback:", error);
        toast({variant: "destructive", title: "Submission Failed", description: "Could not submit your feedback. Please try again."});
    } finally {
        setIsSubmittingFeedback(false);
    }
  };

  const formatDate = (timestamp: Timestamp | undefined) => {
    if (!timestamp) return 'N/A';
    return format(timestamp.toDate(), "PPpp");
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
          <CardTitle className="text-2xl font-headline text-primary">Ride Summary #{rideDetails.id.substring(0, 8)}...</CardTitle>
          <CardDescription>Here are the details of your {rideDetails.status === 'completed' ? 'completed' : 'ongoing'} trip.</CardDescription>
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
              data-ai-hint="vehicle side"
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
              <p className="text-sm">Status: <span className="capitalize font-medium text-primary">{rideDetails.status}</span></p>
            }
          </div>
        </CardContent>
      </Card>

      {rideDetails.status === 'completed' && (
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl font-headline">{isFeedbackSubmitted ? "Your Feedback" : "Rate Your Driver"}</CardTitle>
            <CardDescription>{isFeedbackSubmitted ? "You have already submitted feedback for this ride." : "Your feedback helps us improve."}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Button
                  key={star}
                  variant={rating >= star ? "default" : "outline"}
                  size="icon"
                  onClick={() => handleRating(star)}
                  disabled={isFeedbackSubmitted || isSubmittingFeedback}
                  className={`${rating >= star ? "bg-accent text-accent-foreground border-accent hover:bg-accent/90" : ""} ${isFeedbackSubmitted ? "cursor-default" : ""}`}
                >
                  <Star className={`w-6 h-6 ${rating >= star ? 'fill-current' : ''}`} />
                </Button>
              ))}
            </div>
            <div>
              <Label htmlFor="feedback" className="mb-1 block">Comments</Label>
              <Textarea
                id="feedback"
                placeholder={isFeedbackSubmitted ? "You can no longer edit comments." : "Tell us about your experience..."}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={3}
                disabled={isFeedbackSubmitted || isSubmittingFeedback}
              />
            </div>
            {!isFeedbackSubmitted && (
                <Button 
                    onClick={submitFeedback} 
                    disabled={rating === 0 || isSubmittingFeedback || isFeedbackSubmitted} 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                {isSubmittingFeedback ? <Loader2 className="w-4 h-4 mr-2 animate-spin"/> : <ThumbsUp className="w-4 h-4 mr-2"/>}
                {isSubmittingFeedback ? "Submitting..." : "Submit Feedback"}
                </Button>
            )}
          </CardContent>
          <CardFooter className="flex-col items-stretch gap-2 text-sm">
            <Button variant="outline" asChild>
              <Link href={`/app/support?issue=ride_problem&rideId=${rideDetails.id}`}>
                <MessageCircle className="w-4 h-4 mr-2" /> Report an Issue with this Ride
              </Link>
            </Button>
            <Button variant="link" asChild className="text-muted-foreground">
              <Link href="/app/history">View All Ride History</Link>
            </Button>
          </CardFooter>
        </Card>
      )}
       {rideDetails.status !== 'completed' && (
         <CardFooter className="flex-col items-stretch gap-2 text-sm">
             <Button variant="outline" asChild>
                  <Link href={`/app/support?issue=current_ride_issue&rideId=${rideDetails.id}`}>
                      <MessageCircle className="w-4 h-4 mr-2"/> Contact Support About This Ride
                  </Link>
              </Button>
              <Button variant="link" asChild className="text-muted-foreground">
                  <Link href="/app/history">View All Ride History</Link>
              </Button>
          </CardFooter>
       )}
    </div>
  );
}

