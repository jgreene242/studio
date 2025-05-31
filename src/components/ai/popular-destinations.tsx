"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Search, MapPin } from 'lucide-react';
import type { SuggestDestinationsInput, SuggestDestinationsOutput } from '@/ai/flows/suggest-destinations';
import { suggestDestinations } from '@/ai/flows/suggest-destinations'; // Server Action

interface PopularDestinationsProps {
  onDestinationSelect: (destination: string) => void;
}

export default function PopularDestinations({ onDestinationSelect }: PopularDestinationsProps) {
  const [userLocation, setUserLocation] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]); // Placeholder for recent searches

  const handleFetchSuggestions = async () => {
    if (!userLocation) {
      setError("Please enter your current location.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setSuggestions([]);
    try {
      const input: SuggestDestinationsInput = { userLocation, recentSearches };
      const result: SuggestDestinationsOutput = await suggestDestinations(input);
      setSuggestions(result.destinations);
    } catch (e) {
      setError("Failed to fetch suggestions. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Attempt to get current location using browser geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // For simplicity, we're not reverse geocoding here.
          // In a real app, you'd convert lat/lng to a city name.
          // For now, let's use a placeholder if geolocation is available.
          // Or better, let the user know we got their coords.
          // setUserLocation(`Near Lat: ${position.coords.latitude.toFixed(2)}, Lon: ${position.coords.longitude.toFixed(2)}`);
          // To make it more user friendly for the AI, let's keep it empty and prompt user.
        },
        () => {
          // console.warn("Geolocation failed or was denied.");
        }
      );
    }
  }, []);


  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-headline text-xl">Discover Popular Destinations</CardTitle>
        <CardDescription>Enter your location to get AI-powered suggestions.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter your current city or address"
              value={userLocation}
              onChange={(e) => setUserLocation(e.target.value)}
              disabled={isLoading}
            />
            <Button onClick={handleFetchSuggestions} disabled={isLoading || !userLocation}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              <span className="ml-2 hidden sm:inline">Suggest</span>
            </Button>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {suggestions.length > 0 && (
            <div className="space-y-2 pt-4">
              <h4 className="font-semibold">Suggestions:</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {suggestions.map((dest, index) => (
                  <li key={index}>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-left h-auto py-2"
                      onClick={() => onDestinationSelect(dest)}
                    >
                      <MapPin className="h-4 w-4 mr-2 shrink-0 text-accent"/>
                      {dest}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
           {isLoading && !suggestions.length && (
            <div className="flex items-center justify-center py-4">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <p className="ml-2">Finding popular spots...</p>
            </div>
           )}
        </div>
      </CardContent>
    </Card>
  );
}
