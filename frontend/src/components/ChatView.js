import React from "react"

const ChatView = ({ messageSubmit, handlemessageChange }) => {
    return (
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
    )
}

export default ChatView