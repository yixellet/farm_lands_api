const { getAllRentInfo, getRentsByLanduser, getRentsGeom } = require('../controllers/rents');

const router = require('express').Router();

router.get('/', getAllRentInfo);
router.get('/by_landuser', getRentsByLanduser);
router.get('/by_landuser/geom', getRentsGeom);

module.exports = router;
