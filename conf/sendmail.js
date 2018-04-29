const nodemailer = require('nodemailer');

const sendMail = function(to,subject,text,html,cb){
	nodemailer.createTestAccount((err, account) => {
		// create reusable transporter object using the default SMTP transport
		let transporter = nodemailer.createTransport({
			host: 'smtp.126.com',
			port: 465,
			secure: true, // true for 465, false for other ports
			auth: {
				user: "favlinks@126.com",
				pass: "qazxsw11111"
			}
		});

		// setup email data with unicode symbols
		let mailOptions = {
			from: 'favlinks@126.com',
			to: to, // list of receivers
			subject: subject, // Subject line
			text: text || "", // plain text body
			html: html || "" // html body
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.log(error);
			}
			// Preview only available when sending through an Ethereal account
			if(cb)cb(error,info);
			// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
			// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
		});
	});
};
module.exports = sendMail;
