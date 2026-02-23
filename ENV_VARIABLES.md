# 🔐 Render Environment Variables - Final Configuration

## Employee Service Environment Variables

Go to: Render Dashboard → Employee Service → Environment

**Add these variables:**

```bash
DEBUG=False

SECRET_KEY=django-insecure-2^f)wpcg@3(vipn0d_uri5%@c$y5nk@9!2*5^kry6ldgs3x+a8

DATABASE_URL=postgresql://employee_db_urq2_user:mThREo3T02cEeRMBh2zZhxXIM3oqokPb@dpg-d6e1pb4r85hc73c76i5g-a/employee_db_urq2

ALLOWED_HOSTS=hrms-employee-service-88t0.onrender.com,localhost

CORS_ALLOWED_ORIGINS=https://hrms-lite-shubham.netlify.app

PYTHON_VERSION=3.11.0
```

---

## Attendance Service Environment Variables

Go to: Render Dashboard → Attendance Service → Environment

**Add these variables:**

```bash
DEBUG=False

SECRET_KEY=django-insecure-33+*&^a)arl%9*k+l8grpysyrw4lrej&d3o22pjvcct3j7vzhd

DATABASE_URL=postgresql://hrms_attendance_db_user:KzYlxu83r3iOqIqZfHylyANAgWcXB2qH@dpg-d6e1vn24d50c73b68jmg-a/hrms_attendance_db

ALLOWED_HOSTS=hrms-attendance-service.onrender.com,localhost

CORS_ALLOWED_ORIGINS=https://hrms-lite-shubham.netlify.app

EMPLOYEE_SERVICE_URL=https://hrms-employee-service-88t0.onrender.com

PYTHON_VERSION=3.11.0
```

---

## Important Notes:

1. ✅ Use **Internal Database URL** (not external) - already correct above
2. ✅ No trailing slash in CORS_ALLOWED_ORIGINS
3. ✅ SECRET_KEY can be the default for now (change in production)
4. ✅ DEBUG=False for production

---

## Netlify Environment Variables

Go to: Netlify Dashboard → Site Settings → Environment Variables

```bash
VITE_EMPLOYEE_API_URL=https://hrms-employee-service-88t0.onrender.com/api

VITE_ATTENDANCE_API_URL=https://hrms-attendance-service.onrender.com/api
```

**After adding:** Click "Trigger Deploy" → "Deploy Site"

---

## Verification Steps:

### 1. Check Render Services Status
- Both should show "Live" (green)
- Check logs for any errors

### 2. Test Employee Service
```bash
curl https://hrms-employee-service-88t0.onrender.com/
```
Expected: `{"status": "ok", "service": "Employee Service", ...}`

### 3. Test Signup
```bash
curl -X POST https://hrms-employee-service-88t0.onrender.com/api/auth/signup/ \
  -H "Content-Type: application/json" \
  -d '{"username":"testadmin","password":"admin12345","email":"test@test.com"}'
```
Expected: JSON with `access` and `refresh` tokens

### 4. Test Frontend
1. Open: https://hrms-lite-shubham.netlify.app
2. Click "Sign Up"
3. Create account
4. Should work without errors!

---

## If Services Are Not Live:

1. Check Render logs for errors
2. Verify all environment variables are set
3. Ensure DATABASE_URL is correct (Internal URL)
4. Check build command completed successfully
5. Verify migrations ran without errors

---

## Current Status:

✅ Code pushed to GitHub
✅ Database URLs documented
✅ Environment variables listed above
⏳ Waiting for Render deployment (~5 minutes)
⏳ Need to verify environment variables in Render
⏳ Need to test endpoints

---

**Next:** Verify all environment variables are set in Render dashboard! 🚀
