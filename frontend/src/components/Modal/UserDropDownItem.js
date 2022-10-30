//here we take in a single user and display it in a list item

const UserDropDownItem = ({firstname, lastname, status, id}) => {

    return(
        <li key={id} className={"list-group-item d-flex justify-content-between align-items-center"} onClick={() => console.log(id)}>
            <span>
                {firstname}
            </span>
            <span>
                {lastname}
            </span>
            <span className={status==="offline" ? "badge bg-secondary bg-pill" : "badge bg-success bg-pill"}>14</span>
        </li>
    )


}

export default UserDropDownItem
