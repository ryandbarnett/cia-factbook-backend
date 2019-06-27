let countries = require('../../data/countries.js');
let resources = require('../../data/resources.js');

exports.seed = function(knex, Promise) {
  return knex('country-resources').del()
  .then(() => {
    return knex('countries', 'resources').del();
  })
  .then(() => {
    return knex('resources').insert(resources);
  })
  .then(() => {
    return Promise.all(
      countries.map(country => {
        const {name, capital, resources} = country;
        return knex('countries').insert({name, capital}, 'id').then(id => {
          return Promise.all(resources.map(resource => {
            return knex('resources')
            .where({
              name: resource
            }).select('id').first()
            .then(matchingResource => {
              if (matchingResource) {
                return knex('country-resources').insert({country_id: id[0], resource_id: matchingResource.id})
              }
            })
          }))
        })
      })
    )
  })
  .catch(error => console.log(`Error seeding data: ${error}`))
};

const createJoiner = (knex, country, resource) => {
  return knex('resources').where('name', resource).first()
  .then((resourceRecord) => {
    return knex('country-resources').insert({
      country_id: country.id,
      resource_id: resourceRecord.id
    });
  });
};

// countries.map(country => {
//         const {name, capital} = country;
//         country.resources.map(resource => {
//           return knex('countries').insert({name, capital})
//         })
//       })
