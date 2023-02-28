import { useState } from "react";
import { FiEdit3 } from "react-icons/fi";

export default function TaskEdit({ taskData, dispatch }) {
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState({
    title: taskData.title,
    description: taskData.description,
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleEditSubmit = (event) => {
    event.preventDefault();
    dispatch({
      type: "edit",
      data: {
        id: taskData.id,
        title: inputs.title,
        description: inputs.description,
      },
    });
    setOpen(false);
  };
  return (
    <div>
      <button onClick={() => setOpen(true)}>
        <FiEdit3 />
      </button>
      {open && (
        <div className="fixed z-10 top-1/5 left-1/3 w-1/4 bg-white border border-gray-200 drop-shadow-2xl rounded-md p-5">
          <form
            onSubmit={handleEditSubmit}
            className="flex flex-col justify-center"
          >
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={inputs.title}
              required
              onChange={handleChange}
              className="outline-none focus:outline-none placeholder:text-lg placeholder:font-medium text-lg font-medium my-3 bg-white text-black"
            />
            <textarea
              type="textarea"
              name="description"
              placeholder="Description of the task"
              value={inputs.description}
              onChange={handleChange}
              className="outline-none focus:outline-none bg-white text-black"
            />
            <div className="flex space-x-4 justify-end my-4">
              <button
                onClick={() => setOpen(false)}
                className="bg-gray-200 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                type="Submit"
                className="bg-[#db4c3f] text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
