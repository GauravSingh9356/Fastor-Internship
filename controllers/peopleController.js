const People = require('../models/People');
const jwt = require('jsonwebtoken');
const isEmail = require('validator/lib/isEmail');
const Student = require('../models/Student');

const register = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    if (!isEmail(email))
      return res.status(500).send('Email given is not Valid!');

    if (!name || !role)
      return res.status(500).send('Either name or role is missing!');
    const newPeople = await People.create({
      name,
      email,
      role,
      enquiries: [],
    });

    const payload = {
      userId: newPeople._id,
    };

    const token = jwt.sign(payload, 'jwtsecretkeyhaiyeh', {
      expiresIn: '5d',
    });

    res.cookie('token', token, {
      httpOnly: true,
    });

    return res.status(200).json({
      message: 'New People Created',
      newPeople,
    });
  } catch (error) {
    return res.status(500).send('Some error occured!', error);
  }
};

const login = async (req, res) => {
  try {
    const { email } = req.body;
    if (!isEmail(email)) return res.status(500).send('Email is not valid!');

    const people = await People.findOne({ email: email });
    if (!people) return res.status(404).send('User not Found!');

    const payload = {
      userId: people._id,
    };
    const token = jwt.sign(payload, 'jwtsecretkeyhaiyeh', {
      expiresIn: '5d',
    });

    res.cookie('token', token, {
      httpOnly: true,
    });

    return res.status(200).send(people);
  } catch (error) {
    return res.status(500).send('Server Error Occured!', error);
  }
};

const getDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const people = await People.findById(id).populate('enquiries');

    if (!people) return res.status(500).send('People not found!');

    return res.status(200).send(people);
  } catch (error) {
    return res.status(500).send('Server Error Occured!', error);
  }
};

const claimLead = async (req, res) => {
  try {
    const { userId } = req;
    const { id } = req.params;
    const people = await People.findById(userId);

    if (!people) return res.status(404).send('No user found! Please Relogin!');

    const enquiry = await Student.findById(id);

    if (!enquiry) return res.status(404).send('Enquiry Not Found!');

    people.enquiries.push({
      enquiry: enquiry._id,
    });
    enquiry.lead = people._id;
    enquiry.isAssigned = true;

    await people.save();
    await enquiry.save();

    return res.status(200).json({
      message: 'Enquiry is claimed!',
      enquiry,
      people,
    });
  } catch (error) {
    return res.status(500).send('Server Error Occured!');
  }
};

const getUnclaimedLeads = async (req, res) => {
  try {
    const allPeoples = await People.find();

    const unclaimedLeads = allPeoples.filter(
      (people) => people.enquiries.length == 0
    );

    return res.status(200).send(unclaimedLeads);
  } catch (error) {
    return res.status(500).send('Server Error Occured!', error);
  }
};
module.exports = {
  register,
  login,
  getDetails,
  claimLead,
  getUnclaimedLeads,
};
