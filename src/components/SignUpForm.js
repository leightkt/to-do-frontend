import { useState } from 'react'

export default function SignUpForm(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()

        let user = {
            username, password
        }

        props.signUp(user)
            .then(() => props.history.push('/'))
            // push new route- push path into browser history. adds to history and navigates to it
    }

    const handleChange = ({ target }) => {
        target.name === "username" 
        ? setUsername(target.value) 
        : setPassword(target.value)
    }

    const showAlerts = () => props.alerts.map(alert => <p>{alert}</p>)

    return (
        <form className="signup-form" onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <label>Username</label>
            <input type="text" name="username" value={username} onChange={handleChange}/> 
            <label>Password</label>
            <input type="password" name="password" value={password} onChange={handleChange}/>
            <input type="submit" />
            { props.alerts ? showAlerts() : null }
        </form>
    )
}