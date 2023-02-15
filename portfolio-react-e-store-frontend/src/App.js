import Home from './pages/Home';
import Login from './pages/Login';
import Layout from './pages/Layout';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ProductControlPanel from './pages/ProductControlPanel';
import FrequentlyAskedQuestions from './pages/FrequentlyAskedQuestions';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { UserProvider, UserContext } from './context/UserContext';
import { CartProvider } from './context/CartContext';
import CustomerService from './pages/CustomerService';
import Cart from './pages/Cart';
import AboutUs from './pages/AboutUs';
import ContactForm from './pages/ContactForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <ToastContainer/>
      <BrowserRouter>
      <CartProvider>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Layout/>}>
              <Route index element={<Home/>}/>
              <Route path="login" element={<Login/>}/>
              <Route path="register" element={<Register/>}/>
              <Route path="profile" element={<Profile/>}/>
              <Route path="productControlPanel" element={<ProductControlPanel/>}/>
              <Route path="cart" element={<Cart/>}/>
              {/*outlet*/}
              <Route path="customerService" element={<CustomerService/>}>
                <Route path="frequentlyAskedQuestions" element={<FrequentlyAskedQuestions/>}/>
                <Route path="aboutUs" element={<AboutUs/>}/>
                <Route path="contactForm" element={<ContactForm/>}/>
              </Route>
              <Route path="*" element={<PageNotFound/>}/>
            </Route>
          </Routes>
        </UserProvider>
      </CartProvider>
    </BrowserRouter>

    </>
  );
}

export default App;
