import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from './UserContext';
const User = () => {
    const [users, setUsers] = useState([]);
    const { credentials } = useUser();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/users', {
                    params: {
                      key_identity :credentials.key_identity,
                      key_credential :credentials.key_credential
                    }
                });
                setUsers(response.data);
                console.log(response.data[0])
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Users</h2>
            <ul>
                {users.map(user => (
                    <li key={user['o:id']}>
                        {user['o:name']} - {user['o:email']}
                    </li>
                    
                ))}
            </ul>
        </div>
    );
};

export default User;
