import Home from './pages/Home';
import Login from './pages/Login';
import Layout from './pages/Layout';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/Register';
import Profile from './pages/Profile';
import FrequentlyAskedQuestions from './pages/FrequentlyAskedQuestions';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import CustomerService from './pages/CustomerService';
import Cart from './pages/Cart';
import AboutUs from './pages/AboutUs';
import ContactForm from './pages/ContactForm';
import ProductControlPanel from './pages/Profile/ProductControlPanel';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Messages from './pages/Profile/Messages';
import SearchedProducts from './pages/SearchedProducts';

/* context imports */
import { UserProvider, UserContext } from './context/UserContext';
import { CartProvider } from './context/CartContext';
import SearchedProductsContextProvider, { SearchedProductsContext } from './context/SearchedProductsContext';

const App = () => {
  return (
    <>
      <ToastContainer/>
      <BrowserRouter>
      <SearchedProductsContextProvider>
      <CartProvider>
      <UserProvider>
          <Routes>
            <Route path="/" element={<Layout/>}>
              <Route index element={<Home/>}/>
              <Route path="login" element={<Login/>}/>
              <Route path="register" element={<Register/>}/>
              {/* profile outlet */}
              <Route path="profile" element={<Profile/>}>
                <Route path='unreadMessages' element={<Messages read={false}/>}/>
                <Route path='archivedMessages' element={<Messages read={true}/>}/>
                <Route path="productControlPanel" element={<ProductControlPanel/>}/>
              </Route>
              <Route path="cart" element={<Cart/>}/>
              {/*customer service outlet*/}
              <Route path="customerService" element={<CustomerService/>}>
                <Route path="frequentlyAskedQuestions" element={<FrequentlyAskedQuestions/>}/>
                <Route path="aboutUs" element={<AboutUs/>}/>
                <Route path="contactForm" element={<ContactForm/>}/>
              </Route>
              <Route path='searchedProducts' element={<SearchedProducts/>}/>
              <Route path="*" element={<PageNotFound/>}/>
            </Route>
          </Routes>
      </UserProvider>
      </CartProvider>
      </SearchedProductsContextProvider>
    </BrowserRouter>

    </>
  );
}

export default App;
