const router = require('express').Router();

const { getLandusers, getLandInfo } = require('../controllers');
const landsRouter = require('./lands');
const rentsRouter = require('./rents');

router.get('/landusers', getLandusers);
router.get('/landinfo', getLandInfo)
router.use('/rents', rentsRouter)
router.use('/lands', landsRouter)

module.exports = router;
