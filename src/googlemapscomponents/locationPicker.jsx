"use client";

import { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  Marker,
  useLoadScript,
  Autocomplete,
} from "@react-google-maps/api";

const libraries = ["places"];

export default function LocationPicker({
  lat,
  lng,
  onSelect,
  isTextBox = true,
  locationtext
}) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
    libraries,
  });

  const [position, setPosition] = useState({
    lat: lat ?? -23.55052,
    lng: lng ?? -46.633308,
  });

  const [address, setAddress] = useState("");
  const [autocomplete, setAutocomplete] = useState(null);

  // Track initial load
  const isInitialLoad = useRef(true);

  // Update map when props change (NO API CALL)
  useEffect(() => {
    if (!isLoaded) return;

    if (lat != null && lng != null) {
      const loc = { lat: Number(lat), lng: Number(lng) };
      setPosition(loc);
      reverseGeocode(loc);

      // Mark initialization done
      isInitialLoad.current = false;
    }
  }, [lat, lng, isLoaded]);

  const reverseGeocode = (loc) => {
    if (!window.google?.maps) return;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: loc }, (results, status) => {
      if (status === "OK" && results?.[0]) {
        setAddress(results[0].formatted_address);
      }
    });
  };

  // User click / drag
  const handleMapChange = (e) => {
    if (!e.latLng) return;

    const loc = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };

    setPosition(loc);
    reverseGeocode(loc);
    onSelect && onSelect(loc.lat, loc.lng); // ✅ user action
  };

  // Autocomplete select
  const handlePlaceChanged = () => {
    if (!autocomplete) return;

    const place = autocomplete.getPlace();
    if (!place.geometry) return;

    const loc = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };

    setPosition(loc);
    setAddress(place.formatted_address || "");
    onSelect && onSelect(loc.lat, loc.lng); // ✅ user action
  };

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <div className="w-full">
      {isTextBox && (
        <Autocomplete
          onLoad={(auto) => setAutocomplete(auto)}
          onPlaceChanged={handlePlaceChanged}
        >
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Search location"
            className="border p-2 w-full mb-3 rounded"
          />
        </Autocomplete>
      )}

      <GoogleMap
        center={position}
        zoom={15}
        mapContainerStyle={{ width: "100%", height: "400px" }}
        onClick={handleMapChange}
      >
        <Marker position={position} draggable onDragEnd={handleMapChange} />
      </GoogleMap>
    </div>
  );
}
