const { getActualLandusers, getNonActualLandusers } = require('../controllers/users');

const router = require('express').Router();

router.get('/actual', getActualLandusers);
router.get('/non_actual', getNonActualLandusers);

module.exports = router;
