
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CarFront, Bus, Diamond, Accessibility, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

interface VehicleOption {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  eta: string;
  fare: string;
  image: string;
  capacity: string;
}

interface VehicleSelectorProps {
  onVehicleSelect: (vehicleId: string) => void;
  vehicleData: Record<string, { fare: string, eta: string, name: string, image: string, capacity?: string, description?: string, icon?: React.ElementType }>;
}

export default function VehicleSelector({ onVehicleSelect, vehicleData }: VehicleSelectorProps) {
  
  const vehicleTypes: VehicleOption[] = Object.entries(vehicleData).map(([id, data]) => ({
    id,
    name: data.name,
    description: data.description || `Ride in a ${data.name.toLowerCase()}`,
    icon: data.icon || (id === 'standard' ? CarFront : id === 'premium' ? Diamond : id === 'van' ? Bus : Accessibility),
    eta: data.eta,
    fare: data.fare,
    image: data.image,
    capacity: data.capacity || (id === 'van' ? '1-6 passengers' : '1-4 passengers'),
  }));
  
  const [selectedVehicle, setSelectedVehicle] = useState<string | undefined>(vehicleTypes[0]?.id);

  const handleSelect = (vehicleId: string) => {
    setSelectedVehicle(vehicleId);
    // onVehicleSelect(vehicleId); // Call onVehicleSelect when main button is clicked
  };
  
  const currentVehicle = vehicleTypes.find(v => v.id === selectedVehicle);

  const handleConfirmSelection = () => {
    if (currentVehicle) {
      onVehicleSelect(currentVehicle.id);
    }
  };


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
                <Image src={vehicle.image} alt={vehicle.name} width={80} height={48} className="rounded mr-4 object-contain" data-ai-hint={`${vehicle.name} side view`} />
                <div>
                  <div className="flex items-center">
                     <vehicle.icon className={`w-5 h-5 mr-2 ${selectedVehicle === vehicle.id ? 'text-primary' : 'text-accent'}`} />
                     <span className="font-semibold">{vehicle.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{vehicle.description}</p>
                  <p className="text-xs text-muted-foreground">{vehicle.capacity}</p>
                </div>
              </div>
              <div className="flex flex-col items-start sm:items-end text-sm w-full sm:w-auto mt-2 sm:mt-0 border-t sm:border-t-0 pt-2 sm:pt-0 pl-0 sm:pl-4">
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
                onClick={handleConfirmSelection}
                className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={!selectedVehicle}
            >
                Confirm {currentVehicle.name} & Proceed
            </Button>
        )}
      </CardContent>
    </Card>
  );
}

