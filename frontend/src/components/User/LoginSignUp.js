import React, { Fragment ,useRef,useState} from 'react'
import "./LoginSignUp.css"
import Loader from "../layout/Loader/Loader";
import {Link} from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import FaceIcon from "@mui/icons-material/Face";
import Profile from "../../assets/profile.jpg";
const LoginSignUp = () => {
    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);
    const [loginEmail,setLoginEmail] = useState('');
    const [loginPassword,setLoginPassword] = useState('');
    
    const[user,setUser] = useState({
        name:"",
        email:"",
        password:"",
    })
    const{name,email,password} = user;
    const [avatar,setAvatar] = useState();
    const[avatarPreview,SetAvatarPreview] = useState(Profile);
    const loginSubmit = () =>{
        console.log("Login form submitted");
    };
    const registerSubmit =(e)=>{
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name",name);
        myForm.set("email",email);
        myForm.set("password",password);
        myForm.set("avatar",avatar);
        console.log("SignUp form submitted")
    }
    const registerDataChange = (e) =>{
        if(e.target.name === "avatar"){
            const reader = new FileReader();
            reader.onload=()=>{
                if(reader.readyState===2){
                    SetAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };
        }else{
            setUser({...user,[e.target.name]:e.target.value});
        }
    }

    const switchTabs =(e,tab)=>{
        if(tab=="login"){
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");
            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if(tab=="register"){
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");
            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");

        }


    }


  return (
    <Fragment>
        <div className ='LoginSignUpContainer'>
            <div className='LoginSignUpBox'>
                <div>
                    <div className='login_signUp_toggle'>
                        <p onClick ={(e)=>switchTabs(e,"login")}>LOGIN</p>
                        <p onClick ={(e)=>switchTabs(e,"register")}>REGISTER</p>

                    </div>
                    <button ref={switcherTab}></button>
                </div>
                <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                    <div className='loginEmail'>
                        <MailOutlineIcon/>
                        <input
                        type="email"
                        placeholder='Email'
                        required
                        value={loginEmail}
                        onChange={(e)=>setLoginEmail(e.target.value)}
                        />
                    </div>
                    <div className='loginPassword'>
                        <LockOpenIcon/>
                        <input
                        type="password"
                        placeholder="Password"
                        required
                        value = {loginPassword}
                        onChange={(e)=>setLoginPassword(e.target.value)}
                        />

                    </div>
                    <Link to="/Password/forget">Forget Password ?</Link>
                    <input type="submit" value="Login" className="loginBtn"/>
                </form>
                <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
                >
                    <div className='signUpName'>
                        <FaceIcon/>
                        <input
                        type="text"
                        placeholder='Name'
                        required
                        value={name}
                        onChange={registerDataChange}
                        />

                    </div>
                    <div className='signUpEmail'>
                        <MailOutlineIcon/>
                        <input
                        type="email"
                        placeholder='Email'
                        required
                        value={email}
                        onChange={registerDataChange}
                        />
                    </div>
                    <div className='signUpPassword'>
                        <LockOpenIcon/>
                        <input
                        type="password"
                        placeholder='Password'
                        required
                        value={password}
                        onChange={registerDataChange}
                        />
                    </div>
                    <div id="registerImage">
                        <img src={avatarPreview} alt="Avatar Preview"/>
                        <input
                        type="file"
                        placeholder='avatar'
                        accept="image/*"
                        onChange={registerDataChange}
                        />
                    </div>
                    <input
                        type="submit"
                        placeholder='Register'
                        className='signUpBtn'
                        value={loginEmail}
                        // disabled={loading?true:false}
                    />

                </form>
            </div>

        </div>
    </Fragment>
  )
}

export default LoginSignUp