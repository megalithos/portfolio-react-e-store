import { Container, Row, Col, Button } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import React, { useContext } from 'react';
import constants from '../util/constants';

const Cart = () => {
    const { cart, setCart } = useContext(CartContext);

    const CalculateTotalPrice = () => {
        let totalPrice = 0;
        cart.forEach(product=>{
            totalPrice += product.price;
        });

        return totalPrice;
    }

    const RemoveProductFromCart = (productId) => {
        console.log(`removing product (id:${productId}) from cart.`);

        const newCart = cart.filter(product=>product.id !== productId);

        setCart(newCart);
    }

    const MainCartComponent = () => {
        return (
            <>
                {
                    cart.map((product)=>{
                    return (
                        <Row className='m-3 shopping-cart-product-wrapper'>
                            <div className='shopping-cart-product'>
                                <Button variant='danger' className='shopping-cart-product-x-button' onClick={()=>{RemoveProductFromCart(product.id)}}>X</Button>
                                <Col>
                                    <img src={product.imageUrl} className='shopping-cart-product-image'></img>
                                </Col>
                                <Col className='shopping-cart-text-wrapper'>
                                    <h5>{product.title}</h5>
                                    <h6>Product id: {product.id}</h6>
                                    <h6>{product.price}{constants.CURRENCY_CHARACTER}</h6>
                                </Col>
                            </div>
                            
                        </Row>
                    ); 
                    })
                }
                <div className='shopping-cart-footer d-flex align-items-center justify-content-between mx-3'>
                    <h5>{cart.length} products, total: {
                        CalculateTotalPrice()
                    }
                    {constants.CURRENCY_CHARACTER}</h5>
                    
                    <Button variant='primary'>Purchase</Button>
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