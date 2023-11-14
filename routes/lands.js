const { getLandInfo } = require('../controllers');
const { getLandsNotInEGRN } = require('../controllers/lands');

const router = require('express').Router();

router.get('/', getLandInfo);
router.get('/not_in_egrn', getLandsNotInEGRN);

module.exports = router;
