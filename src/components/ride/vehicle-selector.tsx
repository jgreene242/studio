"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CarFront, Bus, Diamond, Accessibility, CheckCircle2 } from 'lucide-react'; // Using Diamond for Premium
import Image from 'next/image';

interface Vehicle {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  eta: string;
  fare: string;
  image: string;
  capacity: string;
}

const vehicleTypes: Vehicle[] = [
  { id: 'standard', name: 'Standard Taxi', description: 'Affordable, everyday rides', icon: CarFront, eta: '5-7 min', fare: '$15-20', image: 'https://placehold.co/100x60.png?text=Standard', capacity: '1-4 passengers' },
  { id: 'premium', name: 'Premium Taxi', description: 'Luxury vehicles for a comfortable ride', icon: Diamond, eta: '8-10 min', fare: '$25-35', image: 'https://placehold.co/100x60.png?text=Premium', capacity: '1-4 passengers' },
  { id: 'van', name: 'Taxi Van', description: 'For larger groups or more luggage', icon: Bus, eta: '10-15 min', fare: '$30-45', image: 'https://placehold.co/100x60.png?text=Van', capacity: '1-6 passengers' },
  { id: 'accessible', name: 'Accessible Taxi', description: 'Wheelchair accessible vehicles', icon: Accessibility, eta: '12-18 min', fare: '$20-28', image: 'https://placehold.co/100x60.png?text=Accessible', capacity: '1-2 passengers + wheelchair' },
];

interface VehicleSelectorProps {
  onVehicleSelect: (vehicleId: string) => void;
}

export default function VehicleSelector({ onVehicleSelect }: VehicleSelectorProps) {
  const [selectedVehicle, setSelectedVehicle] = useState<string | undefined>(vehicleTypes[0]?.id);

  const handleSelect = (vehicleId: string) => {
    setSelectedVehicle(vehicleId);
    onVehicleSelect(vehicleId);
  };
  
  const currentVehicle = vehicleTypes.find(v => v.id === selectedVehicle);

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-headline text-primary">Choose Your Ride</CardTitle>
        <CardDescription>Select a vehicle type that suits your needs.</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedVehicle} onValueChange={handleSelect} className="space-y-4">
          {vehicleTypes.map((vehicle) => (
            <Label 
              key={vehicle.id}
              htmlFor={vehicle.id}
              className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${
                selectedVehicle === vehicle.id ? 'border-primary ring-2 ring-primary shadow-md' : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-center mb-2 sm:mb-0">
                <Image src={vehicle.image} alt={vehicle.name} width={80} height={48} className="rounded mr-4 object-contain" data-ai-hint={`${vehicle.name} car`}/>
                <div>
                  <div className="flex items-center">
                     <vehicle.icon className={`w-5 h-5 mr-2 ${selectedVehicle === vehicle.id ? 'text-primary' : 'text-accent'}`} />
                     <span className="font-semibold">{vehicle.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{vehicle.description}</p>
                  <p className="text-xs text-muted-foreground">{vehicle.capacity}</p>
                </div>
              </div>
              <div className="flex flex-col items-start sm:items-end text-sm w-full sm:w-auto mt-2 sm:mt-0 border-t sm:border-t-0 pt-2 sm:pt-0">
                <p className="font-medium">{vehicle.fare}</p>
                <p className="text-xs text-muted-foreground">ETA: {vehicle.eta}</p>
              </div>
              <RadioGroupItem value={vehicle.id} id={vehicle.id} className="sr-only" />
              {selectedVehicle === vehicle.id && <CheckCircle2 className="w-5 h-5 text-primary absolute top-2 right-2 sm:static sm:ml-4 shrink-0" />}
            </Label>
          ))}
        </RadioGroup>

        {currentVehicle && (
            <Button 
                onClick={() => onVehicleSelect(currentVehicle.id)} 
                className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={!selectedVehicle}
            >
                Confirm {currentVehicle.name}
            </Button>
        )}
      </CardContent>
    </Card>
  );
}
