import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useState } from 'react';
import constants from '../util/constants';
import { postData } from '../util/requests';

const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('')   ;
    const [message, setMessage] = useState('')

    const HandleFormSubmit = async (event) => {
        event.preventDefault();
        
        const requestBody = {
            name,
            email,
            phone_number: phoneNumber,
            message
        }
        
        try
        {
            const response = await postData(`${constants.BACKEND_API_URL}/messages`, requestBody);
            toast.success('Message sent successfully.', {position: 'top-center'})
            
            // clear fields (probably a better way to do this exists)
            setName('');
            setEmail('');
            setPhoneNumber('');
            setMessage('');
            return;
        }
        catch (error)
        {
            console.log(error)
            toast.error(error.response.data.message, {position: 'top-center'});
        }
    }

    return (
        <>
            <Form onSubmit={HandleFormSubmit}>
                <Form.Group className='form-input-label mb-4' controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control className="" type="name" name="name" placeholder="Enter name" value={name} onChange={({target})=>setName(target.value)} required/>
                </Form.Group>
                <Form.Group className='form-input-label mb-4' controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control className="" type="email" name="email" placeholder="Enter email" value={email} onChange={({target})=>setEmail(target.value)} required/>
                </Form.Group>
                <Form.Group className='form-input-label mb-4' controlId="formBasicPhoneNumber">
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control className="" type="phoneNumber" name="phoneNumber" placeholder="Enter phone number" value={phoneNumber} onChange={({target})=>setPhoneNumber(target.value)} required/>
                </Form.Group>
                <Form.Group className='form-input-label mb-4' controlId='formBasicMessage'>
                    <Form.Label>Message</Form.Label>
                    <Form.Control type='text' name='message' placeholder="" as="textarea" rows={5} value={message} onChange={({target})=>setMessage(target.value)} required></Form.Control>
                </Form.Group>
                <Button className="" variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
}

export default ContactForm