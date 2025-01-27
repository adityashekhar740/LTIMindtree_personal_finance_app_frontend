import React, { useEffect } from 'react'
import { useAppSelector } from '../../store/store'
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAppDispatch } from '../../store/store';
import { logOutStart } from '../../store/features/userSlice';
export const PrivateRoutes = () => {
    const navigate=useNavigate();
    const dispatch=useAppDispatch();
    // useEffect(()=>{
    //     const checkToken=async()=>{
    //         console.log("laaa")
    //         try{
    //             const res=await axios.get('//auth/verifytoken');
    //             console.log("Authorized...");
    //         }
    //         catch(e){
    //             console.log(e);
    //             console.log("lalala")
    //             dispatch(logOutStart());
    //             navigate('/login');
    //         }
    //     }
    //    checkToken();
    // },[])
    const currentUser=useAppSelector(state=>state.users.currentUser);
  return (
    <>
    {
        currentUser?<Outlet/>:<Navigate to={'/login'} />
    }
    </>
  )
}
