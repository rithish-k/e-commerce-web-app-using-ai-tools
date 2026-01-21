import React from 'react'
import "./Header.css"
import { SpeedDial,SpeedDialAction } from '@mui/material'
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Backdrop from '@mui/material/Backdrop';
import { useNavigate } from "react-router-dom";
import { logout } from '../../../actions/userAction';
import {useDispatch,useSelector} from "react-redux";
import toast from 'react-hot-toast';

import Profile from "../../../assets/profile.jpg";
import { useState,Fragment } from 'react';
const UserOptions = ({user}) => {
    const {cartItems} = useSelector((state)=>state.cart);
    const [open,setOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const options = [
        {icons:<ListAltIcon/>,name:"Orders", func:orders},
        {icons:<PersonIcon/>,name:"Profile", func:account},
        {
            icons:(
                <ShoppingCartIcon style={{ color:cartItems.length > 0 ? "tomato":"unset"}} />
            ),
            name: `cart(${cartItems.length})`,
            func:cart
        },
        {icons:<ExitToAppIcon/>,name:"Logout", func:logoutUser},
    ];
    if(user.role === "admin"){
        options.unshift({
            icons:<DashboardIcon/>,
            name:"Dashboard",
            func:dashboard,
        });
    }
    function dashboard(){
        navigate(`/dashboard`);
    }
    function orders(){
        navigate(`/orders`);
    }
    function account(){
        navigate(`/account`);
    }
    function logoutUser(){
        dispatch(logout());
        toast.success("logout succesfully")
    }
    function cart(){
        navigate(`/cart`);
    }
  return (
    <Fragment>
        <Backdrop open={open} style={{zIndex:"10"}}/>
        <SpeedDial
        className='speedDial'
        ariaLabel='SpeedDial tooltip example'
        onClose={()=>setOpen(false)}
        onOpen={()=>setOpen(true)}
        open={open}
        direction='down'
        icon={
            <img
            className="speedDialIcon"
            src={user.avatar.url?user.avatar.url:Profile}
            alt="Profile"
            />

        }
        >
            {options.map((items)=>(
                <SpeedDialAction key={items.name} icon={items.icons} tooltipTitle = {items.name} onClick={items.func} tooltipOpen={window.innerWidth <= 600 ? true : false}/>
            ))}
            
        </SpeedDial>
    </Fragment>
  )
}

export default UserOptions