const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
const dotenv = require("dotenv")
// const multer = require('multer')


dotenv.config({ path: "./config.env" })

const JWT_SECRET = process.env.scrtKey;

// ROUTE 1: Create a User using: POST "/signup". No login required
router.post('/signup', async (req, res) => {
  // let success = false;

  // try {
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
    email: req.body.email,
    phone: req.body.phone,
    password: secPass,
    pic: req.body.pic
  });
  const data = {
    user: {
      id: user.id
    }
  }
  const authtoken = jwt.sign(data, JWT_SECRET);


  // res.json(user)

  res.json({ authtoken })

  // } catch (error) {
  //   console.error(error.message);
  //   res.status(500).send("Internal Server Error");
  // }
})


// ROUTE 2: Authenticate a User using: POST "/login". No login required
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
    // success = true;
    res.json({ authtoken })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }


});


// ROUTE 3: Get loggedin User Details using: POST "/getuser". Login required
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



// ROUTE 3: Update an existing Code using: PUT "/updatename". Login required
router.put('/updatename/:id', fetchuser, async (req, res) => {
  const { name } = req.body;
  try {
    // Create a newCode object
    const newName = {};
    if (name) { newName.name = name };


    // Find the code to be updated and update it
    let newname = await User.findById(req.params.id);
    if (!newname) { return res.status(404).send("Not Found") }

    // if (newname.user.toString() !== req.user.id) {
    //     return res.status(401).send("Not Allowed");
    // }
    newname = await User.findByIdAndUpdate(req.params.id, { $set: newName }, { new: true })
    res.json({ newname });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

module.exports = router