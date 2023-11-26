import React, { useState, useEffect } from 'react';
import axios from 'axios';

const User = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost/omeka-s/api/users', {
                    params: {
                        key_identity :'DO5PuNIDlF7ge3dQfk6M4PnnduUHzfPV',
                        key_credential :'l0klRKNKbbMPjSv9bTRLIygzfHgMc7uD'
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
