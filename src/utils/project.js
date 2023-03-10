import { openDB } from "idb";
import { withProjectDB } from "./indexDB";

export async function createProject(project_name) {
  return await withProjectDB(async (tx) => {
    let id = Math.random().toString(36).substring(2, 9);
    await tx.store.add({
      id: id,
      name: project_name,
      tasks: [],
    });
  });
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
  const tx = db.transaction("projects", "readonly");
  let response = await tx.store.get(id);
  await tx.done;
  return response;
}

export async function editProject({ id, project_data }) {
  return await withProjectDB(async (tx) => {
    let project = await tx.store.get(id);
    await tx.store.put({
      ...project,
      name: project_data.name,
    });
  });
}

export async function deleteProject(id) {
  return await withProjectDB(async (tx) => {
    await tx.store.delete(id);
  });
}
