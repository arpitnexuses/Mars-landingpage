# Debug Steps for 500 Error

Follow these steps to identify and fix the issue:

## Step 1: Restart the Dev Server

1. Stop the current dev server (Ctrl+C)
2. Start it again: `npm run dev`
3. Wait for it to fully start

## Step 2: Check Your .env.local File

Open `.env.local` in your project root and verify it looks like this:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=youractualemail@gmail.com
SMTP_PASSWORD=abc def ghij klmn
SMTP_FROM=MahaBiz 2026 <youractualemail@gmail.com>
```

**Important:**
- Replace `youractualemail@gmail.com` with YOUR Gmail address
- Replace `abc def ghij klmn` with YOUR App-Specific Password from Google
- No spaces around the `=` signs
- Make sure there are no quotes around the values (except around `<email>` in SMTP_FROM if you want)

## Step 3: Verify Your Google App Password

1. Go to: https://myaccount.google.com/apppasswords
2. Make sure 2-Step Verification is enabled
3. If you don't have an app password, create one:
   - App: Mail
   - Device: Other
   - Name: MahaBiz Registration
   - Click "Generate"
   - Copy the 16-character password

## Step 4: Test Again

1. Fill out the registration form
2. Submit it
3. Check the toast notification - it should show the specific error
4. Check the server terminal for detailed logs

## Step 5: Check Server Logs

When you submit the form, look at your terminal where `npm run dev` is running. You should see logs like:

```
SMTP Configuration: { ... }
Received form data: { ... }
```

These logs will tell us exactly what's wrong.


