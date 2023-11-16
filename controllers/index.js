const { db } = require('./db');

const { ParameterizedQuery } = require('pg-promise');

function getLandusers(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT * FROM farm_lands.landusers;`,
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

function getLandInfo(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT l.cadastral_number,
      l.subtype,
      l.cat,
      l.permitted_use,
      l.area,
      l.full_address,
      l.cost,
      concat(l.region, ', ', l.district) AS location
    FROM farm_lands.lands_import l
    WHERE l.cadastral_number = $1;`,
      values: [req.query.cn]
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
  getLandusers,
  getLandInfo,
};
