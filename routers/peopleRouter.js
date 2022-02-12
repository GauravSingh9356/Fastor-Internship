const express = require('express');
const {
  register,
  login,
  claimLead,
  getDetails,
  getUnclaimedLeads,
} = require('../controllers/peopleController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/:id').get(getDetails);
router.route('/claimLead/:id').post(authMiddleware, claimLead);
router.route('/unclaimedLeads').get(getUnclaimedLeads);

module.exports = router;
