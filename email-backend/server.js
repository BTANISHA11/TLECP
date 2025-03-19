const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service
  auth: {
    user: 'your-email@gmail.com', // Your email
    pass: 'your-email-password', // Your email password or app password
  },
});

// Endpoint to send email reminders
app.post('/send-reminder', (req, res) => {
  const { email, contestName, contestTime } = req.body;

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: `Reminder: ${contestName} is starting soon!`,
    text: `Don't forget! The contest "${contestName}" starts at ${new Date(contestTime).toLocaleString()}.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent: ' + info.response);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});