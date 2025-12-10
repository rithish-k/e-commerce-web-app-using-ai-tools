import React, { Fragment ,useState,useEffect} from 'react'
import "./ForgotPassword.css"
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import {useDispatch,useSelector} from "react-redux";
import {clearErrors,forgotPassword} from "../../actions/userAction";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
const ForgotPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {error,message,loading} = useSelector((state)=>state.forgotPassword);
    const [email, setEmail] = useState("");
    const forgotPasswordSubmit =(e)=>{
        e.preventDefault();
        dispatch(forgotPassword(email));
    }
    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }
        if(message){
            toast.success(message);
        }
    },[dispatch,error,message]);


  return (
    <Fragment>
        {loading?<Loader/>:    
    <Fragment>
        <MetaData title="Forgot Password"/>
        <div className ='forgotPasswordContainer'>
            <div className='forgotPasswordBox'>
                <h2 className='forgotPasswordHeading'>Forgot Password</h2>
                <form
                    className="forgotPasswordForm"
                    onSubmit={forgotPasswordSubmit}
                >
                            <div className='forgotPasswordEmail'>
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
                            <input
                                type="submit"
                                value='send'
                                className='forgotPasswordBtn'
                                // disabled={loading?true:false}
                            />
                </form>
            </div>
        </div>
    </Fragment>}
    </Fragment>
  )
}

export default ForgotPassword