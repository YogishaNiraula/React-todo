import { useLoaderData } from "react-router-dom";
import { getProject } from "../utils/project";
import TaskList from "../components/Task/List";
import TaskAdd from "../components/Task/Add";

export async function loader({ params }) {
  const project = await getProject(params.projectId);
  return { project };
}
export default function Projects() {
  const { project } = useLoaderData();
  return (
    <div>
      <h5 className="text-xl font-medium">Tasks</h5>
      <TaskList list={project?.tasks} />
      <TaskAdd />
    </div>
  );
}
