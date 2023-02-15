import { UserContext } from "../../context/UserContext";
import { useContext, useState, useRef } from 'react';
import { Container, Form, Button, Toast } from 'react-bootstrap';
import axios from "axios";
import PageNotFound from "../PageNotFound";
import constants from "../../util/constants";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductControlPanel = () => {
    const { user, setUser } = useContext(UserContext);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [productDetails, setProductDetails] = useState('');
    const [image, setImage] = useState(null);
    
    console.log(title);

    const inputRef = useRef(null);

    const RequestAddNewProduct = () => {
        if (!image)
        {
            toast.error('Please add an image for the product.', {position:'top-center'});
            return;
        }
        
        const axiosFormData = new FormData();
        axiosFormData.append('token', localStorage.getItem('token'));
        axiosFormData.append('title', title);
        axiosFormData.append('price', price);
        axiosFormData.append('productDetails', productDetails);
        axiosFormData.append('image', image);
    
        try
        {
            const response = axios.post(`${constants.BACKEND_API_URL}/products`, axiosFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success('Successfully added new product!', {
                position: 'top-center'
            });

            // reset to initial state
            setTitle('');
            setPrice('');
            setProductDetails('');
            setImage(null);
        }
        catch(error)
        {
            toast.error(error.response.data.message, {position:'top-center'});
        }
    }    

    const handleUpload = () => {
        inputRef.current?.click();
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();

        RequestAddNewProduct()
    }
    
    if (user.authLevel === 0)
        return (
        <PageNotFound/>
        );
    
    return (
        <Container className="text-center">
            <div className="shadow p-3">
                <h4 className="mt-2">Add a new product</h4>
                <Container className='d-flex justify-content-center align-items-center rounded'>
                    <Form className="form-product-control-panel" onSubmit={handleFormSubmit}>
                        <Form.Group className='form-input-label mt-3' controlId='formBasicTitle'>
                            <Form.Label>Product title</Form.Label>
                            <Form.Control type='text' name='title' placeholder="" onChange={({target})=>setTitle(target.value)} value={title} required></Form.Control>
                        </Form.Group>
                        <Form.Group className='form-input-label mt-3' controlId='formBasicPrice'>
                            <Form.Label>Product price</Form.Label>
                            <Form.Control type='number' name='price' placeholder="" onChange={({target})=>setPrice(target.value)} value={price} required></Form.Control>
                        </Form.Group>
                        <Form.Group className='form-input-label mt-3' controlId='formBasicDetails'>
                            <Form.Label>Product details (separated by empty line)</Form.Label>
                            <Form.Control type='text' name='productDetails' placeholder="" onChange={({target})=>setProductDetails(target.value)} value={productDetails} as="textarea" rows={5} required></Form.Control>
                        </Form.Group>
                        <div className="m-3">
                            <label className='mx-3'>Choose image: </label>
                            <input ref={inputRef} className='d-none' type='file' name='image' onChange={({target})=>setImage(target.files[0])}/>
                            <Button variant='outline-primary' onClick={handleUpload}>Upload</Button>
                        </div>
                        {image !== null ?
                        <p>Selected image: {image.name}</p>
                        :
                        <></>
                        }
                        <Button variant='primary' type='submit' className="mb-2">Add</Button>
                    </Form>
                </Container>
            </div>
        </Container>
    );
}

export default ProductControlPanel