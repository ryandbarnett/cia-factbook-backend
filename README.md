# CIA World Factbook | Build Your Own Backend

CIA World Factbook (Build Your Own Backend) is a backend server that front-end applications can use to request a list of world countries, resources, and a list of what resources each country produces. Users can add new countries and resources and also delete resources.

## Install/Setup
In order to install and run this app, follow these simple directions:
 - clone this repo
 - cd into the directory
 - npm install
 - npm start
 - open your browser to localhost:3000 and enjoy!
 
 ## Stack
  - Express
  - Knex
  - Node

## Endpoints

### GET

`/api/v1/countries`
`/api/v1/countries/:id`
`/api/v1/resources`
`/api/v1/resources/:id`
`/api/v1/country-resources`
`/api/v1/country-resources/:id`

### POST

`/api/v1/countries`
`/api/v1/resources`
`/api/v1/country-resources`

### DELETE

`/api/v1/country-resources/:id`

## Contributors
[Ryan Barnett](https://github.com/RyanDBarnett)