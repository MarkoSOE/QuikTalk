import React from "react"

const Login = () => {
    return(
        <>
        <form>
            <label>
                <p> Email </p>
                <input type="text" />
            </label>
            <label>
                <p> Password </p>
                <input type="password" />
            </label>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
        </>
    )
}

export default Login