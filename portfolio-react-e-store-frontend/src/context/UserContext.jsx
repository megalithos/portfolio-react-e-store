import React, { createContext, useState, useEffect } from 'react';
import { postData } from '../util/requests';
import constants from '../util/constants';

export const UserContext = createContext({});

const RequestRefreshToken = async (token, setUser) => {
  const requestBody = { token:token };

  try
  {
      const response = await postData(`${constants.BACKEND_API_URL}/refreshToken`, requestBody)
      localStorage.setItem('token', response.data.token)
      
      setUser({email:response.data.email, loggedIn:true, authLevel:response.data.auth_level});
      return;
  }
  catch (error)
  {
      alert(error)
  }
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  // on development mode code inside this useEffect is ran twice if react is in strict mode
  useEffect(()=> {
    const token = localStorage.getItem('token')

    if (!token)
      return;

    RequestRefreshToken(token, setUser);
  }, []);


  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
