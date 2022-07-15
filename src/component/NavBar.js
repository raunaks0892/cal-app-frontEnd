import "../App.css"
//import { BrowserRouter, Routes, Route, Navigate,Link } from "react-router-dom";

const NavBar = ()=>{
   

    // const logout = () => {
    //     axios.get("https://o-auth-video-backend.herokuapp.com/auth/logout", {
    //         withCredentials: true
    //     }).then((axiosResponse) => {
    //         if (res.data === "done") {
    //             window.location.href = "/"
    //         }
    //     })
    // }

    return (
        <div className="navBarWrapper">
            <sideBar/>
            <ul className="logout">
               
                <li>Logout</li>
                {/* {
                    userObject ? (
                    <li onClick={logout}>Logout </li>
                    ) : (
                        <li><Link to='/login'>Login</Link></li>
                    )
                } */}
            </ul>
        </div>

    )
}

export default NavBar;