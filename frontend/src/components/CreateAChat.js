import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { useQueryClient } from 'react-query'




const CreateAChat = () => {

    const [show, setShow] = useState(false);
    const handleClose =() => setShow(false);
    // const handleShow = () => setShow(true);

    //this will hold all the users we obtain from the backend
    const[groupChatName, setGroupChatName] = useState('')
    const[selectedUsers, setSelectedUsers] = useState([])
    const[searchQuery, setSearchQuery] = useState("")
    const[searchQueryResults, setSearchQueryResults] = useState([])
    const[users, setUsers] = useState([])
    const[filter, setFilter] = useState('')

    const handleUsersChange = (e) => {
        setFilter(e.target.value)
    }
    //want to access all the users in the database and store their information in an array
    const getUsers = async () => {
        setShow(true);
        try {
            const res = await axios.get('/users')
            setUsers(res.data)
            console.log(res.data)
        } catch (error) {
            console.error(error)
        }
    }

    const handleSearch = async(input) => {
        console.log(input)
        setSearchQuery(input)
        if(!input){
            return
        }
        try {
            const data = await axios.get(`/${searchQuery}`)

            setSearchQueryResults(data)
            console.log(searchQueryResults)
        } catch (error) {
            console.log(error)
        }
    }

    const addtoSelectedUsers = (user) => {
        if(addtoSelectedUsers.includes(user)){
            return
        }
        setSelectedUsers([...selectedUsers, user])
    }
    //add the selected user to the list of addUsers

    return (
        <>
            <Button variant="primary" onClick={getUsers}>
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
                    <input
                        className="group-chat-input"
                        type="text"
                        placeholder="Group chat name"
                        value={groupChatName}
                        onChange={(e) => setGroupChatName(e.target.value)}
                        >
                    </input>

                    <input
                        className="group-chat-input"
                        type="text"
                        placeholder="Add users e.g: Sam, Leon, etc."
                        onChange={(e) => handleSearch(e.target.value)}
                        >
                    </input>

                    {/* <ul className="group-chat-user-finder-container">
                    {searchQueryResults.map((user, index) => {
                        return (
                        <li key={index} className="online-user-wrapper">
                            <div className="user-status-info">
                            <span className="user-status-name">
                                {user.firstName} {user.lastName}
                            </span>

                            <span className="user-status-subtitle">New User</span>
                            </div>
                            <span className="user-status-online-indicator grey"></span>
                            <div
                            className="invisible-search-wrapper"
                            id={user}
                            onClick={() => addtoSelectedUsers(user)}
                            ></div>
                        </li>);
                        })}
                    </ul> */}
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