import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemsList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace with your Omeka S API endpoint for items
    const apiEndpoint = 'http://localhost/omeka-s/api/items';

    axios.get(apiEndpoint)
      .then((response) => {
        setItems(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []); // Empty array ensures this effect runs only once after the initial render

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Items</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <h2>{item['o:title']}</h2>
            {/* Display other item details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemsList;
