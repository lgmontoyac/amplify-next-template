import ListContainer from "@/containers/list";
import { getVehicles } from "@/services/apiService";
import { Vehicle } from "@/types";

export default async function List() {
  const vehicles: Vehicle[] = await getVehicles();

  return <ListContainer vehicles={vehicles} />;
}
