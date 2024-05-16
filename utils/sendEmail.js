import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";
import handlebars from "handlebars";
import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Helper to get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create transporter object
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    ciphers: "SSLv3",
  },
  greetingTimeout: 20000,
  connectionTimeout: 20000,
});

export async function sendEmail(email, subject, payload, templatePath) {
  // Read and compile template
  const source = await readFile(path.join(__dirname, templatePath), "utf8");
  const compiledTemplate = handlebars.compile(source);

  // Email options
  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: email,
    subject: subject,
    html: compiledTemplate(payload),
  };

  try {
    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error: error };
  }
}

/*
Example:
sendEmail(
  "youremail@gmail.com,
  "Email subject",
  { name: "Eze" },
  "./templates/layouts/main.handlebars"
);
*/
