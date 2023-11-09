const { db } = require('./db');

const { ParameterizedQuery } = require('pg-promise');

function getActualRentedLands(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT json_build_object(
        'type', 'FeatureCollection',
        'crs', json_build_object(
          'type', 'name',
          'properties', json_build_object('name', 'EPSG:4326')
        ),
        'features', json_agg(ST_AsGeoJSON(l.*)::json)) as features
        FROM farm_lands.all_rented_lands l;`,
    },
  );
  db.one(query)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error)
      res.send({ error });
    });
};

module.exports = {
  getActualRentedLands
};
