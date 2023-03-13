import TaskEdit from "./Edit";
import { MdDeleteOutline } from "react-icons/md";
import { Form } from "react-router-dom";
import React from "react";

export default function TaskList({ list }) {
  const handleComplete = (completed) => {
    return completed === "true" ? "false" : "true";
  };
  return (
    <div>
      <ul>
        {list?.map((item, idx) => {
          return (
            <li
              key={idx}
              className="group flex justify-between items-center border-b border-b-gray-200 py-2"
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
                  <input
                    type="text"
                    name="task_complete"
                    value={handleComplete(item.completed)}
                    hidden
                    readOnly
                  />
                  <button
                    className={`border-2 ${
                      item.completed === "true"
                        ? "border-red-500 bg-red-300"
                        : "border-blue-500 bg-blue-300"
                    } p-2 rounded-full mx-2 cursor-pointer`}
                    type="submit"
                    name="_type"
                    id="complete_task"
                    value="completeTask"
                  />
                </Form>
                <span
                  data-testid="list"
                  className={`${
                    item.completed === "true" ? "decoration-2 line-through" : ""
                  } text-lg`}
                >
                  {item.title}
                </span>
              </span>
              <span className="flex space-x-3 invisible group-hover:visible">
                {item.completed === "false" && <TaskEdit taskData={item} />}
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
