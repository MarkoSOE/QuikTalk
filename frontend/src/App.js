import './App.css'
import {
  Routes,
  Route,
  Link
} from 'react-router-dom'

import Login from './components/Login'
import Signup from './components/Signup'
import MainPage from './components/MainPage'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path="/homepage" element={<MainPage />} exact/>
        <Route path="/signup" element={<Signup />} exact/>
      </Routes>
    </div>
)}

export default App