"use client";

import ComponentCard from "@/components/common/ComponentCard";
import LocationPicker from "@/googlemapscomponents/locationPicker";
import { useEffect, useRef, useState } from "react";

export function GoogleMap({ uuid, lat, long }) {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  // Prevent duplicate API calls
  const lastSavedLocation = useRef({ lat: null, lng: null });

  useEffect(() => {
    if (lat != null && long != null) {
      setLatitude(Number(lat));
      setLongitude(Number(long));
    }
  }, [lat, long]);

  const onCreate = async (lat, lng) => {
    // Avoid duplicate saves
    if (
      lastSavedLocation.current.lat === lat &&
      lastSavedLocation.current.lng === lng
    ) {
      return;
    }

    lastSavedLocation.current = { lat, lng };

    await fetch(
      `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic/update-clinics-map`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uuid: uuid,
          latitude: lat,
          longitude: lng,
        }),
      }
    );
  };

  return (
    <ComponentCard title="Google Location" className="mt-5">
      <LocationPicker
        lat={latitude}
        lng={longitude}
        onSelect={(lat, lng) => {
          setLatitude(lat);
          setLongitude(lng);
          onCreate(lat, lng); // ✅ only user action
        }}
      />
    </ComponentCard>
  );
}
