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

    let htmlCode = `<!DOCTYPE html>
    <!-- PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> -->
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Home</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </head>
    <body style="margin: 0; padding: 0;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%"> 
            <tr>
                <td style="padding: 10px 0 30px 0;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border: 1px solid #cccccc; border-collapse: collapse;">
                        <tr>
                            <td align="center" bgcolor="#ffffff" style="padding: 0px 0 0px 0; color: #d8d8d8; font-size: 28px; font-weight: bold; font-family: Arial, sans-serif;">
                                <a href="https://www.home-social.com" style="color: #ffffff;">
                                <img src='https://bloximages.chicago2.vip.townnews.com/ravallirepublic.com/content/tncms/assets/v3/editorial/0/2c/02c87257-14a4-5d27-9a08-581e336022e4/5bbd37e85084d.image.jpg'
                                 alt="Cancer Picture" width="200" height="200" />
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td style="color: #617872; font-family: Arial, sans-serif; font-size: 24px;">
                                            <b>Welcome Home, ${first_name}!</b>
                                        </td>
                                    </tr>
                                    <tr>
                                            <td style="padding: 20px 0 30px 0; color: #364440; font-family: Arial, sans-serif; font-size: 20px; line-height: 22px;">
                                                Thank you for registering! We hope that as you settle in and find new friends, that you find comfort and support in your journey. The goal is to be able to support and lift each other up during our lows and cheer for each other during our highs. Theres a lot of uncertainty and anxiety in the world, but the goal is while you are here with us, we can aleviate some of that. Again, thank you for registering, and WELCOME HOME! 
                                            </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                <tr>
                                                    <td width="260" valign="top">
                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                            <tr>
                                                                <td>
                                                                    <a href="https://www.home-social.com" style="color: #ffffff;">
                                                                    <img src="https://cff2.earth.com/uploads/2019/06/11122539/Number-of-cancer-survivors-set-to-exceed-22-million-by-2030.jpg" alt="Cancer Picture" width="100%" height="140" style="display: block;" />
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="padding: 25px 0 0 0; color: #364440; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                                                                    Hey! We know you are just getting started, so head over to your dashboard, scroll through some posts and feel free to introduce yourself!  
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                    <td style="font-size: 0; line-height: 0;" width="20">
                                                        &nbsp;
                                                    </td>
                                                    <td width="260" valign="top">
                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                            <tr>
                                                                <td> 
                                                                    <a href="https://www.home-social.com" style="color: #ffffff;">
                                                                    <img src="https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fdam%2Fimageserve%2F853204244%2F960x0.jpg%3Ffit%3Dscale" alt="Cancer Picture" width="100%" height="140" style="display: block;" />
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="padding: 25px 0 0 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                                                                    Head on over to the chat room and get involved! Be on the look out for upcoming features being added, and if you have any additional ideas feel free to let us know! 
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#b3cfcc" style="padding: 30px 30px 30px 30px;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td style="color: #080707; font-family: Arial, sans-serif; font-size: 14px;" width="75%">
                                            &reg; Home, SLC Utah 2020<br/>
                                            <a href="#" style="color: #0c0a0a;"><font color="#0c0a0a">Unsubscribe</font></a> to this newsletter instantly
                                        </td>
                                        <td align="right" width="25%">
                                            <table border="0" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td style="font-family: Arial, sans-serif; font-size: 12px; font-weight: bold;">
                                                        <a href="http://www.twitter.com/" style="color: #ffffff;">
                                                            <img src="https://cdn3.iconfinder.com/data/icons/social-media-2174/512/Twitter-512.png" alt="Twitter" width="38" height="38"  border="0" />
                                                        </a>
                                                    </td>
                                                    <td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td>
                                                    <td style="font-family: Arial, sans-serif; font-size: 12px; font-weight: bold;">
                                                        <a href="http://www.facebook.com/" style="color: #ffffff;">
                                                            <img src="https://cdn3.iconfinder.com/data/icons/social-media-2174/512/Facebook-01-512.png" alt="Facebook" width="38" height="38"  border="0" />
                                                        </a>
                                                        <td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td>
                                                    <td style="font-family: Arial, sans-serif; font-size: 12px; font-weight: bold;">
                                                        <a href="http://www.pinterest.com/" style="color: #ffffff;">
                                                            <img src="https://cdn3.iconfinder.com/data/icons/social-media-2174/512/Pintrest-256.png" alt="Pinterest" width="38" height="38"  border="0" />
                                                        </a>
                                                    </td>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>`
    const registerEmail = {
        from: FROM_EMAIL,
        to: email,
        subject: 'Welcome Home!',
        // text: "hello world",
        html: htmlCode
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