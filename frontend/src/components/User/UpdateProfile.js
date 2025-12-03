import React, { Fragment ,useRef,useState,useEffect} from 'react'
import "./UpdateProfile.css"
import Loader from "../layout/Loader/Loader";
import {Link} from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FaceIcon from "@mui/icons-material/Face";
import Profile from "../../assets/profile.jpg";
import {useDispatch,useSelector} from "react-redux";
import {clearErrors,updateProfile,loadUser} from "../../actions/userAction";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
    const dispatch = useDispatch();
    const {user} =useSelector((state)=>state.user);
    const {error,isUpdated,loading} = useSelector((state)=>state.profile);
    const [name,setName] = useState(user.name);
    const [email,setEmail] = useState(user.email);
    const [avatar,setAvatar] = useState();
    const[avatarPreview,SetAvatarPreview] = useState(Profile);

    const registerSubmit =(e)=>{
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name",name);
        myForm.set("email",email);
        myForm.append("avatar",avatar);
        dispatch(register(myForm));
    }
    const registerDataChange = (e) =>{
            const file = e.target.files[0];
            // const reader = new FileReader();
            SetAvatarPreview(URL.createObjectURL(file)); // preview
            setAvatar(file); // FILE object — perfect ✔
    }
    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }
        if(isUpdated){
            toast.success("Profile Updated Successfully");
            dispatch(loadUser());
            navigate("/account");
            dispatch({
                type:UPDATE_PROFILE_RESET,
            })

        }
    },[dispatch,error,isAuthenticated,navigate]);
    
  return (
    <div></div>
  )
}

export default UpdateProfile