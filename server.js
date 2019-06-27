const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const express = require('express');
const port = 3000;

const app = express();

app.use(express.json());

app.listen(port, () => {
  console.log(`App is running on ${port}`);
});

app.get('/api/v1/countries', (request, response) => {
  database('countries').select()
  .then((countries) => {
    response.status(200).json(countries);
  })
  .catch((error) => {
    response.status(500).json({ error });
  });
});

app.get('/api/v1/countries/:id', (request, response) => {
  database('countries').where('id', request.params.id).select()
  .then((country) => {
    response.status(200).json(country);
  })
  .catch((error) => {
    response.status(500).json({ error });
  });
});

app.post('/api/v1/countries', (request, response) => {
  const {name, capital, resources} = request.body;
  database('countries').insert({name, capital}, 'id')
  .then(id => {
    response.status(201).json({id: id[0], name, capital});
  })
  .catch((error) => {
    response.status(500).json({ error });
  });
});

app.get('/api/v1/resources', (request, response) => {
  database('resources').select()
  .then((resources) => {
    response.status(200).json(resources);
  })
  .catch((error) => {
    response.status(500).json({ error });
  });
});

app.get('/api/v1/resources/:id', (request, response) => {
  database('resources').where('id', request.params.id).select()
  .then((resource) => {
    response.status(200).json(resource);
  })
  .catch((error) => {
    response.status(500).json({ error });
  });
});
