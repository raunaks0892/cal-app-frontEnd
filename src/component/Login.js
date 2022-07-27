import React, {useState, useEffect} from 'react';
import Google from "../img/Google.png";
import Google2 from "../img/Google_2.png"
import Github from "../img/GitHub.png";
import "../App.css"
import CreateAccount from "./CreateAccount";
import credData from "../config/config";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import validator from "validator";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const Login=()=>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [passwordErrorMsg, setPasswordErrorMsg] = useState('');

    var googleAuthUrl = "";
    var loginUrl = ""; 
    var calendarUrl = ""

    if(credData.mode==="DEV"){
        googleAuthUrl = "http://localhost:3004/auth/google";
        loginUrl = "http://localhost:3004/login";
        calendarUrl = "http://localhost:3000/calendar"
    }else{
        googleAuthUrl = "https://change-request-calendar-backnd.herokuapp.com/auth/google";
        loginUrl = "https://change-request-calendar-backnd.herokuapp.com/login";
        calendarUrl = "https://celebrated-sunburst-4e2aa7.netlify.app/calendar"
    }

    useEffect(()=>{
        setErrorMsg('');
    },[username])

    useEffect(()=>{
        setErrorMsg('');
    },[password])
        

    const displayErrorMsg = (msg)=>{
        setErrorMsg(msg);
    }
    
    const google = ()=>{
        window.open(googleAuthUrl,"_self");    
    }

    const handleSubmit = ()=>{
        console.log("handle submit started");
        if(validator.isEmail(username) && password){
        axios({
            method:"POST",
            headers:{
                'Access-Control-Allow-Origin' : 'true',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
            },
            data:{
                username:username,
                password:password
            },
            withCredentials:true,
            
            url:loginUrl
        }).then((res)=>{
            console.log(res)
            window.open(calendarUrl,'_self');
        })
        .catch((err)=>{
            console.log("Error while login using credentials: "+err)
            displayErrorMsg("Username/Password is invalid");
        })
    }else{
        console.log("Please provide valid email id and password");
        displayErrorMsg("Provide valid credentials");
    }

    }
    const createAccount = ()=>{
    //     <BrowserRouter>
    //      <Routes>
    //         <Navigate to="/calendar"/> : <Login/>>  
    //      </Routes>
    //  </BrowserRouter>

    }
    return(
        <div className="login">
            <h2 className="loginTitle">Choose a login method</h2>
            <div className="wrapper">
                <div className="left">
                    <div className="loginButton google" onClick={google}>
                        <img className="loginImg" src={Google2} alt="" />
                        Google
                    </div>
                    <div className="loginButton github">
                        <img className="loginImg" src={Github} alt="" />
                        Github
                    </div>
                </div>
                <div className="center">
                    <div className="line"/>
                    <div className="or">
                        OR
                    </div>
                    

                </div>
                <div className="right">
                    {/* hello
                     {errorMsg?
                        <div className='alert alert-danger'>
                            {errorMsg}
                        </div>:""
                    }  */}
                    <div>
                        {errorMsg?
                            <div className='alert alert-danger'>
                                {errorMsg}
                            </div>:""
                        } 
                        <div>
                            <input className="input" type="email" placeholder="Email" onChange={(e)=>setUsername(e.target.value)}/>
                        </div>
                    </div>
                    <div>
                        <input className="input" type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    
                    
                    <div className="submit-area">
                        <button className="submit" type="submit" onClick={handleSubmit}>Login</button>
                        <div className="password"><Link to={'/forgotPassword'}>forgot password?</Link></div>
                        {/* <div className="password"><a href="">forgot password?</a></div> */}
                    </div>
                    
                    <div>
                       <button className="new_account" type="submit" ><Link className="new-account-link" to={'/register'}>Create new Account</Link></button> 
                    </div>
                </div>
                
            </div>

        </div>
    )

}

export default Login;