// CartContext.js
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const addItemToCart = (item) => {
    let checkProducts=false;
    for(let i=0; i<cart.length; i++){
      if(cart[i].id === item.id){
        checkProducts = true
        if(cart[i].qty_val === undefined){
          cart[i].qty_val = 2
        }else{
          cart[i].qty_val = parseInt(cart[i].qty_val) + 1
        }
        break;
      }
    }
    if(!checkProducts){
      item.qty_val = 1
      setCart([...cart, item]);
    }else{
      setCart([...cart]);
    }
    document.querySelector('.cart_header').click();
  };
  const removeItemFromCart = (itemId) => {
    const updatedCart = cart.filter(item => item.id !== itemId);
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };
  const bundleAddToCart = (addedProd) => {
  for(let a=0;a<addedProd.length;a++){
    let checkbundlepr=false;
        for(let i=0; i < cart.length; i++){
          if(cart[i].id === addedProd[a].id){
              checkbundlepr = true
              if(cart[i].qty_val === undefined){
                cart[i].qty_val = 2
              }else{
                cart[i].qty_val = parseInt(cart[i].qty_val) + 1
              }
              break;
          }
      }
      if(!checkbundlepr){
        addedProd[a].qty_val = 1
        setCart(prevState => [...prevState, addedProd[a]]);
      }else{
        setCart([...cart]);
      }
  }
    // addedProd.map((prod, index) => {
    //   let checkbundlepr=false;
    //     for(let i=0; i < cart.length; i++){
    //       if(cart[i].id === prod.id){
    //           checkbundlepr = true
    //           if(cart[i].qty_val === undefined){
    //             cart[i].qty_val = 2
    //           }else{
    //             cart[i].qty_val = parseInt(cart[i].qty_val) + 1
    //           }
    //           break;
    //       }
    //   }
    //   if(!checkbundlepr){
    //     prod.qty_val = 1
    //     setCart(prevState => [...prevState, prod]);
    //   }else{
    //     setCart([...cart]);
    //   }
    // })
    document.querySelector('.cart_header').click();
  }
  return (
    <CartContext.Provider value={{ cart, addItemToCart, removeItemFromCart, clearCart ,bundleAddToCart}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
