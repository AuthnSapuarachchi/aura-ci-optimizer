# Backend Deployment Instructions

## Recent Fixes for 403 Error

The following changes were made to fix the CORS and authentication issues:

### 1. Updated CORS Configuration

- **File:** `src/main/java/com/authnaura/backend/config/WebConfig.java`
- **Change:** Used `allowedOriginPatterns` to accept any Vercel/Netlify subdomain
- **Allows:** `http://localhost:*`, `https://*.vercel.app`, `https://*.netlify.app`

### 2. Added CORS Filter

- **File:** `src/main/java/com/authnaura/backend/config/CorsFilter.java`
- **Purpose:** Handle preflight OPTIONS requests and set proper CORS headers
- **Priority:** Highest precedence to run before security filters

### 3. Added Debug Logging

- **Files:**
  - `JwtAuthenticationFilter.java` - Logs token validation steps
  - `LogUploadController.java` - Logs authentication status
- **Purpose:** Help identify authentication issues in Render logs

## Deploy to Render

### Step 1: Commit and Push Changes

```bash
cd backend-spring/backend
git add .
git commit -m "Fix CORS and add authentication logging"
git push origin main
```

### Step 2: Trigger Render Deployment

1. Go to your Render dashboard
2. Find your `aura-spring-backend-1` service
3. Click "Manual Deploy" → "Deploy latest commit"
4. Wait for deployment to complete (~5-10 minutes)

### Step 3: Check Logs

After deployment, check the Render logs when you try to upload a log:

- You should see `=== JWT Filter ===` logs
- You should see `=== Upload Log Endpoint ===` logs
- These will help identify if the issue is CORS or authentication

## Testing After Deployment

### Test 1: Login

1. Go to your Vercel frontend
2. Log in with your credentials
3. Check browser console - should see "Token present"

### Test 2: Upload Log

1. Paste sample log text
2. Click "Analyze Log"
3. Check browser console for any errors
4. Check Render logs for backend debug output

### Sample Log Text for Testing

```
[INFO] Starting build...
[INFO] Compiling sources...
[INFO] BUILD SUCCESS
Total time: 45.2 s
```

## Common Issues

### Still Getting 403 Error?

**Check 1: CORS Headers**

```bash
# Test from command line
curl -H "Origin: https://your-app.vercel.app" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: authorization,content-type" \
     -X OPTIONS \
     https://aura-spring-backend-1.onrender.com/api/v1/log/upload \
     -v
```

**Check 2: Token Expiration**

- Tokens expire after a certain time
- Try logging out and logging back in
- Check the JWT secret key is consistent

**Check 3: Database Connection**

- Verify MongoDB is accessible from Render
- Check connection string in `application.properties`

## Environment Variables (Render)

Make sure these are set in your Render service:

- `SPRING_DATA_MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET_KEY` - Your JWT secret (should match what was used to create tokens)
- `PYTHON_SERVICE_URL` - URL of your Python ML service

## Rollback Plan

If the new deployment causes issues:

1. Go to Render dashboard
2. Click on "Deploys" tab
3. Find the previous working deployment
4. Click "Redeploy"

## Next Steps

Once deployed and working:

1. Remove debug logging for production (the System.out.println statements)
2. Set up proper logging with SLF4J/Logback
3. Add rate limiting for the upload endpoint
4. Consider adding request size limits
