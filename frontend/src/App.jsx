import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import NavigationBar from './components/NavigationBar'
import Home from './screens/Home'
import LoginPage from './screens/Login'
import Register from './screens/Register'
import WhosUsing from './screens/WhosUsing'
import GetStarted from './screens/GetStarted'

function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/whosusing' element={<WhosUsing />} />
          <Route path='/getstarted' element={<GetStarted />} />

        </Routes>
    </BrowserRouter>
  )
}

export default App
