'use client';

import { useEffect, useState } from 'react';
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useLoadScript,
} from '@react-google-maps/api';

const libraries = ['places'];

export default function LocationMap({ lat, lng }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const destination = { lat, lng };

  const [currentLocation, setCurrentLocation] = useState(null);
  const [directions, setDirections] = useState(null);

  // ✅ Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
    }
  }, []);

  // ✅ Auto load directions once location is available
  useEffect(() => {
    if (!currentLocation || !isLoaded) return;

    const service = new google.maps.DirectionsService();

    service.route(
      {
        origin: currentLocation,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error('Directions error:', status);
        }
      }
    );
  }, [currentLocation, isLoaded]);

  if (!isLoaded || !currentLocation) {
    return  <div className="location py-7.5">
                    <h3 className="text-2xl mb-3 font-bold">Clinic Location</h3>
                    
    
                    
                        <div className="rounded-thm bg-loader animate-pulse w-full md:h-[450px] h-[300px]"></div>
                   
    
                  </div>;
  }

  return (
   <iframe
        src={`https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
        width="100%"
        height="500"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        />



  );
}
