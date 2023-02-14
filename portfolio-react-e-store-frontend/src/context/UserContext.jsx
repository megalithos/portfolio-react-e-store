import React, { createContext, useState, useEffect } from 'react';
import postData from '../util/requests';
import constants from '../util/constants';

export const UserContext = createContext({});

const RequestRefreshToken = async (token, setUser) => {
  console.log('RequestRefreshToken');
  const requestBody = { token:token };

  try
  {
      const response = await postData(`${constants.BACKEND_API_URL}/refreshToken`, requestBody)
      localStorage.setItem('token', response.data.token)
      console.log(response.data)
      
      setUser({email:response.data.email, loggedIn:true, authLevel:response.data.auth_level});
      console.log('token refreshed successfully');
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
    console.log(`setUser:${setUser}`);

    console.log('test123');
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
