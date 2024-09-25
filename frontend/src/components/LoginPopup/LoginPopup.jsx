import React, { useState } from 'react'
import  './LoginPopup.css'
import {assets} from '../../assets/assets'

function LoginPopup({setShowLogin}) {
  const [currentState , setCurrentState] =useState("Login");
  return (
    <div className="login-popup">
      <form className='login-popup-container'>
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-input">
          {
            currentState==="Login"?<></>:<input type="text" placeholder='your name' required/>
          }
          <input type="email" placeholder='email' required />
          <input type="password" placeholder='password' required />
        </div>
        <button>{currentState==="Sign Up"?"Create Account":"Login"}</button>
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