import "./App.css";
import ReactCalendar from "./component/ReactCalendar";
import Login from "./component/Login";
import CreateAccount from "./component/CreateAccount";
import ForgotPassword from "./component/ForgotPassword";
import NavBar from "./component/NavBar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Cal.css";
import StanfordWhiteLogo from "./img/Stanford_White_logo.png";

const loginSuccess_local = "http://localhost:3004/auth/getUser";
const loginSuccess_Server = "https://change-request-calendar-backnd.herokuapp.com/auth/getUser";


const App = ()=>{
  const [user, setUser] = useState(null);
 

  useEffect(()=>{
     axios.get(loginSuccess_Server,{withCredentials:true}).then((response)=>{
      //console.log("get user detail response : "+response.data);
      if(response.data){
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

  const handleForgotPasswordPage = ()=>{

  }
  

  //console.log("user : ===>"+user);
  return(
    <div>
      <div>
        <NavBar/>
      </div>
      {/* <div className="navBar">
        <div className="logo">
          <img src={StanfordWhiteLogo} alt="Stanford"/>
        </div>
      </div> */}
    
      <div>
     <BrowserRouter>
       <div>
         <Routes>

          {/* <Route path="/" element={user ? <Navigate to="/calendar"/> : <CreateAccount/>}/> */}
          <Route path="/" element={user ? <Navigate to="/calendar"/> : <Login/>}/> 
          <Route path="/login" element={user ? <Navigate to="/calendar"/> : <Login/>}/>
          <Route path="/calendar" element={user ? <ReactCalendar/>:<Navigate to="/login"/>}/> 
          <Route exact path="/register" element={<CreateAccount/>}/>
          <Route exact path="/forgotPassword" element={<ForgotPassword/>}/>
         </Routes>
         <ToastContainer/>
       </div>

     </BrowserRouter>
     </div>
     </div>
  );
}


export default App;