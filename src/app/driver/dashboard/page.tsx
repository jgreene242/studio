import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { TrendingUp, ListChecks, MessageSquareWarning } from "lucide-react";

export default function DriverDashboardPage() {
  // Placeholder states
  const isOnline = true; // Driver's current availability status
  const currentRide = null; // Or an object with ride details if on a trip
  const pendingRequests = 2; // Number of pending ride requests

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-headline">Driver Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Switch id="availability-toggle" checked={isOnline} />
          <Label htmlFor="availability-toggle" className={isOnline ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
            {isOnline ? "Online - Accepting Rides" : "Offline"}
          </Label>
        </div>
      </div>

      {currentRide ? (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-700">Current Ride In Progress</CardTitle>
            {/* <CardDescription>To: {currentRide.destination}</CardDescription> */}
          </CardHeader>
          <CardContent>
            <p>Details about the current ongoing ride...</p>
            <Button className="mt-2 bg-blue-600 hover:bg-blue-700">View Ride Details</Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No Active Ride</CardTitle>
            <CardDescription>You are currently not on a trip. New requests will appear here.</CardDescription>
          </CardHeader>
          {isOnline && pendingRequests > 0 && (
             <CardContent>
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md">
                    <div className="flex items-center">
                        <MessageSquareWarning className="w-6 h-6 mr-3 text-yellow-600"/>
                        <div>
                            <p className="font-semibold text-yellow-700">{pendingRequests} New Ride Request(s)!</p>
                            <Button variant="link" className="p-0 h-auto text-yellow-700 hover:text-yellow-800">View Requests</Button>
                        </div>
                    </div>
                </div>
             </CardContent>
          )}
           {isOnline && pendingRequests === 0 && (
             <CardContent>
                <p className="text-muted-foreground">Waiting for new ride requests...</p>
             </CardContent>
          )}
        </Card>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Earnings</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$125.50</div>
            <p className="text-xs text-muted-foreground">+15% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Trips (Today)</CardTitle>
            <ListChecks className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">2 more than yesterday</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.85 / 5</div>
            <p className="text-xs text-muted-foreground">Based on 120 ratings</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Placeholder for quick actions or map view */}
       <Card>
          <CardHeader>
            <CardTitle>Quick View</CardTitle>
          </CardHeader>
          <CardContent className="h-64 bg-muted rounded-md flex items-center justify-center">
            <p className="text-muted-foreground">Map overview or important alerts will appear here.</p>
          </CardContent>
        </Card>

    </div>
  );
}

// Dummy Star icon if not imported from lucide
const Star = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || "w-5 h-5"}>
    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354l-4.557 2.479c-.996.608-2.231-.289-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z" clipRule="evenodd" />
  </svg>
);
