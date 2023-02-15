import { Container, Button, Row, Col, NavLink } from 'react-bootstrap'
import React, { useContext, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { Link, useNavigate } from 'react-router-dom'

// handle log out button clicked
const LogOut = (event, navigate, setUser) => {
    event.preventDefault();

    localStorage.removeItem('token');    
    setUser({});
    navigate('/login');
}

const Profile = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();

    const ProfileNavLink = ({text, to}) => {
        return (
            <NavLink className={`my-4 border-dark border-bottom border-1}`} as={Link} to={to}>
                <div className={`${location.pathname.includes(to) ? 'border-dark border-start border-3' : ''} px-1`}>
                    {text}
                </div>
            </NavLink>
        );
    }


    return (
    <Container className="extra-top-margin">
        {user.authLevel>0 ?
        <>
            <Row className='text-center'>
                <h4 >Welcome user {user.email}</h4>
            </Row>
            <Row className='text-center'>
                <h6 className='mb-5'>Authentication level: {user.authLevel == 1 ? 'moderator' : ((user.authLevel == 2) ? 'administrator' : '')}</h6>
            </Row>
            
            <Row>
                <Col md={3} className='shadow rounded'>
                    <ProfileNavLink text='Unread messages' to='unreadMessages'/>
                    <ProfileNavLink text='Archived messages' to='archivedMessages'/>
                    <ProfileNavLink text='Product control' to='productControlPanel'/>
                    <Col className='d-flex justify-content-center align-items-center mt-2'>
                        <Button variant='secondary' className='mb-3' onClick={(event)=>LogOut(event, navigate, setUser)}>Log out</Button>
                    </Col>
                </Col>
                <Col md={9}>
                    <Outlet/>
                </Col>
            </Row>
        </>
        :
        <>
            <Row className='text-center'w>
                <h4>Welcome user {user.email}</h4>
            </Row>
            <Row className='mt-2'>
            </Row>
            <Row className='mb-5'>
                <Col md={3} className=''>
                    <Row>
                        <Col className='d-flex justify-content-center align-items-center mt-2'>
                            <Button variant='primary' onClick={(event)=>LogOut(event, navigate, setUser)}>Log out</Button>
                        </Col>
                    </Row>
                </Col>
                <Col md={9}>
                    
                </Col>
            </Row>


        </>

        }
    </Container>
    );
}

export default Profile