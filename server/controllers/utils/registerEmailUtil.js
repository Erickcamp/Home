require("dotenv").config();
const nodemailer = require("nodemailer");
const {SERVER_EMAIL, SERVER_PASSWORD, FROM_EMAIL} = process.env;

const sendEmail = (req, res) => {
    const {email, first_name} = req.body;
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: SERVER_EMAIL,
          pass: SERVER_PASSWORD
        }
      });

    // let htmlCode = 
    const registerEmail = {
        from: FROM_EMAIL,
        to: email,
        subject: 'Welcome to Plantsiful',
        text: "hello world",
        // html: htmlCode
    }
        transporter.sendMail(registerEmail,(err, data) => {
            if (err){
                console.log(err)
                res.status(409).send("Error occured sending email")
            } else {
                console.log('Email sent successfully!')
                console.log(data)
                res.status(200).send("Email sent!")
            }
        })
}
module.exports = {sendEmail}