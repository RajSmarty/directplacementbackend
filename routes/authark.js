const express = require('express');
const User = require('../models/Usera');
const router = express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
const dotenv = require("dotenv")
dotenv.config({ path: "./config.env" })

const JWT_SECRET = process.env.scrtKey;

// ROUTE 1: Create a User using: POST "/api/authark/signup". No login required
router.post('/signup', async (req, res) => {

  // Check whether the user with this email exists already
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ error: "Sorry a user with this email already exists" })
  }
  const salt = await bcrypt.genSalt(10);
  const secPass = await bcrypt.hash(req.body.password, salt);

  // Create a new user
  user = await User.create({
    name: req.body.name,
    position: req.body.position,
    place: "Arkansas",
    email: req.body.email,
    phone: req.body.phone,
    password: secPass,
  });
  const data = {
    user: {
      id: user.id
    }
  }
  const authtoken = jwt.sign(data, JWT_SECRET);

  res.json({ authtoken })
})


// ROUTE 2: Authenticate a User using: POST "/api/authark/login". No login required
router.post('/login', async (req, res) => {


  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({ authtoken })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});


// ROUTE 3: Get loggedin User Details using: POST "/api/authark/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {

  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})


// ROUTE 4: Get Total Employees Details using: GET "/api/authark/totalemployeea". Login required
router.get('/totalemployeea', async (req, res) => {

  try {
    const totalEmployees = await User.find({});
    res.json(totalEmployees)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

// ROUTE 5: Delete Particular Employee using: DELETE "/api/authark/delete". Login required
router.delete('/delete/:id', async (req, res) => {

  const id = req.params.id;

  const totalEmployees = await User.findByIdAndRemove(id).exec();
  // res.json(totalEmployees)
  res.status(200).send("Employee Deleted");
})

module.exports = router