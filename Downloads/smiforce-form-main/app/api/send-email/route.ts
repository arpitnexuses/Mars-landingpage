import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

type SendEmailRequestBody = {
  fullName?: string
  email?: string
  phoneNumber?: string
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SendEmailRequestBody
    const { fullName = "", email = "", phoneNumber = "" } = body ?? {}

    if (!fullName || !email) {
      return NextResponse.json(
        { error: "fullName and email are required" },
        { status: 400 },
      )
    }

    const host = process.env.SMTP_HOST || "smtp.gmail.com"
    const port = Number(process.env.SMTP_PORT || 587)
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASS
    // Support both SMTP_FROM/FROM_EMAIL and SMTP_TO/TO_EMAIL
    const from = process.env.SMTP_FROM || process.env.FROM_EMAIL || user
    const to = process.env.SMTP_TO || process.env.TO_EMAIL || user

    if (!user || !pass) {
      console.error("Missing SMTP credentials:", { user: !!user, pass: !!pass })
      return NextResponse.json(
        { error: "SMTP_USER and SMTP_PASS env vars are required" },
        { status: 500 },
      )
    }

    console.log("Sending email from:", from, "to:", to)

    const isSecure = process.env.SMTP_SECURE === "true" || (!process.env.SMTP_SECURE && port === 465)
    
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: isSecure, // true for 465, false for 587 (uses STARTTLS)
      auth: { user, pass },
      tls: {
        // Don't fail on invalid certificates
        rejectUnauthorized: false,
      },
    })

    const subject = `New form submission from ${fullName}`
    const text = [
      `New submission received:`,
      `Name: ${fullName}`,
      `Email: ${email}`,
      `Phone: ${phoneNumber || "-"}`,
      `Submitted at: ${new Date().toISOString()}`,
    ].join("\n")

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                
                <!-- Header -->
                <tr>
                  <td style="padding: 40px 40px 30px; background: linear-gradient(135deg, #C4342B 0%, #A02D24 100%); border-radius: 8px 8px 0 0;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600; text-align: center;">New Form Submission</h1>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 40px;">
                    
                    <!-- Intro Text -->
                    <p style="margin: 0 0 30px; font-size: 16px; color: #333333; line-height: 1.6;">
                      You have received a new submission from the SmiForce landing page.
                    </p>
                    
                    <!-- Details Table -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9f9f9; border-radius: 6px; overflow: hidden;">
                      
                      <!-- Full Name -->
                      <tr>
                        <td style="padding: 20px; border-bottom: 1px solid #eeeeee;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="width: 140px; padding-right: 20px;">
                                <strong style="color: #666666; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Full Name</strong>
                              </td>
                              <td>
                                <p style="margin: 0; color: #333333; font-size: 16px; font-weight: 500;">${fullName}</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      
                      <!-- Email -->
                      <tr>
                        <td style="padding: 20px; border-bottom: 1px solid #eeeeee;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="width: 140px; padding-right: 20px;">
                                <strong style="color: #666666; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Email</strong>
                              </td>
                              <td>
                                <p style="margin: 0; color: #333333; font-size: 16px; font-weight: 500;">${email}</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      
                      <!-- Phone Number -->
                      <tr>
                        <td style="padding: 20px;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="width: 140px; padding-right: 20px;">
                                <strong style="color: #666666; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Phone Number</strong>
                              </td>
                              <td>
                                <p style="margin: 0; color: #333333; font-size: 16px; font-weight: 500;">${phoneNumber || "Not provided"}</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      
                    </table>
                    
                    <!-- Submission Time -->
                    <p style="margin: 30px 0 0; font-size: 14px; color: #999999; text-align: center; font-style: italic;">
                      Submitted at ${new Date().toLocaleString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric', 
                        hour: '2-digit', 
                        minute: '2-digit',
                        timeZoneName: 'short'
                      })}
                    </p>
                    
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="padding: 30px 40px; background-color: #fafafa; border-radius: 0 0 8px 8px; border-top: 1px solid #eeeeee;">
                    <p style="margin: 0; color: #999999; font-size: 13px; text-align: center;">
                      This email was sent from SmiForce Landing Page
                    </p>
                  </td>
                </tr>
                
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `

    const info = await transporter.sendMail({ 
      from, 
      to, 
      subject, 
      text, 
      html 
    })

    console.log("Email sent successfully:", info.messageId)

    return NextResponse.json({ ok: true, messageId: info.messageId })
  } catch (error: any) {
    console.error("/api/send-email error:", error)
    console.error("Error details:", {
      message: error?.message,
      code: error?.code,
      command: error?.command,
    })
    return NextResponse.json(
      { 
        error: "Failed to send email", 
        details: error?.message || "Unknown error" 
      },
      { status: 500 },
    )
  }
}


