import "./App.css";
import ReactCalendar from "./component/ReactCalendar";
import Login from "./component/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

//const loginSuccess_local = "http://localhost:3004/auth/login/success";
const loginSuccess_local = "http://localhost:3004/auth/getUser";
const loginSuccess_Server = "https://change-request-calendar-backnd.herokuapp.com/auth/getUser";
//const loginUrl = "http://localhost:3004/auth1/getUser";

const App = ()=>{
  const [user, setUser] = useState(null);
  
  // useEffect(() => {
  //   const getUser = () => {
  //     fetch(loginSuccess_local, {
  //       method: "GET",
  //       credentials: "include",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Credentials": true,
  //       },
  //     })
  //       .then((response) => {
  //         if (response.status === 200) return response.json();
  //         throw new Error("authentication has been failed!");
  //       })
  //       .then((resObject) => {
  //         console.log("current user: "+resObject.user);
  //         setUser(resObject.user);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };
  //   getUser();
  // }, []);

  useEffect(()=>{
     axios.get(loginSuccess_Server,{withCredentials:true}).then((response)=>{
      console.log("get user detail response : "+response.data);
      if(response.data){
        // let tempData = response.data; 
        // console.log("get user detail response length: "+tempData);
        setUser(response.data);
      }else{
        throw new Error("authentication has been failed!");
      }
     }).catch((err=>{
      console.log(err);
     }))
  },[])

  //console.log("user : ===>"+user);
  return(
    <BrowserRouter>
      <div>
        <Routes>
          {/* <Route path="/" element={<Login/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/calendar" element={<ReactCalendar/>}/> */}
          <Route path="/" element={user ? <Navigate to="/calendar"/> : <Login/>}/>
          <Route path="/login" element={user ? <Navigate to="/calendar"/> : <Login/>}/>
          <Route path="/calendar" element={user ? <ReactCalendar/>:<Navigate to="/login"/>}/>
        </Routes>
      </div>

    </BrowserRouter>
    
  );
}


export default App;