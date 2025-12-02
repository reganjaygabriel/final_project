"use client";

import { useEffect, useState } from "react";
import PropertyListItem from "./PropertyListItem";
import { json } from "stream/consumers";
import { error } from "console";
import apiService from "@/app/services/apiService";

export type PropertyType = {
  id: string;
  title: string;
  image_url: string;
  price_per_night: number;
};

const PropertyList = () => {
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const getProperties = async () => {
    try {
      const response = await apiService.get("/api/properties/");
      console.log("API Response:", response);

      // Handle different response structures
      if (response && response.data) {
        setProperties(response.data);
      } else if (Array.isArray(response)) {
        setProperties(response);
      } else {
        console.error("Unexpected response structure:", response);
        setProperties([]);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
      setProperties([]);
    }
  };
  useEffect(() => {
    getProperties();
  }, []);
  return (
    <>
      {properties.map((property) => {
        return <PropertyListItem key={property.id} property={property} />;
      })}
    </>
  );
};
export default PropertyList;
