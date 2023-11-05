import React, { useState, useEffect } from 'react';
import './items.css'

const Card = ({ title, imageUrl, description }) => (
  <div className="card">
    <div className="card-image">
      <img src={imageUrl} alt={title} />
    </div>
    <div className="card-content">
      <h4 className="title">{title}</h4>
      <p className="description">{description}</p>
    </div>
  </div>
);



const ItemCards = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost/omeka-s/api/items')
      .then(response => response.json())
      .then(data => {
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
