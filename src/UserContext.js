import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [credentials, setCredentials] = useState({
    key_identity: sessionStorage.getItem('key_identity') || '',
    key_credential: sessionStorage.getItem('key_credential') || '',
  });

  const updateCredentials = (newCredentials) => {
    sessionStorage.setItem('key_identity', newCredentials.key_identity);
    sessionStorage.setItem('key_credential', newCredentials.key_credential);
    setCredentials(newCredentials);
  };

  return (
    <UserContext.Provider value={{ credentials, updateCredentials }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
