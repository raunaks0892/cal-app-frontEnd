import React,{ Component,useState,useEffect,useRef } from "react";
import axios from "axios";
import validator from "validator";
import Login from "./Login";
import {toast} from 'react-toastify';
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate} from "react-router-dom";
import credData from "../config/config";
import "../User.css"

const CreateAccount = ()=>{
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [emailErrorMsg, setEmailErrorMsg] = useState('');
    const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
    var url = "" 

    if(credData.mode==="DEV"){
        url= credData.registerUrl_local;
    }else{
        url = credData.registerUrl_server;
    }
    
    const navigate = useNavigate();

    useEffect(()=>{
        setEmailErrorMsg('');
    },[username])
        
    useEffect(()=>{
        setPasswordErrorMsg('');
    },[password])

    const displaySuccessMsg = ()=>{
        setSuccessMsg("User Created Successfully");
        //toast.success('User Created Successfully',{position: toast.POSITION.TOP_CENTER})
    }

    const displayErrorMsg = (msg)=>{
        if(msg==="User already exists"||msg==="Please provide valid email id"){
            setEmailErrorMsg(msg);
        }else if(msg==="Improper user input"){
            setPasswordErrorMsg("Please provide password")
        }
        
        //toast.error(msg,{position: toast.POSITION.TOP_CENTER})
        // toast.error('User Already Exists')
    }

    
    const rigster = (e)=>{
        
        if(validator.isEmail(username)){
            axios({
                method:"POST",
                data:{
                    username:username,
                    password:password
                },
                withCredentials:true,
                url:url
            }).then((res)=>{
                console.log(res); 
                if(res.data!=='User already exists' && res.data!=='Improper user input'){
                    console.log(res.data); 
                    displaySuccessMsg();
                    setTimeout(() => navigate('/login'), 3000);
                    //navigate('/login');
                    //setStatus("success")
                    //displaySuccessMsg();
                    
                }else{
                    displayErrorMsg(res.data);
                }
                
            })
            

        }else{
            console.log("Please provide valid email id");
            displayErrorMsg("Please provide valid email id");
        }

        
    }
    return(
    
        <div className="register">
             <h2 className="registerTitle">Register</h2>
            <div className="registration-wrapper">
                <div className="userForm">  
                    {successMsg?
                    <div className="alert alert-success">
                        {successMsg}
                    </div>:""
                    }
                    <div>
                        <div>
                            <input className="userInput" type="email" placeholder="Email"  onChange={(e)=>setUserName(e.target.value)}/>
                        </div>
                        {emailErrorMsg?
                        <div className="alert alert-danger">
                            {emailErrorMsg}
                        </div>:""
                        }
                    
                   
                    </div>
                    <div>
                        <div>
                            <input className="userInput" type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                        </div>
                        {passwordErrorMsg?
                        <div className="alert alert-danger">
                            {passwordErrorMsg}
                        </div>:""
                        }
                    
                    </div>
                    <div>
                        <button className="userSubmit" type="submit" onClick={rigster}>Create User</button>
                    </div>
                </div>
            </div>

        </div>
        
        
    )
}

export default CreateAccount;