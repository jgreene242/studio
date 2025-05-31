import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { MapPin, CalendarDays, DollarSign, Star, Car } from "lucide-react";
import Image from "next/image";

// Placeholder data type
interface Ride {
  id: string;
  date: string;
  pickup: string;
  dropoff: string;
  fare: string;
  vehicleType: string;
  driverName: string;
  driverRating?: number; // Optional
  vehicleImage: string;
}

// Placeholder ride history data
const rideHistory: Ride[] = [
  {
    id: '1',
    date: '2023-10-26, 10:30 AM',
    pickup: '123 Main St, Anytown',
    dropoff: '456 Oak Ave, Anytown',
    fare: '$18.50',
    vehicleType: 'Standard Taxi',
    driverName: 'John D.',
    driverRating: 5,
    vehicleImage: "https://placehold.co/80x48.png?text=Taxi1"
  },
  {
    id: '2',
    date: '2023-10-24, 06:15 PM',
    pickup: '789 Pine Ln, Anytown',
    dropoff: '101 Maple Dr, Anytown',
    fare: '$22.00',
    vehicleType: 'Premium Taxi',
    driverName: 'Sarah K.',
    vehicleImage: "https://placehold.co/80x48.png?text=Taxi2"

  },
  {
    id: '3',
    date: '2023-10-22, 09:00 AM',
    pickup: '234 Elm Rd, Anytown',
    dropoff: '567 Birch Ct, Anytown',
    fare: '$15.75',
    vehicleType: 'Taxi Van',
    driverName: 'Mike B.',
    driverRating: 4,
    vehicleImage: "https://placehold.co/80x48.png?text=Van1"
  },
];

export default function RideHistoryPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-headline text-primary">Ride History</CardTitle>
          <CardDescription>Review your past trips and details.</CardDescription>
        </CardHeader>
        <CardContent>
          {rideHistory.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">You have no past rides.</p>
          ) : (
            <ScrollArea className="h-[60vh]">
              <div className="space-y-6">
                {rideHistory.map((ride, index) => (
                  <div key={ride.id}>
                    <Card className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4">
                        <div className="flex md:flex-col items-center md:items-start md:justify-center md:border-r md:pr-6 mr-4">
                           <Image src={ride.vehicleImage} alt={ride.vehicleType} width={80} height={48} className="rounded object-contain mb-2 md:mb-0" data-ai-hint={`${ride.vehicleType} side view`} />
                           <div className="ml-4 md:ml-0 md:mt-2 text-center md:text-left">
                            <p className="text-sm font-medium">{ride.vehicleType}</p>
                            <p className="text-xs text-muted-foreground">{ride.driverName}</p>
                            {ride.driverRating && (
                                <div className="flex items-center text-xs text-muted-foreground">
                                <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" /> {ride.driverRating}/5
                                </div>
                            )}
                           </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <CalendarDays className="w-4 h-4 mr-2 text-accent" />
                            <span>{ride.date}</span>
                          </div>
                          <div className="flex items-start text-sm">
                            <MapPin className="w-4 h-4 mr-2 mt-0.5 text-accent shrink-0" />
                            <div>
                                <span className="font-medium">From:</span> {ride.pickup}<br/>
                                <span className="font-medium">To:</span> {ride.dropoff}
                            </div>
                          </div>
                           <div className="flex items-center text-sm pt-1">
                            <DollarSign className="w-4 h-4 mr-2 text-accent" />
                            <span className="font-semibold text-lg">{ride.fare}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    {index < rideHistory.length - 1 && <Separator className="my-6" />}
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
