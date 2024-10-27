import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import {
  getVehicles,
  getSpecifications,
  getFeatureList,
  getColorList,
} from "@/services/apiService";
import { Vehicle, Specification, Feature, ColorOption } from "@/types";
import {
  addVehicleToDB,
  addSpecificationsToDB,
  addFeatureListToDB,
  addColorListToDB,
  getVehiclesFromDB,
  getSpecificationsFromDB,
  getFeatureListFromDB,
  getColorListFromDB,
} from "@/services/dbService";

interface VehicleContextType {
  vehicles: Vehicle[];
  specifications: Specification[];
  featureList: Feature[];
  colorLists: ColorOption[];
  setVehicles: React.Dispatch<React.SetStateAction<Vehicle[]>>;
  setSpecifications: React.Dispatch<React.SetStateAction<Specification[]>>;
  setFeatureList: React.Dispatch<React.SetStateAction<Feature[]>>;
  setColorLists: React.Dispatch<React.SetStateAction<ColorOption[]>>;
}

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

export function VehicleProvider({ children }: { children: ReactNode }) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [specifications, setSpecifications] = useState<Specification[]>([]);
  const [featureList, setFeatureList] = useState<Feature[]>([]);
  const [colorLists, setColorLists] = useState<ColorOption[]>([]);

  // Cargar datos offline desde IndexedDB
  const loadOfflineData = async () => {
    setVehicles(await getVehiclesFromDB());
    setSpecifications(await getSpecificationsFromDB());
    setFeatureList(await getFeatureListFromDB());
    setColorLists(await getColorListFromDB());
  };

  // Sincronizar con API y actualizar IndexedDB si hay conexión
  const syncWithAPI = async () => {
    try {
      if (!navigator.onLine) return;

      const [
        vehiclesFromAPI,
        specificationsFromAPI,
        featuresFromAPI,
        colorsFromAPI,
      ] = await Promise.all([
        getVehicles(),
        getSpecifications(),
        getFeatureList(),
        getColorList(),
      ]);

      await Promise.all([
        addVehicleToDB(vehiclesFromAPI),
        addSpecificationsToDB(specificationsFromAPI),
        addFeatureListToDB(featuresFromAPI),
        addColorListToDB(colorsFromAPI),
      ]);

      setVehicles(await getVehiclesFromDB());
      setSpecifications(await getSpecificationsFromDB());
      setFeatureList(await getFeatureListFromDB());
      setColorLists(await getColorListFromDB());
    } catch (error) {
      console.error("Failed to sync with API:", error);
    }
  };

  useEffect(() => {
    loadOfflineData(); // Carga los datos almacenados localmente
    syncWithAPI(); // Luego intenta sincronizar con la API
  }, []);

  return (
    <VehicleContext.Provider
      value={{
        vehicles,
        specifications,
        featureList,
        colorLists,
        setVehicles,
        setSpecifications,
        setFeatureList,
        setColorLists,
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
}

// Hook para usar el contexto
export function useVehicles() {
  const context = useContext(VehicleContext);
  if (context === undefined) {
    throw new Error("useVehicles must be used within a VehicleProvider");
  }
  return context;
}
