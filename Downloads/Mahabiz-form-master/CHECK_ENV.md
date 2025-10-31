# Environment Variable Check

Please verify your `.env.local` file has the following format:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-actual-gmail@gmail.com
SMTP_PASSWORD=abcd efgh ijkl mnop
SMTP_FROM=MahaBiz 2026 <your-actual-gmail@gmail.com>
```

## Common Issues:

1. **No quotes needed** for most values (except SMTP_FROM can have quotes)
2. **No spaces** around the `=` sign
3. **SMTP_PASSWORD** should be the **App-Specific Password** from Google (16 characters with spaces or without)
4. Make sure **2-Step Verification** is enabled on your Google Account

## To check if the server loaded your variables:

Look at your terminal where `npm run dev` is running. When you submit the form, you should see console logs showing:
- "Received form data:"
- "SMTP Configuration:" with your settings (password will show as "***set***" or "NOT SET")

If you see "NOT SET" for SMTP_PASSWORD, the environment variables aren't loading.

## Quick Test:

Try submitting the form again after restarting the server. The error toast should now show the actual error message from the server, which will help us identify the problem.


