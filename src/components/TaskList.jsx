// TaskList.jsx
import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onEdit, onDelete }) => {
  return (
    <div className="mt-6 w-full">
      <h2 className="text-lg font-semibold">Tasks:</h2>
      {tasks.map((task, index) => (
        <TaskItem key={index} task={task} onEdit={() => onEdit(index)} onDelete={() => onDelete(index)} />
      ))}
    </div>
  );
};

export default TaskList;
