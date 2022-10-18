import React, {useState, useEffect} from "react";
import './App.css'
import {
  Routes,
  Route,
  Link
} from 'react-router-dom'

import Login from './components/Login'
import Signup from './components/Signup'


const App = () => {
  return (
    <div>
      <h1>
        Sign in
      </h1>
      <h2>
        New Here? <Link to='/signup'> Create an Account! </Link>
      </h2>
      <h2>
        <Link to='/login'> Login </Link>
      </h2>
      <h2>
        <Link to='/signup'> signup </Link>
      </h2>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
      </Routes>
    </div>
)}

export default App