import { useState } from "react";
import { IoAdd, IoClose } from "react-icons/io5";
import { AddTask } from "../../App";

export default function TaskAdd({ dispatch }) {
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const new_id = Math.floor(Math.random() * 1000);
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, id: new_id, [name]: value }));
  };
  const handleAddSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: "add", data: inputs });
    setOpen(false);
  };
  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center space-x-3 my-3 "
      >
        <IoAdd className="text-red-600 text-lg font-light" />
        <p className="text-gray-400">Add task</p>
      </button>
      {open && (
        <div className="fixed z-10 top-1/5 left-1/3 w-1/4 bg-white border border-gray-200 drop-shadow-2xl rounded-md p-5">
          <form
            onSubmit={handleAddSubmit}
            className="flex flex-col justify-center"
          >
            <input
              type="text"
              name="title"
              placeholder="Task Name"
              value={inputs.title || ""}
              onChange={handleChange}
              className="outline-none focus:outline-none placeholder:text-gray-600 placeholder:font-medium text-lg font-medium my-3"
            />
            <textarea
              type="textarea"
              name="description"
              placeholder="Description"
              value={inputs.description || ""}
              onChange={handleChange}
              className="outline-none focus:outline-none"
            />
            <div className="flex space-x-4 justify-end my-4">
              <button
                onClick={() => setOpen(false)}
                className="bg-gray-200 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button type="Submit" className="bg-[#eaa9b1] px-4 py-2 rounded">
                Add Task
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
