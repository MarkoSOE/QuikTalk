import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import ChatDropDown from './Modal/Chatdropdown'
import { UseQueryClient } from 'react-query'



const CreateAChat = () => {

    const queryClient = UseQueryClient()

    const [show, setShow] = useState(false);
    const handleClose =() => setShow(false);
    const handleShow = () => setShow(true);

    const [users, setUsers] = useState([]);
    const [groupChatName, setGroupChatName] = useState('');
    const [filterName, setFilterName] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchQueryResults, setSearchQueryResults] = useState([]);

    //submit conversation to backend
    const handleSubmit = async (e) => {
        console.log("submitting data to server")
        
    }

    const handlefilterName = (e) => {
        setFilterName(e.target.value)
    }

    const handleGroupChatName = (e) => {
        setGroupChatName(e.target.value)
    }

    const addtoSelectedUsers = (e) => {
        e.preventDefault()
        console.log(e.target.value)
    }

    const removeSelectedUser = (e) => {
        e.preventDefault()
        console.log(e.target.value)
    }


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
                    <form>
                        <input type="text" name="groupChatName" onChange={handleGroupChatName} placeholder= "Group Chat Name"/>
                        <input type="text" name="addUsers" onChange={handlefilterName} placeholder= "Add users: e.g. Marko, Lisa, etc"/>
                    </form>
                    {/* Here we're going to display fultered users listed when the user types for users */}
                    {/* <ChatDropDown users={users} filterName={filterName}/> */}
                    <ul className="list-group">
                        {searchQuery !== '' && searchQueryResults?.slice(0, 6).map((user, index) => {
                            return (
                                <>
                                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                        <div>
                                            <span> 
                                                {user.firstname} 
                                                {user.lastname}
                                            </span>
                                        </div>
                                        <span className={user.status==="offline" ? "badge bg-secondary bg-pill" : "badge bg-success bg-pill"} onClick={addtoSelectedUsers(user)}>14</span>
                                    </li>
                                </>
                            )
                        })}
                    </ul>
                    {selectedUsers.length > 0 && selectedUsers.map((user, index) => {
                        return (
                            <span>
                                {user.firstname} {user.lastname}
                                <Button onClick={() => removeSelectedUser(user)}> remove </Button>
                            </span>
                        )
                    })}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSubmit}>
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