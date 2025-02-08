import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './screens/Home'
import LoginPage from './screens/Login'
import Register from './screens/Register'
import WhosUsing from './screens/WhosUsing'
import GetStarted from './screens/Assessment/GetStarted'
import Assessment from './screens/Assessment/Assessment'
import Question1 from './screens/Assessment/Communication'
import Question2 from './screens/Assessment/Social'
import Question3 from './screens/Assessment/Sensory'
import Question4 from './screens/Assessment/Emotional'
import Question5 from './screens/Assessment/Routines'
import OtherSymptoms from './screens/Assessment/Others'
import ParentHome from './screens/Parent/ParentHome'

function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/parenthome' element={<ParentHome />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/whosusing' element={<WhosUsing />} />
          
          <Route path='/getstarted' element={<GetStarted />} />
          <Route path='/assessment' element={<Assessment />} />
          <Route path='/communication' element={<Question1 />} />
          <Route path='/social-interaction' element={<Question2 />} />
          <Route path='/sensory' element={<Question3 />} />
          <Route path='/emotional' element={<Question4 />} />
          <Route path='/routines' element={<Question5 />} />
          <Route path='/others' element={<OtherSymptoms />} />

        </Routes>
    </BrowserRouter>
  )
}

export default App
