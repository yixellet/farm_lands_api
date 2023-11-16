const { getAllRentInfo, getRentsByLanduser } = require('../controllers/rents');

const router = require('express').Router();

router.get('/', getAllRentInfo);
router.get('/by_landuser', getRentsByLanduser)

module.exports = router;
