import { useState } from "react";

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
      <button onClick={() => setOpen(true)}>Add</button>
      {open && (
        <div>
          <button onClick={() => setOpen(false)}>X</button>
          <form onSubmit={handleAddSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={inputs.title || ""}
              onChange={handleChange}
            />
            <textarea
              type="textarea"
              name="description"
              placeholder="Description of the task"
              value={inputs.description || ""}
              onChange={handleChange}
            />
            <button type="Submit">Add</button>
          </form>
        </div>
      )}
    </div>
  );
}
