import { Container } from 'react-bootstrap';
import Product from './Product';
import productImagePlaceholder from './graphic/product1.webp'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import constants from './util/constants';

const Products = ({title, productAttribute}) => {
    const [productsList, setProductsList] = useState([]);

    const RequestProducts = async (setProductsList) => {
        try
        {
            const response = await axios.get(`${constants.BACKEND_API_URL}/products?productAttribute=${productAttribute}`);
            setProductsList(response.data);
        }
        catch (error)
        {
            console.log(error);
        }      
    }

    useEffect(()=>{
        RequestProducts(setProductsList)
    }, []);

    useEffect(()=>{

    }, [productsList])

    return (
    <>
        <Container className='product-container'>
            <h5 style={{marginTop:10, marginLeft:10}}>
                {title}
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