import "./App.css";
import ReactCalendar from "./component/ReactCalendar";
import Login from "./component/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Cal.css";

//const loginSuccess_local = "http://localhost:3004/auth/login/success";
const loginSuccess_local = "http://localhost:3004/auth/getUser";
const loginSuccess_Server = "https://change-request-calendar-backnd.herokuapp.com/auth/getUser";
//const loginUrl = "http://localhost:3004/auth1/getUser";

const App = ()=>{
  const [user, setUser] = useState(null);
 

  useEffect(()=>{
     axios.get(loginSuccess_local,{withCredentials:true}).then((response)=>{
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

  
  
  

  //console.log("user : ===>"+user);
  return(
    // <div>
    //   {user?<ReactCalendar/>:<Login/>}
      
    // </div>
    <BrowserRouter>
      <div>
        <Routes>
           {/* <Route path="/" element={<Login/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/calendar" element={<ReactCalendar/>}/>  */}
           <Route path="/" element={user ? <Navigate to="/calendar"/> : <Login/>}/>
          <Route path="/login" element={user ? <Navigate to="/calendar"/> : <Login/>}/>
          <Route path="/calendar" element={user ? <ReactCalendar/>:<Navigate to="/login"/>}/> 
          {/* <Route path="/" element={user ?<ReactCalendar/>:<Login/>}/>
          <Route path="/login" element={user ? <ReactCalendar/>:<Login/>}/>
          <Route path="/calendar" element={user ? <ReactCalendar/>:<Login/>}/> */}
        </Routes>
      </div>

    </BrowserRouter>
    
    
  );
}


export default App;