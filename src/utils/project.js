import { openDB } from "idb";
import { withProjectDB } from "./indexDB";

export async function createProject({ id, project_name }) {
  return await withProjectDB(async (tx) => {
    await tx.store.add({
      id: id,
      name: project_name,
      tasks: [],
    });
    return id;
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
  return await withProjectDB(async (tx) => {
    return await tx.store.get(id);
  }, "readonly");
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
