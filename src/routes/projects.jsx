import { useLoaderData } from "react-router-dom";
import { getProject } from "../utils/project";
import TaskList from "../components/Task/List";
import TaskAdd from "../components/Task/Add";
import { completeTask, createTask, deleteTask, editTask } from "../utils/task";

export async function action({ params, request }) {
  const formData = await request.formData();
  const actionType = formData.get("_type");
  switch (actionType) {
    case "createTask":
      const [id, title, description, completed] = [
        formData.get("id"),
        formData.get("title"),
        formData.get("description"),
        formData.get("completed"),
      ];
      await createTask({
        project_id: params.projectId,
        task: { id, title, description, completed },
      });
      return {};
    case "deleteTask":
      await deleteTask({
        project_id: params.projectId,
        task_id: formData.get("task_id"),
      });
      return {};
    case "editTask":
      const [edit_id, edit_title, edit_description] = [
        formData.get("edit_id"),
        formData.get("edit_title"),
        formData.get("edit_description"),
      ];
      await editTask({
        project_id: params.projectId,
        task_data: {
          edit_id,
          edit_title,
          edit_description,
        },
      });
      return {};
    case "completeTask":
      const [task_id, task_complete] = [
        formData.get("task_id"),
        formData.get("task_complete"),
      ];
      await completeTask({
        project_id: params.projectId,
        task_data: {
          id: task_id,
          completed: task_complete,
        },
      });
      return {};
    default:
      break;
  }
}

export async function loader({ params }) {
  const project = await getProject(params.projectId);
  return { project };
}

export default function Projects() {
  const { project } = useLoaderData();
  return (
    <div className="mb-20">
      <h5 className="text-xl font-medium">Tasks</h5>
      <TaskList list={project?.tasks} />
      <TaskAdd />
    </div>
  );
}
