import { Container, Nav, Navbar, NavbarBrand, NavLink,Form, Button, InputGroup } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import "./index.css"
import brandImage from './graphic/brand.png'
import { UserContext } from './context/UserContext';
import { CartContext } from './context/CartContext';
import { SearchedProductsContext } from './context/SearchedProductsContext';

const MyNavbar = () => {
  const { user } = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const { RequestProductsSearch } = useContext(SearchedProductsContext)
  const location = useLocation();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');

  const GetCartItemCount = () => {
    if (cart.length === 0)
      return;
    
    let totalCartProductsCount = 0;
    cart.forEach(cartProduct => {
      totalCartProductsCount += cartProduct.amount;
    });

    return (totalCartProductsCount);
  }

  const HandleSearchButtonClick = event => {
    event.preventDefault();

    RequestProductsSearch(searchText);
    
    // hardcode this for now
    if (location.pathname !== '/searchedProducts')
    {
      navigate('/searchedProducts');
    }
  }

  return (
    <Navbar bg='dark' variant='dark' className="fixed-top">
    <Container fluid>
      <NavbarBrand>
        <NavLink as={Link} to='/' className=''>
          <img src={brandImage} className='d-inline-block align-top' width='120'></img>
        </NavLink>
      </NavbarBrand>
      <InputGroup className='w-75'>
        <Form.Control className='search-box' type='search' placeholder='Search' aria-label='Search' value={searchText} onChange={({target})=>setSearchText(target.value)}/>
        <Button className='' onClick={HandleSearchButtonClick}>
          <FontAwesomeIcon icon={solid('magnifying-glass')}/>
        </Button>
      </InputGroup>
      <Nav>
        {(!user?.loggedIn) ?
        <NavLink as={Link} to='/login'>
          <FontAwesomeIcon className='navbarNavIcon' icon={solid('right-to-bracket')}/>
          <span className='d-none d-sm-inline-block'>
            Log in
          </span>
        </NavLink>
        :
        <NavLink as={Link} to='/profile/unreadMessages'>
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
          {GetCartItemCount()}
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