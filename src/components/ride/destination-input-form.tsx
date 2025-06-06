
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PopularDestinations from '@/components/ai/popular-destinations';
import GoogleMapDisplay from '@/components/maps/google-map-display'; // Import the new map component
import { Search, LocateFixed, XCircle } from 'lucide-react';


interface DestinationInputFormProps {
  onDestinationSet: (pickup: string, destination: string) => void;
}

export default function DestinationInputForm({ onDestinationSet }: DestinationInputFormProps) {
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [showAISuggestions, setShowAISuggestions] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 20, lng: 0 }); // Default center
  const [mapZoom, setMapZoom] = useState(2); // Default zoom

  const handleAISuggestionSelect = (selectedDestination: string) => {
    setDestination(selectedDestination);
    setShowAISuggestions(false);
    // Potentially update map center based on selected destination (requires geocoding)
  };

  const detectCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setPickupLocation(`Current Location (Lat: ${lat.toFixed(3)}, Lng: ${lng.toFixed(3)})`);
          setMapCenter({ lat, lng });
          setMapZoom(12); // Zoom in when location is detected
        },
        (error) => {
          console.error("Error getting location: ", error);
          alert("Could not detect your location. Please enter it manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    // Optionally auto-detect location on component mount
    // detectCurrentLocation();
  }, []);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pickupLocation && destination) {
      onDestinationSet(pickupLocation, destination);
    } else {
      alert("Please set both pickup and destination locations.");
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-headline text-primary">Where to?</CardTitle>
        <CardDescription>Enter your pickup and drop-off locations.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="pickup">Pickup Location</Label>
            <div className="flex items-center gap-2">
              <Input
                id="pickup"
                placeholder="Enter pickup address or use current location"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                required
              />
              {pickupLocation && (
                <Button type="button" variant="ghost" size="icon" onClick={() => setPickupLocation('')} aria-label="Clear pickup location">
                  <XCircle className="h-4 w-4 text-muted-foreground"/>
                </Button>
              )}
              <Button type="button" variant="outline" size="icon" onClick={detectCurrentLocation} aria-label="Detect current location">
                <LocateFixed className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="destination">Destination</Label>
            <div className="flex items-center gap-2">
              <Input
                id="destination"
                placeholder="Enter destination address"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
              />
              {destination && (
                <Button type="button" variant="ghost" size="icon" onClick={() => setDestination('')} aria-label="Clear destination">
                  <XCircle className="h-4 w-4 text-muted-foreground"/>
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Button type="button" variant="link" className="p-0 h-auto text-primary" onClick={() => setShowAISuggestions(!showAISuggestions)}>
              {showAISuggestions ? 'Hide' : 'Need inspiration?'} Get AI-powered suggestions
            </Button>
            {showAISuggestions && <PopularDestinations onDestinationSelect={handleAISuggestionSelect} />}
          </div>

          <div className="mt-4 space-y-2">
            <Label>Map Preview</Label>
            <div className="w-full bg-muted rounded-md overflow-hidden">
              <GoogleMapDisplay center={mapCenter} zoom={mapZoom} />
            </div>
            <p className="text-xs text-muted-foreground text-center">
              {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? 'Map preview.' : 'Configure Google Maps API Key to see map.'}
            </p>
          </div>


          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            <Search className="mr-2 h-4 w-4" /> Find Rides
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
