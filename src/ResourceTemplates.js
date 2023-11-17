import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ResourceTemplates = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    axios.get('http://localhost/omeka-s/api/resource_templates')
      .then(response => setTemplates(response.data))
      .catch(error => console.error('Error fetching templates:', error));
  }, []);

  const createRandomItem = (template) => {
    let randomItemData = {
      'o:resource_template': {'o:id': template['o:id']},
      'dcterms:title': [{'@value': `Random Title ${Date.now()}`}], // Using the current timestamp to ensure uniqueness
      'dcterms:description': [{'@value': `Random Description ${Math.random()}`}], // Random description
    };

    // Adding properties from the template
    template['o:resource_template_property'].forEach(prop => {
      randomItemData[`dcterms:${prop['o:property']['o:id']}`] = [{'@value': `Random Value ${Math.random()}`}];
    });

    axios.post('http://localhost/omeka-s/api/items', randomItemData, {
        params: {
            key_identity: 'etsmWkWDhdz1BlW42oka8WkHDc0UFVeH',
            key_credential: 'vgvr6gk3INm4iqQhjsdB9bi0Hp4UBw4J'
        }
    })
    .then(response => console.log('Item created:', response.data))
    .catch(error => console.error('Error creating item:', error));
};

  return (
    <div>
      <h2>Resource Templates</h2>
      <ul>
        {templates.map(template => (
          <li key={template['o:id']}>
            {template['o:label']}
            <button onClick={() => createRandomItem(template)}>Create Random Item</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResourceTemplates;