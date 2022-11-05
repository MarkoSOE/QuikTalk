import './App.css'
import {
  Routes,
  Route,
  Link
} from 'react-router-dom'


import Login from './pages/Login'
import Signup from './pages/Signup'
import MainPage from './pages/MainPage'

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