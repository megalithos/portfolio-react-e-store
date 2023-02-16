import { Container, Row, Col, Button } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState, useContext } from 'react';
import constants from '../util/constants';
import axios from 'axios';
import { SplitProductDetailsToArray, AddItemToShoppingCart } from '../util/helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';
import { deleteRequest } from '../util/requests';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RequestRemoveProduct = async (user, product, productsList, setProductsList, navigate) => {
    const requestBody = {
        token: localStorage.getItem('token')
    }

    try
    {
        const response = await deleteRequest(`${constants.BACKEND_API_URL}/products/${product.id}`, requestBody);

        // create new products list (copy) where the product we deleted from backend is deleted
        //const newProductsList = productsList.filter(productArrayElement=>productArrayElement.id !== product.id);

        //setProductsList(newProductsList);
        toast.success('Product removed successfully.', {position:'top-center'});
        navigate('/');
        return;
    }
    catch (error)
    {
        console.log(error)
    }
}


const ProductPage = () => {
    const { productId } = useParams();

    // the product shown on the page
    const [product, setProduct] = useState(null);

    const {cart, setCart} = useContext(CartContext);
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();

    // this is mega retarded way. TODO: change way how product details are handled/created
    const [productDetailsSeparated, setProductDetailsSeparated] = useState([]);

    const RequestProductFromDBById = async () => {
        try {
            const response = await axios.get(`${constants.BACKEND_API_URL}/products?productId=${productId}`);
            await setProduct(response.data[0]); // currently api returns array so get the first element
        }
        catch (error) // shouldn't fail
        {
            console.log(error)
        }
    }

    // when productId changes, refresh it from db for now.
    useEffect(()=> {
        RequestProductFromDBById();
    }, [productId]);

    useEffect(()=>{
        if (!product)
            return; 

        setProductDetailsSeparated(SplitProductDetailsToArray(product.productDetails));
    }, [product])

    const HandleClickRemoveProductButton = event => {
        RequestRemoveProduct(user, product, {}, {}, navigate)
    }

    if (!product || !product.productDetails)
        return (<><h4>No product found with that id.</h4></>);
    return (
        <Container className='extra-top-margin d-flex align-items-center justify-content-center'>
            <div className='my-5 p-3 shadow'>
                <Row>
                    <Col md={6}>
                        <img src={product.imageUrl} className='img-fluid'/>
                    </Col>
                    <Col md={6} className='d-flex flex-column justify-content-between'>
                        <div>
                            <h3>{product.title}</h3>
                            <ul className='d-flex flex-column text-left mt-3'>
                                {
                                    productDetailsSeparated.map((productDetail, index)=>
                                    <li>
                                        <h5>
                                            {productDetail}
                                        </h5>
                                    </li>
                                    )
                                }
                            </ul>
                        </div>
                        <div className='border-top border-3 pt-2 border-light'>
                            <h5 className='text-success'>
                                In stock
                            </h5>
                            <div className='d-flex justify-content-between'>
                                
                                <h4 className=''>{product.price}{constants.CURRENCY_CHARACTER}</h4>
                                <div>
                                { user.authLevel > 0 ?
                                    <Button variant='danger' className='product-x-button me-2' onClick={HandleClickRemoveProductButton}>X</Button>
                                :
                                    <></>
                                }
                                <div className='btn btn-primary' onClick={()=>{AddItemToShoppingCart(product, cart, setCart)}}>
                                    <FontAwesomeIcon className='product-shopping-cart-icon' icon={solid('cart-shopping')}/>
                                </div>

                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </Container>
    );
}

export default ProductPage