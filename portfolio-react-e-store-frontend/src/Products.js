import { Container } from 'react-bootstrap';
import Product from './Product';
import productImagePlaceholder from './graphic/product1.webp'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import constants from './util/constants';

const RequestProducts = async (setProductsList) => {
    try
    {
        const response = await axios.get(`${constants.BACKEND_API_URL}/products`);
        setProductsList(response.data);
    }
    catch (error)
    {
        console.log(error);
    }      
}

const Products = () => {
    const [productsList, setProductsList] = useState([]);

    useEffect(()=>{
        RequestProducts(setProductsList)
    }, []);

    useEffect(()=>{

    }, [productsList])

    return (
    <>
        <Container className='product-container extra-top-margin'>
            <h5 style={{marginTop:10, marginLeft:10}}>
                Products
            </h5>
            <div className="row">
                {
                productsList.map((item, index)=> {
                    return (
                        <Product key={`product${index}`} product={item} setProductsList={setProductsList} productsList={productsList}/>
                    );
                })}
            </div>
        </Container>

        </>
    );
}

export default Products