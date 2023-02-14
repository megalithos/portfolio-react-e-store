import { Container, Button, Row, Col } from 'react-bootstrap'
import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import { Link, useNavigate } from 'react-router-dom'

// handle log out button clicked
const LogOut = (event, navigate, setUser) => {
    event.preventDefault();

    localStorage.removeItem('token');    
    setUser(null);
    navigate('/login');
}

const Profile = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    return (
    <Container className="extra-top-margin">
        <h4>Welcome user {user.email}</h4>
        {user.authLevel>0 ?
            <h5>Authentication level: {user.authLevel}</h5>
        :
            <></>
        }
        {user.authLevel>0 ?
        
        <Button variant='primary' onClick={()=>{navigate('/productControlPanel')}}>Product Control</Button>
        :
        <></>}
        <Row className='mt-2'>
            <Col>
                <Button variant='primary' onClick={(event)=>LogOut(event, navigate, setUser)}>Log out</Button>
            </Col>
        </Row>
    </Container>
    );
}

export default Profile