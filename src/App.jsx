import { useReducer, useState } from "react";
import "./App.css";
import TaskAdd from "./components/Task/Add";
import TaskList from "./components/Task/List";

function listReducer(tasks, action) {
  switch (action.type) {
    case "delete":
      return tasks.filter((task) => task.id !== action.data.id);

    case "add":
      return [
        ...tasks,
        {
          id: action.data?.id,
          title: action.data?.title,
          description: action.data?.description,
          completed: false,
        },
      ];
    case "edit":
      return tasks.map((task) => {
        if (task.id === action.data.id) {
          task.title = action.data.title;
          task.description = action.data.description;
        }
        return task;
      });
    case "complete":
      tasks.map((task) => {
        if (task.id === action.data.id) {
          task.completed = action.data.completed;
        }
      });
      return tasks.filter((task) => task.id !== action.data.id);
    default:
      break;
  }
}

function App() {
  const [tasks, dispatch] = useReducer(listReducer, [
    {
      id: 1,
      title: "abc",
      description: "abc",
      completed: false,
    },
  ]);
  return (
    <div className="App mx-10 2xl:mx-auto relative">
      <h5 className="text-xl font-medium">Tasks</h5>
      <TaskList list={tasks} dispatch={dispatch} />
      <TaskAdd dispatch={dispatch} />
    </div>
  );
}

export default App;
