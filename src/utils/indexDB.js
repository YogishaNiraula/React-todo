import { openDB } from "idb";

export async function insertDataInDB() {
  const db = await openDB("Projects", 1, {
    upgrade(db) {
      db.createObjectStore("projects", { keypath: "id" });
    },
  });
  const transaction = db.transaction("projects", "readwrite");
  await transaction.done;
}
