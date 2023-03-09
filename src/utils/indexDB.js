import { openDB } from "idb";

export async function insertDataInDB() {
  const dbPromise = await openDB("Projects", 1, (upgradeDB) => {
    console.log(upgradeDB.objectStoreNames);
    upgradeDB.createObjectStore("projects", { keyPath: "id" });
  });
  console.log(dbPromise);

  const transaction = dbPromise.transaction("projects", "readwrite");
  await transaction.done;
}
