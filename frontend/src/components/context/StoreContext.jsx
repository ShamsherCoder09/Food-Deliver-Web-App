import { createContext, useEffect, useState } from "react";
import { food_list } from "../../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props)=>{
    const[cartItems , setCartItems] = useState({});

    const addToCart = (itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}));
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        }
    } 
    const removeToCart = (itemId)=>{
        setCartItems((prev)=>({...prev, [itemId]:prev[itemId]-1}))
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

    const contextValue={
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeToCart,
        getTotalCartAmount
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;