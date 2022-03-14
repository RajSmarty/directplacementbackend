const express = require('express');
const Admin = require('../models/Admin');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
// var fetchuser = require('../middleware/fetchuser');
var fetchadmin = require('../middleware/fetchadmin');
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" })

const JWT_SECRET = "secret";

// ROUTE 1: Create an Admin using: POST "/api/adminauth/signup". No login required
router.post('/signup', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  let Response = false;
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), Response });
  }
  try {
    // Check whether the Admin with this email exists already
    let user = await Admin.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "Sorry a user with this email already exists", Response })
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    user = await Admin.create({
      password: secPass,
      email: req.body.email,
    });
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);


    Response = true;
    return res.json({ user, Response })

    res.json({ authtoken, Response })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})


// ROUTE 2: Authenticate an Admin using: POST "/api/adminauth/login". No login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  let Response = false;
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await Admin.findOne({ email });
    if (!user) {
      Response = false
      return res.status(400).json({ error: "Please try to login with correct credentials", Response });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      Response = false
      return res.status(400).json({ error: "Please try to login with correct credentials", Response });
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    Response = true;

    
    res.json({ authtoken, Response })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }


});


// ROUTE 3: Get loggedin Admin Details using: POST "/api/adminauth/getuser". Login required
router.post('/getadmin', fetchadmin, async (req, res) => {

  try {
    userId = req.user.id;
    const user = await Admin.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})



module.exports = router