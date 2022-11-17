import { useState } from 'react'
import axios from 'axios'

import '../styles/mainpage.css'
import CreateAChat from '../components/SideBar/CreateAChat'
import SideBar from '../components/SideBar'
import ChatView from '../components/ChatView'

const MainPage = () => {

  //set up state to contain the message to be sent to the backend
  const [message, setMessage] = useState('')

  const handlemessageChange = (e) => {
    setMessage(e.target.value)
  }

  const messageSubmit = async (e) => {
    e.preventDefault()
    
    //send the message to the backend
    try {
      const newMessage = {
        message
      }
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }

      const body = JSON.stringify(newMessage)
      await axios
      .post('/message/createMessage',body, config)
      .then(res => {
        console.log(res.data)
    })
    } catch (error) {
      console.error(error) 
    }
    
  }

  return (
    <main className="grid-container">
        <SideBar />
        <ChatView messageSubmit={messageSubmit} handlemessageChange={handlemessageChange} />
    </main>
  )
}

export default MainPage