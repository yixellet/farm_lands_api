const router = require('express').Router();

const { getLandusers, getLandInfo, getAllRentInfo } = require('../controllers');

router.get('/landusers', getLandusers);
router.get('/lands', getLandInfo)
router.get('/rents', getAllRentInfo)

module.exports = router;
