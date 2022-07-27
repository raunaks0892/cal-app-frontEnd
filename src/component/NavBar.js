import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css"
import "../Cal.css";
import StanfordWhiteLogo from "../img/Stanford_White_logo.png";
import credData from "../config/config";
//import { BrowserRouter, Routes, Route, Navigate,Link } from "react-router-dom";

const NavBar = ()=>{
    var getUserUrl = "";
    var logoutUrl = "";

    if(credData.mode==="DEV"){
        getUserUrl = credData.getUserUrl_local;
        logoutUrl = credData.logoutUrl_local;
        
    }else{
        getUserUrl = credData.getUserUrl_server;
        logoutUrl = credData.logoutUrl_server;     
    }

    const [user, setUser] = useState(null);

    useEffect(()=>{
        axios.get(getUserUrl,{withCredentials:true}).then((response)=>{
         //console.log("get user detail response : "+response.data);
         if(response.data){
            console.log("got response using getUserUrl");
           // let tempData = response.data; 
           // console.log("get user detail response length: "+tempData);
           setUser(response.data);
           //setUser(false);
         }else{
           throw new Error("authentication has been failed!");
         }
        }).catch((err=>{
         console.log(err);
        }))
     },[])
   

    const logout = () => {
        console.log("clicked on logout button");
        window.open(logoutUrl, "_self");
        // axios.get(logoutUrl, {
        //     withCredentials: true
        // }).then((res) => {
        //     if (res.data === "done") {
        //         window.location.href = "/"
        //     }
        // })
    }
     // <i className="bi bi-person-circle">
                    //     {/* {
                    //         user?user:""
                    //     } */}
                    // </i>

    return (
        <div className="navBar-container">
            <div className="navBar">
                <div className="logo">
                    <img src={StanfordWhiteLogo} alt="Stanford"/>
                </div>

                <div className="login-logo">
                    {user?<i className="bi bi-person-circle">{(user.username).replace("@gmail.com","")}</i>:""}                   
                </div>
                <div className="logout" onClick={logout}>
                    {user?"Logout":""}
                </div>
            </div>
            
        </div>
        // <div className="navBarWrapper">
        //     <sideBar/>
        //     <ul className="logout">
               
        //         <li>Logout</li>
        //         {/* {
        //             userObject ? (
        //             <li onClick={logout}>Logout </li>
        //             ) : (
        //                 <li><Link to='/login'>Login</Link></li>
        //             )
        //         } */}
        //     </ul>
        // </div>

    )
}

export default NavBar;