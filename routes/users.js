const router = require("express").Router();
const { User, validate } = require("../models/newadmin");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

// router.get("/:id/verify/:token/", async (req, res) => {
// 	try {
// 		const user = await User.findOne({ _id: req.params.id });
// 		if (!user) return res.status(400).send({ message: "Invalid link" });

// 		const token = await Token.findOne({
// 			userId: user._id,
// 			token: req.params.token,
// 		});
// 		if (!token) return res.status(400).send({ message: "Invalid link" });

// 		await User.updateOne({ _id: user._id, verified: true });
// 		await token.remove();

// 		res.status(200).send({ message: "Email verified successfully" });
// 	} catch (error) {
// 		res.status(500).send({ message: "Internal Server Error" });
// 	}
// });

module.exports = router;
