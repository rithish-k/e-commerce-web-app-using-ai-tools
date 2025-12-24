import React, { Fragment ,useState,useEffect} from 'react'
import "./ResetPassword.css"
import Loader from "../layout/Loader/Loader";
import {useDispatch,useSelector} from "react-redux";
import {clearErrors,resetPassword} from "../../actions/userAction";
import toast from 'react-hot-toast';
import { useNavigate,useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
const ResetPassword = () => {
  const navigate = useNavigate();
  const {token} = useParams()
    const dispatch = useDispatch();

    const {error,success,loading} = useSelector((state)=>state.forgotPassword);

    const [password,setPassword] = useState("");
    const [confirmPassword,setconfirmPassword] = useState("");


    const resetPasswordSubmit =(e)=>{
        e.preventDefault();
        // const myForm = new FormData();
        // myForm.set("oldPassword",oldPassword);
        // myForm.set("newPassword",newPassword);
        // myForm.set("confirmPassword",confirmPassword);
        // dispatch(resetPassword(myForm));
        dispatch(resetPassword(token,{password, confirmPassword }));
    }
    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }
        if(success){
            toast.success("Password Changed Successfully");
            navigate("login");

        }
    },[dispatch,error,navigate,success]);
  return (
    <Fragment>
        {loading?<Loader/>:    
    <Fragment>
        <MetaData title="Change Password"/>
        <div className ='resetPasswordContainer'>
            <div className='resetPasswordBox'>
                <h2 className='resetPasswordHeading'>Update Password</h2>
                <form
                    className="resetPasswordForm"
                    encType="multipart/form-data"
                    onSubmit={resetPasswordSubmit}
                >
                            <div >
                                <LockOpenIcon/>
                                <input
                                type="password"
                                placeholder="New Password"
                                required
                                value = {password}
                                onChange={(e)=>setPassword(e.target.value)}
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
                                value='update'
                                className='resetPasswordBtn'
                            />
                </form>
            </div>
        </div>
    </Fragment>}
    </Fragment>
  )
}

export default ResetPassword