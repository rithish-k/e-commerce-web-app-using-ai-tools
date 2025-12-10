import React, { Fragment ,useState,useEffect} from 'react'
import "./UpdateProfile.css"
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FaceIcon from "@mui/icons-material/Face";
import Profile from "../../assets/profile.jpg";
import {useDispatch,useSelector} from "react-redux";
import {clearErrors,updateProfile,loadUser} from "../../actions/userAction";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import MetaData from "../layout/MetaData";
const UpdateProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} =useSelector((state)=>state.user);
    const {error,isUpdated,loading} = useSelector((state)=>state.profile);
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [avatar,setAvatar] = useState();
    const[avatarPreview,SetAvatarPreview] = useState(Profile);

    const updateProfileSubmit =(e)=>{
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name",name);
        myForm.set("email",email);
        myForm.append("avatar",avatar);
        dispatch(updateProfile(myForm));
    }
    const updateProfileDataChange = (e) =>{
            const file = e.target.files[0];
            // const reader = new FileReader();
            SetAvatarPreview(URL.createObjectURL(file)); 
            setAvatar(file); 
    }
    useEffect(()=>{
        if(user){
            setName(user.name);
            setEmail(user.email);
            SetAvatarPreview(user.avatar.url);
        }
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
    },[dispatch,error,user,navigate,isUpdated]);
    
  return (
    <Fragment>
        {loading?<Loader/>:    
    <Fragment>
        <MetaData title="UpdateProfile"/>
        <div className ='updateProfileContainer'>
            <div className='updateProfileBox'>
                <h2 className='updateProfileHeading'>Update Profile</h2>
                <form
                    className="updateProfileForm"
                    encType="multipart/form-data"
                    onSubmit={updateProfileSubmit}
                >
                            <div className='updateProfileName'>
                                <FaceIcon/>
                                <input
                                name="name"
                                type="text"
                                placeholder='Name'
                                required
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                                />

                            </div>
                            <div className='updateProfileEmail'>
                                <MailOutlineIcon/>
                                <input
                                name='email'
                                type="email"
                                placeholder='Email'
                                required
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                />
                            </div>
                            <div id="updateProfileImage">
                                <img src={avatarPreview} alt="Avatar Preview"/>
                                <input
                                name='avatar'
                                type="file"
                                placeholder='avatar'
                                accept="image/*"
                                onChange={updateProfileDataChange}
                                />
                            </div>
                            <input
                                type="submit"
                                value='update'
                                className='updateProfileBtn'
                                // disabled={loading?true:false}
                            />

                </form>
            </div>
        </div>
    </Fragment>}
    </Fragment>
  )
}

export default UpdateProfile