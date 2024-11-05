import ListContainer from "@/containers/list";
import { getCacheVehicles } from "@/services/storeVehicles";
import { Vehicle } from "@/types";
export default async function MainPage() {
  const vehicles: Vehicle[] = await getCacheVehicles();

  vehicles?.sort((a, b) => a.priority - b.priority);

  vehicles.forEach((item) => {
    item.models?.items.sort((a, b) => a.priority - b.priority);

    item.models?.items.forEach((model) => {
      model.colors?.items.sort((a, b) => a.priority - b.priority);
    });
  });

  return <ListContainer vehicles={vehicles} />;
}
