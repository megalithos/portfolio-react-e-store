import { Container, Nav, Navbar, NavbarBrand, NavLink,Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import "./index.css"
import brandImage from './graphic/brand.png'
import { UserContext } from './context/UserContext';
import { CartContext } from './context/CartContext';

const MyNavbar = () => {
  const { user } = useContext(UserContext);
  const { cart } = useContext(CartContext);

  return (
    <Navbar bg='dark' variant='dark' className="fixed-top">
    <Container fluid>
      <NavbarBrand>
        <NavLink as={Link} to='/'>
          <img className='w-75' src={brandImage}></img>
        </NavLink>
      </NavbarBrand>
      <Form className='d-flex w-50' >
        <Form.Group className='w-100'>
          <Form.Control className='search-box' type='search'  placeholder='Search' aria-label='Search'/>
        </Form.Group>
        <Button className='test'>
          <FontAwesomeIcon icon={solid('magnifying-glass')}/>
        </Button>
        
      </Form>
      <Nav>
        {(!user?.loggedIn) ?
        <NavLink as={Link} to='/login'>
          <FontAwesomeIcon className='navbarNavIcon' icon={solid('right-to-bracket')}/>
          <span className='d-none d-sm-inline-block'>
            Log in
          </span>
        </NavLink>
        :
        <NavLink as={Link} to='/profile'>
          <FontAwesomeIcon className='navbarNavIcon' icon={solid('user')}/>
          <span className='d-none d-sm-inline-block'>
            Profile
          </span>
        </NavLink>
        }
        
        <NavLink as={Link} to='/favorites'>
        <FontAwesomeIcon className='navbarNavIcon' icon={regular('heart')}/>
        <span className='d-none d-sm-inline-block'>
          Favorites
        </span>

        </NavLink>
        
        
        <NavLink as={Link} to='/cart'>
        <p className='navbar-shopping-cart-product-count-text'>
          {cart.length > 0 ? cart.length : <></>}
        </p>
        <FontAwesomeIcon className='navbarNavIcon' icon={solid('cart-shopping')}/>
        
        <span className='d-none d-sm-inline-block'>
          Cart
        </span>
        </NavLink>
      </Nav>

    </Container>
  </Navbar>);
}

export default MyNavbar