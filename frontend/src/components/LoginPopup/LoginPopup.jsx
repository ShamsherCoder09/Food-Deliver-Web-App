import React, { useContext, useEffect, useState } from 'react'
import  './LoginPopup.css'
import {assets} from '../../assets/assets'
import { StoreContext } from '../context/StoreContext';
import axios from 'axios'

function LoginPopup({setShowLogin}) {
  const {url,setToken} = useContext(StoreContext)
  const [currentState , setCurrentState] =useState("Login");
  const [data, setData]= useState({
    name:"",
    email:"",
    password:""
  });

  const onChangeHandler = (event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data, [name]:value}));
  }

  const onLogin = async(event)=>{
    event.preventDefault();
    let newUrl = url;
    if(currentState==="Login"){
      newUrl += "/api/user/login"
    }else{
      newUrl += "/api/user/register"
    }
    const response = await axios.post(newUrl , data);
    if(response.data.success){
      setToken(response.data.token);
      localStorage.setItem("token",response.data.token);
      setShowLogin(false)
    }
    else{
      alert(response.data.message);
    }
  }
  

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className='login-popup-container'>
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-input">
          {
            currentState==="Login"?<></>:<input type="text" name='name' onChange={onChangeHandler} value={data.name} placeholder='your name' required/>
          }
          <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='email' required />
          <input type="password" name='password' onChange={onChangeHandler} value={data.password} placeholder='password' required />
        </div>
        <button type='submit' >{currentState==="Sign Up"?"Create Account":"Login"}</button>
        <div className="login-popu-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the  terms of use & privacy policy</p>
        </div>
        {
          currentState==="Login"
          ?<p>Create a new account? <span onClick={()=>setCurrentState("Sign Up")}>click here</span></p>
          :<p>Already have an account? <span onClick={()=>setCurrentState("Login")}>login here</span></p>
        }
      </form>
    </div>
  )
}

export default LoginPopup