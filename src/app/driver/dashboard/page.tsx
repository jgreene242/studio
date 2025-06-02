
"use client"; // Added "use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ListChecks, Map, BarChart3, DollarSign, AlertTriangle, Settings, LogOut, Loader2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext"; // Assuming drivers use the same AuthContext for now
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Placeholder for actual driver data and ride requests
const mockRideRequests = [
  { id: "req1", passengerName: "Alice", pickup: "123 Main St", destination: "456 Oak Ave", fare: "$15.00", etaToPickup: "5 min" },
  { id: "req2", passengerName: "Bob", pickup: "789 Pine Ln", destination: "101 Maple Dr", fare: "$22.50", etaToPickup: "8 min" },
];

export default function DriverDashboardPage() {
  const { user, appSignOut, initialLoading: authLoading } = useAuth(); // Using passenger auth for now
  const router = useRouter();
  const [isOnline, setIsOnline] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // For actions like going online/offline

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login?role=driver'); // Redirect to login if not authenticated
    }
    // TODO: Add logic to check if user has a 'driver' role.
    // If not, redirect to passenger dashboard or an error page.
    // For now, we assume any logged-in user can see this for demo.
  }, [user, authLoading, router]);

  const handleToggleOnline = async () => {
    setIsLoading(true);
    // TODO: Implement API call to update driver status in Firestore
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    setIsOnline(!isOnline);
    setIsLoading(false);
  };
  
  const handleAcceptRide = (rideId: string) => {
    // TODO: Implement logic to accept ride
    console.log("Accepted ride:", rideId);
    // Navigate to ride tracking/navigation page for driver
  }

  if (authLoading || !user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-headline text-primary">Driver Dashboard</CardTitle>
            <CardDescription>Manage your rides and availability.</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="online-status"
              checked={isOnline}
              onCheckedChange={handleToggleOnline}
              disabled={isLoading}
              aria-label="Toggle online status"
            />
            <Label htmlFor="online-status" className={isOnline ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin inline-block mr-1"/> : null}
              {isOnline ? "Online" : "Offline"}
            </Label>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Welcome, {user.displayName || user.email}! Ready to hit the road?</p>
        </CardContent>
      </Card>

      {isOnline && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-headline flex items-center"><ListChecks className="mr-2 h-5 w-5 text-accent"/>Incoming Ride Requests</CardTitle>
            <CardDescription>Review and accept new ride offers.</CardDescription>
          </CardHeader>
          <CardContent>
            {mockRideRequests.length > 0 ? (
              <div className="space-y-4">
                {mockRideRequests.map((req) => (
                  <Card key={req.id} className="p-4 border rounded-lg">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                      <div>
                        <p className="font-semibold">{req.passengerName}</p>
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium">From:</span> {req.pickup}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium">To:</span> {req.destination}
                        </p>
                      </div>
                      <div className="mt-2 sm:mt-0 text-left sm:text-right">
                        <p className="text-lg font-bold text-primary">{req.fare}</p>
                        <p className="text-xs text-muted-foreground">ETA to pickup: {req.etaToPickup}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                        <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => handleAcceptRide(req.id)}>Accept</Button>
                        <Button variant="outline" className="flex-1">Decline</Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">No new ride requests at the moment. Stay tuned!</p>
            )}
          </CardContent>
        </Card>
      )}
      
      {!isOnline && (
         <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="text-xl font-headline">You are Offline</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground text-center py-6">Toggle the switch above to go online and start receiving ride requests.</p>
            </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-headline flex items-center"><DollarSign className="mr-2 h-5 w-5 text-accent"/>Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$0.00 <span className="text-sm font-normal text-muted-foreground">(Today)</span></p>
            {/* Placeholder for earnings chart or summary */}
            <Button variant="link" className="p-0 mt-2 text-primary" asChild><Link href="/driver/earnings">View Detailed Earnings</Link></Button>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-headline flex items-center"><Map className="mr-2 h-5 w-5 text-accent"/>Current Trip</CardTitle>
          </CardHeader>
          <CardContent>
            {isOnline ? (
                <p className="text-muted-foreground">No active trip. Waiting for requests...</p>
            ) : (
                 <p className="text-muted-foreground">You are currently offline.</p>
            )}
            {/* Placeholder for current trip details or map snippet */}
             {/* <Button variant="link" className="p-0 mt-2 text-primary">View Active Trip Details</Button> */}
          </CardContent>
        </Card>
      </div>
      
      <Card className="shadow-md">
        <CardHeader>
            <CardTitle className="text-lg font-headline flex items-center"><Settings className="mr-2 h-5 w-5 text-accent"/>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Button variant="outline" asChild><Link href="/driver/history" className="flex-col h-auto py-3"><ListChecks className="mb-1"/>Trip History</Link></Button>
            <Button variant="outline" asChild><Link href="/driver/vehicle" className="flex-col h-auto py-3"><Car className="mb-1"/>My Vehicle</Link></Button>
            <Button variant="outline" asChild><Link href="/driver/profile" className="flex-col h-auto py-3"><User className="mb-1"/>Profile</Link></Button>
            <Button variant="outline" asChild><Link href="/driver/support" className="flex-col h-auto py-3"><AlertTriangle className="mb-1"/>Support</Link></Button>
            <Button variant="outline" onClick={() => appSignOut().then(() => router.push('/'))} className="flex-col h-auto py-3 text-destructive hover:bg-destructive/10 border-destructive/50 hover:text-destructive">
                <LogOut className="mb-1"/>Sign Out
            </Button>
        </CardContent>
      </Card>

    </div>
  );
}

    