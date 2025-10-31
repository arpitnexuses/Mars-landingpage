# SMTP Email Setup Instructions

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Gmail SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-gmail-email@gmail.com
SMTP_PASSWORD=your-app-specific-password
SMTP_FROM="MahaBiz 2026 <your-gmail-email@gmail.com>"
```

## Setting up Gmail App Password

1. Go to your Google Account settings: https://myaccount.google.com/
2. Navigate to **Security** → **2-Step Verification** (enable it if not already enabled)
3. Go to **App Passwords**: https://myaccount.google.com/apppasswords
4. Select "Mail" and "Other (Custom name)"
5. Enter a name like "MahaBiz Registration"
6. Click "Generate"
7. Copy the generated 16-character password (with spaces) and use it as `SMTP_PASSWORD` in your `.env.local` file

## Important Notes

- Use an **App-Specific Password**, not your regular Gmail password
- The SMTP_FROM should match your Gmail email address
- Never commit `.env.local` to version control (it's already in `.gitignore`)
- Make sure 2-Step Verification is enabled on your Google Account

## Recipients

The form submissions will be sent to these email addresses:
- gmbf-leads-aaaarnf4upk4eqfwsa4eaw4qii@nexuses.slack.com
- shuchita.r@gmbfglobal.co
- mahabiz2026@gmbfglobal.com

You can modify these in `app/api/send-registration/route.tsx`


