import TaskEdit from "./Edit";
import { MdDeleteOutline } from "react-icons/md";

export default function TaskList({ list, dispatch }) {
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
                <span>
                  <input
                    className="appearance-none border-2 border-blue-500 bg-blue-300 p-2 rounded-full mx-2 cursor-pointer"
                    type="checkbox"
                    name="complete"
                    id="complete_task"
                    onChange={(event) =>
                      dispatch({
                        type: "complete",
                        data: {
                          id: item.id,
                          completed: event.target.checked ? "true" : "false",
                        },
                      })
                    }
                  />
                </span>
                <span className="text-lg mb-2">{item.title}</span>
              </span>
              <span className="flex space-x-3">
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
                  <MdDeleteOutline />
                </button>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
