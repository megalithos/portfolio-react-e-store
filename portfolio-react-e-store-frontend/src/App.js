import Home from './pages/Home';
import Login from './pages/Login';
import Layout from './pages/Layout';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ProductControlPanel from './pages/ProductControlPanel';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { UserProvider, UserContext } from './context/UserContext';
import { CartProvider } from './context/CartContext';
import Cart from './pages/Cart';

const App = () => {
  return (
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
              <Route path="*" element={<PageNotFound/>}/>
            </Route>
          </Routes>
        </UserProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
