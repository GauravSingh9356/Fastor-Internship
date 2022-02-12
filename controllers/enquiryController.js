const Student = require('../models/Student');
const isEmail = require('validator/lib/isEmail');
const People = require('../models/People');

const registerEnquiry = async (req, res) => {
  try {
    const { name, email, courseInterested } = req.body;
    if (!isEmail(email) || name.length < 2)
      return res
        .status(401)
        .send('Invalid Email or Name should be atleast 3 chars!');

    const newEnquiry = await Student.create({
      name: name,
      email: email,
      courseInterested: courseInterested,
      lead: '',
    });

    return res.status(200).json({
      message: 'New Enquiry is Created!',
      newEnquiry,
    });
  } catch (error) {
    res.status(500).send('Server Error Occured!', error);
  }
};




const getEnquiryDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const enquiry = await Student.findById(id).populate('lead');

    if (!enquiry) res.status(404).send('Enquiry not found!');

    res.status(200).send(enquiry);
  } catch (error) {
    res.status(500).send('Server Error Occured!', error);
  }
};




const getAllEnquiries = async (req, res) => {
  try {
    const allEnquires = await Student.find({ isAssigned: false });
    return res.status(200).send(allEnquires);
  } catch (error) {
    res.status(500).send('Some Server Error Occured!', error);
  }
};

module.exports = {
  registerEnquiry,
  getEnquiryDetails,
  getAllEnquiries,
};
