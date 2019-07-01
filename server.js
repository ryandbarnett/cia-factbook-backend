// Node/knex environment variable
const environment = process.env.NODE_ENV || 'development';
// Knex configuration
const configuration = require('./knexfile')[environment];
// Knex database
const database = require('knex')(configuration);
// Require express library
const express = require('express');
const port = 3000;

// Create an express application
const app = express();
// Use express.json to automatically parse incoming requests
app.use(express.json());

app.listen(process.env.PORT || port, () => {
  console.log(`App is running on ${port}`);
});

// Get request to show all the countries
app.get('/api/v1/countries', (request, response) => {
  // Select all the countries in the database
  database('countries').select()
  .then((countries) => {
    // Return a response with a 200 status code and all of the cards in json
    response.status(200).json(countries);
  })
  .catch((error) => {
    // Return a response with a 500 status code and the error message
    response.status(500).json({ error });
  });
});

// Get request to show a specific country
app.get('/api/v1/countries/:id', (request, response) => {
  // Select the country by it's id from the database
  database('countries').where('id', request.params.id).select()
  .then((country) => {
    // Return a response with a 200 status code and the country in json
    response.status(200).json(country);
  })
  .catch((error) => {
    // Return a response with a 500 status code and the error message
    response.status(500).json({ error });
  });
});

// Post request to add a country
app.post('/api/v1/countries', (request, response) => {
  // Destructure the request body
  const {name, capital, resources} = request.body;
  // Select the countries database and insert the new country
  database('countries').insert({name, capital}, 'id')
  .then(id => {
    // Return a response with a 201 status code and the country in json
    response.status(201).json({id: id[0], name, capital});
  })
  .catch((error) => {
    // Return a response with a 500 status code and the error message
    response.status(500).json({ error });
  });
});

// Get request to show all the resources
app.get('/api/v1/resources', (request, response) => {
  // Select all the resources in the database
  database('resources').select()
  .then((resources) => {
    // Return a response with a 200 status code and all of the resources in json
    response.status(200).json(resources);
  })
  .catch((error) => {
    // Return a response with a 500 status code and the error message
    response.status(500).json({ error });
  });
});

// Get request to show a specific resource
app.get('/api/v1/resources/:id', (request, response) => {
  // Select a specific resource by its id in the database
  database('resources').where('id', request.params.id).select()
  .then((resource) => {
    // Return a response with a 200 status code and all of the resource in json
    response.status(200).json(resource);
  })
  .catch((error) => {
    // Return a response with a 500 status code and the error message
    response.status(500).json({ error });
  });
});

// Post request to add a resource
app.post('/api/v1/resources', (request, response) => {
  // Destructure the request body
  const {name} = request.body;
  // Select the resources database and insert the new resource
  database('resources').insert({name}, 'id')
  .then(id => {
    // Return a response with a 201 status code and the resource in json
    response.status(201).json({id: id[0], name});
  })
  .catch((error) => {
    // Return a response with a 500 status code and the error message
    response.status(500).json({ error });
  });
});

// Get request to show all the country resources
app.get('/api/v1/country-resources', (request, response) => {
  // Select the country resources database
  database('country-resources').select()
  .then((resources) => {
    // Return a response with a 200 status code and the resource in json
    response.status(200).json(resources);
  })
  .catch((error) => {
    // Return a response with a 500 status code and the error message
    response.status(500).json({ error });
  });
});

// Get request to show a specific country resource
app.get('/api/v1/country-resources/:id', (request, response) => {
  // Select the country resources database and select a specific resource by it's id
  database('country-resources').where('id', request.params.id).select()
  .then((resource) => {
    // Return a response with a 200 status code and the resource in json
    response.status(200).json(resource);
  })
  .catch((error) => {
    // Return a response with a 500 status code and the error message
    response.status(500).json({ error });
  });
});

// Post request to add a country resource
app.post('/api/v1/country-resources', (request, response) => {
  // Destructure the request body
  const {country_id, resource_id} = request.body;
  // Select the country resources database and insert the new country resource
  database('country-resources').insert({country_id, resource_id}, 'id')
  .then(id => {
    // Return a response with a 201 status code and all of the resource in json
    response.status(201).json({id: id[0], country_id, resource_id});
  })
  .catch((error) => {
    // Return a response with a 500 status code and the error message
    response.status(500).json({ error });
  });
});

// Delete request to remove a country resource
app.delete('/api/v1/country-resources/:id', (request, response) => {
  // Select the country resources database and delete a country resource by it's id
  database('country-resources').where({ id: request.params.id}).del()
  .then(()=> {
      // Return a success message if the resource was deleted
      response.json({success: true})
  })
});
