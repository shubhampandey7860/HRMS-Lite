# 🔧 Quick Fix for 400 Bad Request

## Problem:
Your actual Render URL is `hrms-employee-service-88t0.onrender.com` but the environment variable might have the wrong URL.

## Solution Applied:

✅ Updated both services to accept ALL `.onrender.com` subdomains
✅ This means any Render URL will work automatically
✅ Pushed changes to GitHub

---

## Update Netlify Environment Variables

Go to Netlify Dashboard → Site Settings → Environment Variables

**Update these:**

```
VITE_EMPLOYEE_API_URL=https://hrms-employee-service-88t0.onrender.com/api

VITE_ATTENDANCE_API_URL=https://hrms-attendance-service.onrender.com/api
```

**Note**: Use your ACTUAL Render URLs (check Render dashboard for exact URLs)

Then: **Trigger Deploy** in Netlify

---

## Update Render Environment Variables (Optional)

You can also update ALLOWED_HOSTS in Render to be more specific:

**Employee Service:**
```
ALLOWED_HOSTS=hrms-employee-service-88t0.onrender.com,localhost
```

**Attendance Service:**
```
ALLOWED_HOSTS=hrms-attendance-service.onrender.com,localhost
```

But the wildcard `.onrender.com` in code will handle all Render URLs automatically.

---

## Test After Redeployment:

**Test Employee Service:**
```bash
curl https://hrms-employee-service-88t0.onrender.com/api/auth/signup/ \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"username":"test123","password":"test12345","email":"test@test.com"}'
```

Should return JSON with tokens (not 400 error)

---

## Timeline:

- ⏱️ Render rebuild: ~3-5 minutes
- ⏱️ Netlify redeploy: ~1-2 minutes
- ✅ Total: ~5-7 minutes

Monitor Render dashboard for "Live" status! 🚀
