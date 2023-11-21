const router = require('express').Router();

const usersRouter = require('./users');
const landsRouter = require('./lands');
const rentsRouter = require('./rents');

router.use('/rents', rentsRouter)
router.use('/lands', landsRouter)
router.use('/users', usersRouter);

module.exports = router;
