import React, { useState, useEffect } from 'react';
import { DndContext, closestCenter, MouseSensor, TouchSensor, useSensor, useSensors, DragOverlay } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const TaskInput = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskIndex, setEditedTaskIndex] = useState(null);
  const [editedTaskValue, setEditedTaskValue] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState('');
  const [indexToDelete, setIndexToDelete] = useState(null);
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor)
  );

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleChange = (event) => {
    setTask(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (task.trim() !== '') {
      setTasks([...tasks, task]);
      setTask('');
    }
  };

  const handleEdit = (index) => {
    setIsEditing(true);
    setEditedTaskIndex(index);
    setEditedTaskValue(tasks[index]);
  };

  const handleSaveEdit = () => {
    const updatedTasks = [...tasks];
    updatedTasks[editedTaskIndex] = editedTaskValue;
    setTasks(updatedTasks);
    setIsEditing(false);
    setEditedTaskIndex(null);
    setEditedTaskValue('');
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedTaskIndex(null);
    setEditedTaskValue('');
  };

  const handleDelete = (index) => {
    setTaskToDelete(tasks[index]);
    setShowDeleteModal(true);
    setIndexToDelete(index);
  };

  const confirmDelete = () => {
    const updatedTasks = tasks.filter((_, i) => i !== indexToDelete);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
    setShowDeleteModal(false);
  };

  const handleDragEnd = ({ active, over }) => {
    if (active && over && active.id !== over.id) {
      const oldIndex = tasks.findIndex(task => task === active.id);
      const newIndex = tasks.findIndex(task => task === over.id);
      const newTasks = arrayMove(tasks, oldIndex, newIndex);
      setTasks(newTasks);
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex flex-col items-center">
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
        <div className="mt-6 w-full">
          <h2 className="text-lg font-semibold">Tasks:</h2>
          {tasks.map((task, index) => (
            <div
              key={task}
              id={task} // Add unique ID for dnd-kit
              className="bg-gray-100 rounded-md p-3 my-2 w-full flex items-center justify-between"
              style={{ touchAction: 'none' }} // Disable touch scrolling
            >
              <div>
                {isEditing && editedTaskIndex === index ? (
                  <input
                    type="text"
                    value={editedTaskValue}
                    onChange={(e) => setEditedTaskValue(e.target.value)}
                  />
                ) : (
                  <span>{task}</span>
                )}
              </div>
              <div className="flex items-center">
                {isEditing && editedTaskIndex === index ? (
                  <>
                    <button className="text-green-500 hover:text-blue-700 mr-2" onClick={handleSaveEdit}>Save</button>
                    <button className="text-red-500 hover:text-purple-700 mr-2" onClick={handleCancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button className="text-blue-500 hover:text-blue-700 mr-2" onClick={() => handleEdit(index)}>Edit</button>
                    <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(index)}>Delete</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        <DeleteConfirmationModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
          task={taskToDelete}
        />
        <DragOverlay>
          {({ active }) => (
            active && (
              <div className="bg-gray-200 p-2 rounded-md shadow-md">
                Moving {active.id}
              </div>
            )
          )}
        </DragOverlay>
      </div>
    </DndContext>
  );
};

export default TaskInput;
