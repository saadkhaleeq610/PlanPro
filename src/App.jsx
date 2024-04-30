import { useState } from 'react'
import Navbar from './components/Navbar'
import TaskInput from './components/TaskInput'
import './App.css'

function App() {
  return (
    <>
      <Navbar/>
      <TaskInput/>
    </>
  )
}

export default App