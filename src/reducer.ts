export default function listReducer(tasks, action) {
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
