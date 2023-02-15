import { Container, Row, Col, NavLink, Nav } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import { Link } from 'react-router-dom';
import brandImage from './graphic/brand.png';

const MyFooter = () => {
    return (
    <Container className='mt-4 bg-dark' fluid>
        <Container className='py-4'>
            <Row>
                <Col>
                    <img src={brandImage} width='300'></img>
                </Col>
                <Col className='text-center text-light'>
                    <NavLink as={Link} to='/customerService'>
                        <h5 className=''>CUSTOMER SERVICE</h5>
                    </NavLink>
                    <Nav className='flex-column'>
                        <NavLink as={Link} to='/customerService/frequentlyAskedQuestions' style={{color:'white'}}>
                            <span>Frequently asked questions</span>
                        </NavLink>
                        <NavLink as={Link} to='/customerService/contactForm' style={{color:'white'}}>
                            <h7>Contact form</h7>
                        </NavLink>
                        <NavLink as={Link} to='/customerService/aboutUs' style={{color:'white'}}>
                            <h7>About us</h7>
                        </NavLink>
                    </Nav>
                </Col>
                <Col className='text-center'>
                    <h5 className='text-light'>SOCIAL MEDIA</h5>
                    <Link to='https://www.facebook.com' className='footerSocialMediaIcon'>
                        <FontAwesomeIcon icon={brands('facebook')} inverse/>
                    </Link>
                    <Link to='https://www.twitter.com' className='footerSocialMediaIcon'>
                        <FontAwesomeIcon icon={brands('twitter')} inverse/>
                    </Link>
                    <Link to='https://www.instagram.com'  className='footerSocialMediaIcon'>
                        <FontAwesomeIcon icon={brands('instagram')} inverse/>
                    </Link>
                    <Link to='https://www.tiktok.com'  className='footerSocialMediaIcon'>
                        <FontAwesomeIcon icon={brands('tiktok')} inverse/>
                    </Link>
                </Col>
            </Row>
        </Container>
        <div className='bg-dark m-0 border-top py-2'>
            <h6 className="text-center p-2 m-0 text-white">Copyright &copy; DigitalDepot 2023</h6>
        </div>
    </Container>
    );
}

export default MyFooter