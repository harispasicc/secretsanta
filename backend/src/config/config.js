require("dotenv").config();

const config = {
  port: process.env.PORT,
  secret: process.env.JWT_SECRET,
  mongo: process.env.MONGO,
  email_host: process.env.EMAIL_HOST,
  email_port: process.env.EMAIL_PORT,
  email_user: process.env.EMAIL_USER,
  email_password: process.env.EMAIL_PASSWORD,
  email_email: process.env.EMAIL_EMAIL,
  email_secure: process.env.EMAIL_SECURE,
};

export default config;
