import { Container, Row, Col, Button } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import React, { useContext, useMemo } from 'react';
import constants from '../util/constants';

const Cart = () => {
    const { cart, setCart } = useContext(CartContext);
    const totalPrice = useMemo(()=> cart.reduce((total, cartProduct) => total + cartProduct.product.price, 0).toFixed(2), [cart]);

    const RemoveProductFromCart = (productId) => {
        console.log(`removing product (id:${productId}) from cart.`);

        const newCart = cart.filter(cartProduct=>cartProduct.product.id !== productId);

        setCart(newCart);
    }

    const MainCartComponent = () => {
        return (
            <>
                {
                    cart.map((cartProduct)=>{
                    return (
                        <Row className='m-3 shopping-cart-product-wrapper'>
                            <div className='shopping-cart-product'>
                                <Button variant='danger' className='shopping-cart-product-x-button' onClick={()=>{RemoveProductFromCart(cartProduct.product.id)}}>X</Button>
                                <div className='shopping-cart-product-image-wrapper'>
                                    <img src={cartProduct.product.imageUrl} className='shopping-cart-product-image' style={{marginTop:3}}></img>
                                </div>
                                <div className='shopping-cart-text-wrapper'>
                                    <h5 className='shopping-cart-text-extra-margin-left'>{cartProduct.product.title}</h5>
                                    <h6 className='shopping-cart-text-extra-margin-left'>Product id: {cartProduct.product.id}</h6>
                                    <h6 className='shopping-cart-text-extra-margin-left'>{cartProduct.product.price}{constants.CURRENCY_CHARACTER} x {cartProduct.amount}</h6>
                                </div>
                            </div>
                            
                        </Row>
                    ); 
                    })
                }
                <div className='shopping-cart-footer d-flex align-items-center justify-content-between mx-3'>
                    <Button variant='primary' onClick={()=>{setCart([])}}>Empty cart</Button>

                    <h5>{cart.length} products, total: {
                        totalPrice
                    }
                    {constants.CURRENCY_CHARACTER}</h5>
                    
                    <Button variant='primary' onClick={()=>{alert('Feature not implemented :)')}}>Purchase</Button>
                    

                </div>
            </>
        );
    }

    return (
        <Container className='extra-top-margin text-center'>
            <h5>Shopping cart</h5>
            { cart.length > 0 ?
            MainCartComponent()
            : <h5>Your cart is empty!</h5>
            }
        </Container>
    );
}

export default Cart