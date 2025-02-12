import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './screens/Home'
import LoginPage from './screens/Login'
import Register from './screens/Register'
import WhosUsing from './screens/WhosUsing'
import GetStarted from './screens/GetStarted'
import Assessment from './screens/Assessment'
import Question1 from './screens/Communication'
import Question2 from './screens/Social'
import Question3 from './screens/Sensory'
import Question4 from './screens/Emotional'
import Question5 from './screens/Routines'
import OtherSymptoms from './screens/Others'
import ParentPage from './screens/Parent/ParentPage'
<<<<<<< HEAD
import Recors from './screens/Parent/Recors'

=======
import AboutUs from './screens/AboutUs'
import Admin from './screens/Admin/AdminHome'
>>>>>>> ef8e1aebd8bdcd18d5654bad34d9fbd18c58b367

function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />

          {/* ============================================== */}
          {/* parentside */}
          <Route path='/home' element={<ParentPage />} />
          <Route path='/records' element={<Recors />} />
          {/* ============================================ */}




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
          <Route path='/aboutus' element={<AboutUs />} />

          <Route path='/admin' element={<Admin />} />

        </Routes>
    </BrowserRouter>
  )
}

export default App
