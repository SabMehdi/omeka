import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from './UserContext'; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const { updateCredentials } = useUser();
    const [keyIdentity, setKeyIdentity] = useState('');
    const [keyCredential, setKeyCredential] = useState('');
    const [users, setUsers] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate=useNavigate()
    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.get('/api/users', {
                params: {
                  key_identity: keyIdentity,
                  key_credential: keyCredential
                }
            });
            
            setUsers(response.data); 
            updateCredentials({ key_identity: keyIdentity, key_credential: keyCredential });

            navigate('/resource');

            
        } catch (error) {
            console.error('Error fetching user data:', error);
            setError('Failed to fetch user data. Please check the credentials and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Login to Fetch Users</h2>
            <form onSubmit={handleLogin}>
                <input 
                    type="text" 
                    placeholder="Key Identity" 
                    value={keyIdentity} 
                    onChange={(e) => setKeyIdentity(e.target.value)} 
                />
                <input 
                    type="password" 
                    placeholder="Key Credential" 
                    value={keyCredential} 
                    onChange={(e) => setKeyCredential(e.target.value)} 
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Login'}
                </button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}      
              {/* Display users if needed */}
              <ul>
              {users.map(user => (
                <li key={user['o:id']}>{user['o:name']}</li>
              ))}
            </ul>   
        </div>
    );
};

export default Login;
