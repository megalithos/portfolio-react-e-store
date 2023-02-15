import Products from '../Products'
import { Alert } from 'react-bootstrap';
import { Container, Row } from 'react-bootstrap';

const Home = () => {
    return (
    <Container className='extra-top-margin'>
        <Row className='mb-5'>
            <Products title='Trending' productAttribute='trending' className='py-5'/>
        </Row>
        <Row className='mb-5'>
            <Products title='Interesting' productAttribute='interesting'/> 
        </Row>
        <Row className='mb-5'>
            <Products title='Most viewed' productAttribute='most_viewed'/> 
        </Row>
    </Container>
    );
}

export default Home