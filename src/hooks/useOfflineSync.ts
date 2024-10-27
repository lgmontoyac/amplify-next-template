import { useEffect } from "react";
import { useVehicles } from "@/context/VehiclesProvider";
import {
  getVehicles,
  getSpecifications,
  getFeatureList,
  getColorList,
} from "@/services/apiService";
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

export function useOfflineSync() {
  const {
    vehicles,
    specifications,
    featureList,
    colorLists,
    setVehicles,
    setSpecifications,
    setFeatureList,
    setColorLists,
  } = useVehicles();

  useEffect(() => {
    const syncWithAPI = async () => {
      if (!navigator.onLine) return;

      const [vehiclesFromAPI, specsFromAPI, featuresFromAPI, colorsFromAPI] = await Promise.all([
        getVehicles(),
        getSpecifications(),
        getFeatureList(),
        getColorList(),
      ]);

      addVehicleToDB(vehiclesFromAPI);
      addSpecificationsToDB(specsFromAPI);
      addFeatureListToDB(featuresFromAPI);
      addColorListToDB(colorsFromAPI);

      setVehicles(await getVehiclesFromDB());
      setSpecifications(await getSpecificationsFromDB());
      setFeatureList(await getFeatureListFromDB());
      setColorLists(await getColorListFromDB());
    };

    syncWithAPI();
  }, [vehicles, specifications, featureList, colorLists]);
}
