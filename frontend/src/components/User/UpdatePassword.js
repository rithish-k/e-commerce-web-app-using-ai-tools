import React, { Fragment ,useState,useEffect} from 'react'
import "./UpdatePassword.css"
import Loader from "../layout/Loader/Loader";
import {useDispatch,useSelector} from "react-redux";
import {clearErrors,updatePassword} from "../../actions/userAction";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import MetaData from "../layout/MetaData";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
const UpdatePassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {error,isUpdated,loading} = useSelector((state)=>state.profile);

    const [oldPassword,setoldPassword] = useState("");
    const [newPassword,setnewPassword] = useState("");
    const [confirmPassword,setconfirmPassword] = useState("");


    const updatePasswordSubmit =(e)=>{
        e.preventDefault();
        // const myForm = new FormData();
        // myForm.set("oldPassword",oldPassword);
        // myForm.set("newPassword",newPassword);
        // myForm.set("confirmPassword",confirmPassword);
        // dispatch(updatePassword(myForm));
        dispatch(updatePassword({ oldPassword, newPassword, confirmPassword }));
    }
    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }
        if(isUpdated){
            toast.success("Password Changed Successfully");
            navigate("/account");
            dispatch({
                type:UPDATE_PASSWORD_RESET,
            })

        }
    },[dispatch,error,navigate,isUpdated]);
  return (
    <Fragment>
        {loading?<Loader/>:    
    <Fragment>
        <MetaData title="Change Password"/>
        <div className ='updatePasswordContainer'>
            <div className='updatePasswordBox'>
                <h2 className='updatePasswordHeading'>Update Password</h2>
                <form
                    className="updatePasswordForm"
                    encType="multipart/form-data"
                    onSubmit={updatePasswordSubmit}
                >
                            <div className='loginPassword'>
                                <VpnKeyIcon/>
                                <input
                                type="password"
                                placeholder="Old Password"
                                required
                                value = {oldPassword}
                                onChange={(e)=>setoldPassword(e.target.value)}
                                />
                            </div>
                            <div className='loginPassword'>
                                <LockOpenIcon/>
                                <input
                                type="password"
                                placeholder="New Password"
                                required
                                value = {newPassword}
                                onChange={(e)=>setnewPassword(e.target.value)}
                                />
                            </div>
                            <div className='loginPassword'>
                                <LockIcon/>
                                <input
                                type="password"
                                placeholder="Confirm Password"
                                required
                                value = {confirmPassword}
                                onChange={(e)=>setconfirmPassword(e.target.value)}
                                />
                            </div>
                            <input
                                type="submit"
                                value='Change'
                                className='updatePasswordBtn'
                            />
                </form>
            </div>
        </div>
    </Fragment>}
    </Fragment>
  )
}

export default UpdatePassword