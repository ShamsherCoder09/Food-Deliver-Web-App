import { createContext, useEffect, useState } from "react";
import axios from 'axios';


export const StoreContext = createContext(null);

const StoreContextProvider = (props)=>{
    const[cartItems , setCartItems] = useState({});
    const[token , setToken] = useState("");
    const[food_list , setFood_list] = useState([]);
    const url = "http://localhost:4000"
    const addToCart =async (itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}));
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    } 
    const removeToCart =async (itemId)=>{
        setCartItems((prev)=>({...prev, [itemId]:prev[itemId]-1}));
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }

    const fetchFoodData = async()=>{
        const response = await axios.get(url+"/api/food/list");
        setFood_list(response.data.data);
    }

    const localCartDataLoad = async (token)=>{
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
        setCartItems(response.data.cartData);

    }
    useEffect(()=>{
        console.log(cartItems)
    },[cartItems]);

    const getTotalCartAmount =()=>{
        let totalAmount = 0;
        for(let item in cartItems){
            if(cartItems[item]>0){
                let infoItem = food_list.find((product)=> product._id === item);
            totalAmount += infoItem.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    useEffect(()=>{
        async function loadData() {
            await fetchFoodData();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                localCartDataLoad(localStorage.getItem("token"))
            }
        }
        loadData();
    },[])

    const contextValue={
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeToCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;