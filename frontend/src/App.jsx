import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './screens/Home'
import LoginPage from './screens/Login'
import Register from './screens/Register'
import WhosUsing from './screens/WhosUsing'
import GetStarted from './screens/GetStarted'
import Assessment from './screens/Assessment'

function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/whosusing' element={<WhosUsing />} />
          <Route path='/getstarted' element={<GetStarted />} />
          <Route path='/assessment' element={<Assessment />} />


        </Routes>
    </BrowserRouter>
  )
}

export default App
