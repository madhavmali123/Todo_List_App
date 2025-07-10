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
  useEffect(() => {
    axios
      .get("http://localhost:3000/get")
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  }, []);

const handleEdit = (id) => {
  axios.put(`http://localhost:3000/get/update/${id}`)
    .then(() => {
      axios.get("http://localhost:3000/get")
        .then(res => setTodos(res.data));
    })
    .catch(err => console.log(err));
};

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/delete/${id}`)
      .then(()=>{
         axios.get("http://localhost:3000/get")
        .then(res => setTodos(res.data));
      })
      .catch((err) => console.log(err));

      
  };
  return (
    <div className="p-4 bg-gradient-to-br from-purple-400 to-blue-300 min-h-screen">
  <h2 className="text-4xl font-bold text-white text-center mb-6">Todo List App By 'Madhav'</h2>
  <Create />

  {todos.length === 0 ? (
    <div>
      <h2 className="text-2xl text-white text-center mt-6">No todos to display</h2>
    </div>
  ) : (
    <div className="grid grid-cols-2 grid-cols-3 grid-cols-4 grid-cols-5 gap-6 mt-6 ">
      {todos.map((todo) => (
        <div
          key={todo._id}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105 aspect-square flex flex-col justify-between p-4"
        >
          <div
            className="flex flex-col items-center gap-3"
            onClick={() => handleEdit(todo._id)}
          >
            {todo.done ? (
              <BsFillCheckCircleFill className="text-green-500 text-3xl" />
            ) : (
              <BsCircleFill className="text-gray-400 text-3xl" />
            )}
            <p className={`text-center text-lg font-semibold ${todo.done ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {todo.task}
            </p>

              <p className={`text-center text-lg  'text-gray-800'}`}>
              {todo.date}
            </p>
             <p className={`text-center text-lg  'text-gray-800'}`}>
              {todo.time}
            </p>

            
          </div>
          <div className="flex justify-center mt-4">
            <BsFillTrashFill
              className="text-red-500 text-xl cursor-pointer hover:text-red-700"
              onClick={() => handleDelete(todo._id)}
            />
          </div>
        </div>
      ))}
    </div>
  )}
</div>

  );
}

export default Home;
