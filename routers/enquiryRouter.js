const express = require('express');
const {
  registerEnquiry,
  getEnquiryDetails,
  getAllEnquiries,

} = require('../controllers/enquiryController');


const router = express.Router();

router.route('/register').post(registerEnquiry);
router.route('/:id').get(getEnquiryDetails);
router.route('/').get(getAllEnquiries);


module.exports = router;
