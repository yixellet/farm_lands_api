const router = require('express').Router();

const { getLandusers, getLandInfo, getAllRentInfo } = require('../controllers');
const landsRouter = require('./lands');

router.get('/landusers', getLandusers);
router.get('/landinfo', getLandInfo)
router.get('/rents', getAllRentInfo)
router.use('/lands', landsRouter)

module.exports = router;
