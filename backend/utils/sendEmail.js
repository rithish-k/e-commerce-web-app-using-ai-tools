const nodeMailer = require("nodemailer");

const sendEmail = async (option) =>{
    const transporter = nodeMailer.createTransport({
        service:SMPT_SERVICE,
        auth:{
            user:process.env.SMPT_MAIL,
            pass:process.env.SMPT_PASSWORD,
        },
    })
    const mailOptions = {
        from :process.env.SMPT_MAIL,
        to:option.email,
        subject:option.subject,
        text:option.message
    }
    transporter.sendMail(mailOptions)

};
module.exports = sendEmail; 