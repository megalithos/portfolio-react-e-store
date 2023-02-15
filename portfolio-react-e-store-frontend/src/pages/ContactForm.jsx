import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactForm = () => {

    const HandleFormSubmit = (event) => {
        event.preventDefault();
        toast.success('Message sent successfully.', {position: 'top-center'})
    }

    return (
        <>
            <Form onSubmit={HandleFormSubmit}>
                <Form.Group className='form-input-label mb-4' controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control className="" type="name" name="name" placeholder="Enter name" required/>
                </Form.Group>
                <Form.Group className='form-input-label mb-4' controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control className="" type="email" name="email" placeholder="Enter email" required/>
                </Form.Group>
                <Form.Group className='form-input-label mb-4' controlId="formBasicPhoneNumber">
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control className="" type="phoneNumber" name="phoneNumber" placeholder="Enter phone number" required/>
                </Form.Group>
                <Form.Group className='form-input-label mt-3' controlId='formBasicMessage'>
                    <Form.Label>Message</Form.Label>
                    <Form.Control type='text' name='message' placeholder="" as="textarea" rows={5} required></Form.Control>
                </Form.Group>
                <Button className="mt-3" variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
}

export default ContactForm