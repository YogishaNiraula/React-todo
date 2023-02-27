import { useEffect, useReducer, useState } from "react";
import "./App.css";
import TaskAdd from "./components/Task/Add";
import TaskList from "./components/Task/List";

const indexedDB = window.indexedDB;

const insertDataInDB = () => {
  if (!indexedDB) {
    console.log("This browser doesn't support IndexedDB");
    return;
  }
  const request = indexedDB.open("TasksDatabase", 1);

  request.onerror = () => {
    console.error("An error occurred with IndexedDB");
  };

  request.onupgradeneeded = () => {
    const db = request.result;
    const store = db.createObjectStore("tasks", { keyPath: "id" });
    store.createIndex("completed_tasks", "completed", {
      unique: false,
    });
  };

  request.onsuccess = () => {
    const db = request.result;
    const transaction = db.transaction("tasks", "readwrite");
    const store = transaction.objectStore("tasks");
    // store.add({
    //   id: 1,
    //   title: "abc",
    //   description: "abc",
    //   completed: "false",
    // });
    transaction.oncomplete = () => {
      db.close();
    };
  };
};

function listReducer(state, action) {
  const request = indexedDB.open("TasksDatabase", 1);
  switch (action.type) {
    case "delete":
      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction("tasks", "readwrite");
        const store = transaction.objectStore("tasks");
        let tasks = store.delete(action.data?.id);

        tasks.onsuccess = () => {
          transaction.oncomplete = () => {
            db.close();
          };
        };

        tasks.onerror = () => {
          alert("Couldn't delete task.");
        };
      };
      break;

    case "add":
      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction("tasks", "readwrite");
        const store = transaction.objectStore("tasks");
        let tasks = store.put({
          id: action.data?.id,
          title: action.data?.title,
          description: action.data?.description,
          completed: "false",
        });

        tasks.onsuccess = () => {
          transaction.oncomplete = () => {
            db.close();
          };
        };

        tasks.onerror = () => {
          alert("Couldn't add task.");
        };
      };
      break;

    case "edit":
      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction("tasks", "readwrite");
        const store = transaction.objectStore("tasks");
        let task = store.get(action.data?.id);

        task.onsuccess = () => {
          task.result.title = action.data?.title;
          task.result.description = action.data?.description;
          store.put(task.result);
        };

        task.onerror = () => {
          alert("Couldn't edit task.");
        };
        transaction.oncomplete = () => {
          db.close();
        };
      };
      break;

    case "complete":
      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction("tasks", "readwrite");
        const store = transaction.objectStore("tasks");
        const completeTask = store.delete(action.data?.id);
        completeTask.onsuccess = () => {
          transaction.oncomplete = () => {
            db.close();
          };
        };
        completeTask.onerror = () => {
          alert("Task couldn't be completed.");
        };
        // let task = store.get(action.data?.id);

        // task.onsuccess = () => {
        //   task.result.completed = action.data?.completed;
        //   store.put(task.result);
        // };

        // task.onerror = () => {
        //   alert("Task couldn't be completed.");
        // };
        // let completedIndex = store.index("completed_tasks");
        // const completedQuery = completedIndex.getAll(["true"]);

        // completedQuery.onsuccess = () => {
        //   console.log(completedQuery.result);
        // };
      };
      break;
    default:
      break;
  }
}

function App() {
  const [state, dispatch] = useReducer(listReducer);
  const [allTasks, setAllTasks] = useState([]);

  const getAllTasks = () => {
    const request = indexedDB.open("TasksDatabase", 1);
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction("tasks", "readwrite");
      const store = transaction.objectStore("tasks");
      let tasks = store.getAll();

      tasks.onsuccess = () => {
        setAllTasks(tasks.result);
      };

      tasks.onerror = () => {
        alert("Couldn't get tasks from Database.");
      };
      transaction.oncomplete = () => {
        db.close();
      };
    };
  };

  useEffect(() => {
    insertDataInDB();
    getAllTasks();
  }, []);

  return (
    <div className="App mx-10 2xl:mx-auto relative">
      <h5 className="text-xl font-medium">Tasks</h5>
      <TaskList list={allTasks} dispatch={dispatch} />
      <TaskAdd dispatch={dispatch} />
    </div>
  );
}

export default App;
