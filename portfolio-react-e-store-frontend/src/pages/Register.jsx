import { Container, Form, Button, NavLink } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { postData } from '../util/requests';
import constants from '../util/constants';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../context/UserContext';

const Register = () => {
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const RequestRegister = async () => {
        if (password !== confirmPassword)
        {
            toast.error('Passwords are not equal.', {position: 'top-center'});
            return;
        }
    
        const requestBody = {
            email: email,
            password: password,
        }
    
        try
        {
            const response = await postData(`${constants.BACKEND_API_URL}/register`, requestBody)
            localStorage.setItem('token', response.data.token);
            setUser({email:email, loggedIn:true, authLevel:response.data.auth_level});
            toast.success('Successfully registered a new account.', {position: 'top-center'});
            navigate('/');
            return;
        }
        catch (error)
        {
            console.log('test')
            toast.error(error.response.data.message, {position: 'top-center'});
        }
    }
    
    const HandleFormSubmit = (event) => {
        event.preventDefault();
        RequestRegister();
    }

    return (
    <>
        <Container className="extra-top-margin text-center">
            <h2>Register</h2>
            <Container className='d-flex justify-content-center align-items-center'>
            <Form className="p-4 form-login" onSubmit={HandleFormSubmit}>
                <Form.Group className='form-input-label' controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control className="" type="email" name="email" placeholder="Enter email" value={email} onChange={({target})=> { setEmail(target.value) }} required/>
                </Form.Group>

                <Form.Group className='mt-3 form-input-label' controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control className="" type="password" name="password" placeholder="Enter password" value={password} onChange={({target})=> {setPassword(target.value)}} required/>
                </Form.Group>

                <Form.Group className='mt-3 form-input-label' controlId="formBasicConfirmPassword">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control className="" type="password" name="confirmPassword" placeholder="Enter password" value={confirmPassword} onChange={({target})=> {setConfirmPassword(target.value)}} required/>
                </Form.Group>
                
                <div className='mt-4'>
                    <Button className="" variant="primary" type="submit">
                        Register
                    </Button>
                </div>
            </Form>
            </Container>
            <NavLink as={Link} to='/login'>
                <p>Already have an account? Click here to login.</p>
            </NavLink>
        </Container>
    </>
    );
}

export default Register