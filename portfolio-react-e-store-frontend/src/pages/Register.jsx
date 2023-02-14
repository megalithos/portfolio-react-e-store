import { Container, Form, Button, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import postData from '../util/requests';
import constants from '../util/constants';

const RequestRegister = async (event, formData) => {
    event.preventDefault()

    if (formData.password !== formData.confirmPassword)
    {
        alert("Password are not equal.")
        return;
    }

    const requestBody = {
        email: formData.email,
        password: formData.password,
    }

    try
    {
        
        const response = await postData(`${constants.BACKEND_API_URL}/register`, requestBody)
        localStorage.setItem('token', response.data.token)
        return;
    }
    catch (error)
    {
        alert(error.response.data.message)
    }
}

const Register = () => {
    const [formData, setFormData] = useState({
        email:'',
        password:'',
        confirmPassword:'',
    });

    const handleChange = event => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value
        });
      };

    return (
    <Container className="extra-top-margin text-center">
        <h2>Register</h2>
        <Container className='d-flex justify-content-center align-items-center'>
        <Form className="p-4 form-login">
            <Form.Group className='form-input-label' controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control className="" type="email" name="email" placeholder="Enter email" value={formData.email} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className='mt-3 form-input-label' controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control className="" type="password" name="password" placeholder="Enter password" value={formData.password} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className='mt-3 form-input-label' controlId="formBasicConfirmPassword">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control className="" type="password" name="confirmPassword" placeholder="Enter password" value={formData.confirmPassword} onChange={handleChange}/>
            </Form.Group>
            
            <div className='mt-4'>
                <Button className="" variant="primary" type="submit" onClick={(event) => {RequestRegister(event, formData)}}>
                    Register
                </Button>
            </div>
        </Form>
        </Container>
        <NavLink as={Link} to='/login'>
            <p>Already have an account? Click here to login.</p>
        </NavLink>
    </Container>
    );
}

export default Register