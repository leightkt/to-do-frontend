import { useState, useEffect } from 'react'

export default function SignUpForm(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [login, setLogin] = useState(false)

    useEffect(() => {
        localStorage.removeItem('token')
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()

        let user = {
            username, 
            password
        }

        login 
            ? props.login(user)
                .then(() => props.history.push('/'))
            : props.signUp(user)
                .then(() => props.history.push('/'))
            // push new route- push path into browser history. adds to history and navigates to it
    }

    const handleChange = ({ target }) => {
        target.name === "username" 
        ? setUsername(target.value) 
        : setPassword(target.value)
    }

    const handleLoginForm = (event) => {
        event.preventDefault()
        setLogin(!login)
    }

    const showAlerts = () => props.alerts.map(alert => <p>{alert}</p>)

    return (
        <form className="signup-form" onSubmit={handleSubmit}>
            {login ? <h1>Log In</h1> : <h1>Sign Up</h1>}
            <label>Username</label>
            <input type="text" name="username" value={username} onChange={handleChange}/> 
            <label>Password</label>
            <input type="password" name="password" value={password} onChange={handleChange}/>
            <input type="submit" />
            { props.alerts ? showAlerts() : null }
            { login 
                ? <p>Not a member? <button onClick={handleLoginForm}>Sign Up</button></p>
                : <p>Already a member? <button onClick={handleLoginForm}>LOG IN</button></p>
            }
        </form>
    )
}