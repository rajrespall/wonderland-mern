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
import ProfilePage from './screens/Parent/Profile'

import Resources from './screens/Parent/Resources'
import Communication from './screens/Parent/Resources/Communication'
import Emotional from './screens/Parent/Resources/Emotional'
import Routines from './screens/Parent/Resources/Routines'
import Sensory from './screens/Parent/Resources/Sensory'
import Social from './screens/Parent/Resources/Social'

import Dashboard from './screens/Children/Dashboard'
import AboutUs from './screens/AboutUs'

import ProtectedAssessmentRoute from './components/ProtectedRoutes/ProtectedAssessmentRoute'
import PublicRoute from './components/ProtectedRoutes/PublicRoute';
import Institutions from './screens/Parent/Institutions'

function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />

          {/* ============================================== */}
          {/* parentside */}
          <Route path='/home' element={<ParentPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/institutions' element={<Institutions />} />
          <Route path='/resources' element={<Resources />} />
          <Route path='/resources/communication' element={<Communication />} />
          <Route path='/resources/emotional' element={<Emotional />} />
          <Route path='/resources/routines' element={<Routines />} />
          <Route path='/resources/sensory' element={<Sensory />} />
          <Route path='/resources/social' element={<Social />} />
          {/* ============================================ */}

          {/* =================================================== */}
          {/* Children side */}
             <Route path='/dashboard' element={<Dashboard />} />
          {/* =================================================== */}


          {/* Public routes with authentication check */}
          <Route path='/login' element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } />
          <Route path='/register' element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } />


          <Route path='/whosusing' element={<WhosUsing />} />
          
          {/* Protected Assessment Routes */}
          <Route path='/getstarted' element={
            <ProtectedAssessmentRoute>
              <GetStarted />
            </ProtectedAssessmentRoute>
          } />
          <Route path='/assessment' element={
            <ProtectedAssessmentRoute>
              <Assessment />
            </ProtectedAssessmentRoute>
          } />
          <Route path='/communication' element={
            <ProtectedAssessmentRoute>
              <Question1 />
            </ProtectedAssessmentRoute>
          } />
          <Route path='/social-interaction' element={
            <ProtectedAssessmentRoute>
              <Question2 />
            </ProtectedAssessmentRoute>
          } />
          <Route path='/sensory' element={
            <ProtectedAssessmentRoute>
              <Question3 />
            </ProtectedAssessmentRoute>
          } />
          <Route path='/emotional' element={
            <ProtectedAssessmentRoute>
              <Question4 />
            </ProtectedAssessmentRoute>
          } />
          <Route path='/routines' element={
            <ProtectedAssessmentRoute>
              <Question5 />
            </ProtectedAssessmentRoute>
          } />
          <Route path='/others' element={
            <ProtectedAssessmentRoute>
              <OtherSymptoms />
            </ProtectedAssessmentRoute>
          } />
        {/* =================================================== */}

          <Route path='/aboutus' element={<AboutUs />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App