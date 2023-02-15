import React, { createContext, useState } from 'react';
import axios from 'axios';
import constants from '../util/constants';
export const SearchedProductsContext = createContext();

const SearchedProductsContextProvider = ({ children }) => {
    const [searchedProducts, setSearchedProducts] = useState([]);

    const RequestProductsSearch = async (keyword) => {
        try
        {
            const response = await axios.get(`${constants.BACKEND_API_URL}/products/search?keyword=${keyword}`);
            setSearchedProducts(response.data);
        }
        catch (error)
        {
            console.log(error);
        }      
    }
    
    return (
        <SearchedProductsContext.Provider value={{ searchedProducts, RequestProductsSearch }}>
            { children }
        </SearchedProductsContext.Provider>
    );
}

export default SearchedProductsContextProvider