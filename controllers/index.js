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
      text: `SELECT uid, cn, area, cat, cost, concat(region, ', ', district, ', ', locality) AS location FROM farm_lands.lands WHERE cn = $1;`,
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

function getAllRentInfo(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT r.uid,
              l.name,
              r.use_type_text,
              r.rent_from_date,
              r.rent_to_date,
              r.name AS use_type_class
            FROM farm_lands.landusers__register lr
              JOIN farm_lands.landusers l ON lr.landuser = l.uid
              JOIN (SELECT *
                  FROM farm_lands.rent_register r
                  JOIN farm_lands.using_types__class u ON r.use_type_class = u.code) r ON lr.register_record = r.uid
            WHERE r.cadastral_number = $1;`,
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
  getAllRentInfo
};
