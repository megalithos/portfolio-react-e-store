import { UserContext } from "../context/UserContext";
import { useContext, useState, useRef } from 'react';
import { Container, Form, Button, Toast } from 'react-bootstrap';
import axios from "axios";
import PageNotFound from "./PageNotFound";
import constants from "../util/constants";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RequestAddNewProduct = (formData, inputRef) => {
    // validation
    if (!formData.image)
    {
        alert('Please add image for the product.');
        return;
    }
    
    const axiosFormData = new FormData();
    axiosFormData.append('token', localStorage.getItem('token'));
    axiosFormData.append('title', formData.title);
    axiosFormData.append('price', formData.price);
    axiosFormData.append('productDetails', formData.productDetails);
    axiosFormData.append('image', formData.image);

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
    }
    catch(err)
    {
        console.log(err)
    }
}

const ProductControlPanel = () => {
    const { user, setUser } = useContext(UserContext);
    const [ formData, setFormData ] = useState({
        title:'',
        price:0,
        productDetails:'',
        image:null,
    })

    const [ title, setTitle ] = useState('');

    console.log(title);

    const inputRef = useRef(null);

    const handleChange = event => {
        if (event.target.name === "image") {
          setFormData({
            ...formData,
            [event.target.name]: event.target.files[0]
          });
          return;
        }

        setFormData({
        ...formData,
        [event.target.name]: event.target.value
        }); 
      }

    const handleUpload = () => {
        inputRef.current?.click();
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();

        RequestAddNewProduct(formData)
    }
    
    if (user.authLevel === 0)
        return (
        <PageNotFound/>
        );
    
    return (
        <Container className='extra-top-margin text-center'>
            <h4>Add a new product</h4>
            <Container className='d-flex justify-content-center align-items-center'>
                <Form className="form-product-control-panel" onSubmit={handleFormSubmit}>
                    <Form.Group className='form-input-label mt-3' controlId='formBasicTitle'>
                        <Form.Label>Product title</Form.Label>
                        <Form.Control type='text' name='title' placeholder="" onChange={({target})=>setTitle(target.value)} value={title} required></Form.Control>
                    </Form.Group>
                    <Form.Group className='form-input-label mt-3' controlId='formBasicPrice'>
                        <Form.Label>Product price</Form.Label>
                        <Form.Control type='number' name='price' placeholder="" onChange={handleChange} required></Form.Control>
                    </Form.Group>
                    <Form.Group className='form-input-label mt-3' controlId='formBasicDetails'>
                        <Form.Label>Product details (separated by empty line)</Form.Label>
                        <Form.Control type='text' name='productDetails' placeholder="" onChange={handleChange} as="textarea" rows={5} required></Form.Control>
                    </Form.Group>
                    <div className="m-3">
                        <label className='mx-3'>Choose image: </label>
                        <input ref={inputRef} className='d-none' type='file' name='image' onChange={handleChange}/>
                        <Button variant='outline-primary' onClick={handleUpload}>Upload</Button>
                    </div>
                    {formData.image !== null ?
                    <p>Selected image: {formData.image.name}</p>
                    :
                    <></>
                    }
                    <Button variant='primary' type='submit'>Add</Button>
                </Form>
            </Container>
        </Container>
    );
}

export default ProductControlPanel