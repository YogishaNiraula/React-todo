import { openDB } from "idb";
import { getProject, getProjects } from "./project";

export async function createTask({ project_id, task }) {
  try {
    const db = await openDB("Projects", 1);
    const tx = db.transaction("projects", "readwrite");
    let project = await tx.store.get(project_id);
    project?.tasks.push({
      id: task.id,
      title: task.title,
      description: task.description || "",
      completed: task.completed,
    });

    await tx.store.put(project, project_id);
    let response = await tx.store.get(project_id);
    console.log(response);
    await tx.done;
    return response;
  } catch (error) {
    console.log(error);
  }
}
