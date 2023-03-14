import { useEffect, useState } from "react";
import {
  NavLink,
  Outlet,
  useLoaderData,
  useParams,
  redirect,
} from "react-router-dom";
import { insertDataInDB } from "../utils/indexDB";
import {
  createProject,
  deleteProject,
  editProject,
  getProjects,
} from "../utils/project";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import ProjectMenu from "../components/Project/Menu";
import ProjectAdd from "../components/Project/Add";

export async function action({ request }) {
  const formData = await request.formData();
  console.log(formData);
  const actionType = formData.get("_type");
  switch (actionType) {
    case "createProject":
      const projectId = await createProject(formData.get("project_name"));
      return redirect(`/projects/${projectId}`);
    case "deleteProject":
      await deleteProject(formData.get("delete_id"));
      return redirect("/");
    case "editProject":
      const [edit_id, edit_name] = [
        formData.get("edit_id"),
        formData.get("edit_name"),
      ];
      await editProject({ id: edit_id, project_data: { name: edit_name } });
      return redirect(`/projects/${edit_id}`);
    default:
      throw new Error(`Unknown Action Type ${actionType}`);
  }
}

export async function loader() {
  await insertDataInDB();
  const projects = await getProjects();
  return projects;
}

export default function Root() {
  const projects = useLoaderData();
  let { projectId } = useParams();
  const [showNav, setShowNav] = useState(true);

  return (
    <div className="lg:flex justify-start space-x-5">
      <aside className="min-h-full p-10 w-96">
        <div className="flex items-center justify-between">
          <h5>Projects</h5>
          <div className="flex items-center space-x-3">
            <ProjectAdd />
            {showNav ? (
              <button onClick={() => setShowNav(false)} data-testid="close">
                <MdKeyboardArrowUp />
              </button>
            ) : (
              <button onClick={() => setShowNav(true)} data-testid="open">
                <MdKeyboardArrowDown />
              </button>
            )}
          </div>
        </div>
        {showNav && (
          <nav className="-ml-3" data-testid="nav">
            {projects?.length ? (
              <ul data-testid="project-item">
                {projects?.map((project) => (
                  <li key={project.id}>
                    <NavLink
                      data-testid={`project-${project.id}`}
                      to={`projects/${project.id}`}
                      className={`${
                        project?.id === projectId
                          ? "bg-slate-200"
                          : "bg-transparent"
                      } group flex justify-between items-start my-1 hover:bg-slate-200 px-3 rounded py-1`}
                    >
                      <p className="text-black text-sm font-normal truncate">
                        {project?.name}
                      </p>
                      <div>
                        <ProjectMenu project={project} />
                      </div>
                    </NavLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No projects</p>
            )}
          </nav>
        )}
      </aside>
      <div className="lg:w-1/2">
        <div className="container mx-auto p-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
