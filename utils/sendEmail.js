const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
	try {
		const transporter = nodemailer.createTransport({
			// host: "smtp.gmail.com",
			service: "hotmail",
			// port: 587,
			// secure: true,
			auth: {
				user: "nargeeksdirectplacement@hotmail.com",
				pass: "Nargeeks@321",
			},
		});

		await transporter.sendMail({
			from: "nargeeksdirectplacement@hotmail.com",
			to: email,
			subject: subject,
			text: text,
		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};
