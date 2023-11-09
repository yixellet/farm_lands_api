const { getActualRentedLands } = require('../controllers/lands');

const router = require('express').Router();

router.get('/actual', getActualRentedLands);

module.exports = router;
