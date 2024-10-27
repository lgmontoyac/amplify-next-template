import { openDB, IDBPDatabase } from "idb";
import { Vehicle, Specification, Feature, ColorOption } from "@/types";

let dbPromise: Promise<IDBPDatabase> | null = null;

if (typeof window !== "undefined") {
  dbPromise = openDB("toyota-totem-app-db", 2, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("vehicles")) {
        db.createObjectStore("vehicles", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("specifications")) {
        db.createObjectStore("specifications", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("features")) {
        db.createObjectStore("features", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("colors")) {
        db.createObjectStore("colors", { keyPath: "id" });
      }
    },
  });
}

// **Vehículos**
export async function addVehicleToDB(vehicles: Vehicle[]) {
  if (!dbPromise) return;
  const db = await dbPromise;
  const tx = db.transaction("vehicles", "readwrite");
  for (const vehicle of vehicles) {
    await tx.store.put(vehicle);
  }
  await tx.done;
}

export async function getVehiclesFromDB(): Promise<Vehicle[]> {
  if (!dbPromise) return [];
  const db = await dbPromise;
  return await db.getAll("vehicles");
}

export async function getVehicleByIdFromDB(id: string): Promise<Vehicle | undefined> {
  if (!dbPromise) return undefined;
  const db = await dbPromise;
  return await db.get("vehicles", id);
}

export async function deleteVehicleFromDB(id: string) {
  if (!dbPromise) return;
  const db = await dbPromise;
  await db.delete("vehicles", id);
}

// **Especificaciones**
export async function addSpecificationsToDB(specifications: Specification[]) {
  if (!dbPromise) return;
  const db = await dbPromise;
  const tx = db.transaction("specifications", "readwrite");
  for (const spec of specifications) {
    await tx.store.put(spec);
  }
  await tx.done;
}

export async function getSpecificationsFromDB(): Promise<Specification[]> {
  if (!dbPromise) return [];
  const db = await dbPromise;
  return await db.getAll("specifications");
}

export async function getSpecificationByIdFromDB(id: string): Promise<Specification | undefined> {
  if (!dbPromise) return undefined;
  const db = await dbPromise;
  return await db.get("specifications", id);
}

export async function deleteSpecificationFromDB(id: string) {
  if (!dbPromise) return;
  const db = await dbPromise;
  await db.delete("specifications", id);
}

// **Características**
export async function addFeatureListToDB(features: Feature[]) {
  if (!dbPromise) return;
  const db = await dbPromise;
  const tx = db.transaction("features", "readwrite");
  for (const feature of features) {
    await tx.store.put(feature);
  }
  await tx.done;
}

export async function getFeatureListFromDB(): Promise<Feature[]> {
  if (!dbPromise) return [];
  const db = await dbPromise;
  return await db.getAll("features");
}

export async function getFeatureByIdFromDB(id: string): Promise<Feature | undefined> {
  if (!dbPromise) return undefined;
  const db = await dbPromise;
  return await db.get("features", id);
}

export async function deleteFeatureFromDB(id: string) {
  if (!dbPromise) return;
  const db = await dbPromise;
  await db.delete("features", id);
}

// **Colores**
export async function addColorListToDB(colors: ColorOption[]) {
  if (!dbPromise) return;
  const db = await dbPromise;
  const tx = db.transaction("colors", "readwrite");
  for (const color of colors) {
    await tx.store.put(color);
  }
  await tx.done;
}

export async function getColorListFromDB(): Promise<ColorOption[]> {
  if (!dbPromise) return [];
  const db = await dbPromise;
  return await db.getAll("colors");
}

export async function getColorByIdFromDB(id: string): Promise<ColorOption | undefined> {
  if (!dbPromise) return undefined;
  const db = await dbPromise;
  return await db.get("colors", id);
}

export async function deleteColorFromDB(id: string) {
  if (!dbPromise) return;
  const db = await dbPromise;
  await db.delete("colors", id);
}
