const { db } = require('./db');

const { ParameterizedQuery } = require('pg-promise');

function getLandsNotInEGRN(req, res) {
  const query = new ParameterizedQuery(
    {
      text: `SELECT * FROM farm_lands.lands_not_in_egrn;`,
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
  getLandsNotInEGRN
};
