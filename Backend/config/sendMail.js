// import createTransport from "nodemailer";
// import dotenv from "dotenv"
// dotenv.config()

// const transporter = nodemailer.createTransport({
//   service: "Gmail",
//   port: 465,
//   secure: True, // true for 465, false for other ports
//   auth: {
//     user: process.env.USER_EMAIL,
//     pass:process.env.USER_PASSWORD,
//   },
// });
// const sendMail =async(to,otp)=>{
//     await transporter.sendMail({
//     from: process.env.USER_EMAIL,
//     to: to,
//     subject: "Reset Password",
//     html:"<p> Your otp for password reset is <b>"+otp+"</b></p>",
//   });



// }
// export default sendMail

import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, 
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

const sendMail = async (to, otp) => {
  await transporter.sendMail({
    from: process.env.USER_EMAIL,
    to: to,
    subject: "Reset Password",
    html: `<p>Your OTP for password reset is <b>${otp}</b></p>`,
  });
};

export default sendMail;
