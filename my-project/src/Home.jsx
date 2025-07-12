import React, { useEffect } from "react";
import { useState } from "react";
import Create from "./Create";
import axios from "axios";
import {
  BsCircleFill,
  BsFillTrashFill,
  BsFillCheckCircleFill,
} from "react-icons/bs";

function Home() {
  const [todos, setTodos] = useState([]);
  const [editText, setEditText] = useState("");
  const [editId, setEditId] = useState(null);
  const [task, setTask] = useState("");

  const fetchTodos = () => {
    axios
      .get("http://localhost:3000/get")
      .then((res) => setTodos(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(fetchTodos, []);

  const handleEdit = (id) => {
    axios
      .put(`http://localhost:3000/get/update/${id}`)
      .then(() => {
        axios
          .get("http://localhost:3000/get")
          .then((res) => setTodos(res.data));
      })
      .catch((err) => console.log(err));
  };

  const handleEditText = (id) => {
    axios
      .put(`http://localhost:3000/edit/${id}`, { task: editText })
      .then(() => {
        setEditId(null);
        setEditText("");
        axios
          .get("http://localhost:3000/get")
          .then((res) => setTodos(res.data));
      })
      .catch((err) => console.log(err));
  };

  const startEditing = (id, task) => {
    setEditId(id);
    setEditText(task);
  };

  const handleAdd = () => {
    if (!task || task.trim() === "") return alert("task cannot be empty");
    axios
      .post("http://localhost:3000/add", {
        task,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      })
      .then(() => {
        setTask("");
        fetchTodos();
      })
      .catch((err) => console.err(err));
  };

  const handleUpdate = () => {
    if (!task.trim()) return alert("Task cannot be empty");

    axios
      .put(`http://localhost:3000/edit/${editId}`, { task })
      .then(() => {
        setTask("");
        setEditId(null);
        fetchTodos();
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/delete/${id}`)
      .then(() => {
        axios
          .get("http://localhost:3000/get")
          .then((res) => setTodos(res.data));
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="p-4 bg-gradient-to-br from-purple-400 to-blue-300 min-h-screen ">
      <h2 className="text-4xl font-bold text-white text-center mb-6">
        Todo List App By 'Madhav'
      </h2>
      <Create
        task={task}
        setTask={setTask}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate}
        editId={editId}
      />

      {todos.length === 0 ? (
        <div>
          <h2 className="text-2xl text-white text-center mt-6">
            No todos to display
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-2 grid-cols-3 grid-cols-4 grid-cols-5 gap-6 mt-6">
          {todos.map((todo) => (
            <div
              key={todo._id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105 aspect-square flex flex-col justify-between p-4"
            >
              {todo.done && (
                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg z-10 pointer-events-none flex items-center justify-center">
                  <p className="text-green-500 text-4xl font bold">
                    {" "}
                    <BsFillCheckCircleFill className="text-green-500 text-6xl " />
                  </p>
                </div>
              )}
              <div className="flex justify-between text-xs text-gray-700 mb-2">
                <p>{todo.time}</p>
                <p>{todo.date}</p>
              </div>
              <div
                className="flex flex-col items-center gap-3"
                onClick={() => handleEdit(todo._id)}
              >
                {todo.done ? (
                  <BsFillCheckCircleFill className="text-green-500 text-sm " />
                ) : (
                  <BsCircleFill className="text-gray-400 text-sm" />
                )}
                <p
                  className={`text-center text-lg font-semibold ${
                    todo.done ? "line-through text-gray-500" : "text-gray-800"
                  }`}
                >
                  {todo.task}
                </p>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  className="bg-blue-500 text-white text-xl px-7 py-0.5 rounded "
                  onClick={() => {
                    setEditId(todo._id);
                    setTask(todo.task);
                  }}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white text-xl px-4 py-0.5 rounded"
                  onClick={() => handleDelete(todo._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
