import { createContext, useState, useContext, ReactNode } from "react";
import { Vehicle } from "@/types";

interface VehicleContextType {
  vehicles: Vehicle[];
  setVehicles: React.Dispatch<React.SetStateAction<Vehicle[]>>;
  getVehicleIds: () => string[];
}

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

export function VehicleProvider({
  children,
  initialVehicles,
}: {
  children: ReactNode;
  initialVehicles: Vehicle[];
}) {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);

  const getVehicleIds = () => vehicles.map((vehicle) => vehicle.id);

  return (
    <VehicleContext.Provider value={{ vehicles, setVehicles, getVehicleIds }}>
      {children}
    </VehicleContext.Provider>
  );
}

export function useVehicles() {
  const context = useContext(VehicleContext);
  if (context === undefined) {
    throw new Error("useVehicles debe usarse dentro de un VehicleProvider");
  }
  return context;
}
