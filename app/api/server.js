const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Ensure you have dotenv installed if you're using environment variables

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: '2100520200003@ietlucknow.ac.in', // Use environment variables for security
    pass: 'qoiy jcia anfg vedg',
  },
});

app.post('/send-email', async (req, res) => {
  const { email, subject, content } = req.body; // Email is the sender's email, not the recipient

  const mailOptions = {
    from: `Your Name <${process.env.EMAIL_USERNAME}>`, // Sender address
    to: '2100520200003@ietlucknow.ac.in', // Here you set the recipient's email address
    subject: `Message from ${email} - ${subject}`, // Custom subject line
    text: content, // Plain text body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Failed to send the email.");
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send("Email sent successfully.");
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
