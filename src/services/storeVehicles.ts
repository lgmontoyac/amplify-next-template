"use server";

import { Vehicle } from "@/types";
import { getVehicles } from "./apiService";

import outputs from "../../amplify_outputs.json";
import { Amplify } from "aws-amplify";

Amplify.configure(outputs, {
  ssr: true,
});

let cachedVehicles: Vehicle[];

export const setCacheVehicles = async () => {
  const vehicles: Vehicle[] = await getVehicles();
  cachedVehicles = vehicles;
};

export const getCacheVehicles = async () => {
  if (cachedVehicles?.length < 1 || !cachedVehicles) {
    await setCacheVehicles();
  }
  return cachedVehicles;
};