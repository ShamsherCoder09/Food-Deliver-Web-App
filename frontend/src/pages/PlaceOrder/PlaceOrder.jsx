import React, { useContext, useState } from 'react'
import "./PlaceOrder.css"
import { StoreContext } from '../../components/context/StoreContext'
import axios from 'axios';

function PlaceOrder() {
  const {getTotalCartAmount,token, food_list,cartItems, url} = useContext(StoreContext);

  const[data, setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:"",
  });

  const onChangeHandler = (event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data, [name]:value}))
  }

  const placeOrder = async(event)=>{
    event.preventDefault();
    let orderItems =[];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let infoItems = item;
        infoItems["quantity"] = cartItems[item._id];
        orderItems.push(infoItems)
      }
    })
    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2,
    }
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});
    // console.log("response done",response);
    // console.log("check response data " , response.data.success)
    if(response.data.success){
      console.log("success is done")
      const {session_url} = response.data;
      console.log("session url")
      window.location.replace(session_url);
    }
    else{
      alert("Error");
    }
  }

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required="true" name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
          <input required="true" name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
        </div>
        <input required="true" name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='email' />
        <input required="true" name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='street' />
        <div className="multi-fields">
          <input required="true" name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='city' />
          <input required="true" name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='state' />
        </div>
        <div className="multi-fields">
          <input required="true" name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='zip code' />
          <input required="true" name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='country' />
        </div>
        <input required="true" name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='phone' />
      </div>

      <div className="place-order-right">

      <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fees</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</p>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder