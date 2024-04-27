// app.js

const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route for sending emails
app.post("/send-email", async (req, res) => {
  const { emailHost, emailUser, emailPassword, receiver, emailHtml, subject } =
    req.body;

  try {
    await sendEmail(
      emailHost,
      emailUser,
      emailPassword,
      receiver,
      emailHtml,
      subject
    );
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
});

async function sendEmail(
  emailHost,
  emailUser,
  emailPassword,
  receiver,
  emailHtml,
  subject
) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: emailHost,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: emailUser,
      pass: emailPassword,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: emailUser, // sender address
    to: receiver, // list of receivers
    subject: subject, // Subject line
    html: emailHtml, // html body
  });

  console.log("Message sent: %s", info.messageId);
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
