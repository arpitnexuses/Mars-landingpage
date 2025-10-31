import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    const formData = await request.json()
    console.log("Received form data:", formData)

    // Support multiple naming conventions for environment variables
    const smtpHost = process.env.SMTP_HOST
    const smtpPort = process.env.SMTP_PORT
    const smtpSecure = process.env.SMTP_SECURE
    const smtpUser = process.env.SMTP_USER
    const smtpPassword = process.env.SMTP_PASSWORD || process.env.SMTP_PASS
    const smtpFrom = process.env.SMTP_FROM || process.env.FROM_EMAIL
    const recipientEmail = process.env.TO_EMAIL || "ayan.k@nexuses.in"

    // Debug: Log environment variables (without showing the password)
    console.log("SMTP Configuration:", {
      SMTP_HOST: smtpHost,
      SMTP_PORT: smtpPort,
      SMTP_USER: smtpUser,
      SMTP_PASSWORD: smtpPassword ? "***set***" : "NOT SET",
      SMTP_FROM: smtpFrom,
      TO_EMAIL: recipientEmail,
    })

    // Check for required environment variables
    if (!smtpHost || !smtpUser || !smtpPassword) {
      console.error("Missing SMTP configuration. Please set up .env.local file with SMTP credentials.")
      console.error("Missing variables:", {
        SMTP_HOST: !smtpHost,
        SMTP_USER: !smtpUser,
        SMTP_PASSWORD: !smtpPassword,
      })
      return NextResponse.json(
        { success: false, error: "Email server configuration missing. Please check your .env.local file. Make sure to restart the dev server after adding environment variables." },
        { status: 500 }
      )
    }

    // Create email HTML template
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * {
              box-sizing: border-box;
              margin: 0;
              padding: 0;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #1f2937;
              background-color: #f3f4f6;
              padding: 20px 0;
            }
            .email-wrapper {
              max-width: 650px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 40px 30px;
              text-align: center;
            }
            .header h1 {
              margin: 0 0 10px 0;
              font-size: 28px;
              font-weight: 700;
            }
            .header .subtitle {
              font-size: 14px;
              opacity: 0.95;
              margin: 0;
            }
            .content {
              padding: 40px 30px;
            }
            .info-box {
              background: #f8fafc;
              border-left: 4px solid #667eea;
              padding: 20px;
              margin-bottom: 30px;
              border-radius: 6px;
            }
            .info-box-title {
              font-size: 14px;
              font-weight: 600;
              color: #667eea;
              margin-bottom: 8px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .detail-row {
              display: table;
              width: 100%;
              padding: 18px 0;
              border-bottom: 1px solid #e5e7eb;
            }
            .detail-row:last-child {
              border-bottom: none;
              padding-bottom: 0;
            }
            .detail-label {
              display: table-cell;
              font-weight: 600;
              color: #6b7280;
              font-size: 13px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              width: 35%;
              vertical-align: top;
              padding-right: 15px;
            }
            .detail-value {
              display: table-cell;
              color: #1f2937;
              font-size: 15px;
              font-weight: 400;
              vertical-align: top;
              word-break: break-word;
            }
            .badge {
              display: inline-block;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 6px 14px;
              border-radius: 20px;
              font-size: 13px;
              margin: 5px 8px 5px 0;
              font-weight: 500;
            }
            .message-box {
              background: #f9fafb;
              border: 1px solid #e5e7eb;
              border-radius: 8px;
              padding: 20px;
              margin-top: 10px;
              font-size: 14px;
              line-height: 1.8;
              color: #374151;
              white-space: pre-wrap;
            }
            .footer {
              background: #f9fafb;
              padding: 30px;
              text-align: center;
              border-top: 1px solid #e5e7eb;
              color: #6b7280;
              font-size: 13px;
            }
            .footer-text {
              margin: 0;
              line-height: 1.6;
            }
            @media only screen and (max-width: 600px) {
              .email-wrapper {
                margin: 0 10px;
              }
              .header, .content, .footer {
                padding: 30px 20px;
              }
              .detail-label, .detail-value {
                display: block;
                width: 100%;
                padding: 0;
              }
              .detail-label {
                margin-bottom: 8px;
              }
            }
          </style>
        </head>
        <body>
          <div class="email-wrapper">
            <div class="header">
              <h1>🎉 New MahaBiz 2026 Registration</h1>
              <p class="subtitle">Registration details received successfully</p>
            </div>
            <div class="content">
              <div class="detail-row">
                <div class="detail-label">Full Name</div>
                <div class="detail-value">${formData.firstName} ${formData.lastName}</div>
              </div>
              
              <div class="detail-row">
                <div class="detail-label">Email Address</div>
                <div class="detail-value">${formData.email}</div>
              </div>
              
              <div class="detail-row">
                <div class="detail-label">Interests</div>
                <div class="detail-value">
                  ${(formData.interests && formData.interests.length > 0) ? formData.interests.map((interest: string) => `<span class="badge">${interest}</span>`).join("") : "<span style='color: #9ca3af;'>None selected</span>"}
                </div>
              </div>
              
              <div class="detail-row">
                <div class="detail-label">Company Name</div>
                <div class="detail-value">${formData.companyName}</div>
              </div>
              
              <div class="detail-row">
                <div class="detail-label">Referred By</div>
                <div class="detail-value">${formData.referredBy}${formData.organizationName ? ` - ${formData.organizationName}` : ""}</div>
              </div>
              
              ${
                formData.message
                  ? `
              <div class="detail-row">
                <div class="detail-label">Message</div>
                <div class="detail-value">
                  <div class="message-box">${formData.message}</div>
                </div>
              </div>
              `
                  : ""
              }
              
              <div class="detail-row">
                <div class="detail-label">Submission Time</div>
                <div class="detail-value">${new Date().toLocaleString("en-US", {
                  dateStyle: "full",
                  timeStyle: "long",
                })}</div>
              </div>
            </div>
            <div class="footer">
              <p class="footer-text">
                <strong>MahaBiz 2026 Registration System</strong><br>
                This is an automated notification. Please do not reply to this email.
              </p>
            </div>
          </div>
        </body>
      </html>
    `

    // Create transporter for Gmail SMTP
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort || "587"),
      secure: smtpSecure === "true" || false,
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
      debug: true, // Enable debug mode
      logger: true, // Enable logging
    })

    // Verify transporter configuration
    await transporter.verify()
    console.log("SMTP connection verified successfully")

    // Email recipients - use TO_EMAIL from env or default recipients
    const recipients = recipientEmail ? [recipientEmail] : [
      "gmbf-leads-aaaarnf4upk4eqfwsa4eaw4qii@nexuses.slack.com",
      "shuchita.r@gmbfglobal.co",
      "mahabiz2026@gmbfglobal.com",
    ]

    // Send emails to all recipients
    const emailPromises = recipients.map(async (recipient) => {
      try {
        console.log(`Sending email to ${recipient}`)
        const result = await transporter.sendMail({
          from: smtpFrom || "MahaBiz 2026 <noreply@mahabiz.com>",
          to: recipient,
          subject: `New Registration: ${formData.firstName} ${formData.lastName} - MahaBiz 2026`,
          html: emailHtml,
        })
        console.log(`Email sent successfully to ${recipient}:`, result.messageId)
        return result
      } catch (emailError) {
        console.error(`Failed to send email to ${recipient}:`, emailError)
        throw emailError
      }
    })

    await Promise.all(emailPromises)
    console.log("Emails sent successfully to all recipients")

    return NextResponse.json({ success: true, message: "Emails sent successfully" })
  } catch (error) {
    console.error("Error sending emails:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json(
      { success: false, error: `Failed to send emails: ${errorMessage}` },
      { status: 500 }
    )
  }
}
