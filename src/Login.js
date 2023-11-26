// src/components/Login.js

import React from 'react';
import axios from 'axios';

const Login = ({ onLoginSuccess }) => {
  const keyIdentity = 'DO5PuNIDlF7ge3dQfk6M4PnnduUHzfPV';
  const keyCredential = 'l0klRKNKbbMPjSv9bTRLIygzfHgMc7uD';

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost/omeka-s/api/users', {
        key_identity: keyIdentity,
        key_credential: keyCredential
      });
      // Handle login success
      onLoginSuccess(response.data);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
