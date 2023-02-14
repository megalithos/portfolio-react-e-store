import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext({});

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]); // list of products
    const [cartLoaded, setCartLoaded] = useState(false);
    // load cart
    useEffect(()=> {
        const parsedCart = JSON.parse(localStorage.getItem('cart'));

        if (!parsedCart || cartLoaded)
            return;
        
        
        setCartLoaded(true);
        setCart(parsedCart);
    }, []);
    
    // save cart when it changes
    useEffect(()=> {
        if (!cartLoaded)
            return;
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
