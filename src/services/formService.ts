import { openDB, IDBPDatabase } from "idb";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/api";
import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";


let dbPromise: Promise<IDBPDatabase> | null = null;

if (typeof window !== "undefined") {
    dbPromise = openDB("toyota-totem-form-db", 2, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("formData")) {
          db.createObjectStore("formData", { keyPath: "id", autoIncrement: true });
        }
      },
    });
  }


  export async function storeFormDataOffline(data: Record<string, any>) {
    if (!dbPromise) return;
    const db = await dbPromise;
    const transaction = db.transaction("formData", "readwrite");
    const store = transaction.objectStore("formData");
    store.add({ data });
  }
  export async function sendStoredFormData() {
    if (!dbPromise) return;
    const db = await dbPromise;
    const transaction = db.transaction("formData", "readonly");
    const store = transaction.objectStore("formData");
    const allRecords = await store.getAll();

    Amplify.configure(outputs);
    const client = generateClient<Schema>();

    for (const record of allRecords) {
      try {
        const { data, errors } = await client.mutations.sendToKumo(record.data);
        if (!errors) {
          // Si el envío es exitoso, eliminamos el registro de IndexedDB
          const deleteTransaction = db.transaction("formData", "readwrite");
          const deleteStore = deleteTransaction.objectStore("formData");
          deleteStore.delete(record.id);
        }
      } catch (error) {
        console.error("Error al enviar datos almacenados:", error);
      }
    }
  }
  export async function hasStoredData() {
    if (!dbPromise) return false;
    const db = await dbPromise;
    const transaction = db.transaction("formData", "readonly");
    const store = transaction.objectStore("formData");
    const count = await store.count();
    return count > 0; // Retorna true si hay registros
  }