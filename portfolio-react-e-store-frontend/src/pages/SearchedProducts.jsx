import { Container, Row, Button } from 'react-bootstrap';
import axios from 'axios';
import { useContext } from 'react';
import { SearchedProductsContext } from '../context/SearchedProductsContext';
import constants from '../util/constants';

const SearchedProducts = () => {
    const { searchedProducts } = useContext(SearchedProductsContext);

    return (
        <Container className='extra-top-margin wrap-scroll-view searched-products-container'>
            {
                (()=>{
                    if (searchedProducts.length > 0)
                        return (searchedProducts.map(product=>
                                <Row className='m-3 shopping-cart-product-wrapper shadow rounded'>
                                    <div className='shopping-cart-product'>
                                        <div className='shopping-cart-product-image-wrapper'>
                                            <img src={product.imageUrl} className='shopping-cart-product-image' style={{marginTop:3}}></img>
                                        </div>
                                        <div className='shopping-cart-text-wrapper'>
                                            <h5 className='shopping-cart-text-extra-margin-left'>{product.title}</h5>
                                            <h6 className='shopping-cart-text-extra-margin-left'>Product id: {product.id}</h6>
                                            <h6 className='shopping-cart-text-extra-margin-left'>{product.price}{constants.CURRENCY_CHARACTER}</h6>
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