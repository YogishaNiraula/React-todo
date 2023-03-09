import { openDB } from "idb";
const indexedDB = window.indexedDB;

export async function insertDataInDB() {
  const db = await openDB("Projects", 1, {
    upgrade(db) {
      db.createObjectStore("projects", { keyPath: "id" });
    },
  });

  const transaction = db.transaction("projects", "readwrite");
  await transaction.done;
}
