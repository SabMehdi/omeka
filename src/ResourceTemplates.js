import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from './UserContext'; 
const ResourceTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const { credentials } = useUser();

  useEffect(() => {
    axios.get('http://localhost/omeka-s/api/resource_templates', {
      params: {
        key_identity :credentials.key_identity,
        key_credential :credentials.key_credential
      }
  })
      .then(response => setTemplates(response.data))
      .catch(error => console.error('Error fetching templates:', error));
  }, []);

  const createRandomItem = (template) => {
    let randomItemData = {
        'o:resource_template': {'o:id': template['o:id'] || null},
        'o:is_public': true,
        'o:title': `item`, 
        'dcterms:title': [
            {
                'type': 'literal',
                'property_id': 1,
                'property_label': 'title',
                'is_public': true,
                '@value': `title`
            }
        ],
        'dcterms:description': [
            {
                'type': 'literal',
                'property_id': 4, 
                'property_label': 'Description',
                'is_public': true,
                '@value': `description`
            }
        ]
    };

    template['o:resource_template_property'].forEach(prop => {
        randomItemData[`dcterms:${prop['o:property']['o:id']}`] = [{'@value': `Random Value ${Math.random()}`}];
    });

    axios.post('http://localhost/omeka-s/api/items', randomItemData, {
      params: {
        key_identity :credentials.key_identity,
        key_credential :credentials.key_credential
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