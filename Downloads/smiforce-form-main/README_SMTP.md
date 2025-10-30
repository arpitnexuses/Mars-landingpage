SMTP setup (.env.local)

Add the following to a new `.env.local` in the project root and fill in your values:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your_gmail_address@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM="SmiForce <your_gmail_address@gmail.com>"
# Optional: recipient email; if omitted, emails go to SMTP_USER
SMTP_TO=recipient@yourdomain.com
```

Notes for Gmail
- Use an App Password (recommended). In Google Account → Security → 2‑Step Verification → App passwords.
- If using a workspace or restricted account, ensure SMTP is allowed.

Usage
- The API route at `app/api/send-email/route.ts` reads these env vars and sends an email with form details when the download form is submitted.

