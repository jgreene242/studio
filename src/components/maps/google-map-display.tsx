
"use client";

import React from 'react';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';

interface GoogleMapDisplayProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
  markerPosition?: {
    lat: number;
    lng: number;
  };
  mapContainerStyle?: React.CSSProperties;
  mapOptions?: google.maps.MapOptions;
}

const defaultMapContainerStyle: React.CSSProperties = {
  width: '100%',
  height: '300px', // Default height for the map container
  borderRadius: '0.375rem', // Equivalent to rounded-md
  border: '1px solid hsl(var(--border))',
};

const defaultMapOptions: google.maps.MapOptions = {
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
  zoomControl: true,
};

const GoogleMapDisplay: React.FC<GoogleMapDisplayProps> = ({
  center,
  zoom,
  markerPosition,
  mapContainerStyle = defaultMapContainerStyle,
  mapOptions = defaultMapOptions,
}) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div style={mapContainerStyle} className="flex items-center justify-center bg-muted">
        <p className="text-destructive p-4 text-center text-sm">
          Google Maps API Key is missing. Please configure NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your environment.
        </p>
      </div>
    );
  }

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={['places']}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={zoom}
        options={mapOptions}
      >
        {markerPosition && <MarkerF position={markerPosition} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapDisplay;
