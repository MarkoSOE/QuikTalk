import { useState } from 'react'
import axios from 'axios'

import '../styles/mainpage.css'
import CreateAChat from '../components/CreateAChat'

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
        <article className="conversation-list">
            This is a test
            <div className='container'>
                    <div className="messages">Messages:</div>
                    <CreateAChat />
                    <div className="find-chat">Find a user to chat with</div>
                    <div className="conversations">Conversations</div>
            </div>
        </article>
        <article className="conversation-focus">
            This is another test
            <div className='container'>
                <div className='current-conversation'></div>
                <div className='message-input'>
                    <form onSubmit={messageSubmit} method={'POST'}>
                        <input type='text' onChange={handlemessageChange} placeholder='Type a message...'></input>
                        <button type='submit'>Send</button>
                    </form>
                </div>
            </div>
        </article>
    </main>
  )
}

export default MainPage