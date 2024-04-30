// TaskForm.jsx
import React, { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [task, setTask] = useState('');

  const handleChange = (event) => {
    setTask(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (task.trim() !== '') {
      onAddTask(task);
      setTask('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex items-center">
      <div className="flex">
        <input
          type="text"
          value={task}
          onChange={handleChange}
          placeholder="Enter your task..."
          className="border border-gray-300 px-3 py-2 rounded-l-md focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-2 rounded-r-md whitespace-nowrap align-middle"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
