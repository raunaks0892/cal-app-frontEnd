import "./App.css";
import ReactCalendar from "./component/ReactCalendar";
import Login from "./component/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./component/NavBar";
import SideBar from "./component/SideBar";
import DateRangePicker from "daterangepicker";
import "./Cal.css";
import logo from "./img/logo_2.png"

//const loginSuccess_local = "http://localhost:3004/auth/login/success";
const loginSuccess_local = "http://localhost:3004/auth/getUser";
const loginSuccess_Server = "https://change-request-calendar-backnd.herokuapp.com/auth/getUser";
//const loginUrl = "http://localhost:3004/auth1/getUser";

const App = ()=>{
  const [user, setUser] = useState(null);
  const [inactive, setInactive] = useState(false);
  const [leftExpand, setLeftExpand] = useState(false);
  const [contract, setContract] = useState(false);
  const [rightExpand, setRightExpand] = useState(false);
  
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

  const handleclicktoggle = ()=>{
    setInactive(!inactive);
    setLeftExpand(!leftExpand);
  }
  const handleclickrightoggle = ()=>{
    setContract(!contract);
    setRightExpand(!rightExpand);

  }
  
  

  //console.log("user : ===>"+user);
  return(
    <BrowserRouter>
      <div>
        <Routes>
           <Route path="/" element={<Login/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/calendar" element={<ReactCalendar/>}/> 
          {/* <Route path="/" element={user ? <Navigate to="/calendar"/> : <Login/>}/>
          <Route path="/login" element={user ? <Navigate to="/calendar"/> : <Login/>}/>
          <Route path="/calendar" element={user ? <ReactCalendar/>:<Navigate to="/login"/>}/>  */}
          {/* <Route path="/" element={user ?<ReactCalendar/>:<Login/>}/>
          <Route path="/login" element={user ? <ReactCalendar/>:<Login/>}/>
          <Route path="/calendar" element={user ? <ReactCalendar/>:<Login/>}/> */}
        </Routes>
      </div>

    </BrowserRouter>
    
    
  );
}


export default App;