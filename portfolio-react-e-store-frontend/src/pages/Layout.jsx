import MyNavbar from '../MyNavbar';
import Products from '../Products';
import MyFooter from '../MyFooter';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    
    return (
    <>
        <MyNavbar/>
        <Outlet/>
        <MyFooter/>
    </>
    );
}

export default Layout