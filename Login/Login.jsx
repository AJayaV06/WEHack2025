import React, { useState } from "react";
import "./Login.css";
const Login = () => {
    const [action, setAction] = useState("Sign Up");
    return (
        //<div className = "welcome">
            //<div className = "welcome-text">Welcome to FinDocs</div>
        <div className="main">
            <div className = "welcome">
            <div className = "welcome-text">Welcome to FinDocs</div>
        </div>
        <div className = "my-element"> 
            <div className = 'container'>
                <div className = "header">
                    <div className="text">{action}</div>
                </div>
                <div className = "inputs">
                    <div className = "input">
                        <input type = "text" placeholder = "Name"/>
                    </div>
                    <div className = "input">
                        <input type = "password" placeholder = "Password" />
                    </div>
                </div>
                <div className="submit-container">
                    <div className={action === "Login" ? "submit gray" : "submit"} onClick = {()=> {setAction("Sign Up")}}>Sign Up</div>
                    <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick = {()=>{setAction("Login")}}>Login</div>
                </div>
            </div>
        </div>
        </div>
    )
    }
    export default Login;