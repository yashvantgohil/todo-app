import React, { useEffect, useState } from "react";
import "./App.css";
import AddTodo from "./view/todo/AddTodo";
import TodoList from "./view/todo/TodoList";
import todoData from "./db/todo.json";
import EditTodo from "./view/todo/EditTodo";

function App() {
  const [todos, setTodos] = useState([]);
  const [open, setOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const handleOpen = (id) => {
    const taskToEdit = [...todos].find((x) => x.id === id);
    setTaskToEdit(taskToEdit);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    let localTodos = localStorage.getItem("todos");
    localTodos = JSON.parse(localTodos);
    if (localTodos === null || localTodos.length === 0) {
      localTodos = todoData;
      localStorage.setItem("todos", JSON.stringify(todoData));
    }
    setTodos(localTodos);
  }, []);

  const handleAddNewItem = (desc) => {
    const newTodos = [...todos];
    newTodos.push({
      id: Math.floor(Math.random() * 100 + 1),
      description: desc,
      isCompleted: false,
      isDeleted: false,
    });
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const handleUpdateStatus = (id) => {
    const newTodos = [...todos];
    const todoToUpdate = newTodos.find((x) => x.id === id);
    todoToUpdate.isCompleted = !todoToUpdate.isCompleted;
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const handleDeleteTask = (id) => {
    const newTodos = [...todos];
    const todoToUpdate = newTodos.find((x) => x.id === id);
    todoToUpdate.isDeleted = true;
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const handleEdit = (desc) => {
    const newTodos = [...todos];
    const todoToUpdate = newTodos.find((x) => x.id === taskToEdit.id);
    todoToUpdate.description = desc;
    setTodos(newTodos);
    handleClose();
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <p>TODO APP</p>
        <AddTodo onAddItem={handleAddNewItem} />
        <TodoList
          todos={todos.filter((x) => x.isDeleted === false)}
          onUpdateStatus={handleUpdateStatus}
          onDeleteTask={handleDeleteTask}
          onOpen={handleOpen}
        />
        {taskToEdit && open && (
          <EditTodo
            open={open}
            onClose={handleClose}
            task={taskToEdit}
            onEdit={handleEdit}
          />
        )}
      </div>
    </>
  );
}

export default App;
