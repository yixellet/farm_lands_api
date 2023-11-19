const router = require('express').Router();

const { getLandInfo } = require('../controllers');
const usersRouter = require('./users');
const landsRouter = require('./lands');
const rentsRouter = require('./rents');

router.get('/landinfo', getLandInfo)
router.use('/rents', rentsRouter)
router.use('/lands', landsRouter)
router.use('/users', usersRouter);

module.exports = router;
