import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import constants from './util/constants';
import React, { useContext } from 'react';
import { CartContext } from './context/CartContext';
import { UserContext } from './context/UserContext';
import axios from 'axios';
import { deleteRequest } from './util/requests';

const ProductDetails = ({product}) => {
    if (!product.productDetails)
        return (<></>);
    // following code will take the product details and split by new lines as well as remove
    // strings which length is <= 1 so
    // you can enter paragraph like (into text area)
    // [start]
    // "hello asdf
    //
    // i am best"
    // [end]
    // and it will transform into ['hello asdf', 'i am best']
    let productDetailsSeparated = product.productDetails.split('\n');
    productDetailsSeparated = productDetailsSeparated.filter(detail=> detail.length > 1);
    productDetailsSeparated = productDetailsSeparated.map(detail=>
        detail.replace('\r', '')
    );
    

    return (
        <ul className='productCardDetails d-flex flex-column text-left'>
            {productDetailsSeparated.map((detail, index) => (
                    <li key={index}><h6>{detail}</h6></li> // use the index as the key and trim the bullet point text
            ))}
        </ul>
    );
}


// cart will be array of objects and those objects will be {product, amount}
const AddItemToShoppingCart = async (product, cart, setCart) => {
    const existingCartProduct = cart.find(cartProduct=>cartProduct.product.id === product.id);

    // if cart does not contain product, add it to the cart with amount=1
    if (!existingCartProduct)
    {
        const newCartProduct = {
            product:product,
            amount:1
        }

        setCart([...cart, newCartProduct])
    }
    else // don't add new but rather increase the amount
    {
        const newCart = [...cart]
        
        existingCartProduct.amount++

        setCart(newCart)
    }

}

const RequestRemoveProduct = async (user, product, productsList, setProductsList) => {
    const requestBody = {
        token: localStorage.getItem('token')
    }

    try
    {
        const response = await deleteRequest(`${constants.BACKEND_API_URL}/products/${product.id}`, requestBody);

        // create new products list (copy) where the product we deleted from backend is deleted
        const newProductsList = productsList.filter(productArrayElement=>productArrayElement.id !== product.id);

        setProductsList(newProductsList);

        return;
    }
    catch (error)
    {
        alert(error.response.data.message)
    }
}

const Product = ({product, productsList, setProductsList}) => {
    const { cart, setCart } = useContext(CartContext);
    const { user } = useContext(UserContext);
    
    return (
    <>
        <Card className='productCard col-xs-3'>
            <div className='product-card-image-wrapper'>
                <img className='card-img-top product-card-image' src={product.imageUrl}/>
            </div>
            <div className='card-body'>
                <h6 className='card-title truncated-text product-card-title'>{product.title}</h6>
                <ProductDetails product={product}/>

                <div className='product-footer d-flex justify-content-between'>
                    <h6 className='card-text price-text product-card-footer'>
                        {`${product.price}${constants.CURRENCY_CHARACTER}`}
                    </h6>
                    { user.authLevel > 0 ?
                        <Button variant='danger' className='product-x-button product-card-footer' onClick={()=>RequestRemoveProduct(user, product, productsList, setProductsList)}>X</Button>
                    :
                        <></>
                    }
                    <div className='btn btn-primary w-25 product-purchase-button product-card-footer' onClick={()=>{AddItemToShoppingCart(product, cart, setCart)}}>
                        <FontAwesomeIcon className='product-shopping-cart-icon' icon={solid('cart-shopping')}/>
                    </div>
                </div>

            </div>
        </Card>
    </>
    );
}

export default Product