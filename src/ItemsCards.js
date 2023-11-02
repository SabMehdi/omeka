import React, { useState, useEffect } from 'react';
import './items.css'
// Card component
const Card = ({ title, imageUrl, description }) => (
  <div className="card">
    <img src={imageUrl} alt={title} />
    <div className="container">
      <h4 className="title">{title}</h4>
      <p className="description">{description}</p>
    </div>
  </div>
);

// Main component that fetches the data and renders cards
const ItemCards = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch the items from your API
    fetch('http://localhost/omeka-s/api/items')
      .then(response => response.json())
      .then(data => {
        // Assuming the API returns an array of items
        setItems(data);
      })
      .catch(error => {
        console.error('Error fetching items:', error);
      });
  }, []);

  return (
    <div className="card-container">
      {items.map(item => (
        <Card
          key={item['o:id']}
          title={item['o:title']}
          imageUrl={item.thumbnail_display_urls.medium}
          description={item['dcterms:description'][0]['@value']}
        />
      ))}
    </div>
  );
};

export default ItemCards;
