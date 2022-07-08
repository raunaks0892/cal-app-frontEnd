import Google from "../img/Google.png";
import Github from "../img/GitHub.png";
import "../App.css"

const Login=()=>{
    const google = ()=>{
        //console.log("list of emeil ids opened ");
        window.open("https://change-request-calendar-backnd.herokuapp.com/auth/google","_self");
        //window.open("http://localhost:3004/auth/google","_self");
        
    }
    return(
        <div className="login">
            <h2 className="loginTitle">Choose a login method</h2>
            <div className="wrapper">
                <div className="center">
                    <div className="loginButton google" onClick={google}>
                        <img className="loginImg" src={Google} alt="" />
                        Google
                    </div>
                    <div className="loginButton github">
                        <img className="loginImg" src={Github} alt="" />
                        Github
                    </div>
                </div>
                
            </div>

        </div>
    )

}

export default Login;