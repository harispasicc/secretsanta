import nodemailer from "nodemailer";
import config from "../config/config";

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: config.email_host,
      port: Number(config.email_port),
      secure: Boolean(config.email_secure),
      auth: {
        user: config.email_user,
        pass: config.email_password,
      },
    });

    await transporter.sendMail({
      from: config.email_email,
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

export default sendEmail;
