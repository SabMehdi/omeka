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
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost/omeka-s/api/items');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
  
    fetchData();
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
