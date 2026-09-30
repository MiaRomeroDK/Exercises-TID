import { useState } from "react";
import Parse from 'parse';

export default function AuthPage({ onAuthenticated }) {
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSignUp(e) {
        e.preventDefault();
        setError("");
        try {
            const user = new Parse.User();
            user.set("username", userName);
            user.set("password", password);
            await user.signUp();
            onAuthenticated(user);
        } catch (err) {
            setError(err.message);
        }
    }

    async function handleLogin(e) {
        e.preventDefault();
        setError("");
        try {
            const user = await Parse.User.logIn(userName, password);
            onAuthenticated(user);
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <>
        <h1>Welcome to the awesome TODO-list-app!!</h1>
        {error && <p style={{color: "red"}}>{error}</p>}

        <form>
            <input 
                type="text"
                placeholder="Username"
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input 
                type="password" //if type="text" had been used, would have been saved as plaintext. 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}    
            />
            <button onClick={handleSignUp}>Sign up</button>
            <button onClick={handleLogin}>Log in</button>
        </form>
        </>
    )

}