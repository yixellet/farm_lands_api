const { db } = require('./db');

const { ParameterizedQuery } = require('pg-promise');

function getActualLandusers(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT * FROM farm_lands.actual_landusers;`,
    },
  );
  db.any(query)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error)
      res.send({ error });
    });
};

function getNonActualLandusers(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT * FROM farm_lands.non_actual_landusers;`,
    },
  );
  db.any(query)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error)
      res.send({ error });
    });
};

module.exports = {
  getActualLandusers,
  getNonActualLandusers,
};
