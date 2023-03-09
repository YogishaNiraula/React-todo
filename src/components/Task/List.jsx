import TaskEdit from "./Edit";
import { MdDeleteOutline } from "react-icons/md";
import { Form } from "react-router-dom";

export default function TaskList({ list }) {
  return (
    <div>
      <ul>
        {list?.map((item, idx) => {
          return (
            <li
              key={idx}
              className="flex justify-between items-center border-b border-b-gray-200 py-2"
            >
              <span className="flex items-center">
                <Form replace method="post">
                  <input
                    type="text"
                    name="task_id"
                    value={item.id}
                    hidden
                    readOnly
                  />
                  <button
                    className="border-2 border-blue-500 bg-blue-300 p-2 rounded-full mx-2 cursor-pointer"
                    type="submit"
                    name="_type"
                    id="complete_task"
                    value="deleteTask"
                  />
                </Form>
                <span className="text-lg">{item.title}</span>
              </span>
              <span className="flex space-x-3">
                <TaskEdit taskData={item} />
                <Form method="post">
                  <input
                    type="text"
                    name="task_id"
                    value={item.id}
                    hidden
                    readOnly
                  />
                  <button type="submit" value="deleteTask" name="_type">
                    <MdDeleteOutline />
                  </button>
                </Form>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
