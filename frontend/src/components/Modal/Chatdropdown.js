//This component will take in the array of users and display them in a list for the user to select from
import UserDropDownItem from "./UserDropDownItem"

const ChatDropDown = ({users, filterName}) => {
    const filteredUsers = users.filter(users=> users.firstname.toLowerCase().includes(filterName.toLowerCase()))

    return(
        <>
            <ul className="list-group">
                {filteredUsers.map((user) => (
                    <UserDropDownItem firstname={user.firstname} lastname={user.lastname} status={user.userStatus} id={user._id}/>
                ))}
            </ul>
        </>
    )
}

export default ChatDropDown