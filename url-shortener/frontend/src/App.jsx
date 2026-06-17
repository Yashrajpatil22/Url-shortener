import { useState } from 'react'
import Dashboard from './pages/Dashboard'
import Addurl from './pages/Addurl'
import Editurl from './pages/Editurl'
import { Routes, Route } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/addurl' element={<Addurl />} />
      <Route path='/editurl/:shortCode' element={<Editurl />} />
    </Routes>
  )
}

export default App
