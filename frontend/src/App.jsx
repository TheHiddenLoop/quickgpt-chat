import React from 'react'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'

function App() {
  return (
    <div className='min-h-screen bg-bgPrimary'>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
      </Routes>
    </div>
  )
}

export default App
