import { Outlet, Link } from 'react-router-dom';
import { Col, Container, NavLink, Row, Nav } from 'react-bootstrap';

const CustomerService = () => {
    const CustomerServiceNavLink = ({text, to}) => {
        return (
            <NavLink className='my-3 border-dark border-bottom border-1' as={Link} to={to}>
                {text}
            </NavLink>
        );
    }

    return (
        <Container className='extra-top-margin'>
            <Row>
                <Col>
                    <h3>Customer Service</h3>
                </Col>
            </Row>
            <Row>
                <Col md={3}>
                    <CustomerServiceNavLink text='Frequently asked questions' to='frequentlyAskedQuestions'/>
                    <CustomerServiceNavLink text='Contact form' to='contactForm'/>
                    <CustomerServiceNavLink text='About us' to='aboutUs'/>
                </Col>
                <Col md={9}>
                    <Outlet/>
                </Col>
            </Row>
        </Container>
    );
}

export default CustomerService