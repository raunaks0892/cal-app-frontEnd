import React,{ Component,useState,useEffect,useRef } from "react";
import axios from "axios";
import validator from "validator";
import "bootstrap/dist/css/bootstrap.min.css";
import "../User.css"
import credData from "../config/config";
import { useNavigate} from "react-router-dom";


const ForgotPassword = (props)=>{
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const navigate = useNavigate();

    var url = "";

    if(credData.mode==="DEV"){
        url=credData.updateUrl_local;
    }else{
        url = credData.updateUrl_server;
    }

    

    useEffect(()=>{
        setErrorMsg('');
        setSuccessMsg('');
    },[username,password,confirmPassword])

    const displayErrorMsg = (msg)=>{
       
        setErrorMsg(msg);
    }

    const handleSubmit = ()=>{
        setErrorMsg('');
        setSuccessMsg('');
        //console.log("forgot password handle submit started")
        
        if(validator.isEmail(username) && password){
            if(password==confirmPassword){
                console.log("working fine")
                axios({
                    method:"POST",
                    data:{
                        username:username,
                        password:password
                    },
                    withCredentials:true,           
                    url:url
                }).then((res)=>{
                    console.log(res.data)
                    setSuccessMsg(res.data);
                    setTimeout(()=>navigate('/login'), 3000)
                })
                .catch((err)=>{console.log(err)});
            }else{
                console.log("Password mismatch")
                displayErrorMsg("Password mismatch");
            }
        }else{
            console.log("Provide Valid Email Id");
            displayErrorMsg("Provide Valid Email Id and password");

        }


    }
    return(
        <div className="register">
             <h2 className="registerTitle">Forgot Password</h2>
            <div className="registration-wrapper">
                <div className="userForm">
                    <div >
                        {errorMsg?
                            <div className='alert alert-danger'>
                                {errorMsg}
                            </div>:successMsg?<div className="alert alert-success">{successMsg}</div>:""
                        }
                    </div>
                    <div>
                        <input className="userInput" type="email" placeholder="Email" onChange={(e)=>setUserName(e.target.value)}/>
                    </div>
                    <div>
                        <input className="userInput" type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <div>
                        <input className="userInput" type="password" placeholder="Confirm Password" onChange={(e)=>setConfirmPassword(e.target.value)}/>
                    </div>
                    <div>
                        <button className="userSubmit" type="submit" onClick={handleSubmit}>Update Password</button>
                    </div>
                    
                  
                </div>
            </div>

        </div>
        
        
    )
}

export default ForgotPassword;