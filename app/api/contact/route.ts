import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create a transporter using Google's SMTP server
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Verify the connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.error('SMTP connection error:', error);
  } else {
    console.log('SMTP server is ready to take our messages');
  }
});

export async function POST(request: Request) {
  try {
    console.log('Received contact form submission');
    const body = await request.json();
    console.log('Form data:', body);
    const { name, company, email, phone, jobTitle, interest, message } = body;

    // Create email template
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Contact Form Submission</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                margin: 0;
                padding: 0;
                background-color: #f5f5f5;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              }
              .header {
                text-align: center;
                padding: 20px 0;
                border-bottom: 2px solid #E31837;
                margin-bottom: 20px;
                background-color: #ffffff;
              }
              .logo {
                max-width: 200px;
                height: auto;
                margin-bottom: 15px;
              }
              .title {
                color: #E31837;
                font-size: 24px;
                font-weight: bold;
                margin: 0;
              }
              .content {
                background-color: #f9f9f9;
                padding: 25px;
                border-radius: 6px;
                margin-bottom: 20px;
              }
              .field {
                margin-bottom: 15px;
              }
              .field:last-child {
                margin-bottom: 0;
              }
              .label {
                font-weight: bold;
                color: #1a1a1a;
                margin-bottom: 5px;
              }
              .value {
                color: #4a4a4a;
                padding: 8px;
                background-color: #ffffff;
                border-radius: 4px;
                border: 1px solid #e0e0e0;
              }
              .message {
                white-space: pre-wrap;
                background-color: #ffffff;
                padding: 12px;
                border-radius: 4px;
                border: 1px solid #e0e0e0;
                margin-top: 5px;
              }
              .footer {
                text-align: center;
                font-size: 12px;
                color: #666;
                margin-top: 20px;
                padding-top: 20px;
                border-top: 1px solid #e0e0e0;
              }
              .contact-info {
                margin-top: 10px;
                font-size: 14px;
                color: #666;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <img src="https://22527425.fs1.hubspotusercontent-na1.net/hubfs/22527425/MARS-1.webp" alt="MARS Solutions Group Logo" class="logo">
                <h1 class="title">New Contact Form Submission</h1>
              </div>
              
              <div class="content">
                <div class="field">
                  <div class="label">Name</div>
                  <div class="value">${name}</div>
                </div>
                <div class="field">
                  <div class="label">Company</div>
                  <div class="value">${company}</div>
                </div>
                <div class="field">
                  <div class="label">Email</div>
                  <div class="value">${email}</div>
                </div>
                <div class="field">
                  <div class="label">Phone</div>
                  <div class="value">${phone}</div>
                </div>
                <div class="field">
                  <div class="label">Job Title</div>
                  <div class="value">${jobTitle}</div>
                </div>
                <div class="field">
                  <div class="label">Interest Area</div>
                  <div class="value">${interest}</div>
                </div>
                <div class="field">
                  <div class="label">Message</div>
                  <div class="message">${message}</div>
                </div>
              </div>

              <div class="footer">
                <p>This email was sent from your website contact form.</p>
                <div class="contact-info">
                  <p>MARS Solutions Group</p>
                  <p>Email: ${process.env.EMAIL_USER}</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    console.log('Attempting to send email...');
    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 