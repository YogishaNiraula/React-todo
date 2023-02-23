import { useState } from "react";

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
      <button onClick={() => setOpen(true)}>Edit</button>
      {open && (
        <div>
          <button onClick={() => setOpen(false)}>X</button>
          <form onSubmit={handleEditSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={inputs.title}
              onChange={handleChange}
            />
            <textarea
              type="textarea"
              name="description"
              placeholder="Description of the task"
              value={inputs.description}
              onChange={handleChange}
            />
            <button type="Submit">Edit</button>
          </form>
        </div>
      )}
    </div>
  );
}
