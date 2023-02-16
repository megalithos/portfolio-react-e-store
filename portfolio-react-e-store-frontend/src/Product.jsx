import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import constants from './util/constants';
import React, { useContext } from 'react';
import { CartContext } from './context/CartContext';
import { UserContext } from './context/UserContext';
import axios from 'axios';
import { deleteRequest } from './util/requests';
import { useNavigate } from 'react-router-dom';
import { SplitProductDetailsToArray, AddItemToShoppingCart } from './util/helpers';

const ProductDetails = ({product}) => {
    if (!product.productDetails)
        return (<></>);
    
    const productDetailsSeparated = SplitProductDetailsToArray(product.productDetails);
    
    return (
        <ul className='productCardDetails d-flex flex-column text-left'>
            {productDetailsSeparated.map((detail, index) => (
                    <li key={index}><h6>{detail}</h6></li> // use the index as the key and trim the bullet point text
            ))}
        </ul>
    );
}

const Product = ({product, productsList, setProductsList}) => {
    const { cart, setCart } = useContext(CartContext);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const HandleClickProduct = event => {
        event.preventDefault();
        
        navigate(`/product/${product.id}`);
    }

    const HandleClickAddToShoppingCartButton = event => {
        event.stopPropagation();

        AddItemToShoppingCart(product, cart, setCart)
    }

    return (
    <>
        <Card className='productCard col-xs-3' style={{cursor:'pointer'}} onClick={HandleClickProduct}>
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
                    <div className='btn btn-primary w-25 product-purchase-button product-card-footer' onClick={HandleClickAddToShoppingCartButton}>
                        <FontAwesomeIcon className='product-shopping-cart-icon' icon={solid('cart-shopping')}/>
                    </div>
                </div>

            </div>
        </Card>
    </>
    );
}

export default Product