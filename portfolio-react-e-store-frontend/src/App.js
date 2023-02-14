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

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
            <Route path="profile" element={<Profile/>}/>
            <Route path="productControlPanel" element={<ProductControlPanel/>}/>
            <Route path="*" element={<PageNotFound/>}/>
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
