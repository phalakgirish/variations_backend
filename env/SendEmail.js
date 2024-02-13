import nodemailer from 'nodemailer';

export default async function SendEmail(emailid,otp) {
        const transporter = nodemailer.createTransport({
            service:'gmail',
            auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: "",
            pass: "",
            },
        });

        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: '"Variant Technology" <>', // sender address
            to: emailid, // list of receivers
            subject: "OTP Generated", // Subject line
            text: "Hello world?", // plain text body
            html: `
            <div>
                <p>Hi User,</p>
                <p style="margin-bottom:10px;">Please Find below <b>Generated OTP</b> for verification.</p>
                <p style="font-size:50px;margin:5px;font-family:Arial"><b>${otp}</b></p>
                <p ><b>Note:</b> This is system generated email.<p>
                <p>Thanks & Regards,<br />Variant Technology Team</p>
            <div>`, // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        //
        // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
        //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
        //       <https://github.com/forwardemail/preview-email>
        //
}

