import '../styles/mainpage.css'

const MainPage = () => {
  return (
    <main className="grid-container">
        <article className="conversation-list">
            This is a test
            <div className='container'>
                    <div className="messages">Messages:</div>
                    <div className="create-a-chat">Create a Chat: </div>
                    <div className="find-chat">Find a user to chat with</div>
                    <div className="conversations">Conversations</div>
            </div>
        </article>
        <article className="conversation-focus">
            This is another test
        </article>
    </main>
  )
}

export default MainPage