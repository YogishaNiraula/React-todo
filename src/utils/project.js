import { openDB, wrap } from "idb";

export async function createProject(project_name) {
  let id = Math.random().toString(36).substring(2, 9);
  const db = await openDB("Projects", 1);
  const tx = db.transaction("projects", "readwrite");
  await tx.store.add({ id: id, name: project_name, tasks: [] }, id);

  let response = await getProjects();
  await tx.done;
  return response;
}

export async function getProjects() {
  const db = await openDB("Projects", 1);
  const tx = db.transaction("projects", "readonly");
  let response = await tx.store.getAll();
  await tx.done;
  return response;
}

export async function getProject(id) {
  const db = await openDB("Projects", 1);
  const tx = db.transaction("projects", "readwrite");
  let response = await tx.store.get(id);
  await tx.done;
  return response;
}
