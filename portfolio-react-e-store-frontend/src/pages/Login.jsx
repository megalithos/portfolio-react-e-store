import { Container, Form, Button, NavLink } from 'react-bootstrap';
import React, { useState, useContext } from 'react';
import { postData } from '../util/requests';
import constants from '../util/constants';
import { UserContext, UserProvider } from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom'

const RequestLogin = async (event, formData, user, setUser, navigate) => {
    event.preventDefault();

    const requestBody = {
        email: formData.email,
        password: formData.password,
    }

    try
    {
        const response = await postData(`${constants.BACKEND_API_URL}/login`, requestBody);
        localStorage.setItem('token', response.data.token);
        
        setUser({email:formData.email, loggedIn:true, authLevel:response.data.auth_level});
       
        navigate('/profile');
        return;
    }
    catch (error)
    {
        alert(error.response.data.message)
    }

}

const Login = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email:"",
        password:""
    })

    const handleChange = event => {
        setFormData({
            ...formData,
            [event.target.name]:event.target.value
        })
    }

    return (
    <Container className="extra-top-margin text-center">
        <h2>Login</h2>
        <Container className='d-flex justify-content-center align-items-center'>
            <Form className="p-4 form-login">
                <Form.Group className='form-input-label' controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control className="" type="email" name="email" placeholder="Enter email"  onChange={handleChange}/>
                </Form.Group>

                <Form.Group className='mt-3 form-input-label' controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control className="" type="password" name="password" placeholder="Enter password" onChange={handleChange}/>
                </Form.Group>
                <Button className="mt-3" variant="primary" type="submit" onClick={(event)=>{RequestLogin(event, formData, user, setUser, navigate)}}>
                    Login
                </Button>
            </Form>
        </Container>
        <NavLink as={Link} to='/register'>
            <p>Don't have an account? Click here to register.</p>
        </NavLink>
    </Container>
    );
}

export default Login