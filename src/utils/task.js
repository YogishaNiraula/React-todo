import { openDB } from "idb";
import { getProject, getProjects } from "./project";

async function withProjectDB(fn, mode = "readwrite") {
  try {
    const db = await openDB("Projects", 1);
    const tx = db.transaction("projects", mode);
    const output = await fn(tx);
    await tx.done;
    return output;
  } catch (error) {
    console.log(error);
  }
}

export async function createTask({ project_id, task }) {
  return await withProjectDB(async (tx) => {
    let project = await tx.store.get(project_id);
    project?.tasks.push({
      id: task.id,
      title: task.title,
      description: task.description || "",
      completed: task.completed,
    });

    await tx.store.put(project);
    return await tx.store.get(project_id);
  });
}

export async function deleteTask({ project_id, task_id }) {
  return await withProjectDB(async (tx) => {
    let project = await tx.store.get(project_id);
    await tx.store.put({
      ...project,
      tasks: project.tasks.filter((task) => task.id != task_id),
    });
    return await tx.store.get(project_id);
  });
}

export async function editTask({ project_id, task_data }) {
  return await withProjectDB(async (tx) => {
    let project = await tx.store.get(project_id);
    await tx.store.put({
      ...project,
      tasks: project.tasks.map((task) => {
        if (task.id === task_data.edit_id) {
          task.description = task_data.edit_description;
          task.title = task_data.edit_title;
        }
        return task;
      }),
    });
    return await tx.store.get(project_id);
  });
}
