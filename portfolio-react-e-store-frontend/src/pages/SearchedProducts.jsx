import { Container, Row, Button } from 'react-bootstrap';
import axios from 'axios';
import { useContext } from 'react';
import { SearchedProductsContext } from '../context/SearchedProductsContext';
import constants from '../util/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import { AddItemToShoppingCart } from '../util/helpers';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const SearchedProducts = () => {
    const { searchedProducts } = useContext(SearchedProductsContext);
    const {cart, setCart} = useContext(CartContext);
    const navigate = useNavigate();

    const HandleClickAddToShoppingCartButton = (event, product) => {
        event.stopPropagation();

        AddItemToShoppingCart(product, cart, setCart)
    }

    const HandleClickSearchedProduct = (event, product) => {
        navigate(`/product/${product.id}`);
    }

    return (
        <Container className='extra-top-margin wrap-scroll-view searched-products-container'>
            {searchedProducts.length > 0 ?
            <h4>Found {searchedProducts.length} products</h4>
            : <></>
            }
            {

                (()=>{
                    if (searchedProducts.length > 0)
                        return (
                            searchedProducts.map(product=>
                                <Row className='m-3 shopping-cart-product-wrapper shadow rounded' onClick={(event)=>{HandleClickSearchedProduct(event, product)}} style={{cursor:'pointer'}}>
                                    <div className='shopping-cart-product'>
                                        <div className='shopping-cart-product-image-wrapper'>
                                            <img src={product.imageUrl} className='shopping-cart-product-image' style={{marginTop:3}}></img>
                                        </div>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <div className=''>
                                                <h5 className=''>{product.title}</h5>
                                                <h6 className=''>Product id: {product.id}</h6>
                                                <h6 className=''>{product.price}{constants.CURRENCY_CHARACTER}</h6>
                                            </div>
                                            <div className='btn btn-primary' onClick={(event)=> {HandleClickAddToShoppingCartButton(event, product)}}>
                                                <FontAwesomeIcon className='product-shopping-cart-icon' icon={solid('cart-shopping')}/>
                                            </div>
                                        </div>
                                    </div>
                                </Row>
                        ));
                   return (<h5>No products found.</h5>);
                })()
            }
        </Container>
    );
}

export default SearchedProducts;