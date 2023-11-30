import React, { useState, useEffect } from 'react';
import './items.css'
import { useUser } from './UserContext';
const Card = ({ title, imageUrl, description }) => (
  <div className="mycard">
    <div className="mycard-image">
      <img src={imageUrl} alt={title} />
    </div>
    <div className="mycard-content">
      <h4 className="mytitle">{title}</h4>
      <p className="mydescription">{description}</p>
    </div>
  </div>
);



const ItemCards = () => {
  const [items, setItems] = useState([]);
  const { credentials } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost/omeka-s/api/items', {
          params: {
            key_identity :credentials.key_identity,
            key_credential :credentials.key_credential
          }
      });
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
