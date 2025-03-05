import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminHome from './screens/Admin/Dashboard'
import Login from './screens/Admin/Login'
import PDF from './components/Admin/Pdf'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AdminHome />} />
        <Route path='/adminlogin' element={<Login />} />
        <Route path='/PDF' element={<PDF />} />


      </Routes>
    </BrowserRouter>
  )
}

export default App
