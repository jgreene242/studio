"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Image from 'next/image';
import { MapPin, CalendarDays, DollarSign, Star, User, Car, ThumbsUp, MessageCircle } from "lucide-react";
import Link from "next/link";

// Placeholder for params type
interface RideSummaryPageProps {
  params: { rideId: string };
}

export default function RideSummaryPage({ params }: RideSummaryPageProps) {
  const { rideId } = params;
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  // Placeholder data
  const rideDetails = {
    date: "October 27, 2023, 11:45 AM",
    pickup: "123 Main St, Anytown, USA",
    dropoff: "789 Oak Ave, Anytown, USA",
    fare: "$23.50",
    paymentMethod: "Visa **** 1234",
    driverName: "Jane Doe",
    vehicleModel: "Honda Civic",
    licensePlate: "ABC 789",
    driverPhotoUrl: "https://placehold.co/80x80.png",
    vehiclePhotoUrl: "https://placehold.co/120x72.png"
  };
  
  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const submitFeedback = () => {
    // TODO: Submit rating and feedback
    console.log({ rideId, rating, feedback });
    alert("Thank you for your feedback!");
    // Optionally redirect or update UI
  };


  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline text-primary">Ride Summary #{rideId}</CardTitle>
          <CardDescription>Here are the details of your completed trip.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                 <div className="flex items-center space-x-4">
                    <Image src={rideDetails.driverPhotoUrl} alt={rideDetails.driverName} width={64} height={64} className="rounded-full" data-ai-hint="driver portrait"/>
                    <div>
                        <p className="font-semibold text-lg">{rideDetails.driverName}</p>
                        <p className="text-sm text-muted-foreground">{rideDetails.vehicleModel} ({rideDetails.licensePlate})</p>
                    </div>
                </div>
                <Image src={rideDetails.vehiclePhotoUrl} alt="Vehicle" width={120} height={72} className="rounded-md object-cover mx-auto md:mx-0 md:ml-auto" data-ai-hint="car side view"/>
            </div>

            <div className="space-y-2 border-t pt-4">
                 <div className="flex items-center">
                    <CalendarDays className="w-5 h-5 mr-3 text-accent" />
                    <span>{rideDetails.date}</span>
                 </div>
                 <div className="flex items-start">
                    <MapPin className="w-5 h-5 mr-3 text-accent mt-1 shrink-0" />
                    <div>
                        <p><strong className="font-medium">From:</strong> {rideDetails.pickup}</p>
                        <p><strong className="font-medium">To:</strong> {rideDetails.dropoff}</p>
                    </div>
                 </div>
                 <div className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-3 text-accent" />
                    <span className="text-xl font-bold">{rideDetails.fare}</span>
                    <span className="text-sm text-muted-foreground ml-2">(Paid with {rideDetails.paymentMethod})</span>
                 </div>
            </div>
        </CardContent>
      </Card>

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
                <Link href="/support?issue=lost_item&rideId={rideId}">
                    <MessageCircle className="w-4 h-4 mr-2"/> Report Lost Item
                </Link>
            </Button>
             <Button variant="link" asChild className="text-muted-foreground">
                <Link href="/history">View All Ride History</Link>
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
