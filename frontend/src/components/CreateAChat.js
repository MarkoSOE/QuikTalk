import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



const CreateAChat = () => {

    const [show, setShow] = useState(false);
    const handleClose =() => setShow(false);
    const handleShow = () => setShow(true);

    const[users, setUsers] = useState('');

    const handleUsersChange = (e) => {
        setUsers(e.target.value)
        console.log(e.target.value)
    }
    

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Create GroupChat
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Create a GroupChat</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <label>
                            GroupChat Name:
                            <input type="text" name="name" />
                        </label>
                        <label> 
                            Select Users:
                            <input type="text" name="addUsers" onChange={handleUsersChange}/>
                        </label>
                    </form>
                    {/* Here we're going to display all the users listed when the user types for users */}
                    <div className="displayUsers" style={{"height": "399px"}}>
                    
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Create Chat
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}


export default CreateAChat;