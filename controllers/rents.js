const { db } = require('./db');

const { ParameterizedQuery } = require('pg-promise');

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

function getRentsByLanduser(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT json_build_object(
        'type', 'Feature',
        'id', l.uid,
        'geometry', ST_AsGeoJSON(ST_Transform(l.geom, 3857))::jsonb,
        'properties', json_build_object('l', l.*, 'r', r.*)
      )
      FROM farm_lands.rent_register r
        JOIN farm_lands.lands_import l USING (cadastral_number)
      WHERE r.user_text = $1;`,
      values: [req.query.user]
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

function getRentsGeom(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(ST_AsGeoJSON(l.*)::json)
      )
      FROM farm_lands.rent_register r
        JOIN farm_lands.lands_import l USING (cadastral_number)
      WHERE r.user_text = $1;`,
      values: [req.query.user]
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
  getAllRentInfo,
  getRentsByLanduser,
  getRentsGeom
};
