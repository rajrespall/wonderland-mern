import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import NavigationBar from './components/NavigationBar'
import Home from './screens/Home'
import LoginPage from './screens/Login'

function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
