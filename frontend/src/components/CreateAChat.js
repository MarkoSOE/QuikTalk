import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { UseQueryClient } from 'react-query'



const CreateAChat = () => {

    // const queryClient = UseQueryClient()

    const [show, setShow] = useState(false);
    const handleClose =() => setShow(false);
    const handleShow = () => setShow(true);

    const [users, setUsers] = useState([]);
    const [groupChatName, setGroupChatName] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    
    const [searchQuery, setSearchQuery] = useState('');
    const [searchQueryResults, setSearchQueryResults] = useState([]);

    // useEffect(() => {
    //     setSearchQueryResults([])
    // }, [searchQuery])

    useEffect(() => {
        let searchResults;
        if(searchQuery){
            searchResults = singleSearch(searchQuery)
        }
        setSearchQueryResults(searchResults)
    }, [searchQuery])


    //want to access all the users in the database and store their information in the users array
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

    const singleSearch = async(search) =>{
        try {
            const req = await axios.get(`/singleuser`, {
                params : {firstName : search}
            })
            console.log(req.data)
            return req.data
        } catch (error) {
            console.log(error)
        }
    }

    const handleSearch = async(input) => {
        setSearchQuery(input)
    }

    const addToSelectedUsers = (user) => {
        if(addToSelectedUsers.includes(user)){
            return
        }
        setSelectedUsers([...selectedUsers, user])
    }
    //add the selected user to the list of addUsers

    return (
        <>
            <React.StrictMode>
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
                    <div className='container'>
                        <h1 className="modal-title">Create Group Chat</h1>
                        <input
                        className="group-chat-input"
                        type="text"
                        placeholder="Group chat name"
                        value={groupChatName}
                        onChange={(e) => setGroupChatName(e.target.value)}
                        ></input>

                        <input
                        className="group-chat-input"
                        type="text"
                        placeholder="Add users e.g: Sam, Leon, etc."
                        onChange={(e) => handleSearch(e.target.value.toLowerCase())}
                        ></input>
                        <button onClick={()=> console.log(searchQueryResults)}> show state</button>
                        {/* <ul className="group-chat-user-finder-container">
                        {searchQuery !== '' && searchQueryResults?.map((user, index) => {
                            return (
                            <li key={index} className="online-user-wrapper">
                                <div className="user-status-info">
                                <span className="user-status-name">
                                    {user?.firstName} {user?.lastName}
                                </span>

                                <span className="user-status-subtitle">New User</span>
                                </div>
                                <span className="user-status-online-indicator grey"></span>
                                <div
                                className="invisible-search-wrapper"
                                id={user}
                                onClick={() => addToSelectedUsers(user)}
                                ></div>
                            </li>
                            );
                        })}
                        </ul> */}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" >
                        Create Chat
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            </React.StrictMode>
        </>
    )
}


export default CreateAChat;