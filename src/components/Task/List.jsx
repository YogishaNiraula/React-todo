import { useState } from "react";
import TaskEdit from "./Edit";

export default function TaskList({ list, dispatch }) {
  console.log(list);
  return (
    <div>
      <ul>
        {list?.map((item, idx) => {
          return (
            <li key={idx}>
              <span>
                <input
                  type="checkbox"
                  name="complete"
                  id="complete_task"
                  onChange={(event) =>
                    dispatch({
                      type: "complete",
                      data: {
                        id: item.id,
                        completed: event.target.checked,
                      },
                    })
                  }
                />
              </span>
              <span className="text-4xl text-blue-200">{item.title}</span>
              <TaskEdit taskData={item} dispatch={dispatch} />
              <button
                onClick={() =>
                  dispatch({
                    type: "delete",
                    data: {
                      id: item.id,
                    },
                  })
                }
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
