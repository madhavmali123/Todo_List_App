import React from "react";

function Create({ task, setTask, handleAdd, handleUpdate, editId }) {
  return (
    <div className="p-4 flex items-center gap-4">
      <input
        className="rounded-lg p-2 shadow-md border-2"
        type="text"
        value={task}
        placeholder="Enter task"
        onChange={(e) => setTask(e.target.value)}
      />
      {editId ? (
        <button
          type="button"
          onClick={handleUpdate}
          className="bg-green-600 text-white px-4 border-2 p-2 shadow-md rounded-lg"
        >
          Save
        </button>
      ) : (
        <button
          type="button"
          onClick={handleAdd}
          className="bg-gradient-to-r from-blue-600 to-purple-700 text-white px-4 border-2 p-2 shadow-md rounded-lg"
        >
          Add Task
        </button>
      )}
    </div>
  );
}

export default Create;
