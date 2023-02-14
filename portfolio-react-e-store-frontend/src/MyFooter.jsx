import { Container, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import { Link } from 'react-router-dom';

const MyFooter = () => {
    return (
    <Container className='mt-3' fluid>
        <Row>
            <Col className='text-center'>
                <h6>CUSTOMER SERVICE</h6>
            </Col>
            <Col className='text-center'>
                <h6>SOCIAL MEDIA</h6>
                <Link to='https://www.facebook.com' className='footerSocialMediaIcon'>
                    <FontAwesomeIcon icon={brands('facebook')}/>
                </Link>
                <Link to='https://www.twitter.com' className='footerSocialMediaIcon'>
                    <FontAwesomeIcon icon={brands('twitter')}/>
                </Link>
                <Link to='https://www.instagram.com'  className='footerSocialMediaIcon'>
                    <FontAwesomeIcon icon={brands('instagram')}/>
                </Link>
                <Link to='https://www.tiktok.com'  className='footerSocialMediaIcon'>
                    <FontAwesomeIcon icon={brands('tiktok')}/>
                </Link>
            </Col>
        </Row>
        <div className='bg-secondary'>
            <h6 className="text-center p-2 m-0 text-white">Copyright &copy; My React EStore 2023</h6>
        </div>
    </Container>
    );
}

export default MyFooter