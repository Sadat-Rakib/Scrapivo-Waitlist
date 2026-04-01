# Scrapivo Waitlist Submissions Guide

## 📊 How Submissions Are Stored

All waitlist form submissions are automatically stored in the browser's localStorage under the key `scrapivo-waitlist-submissions`.

### Submission Data Structure
Each submission contains:
- `id`: Unique timestamp-based ID
- `name`: User's name
- `email`: User's email address
- `frustration`: User's biggest frustration (optional)
- `timestamp`: ISO 8601 timestamp of submission
- `emailFailed`: Boolean flag if email sending failed (for backup tracking)

## 🔍 Viewing Submissions

### Method 1: Browser Console
Open the browser console (F12) and run:

```javascript
// Get all submissions
scrapivoSubmissions.getAll()

// Get count of submissions
scrapivoSubmissions.count()

// Export as CSV
scrapivoSubmissions.exportCSV()
```

### Method 2: Direct localStorage Access
```javascript
// In browser console
JSON.parse(localStorage.getItem('scrapivo-waitlist-submissions'))
```

## 📥 Exporting Submissions

### Export to CSV
1. Open browser console (F12)
2. Run: `scrapivoSubmissions.exportCSV()`
3. A CSV file will automatically download

### Manual Export
1. Open browser console
2. Run: `JSON.stringify(JSON.parse(localStorage.getItem('scrapivo-waitlist-submissions')), null, 2)`
3. Copy the output
4. Save to a file

## 🐛 Debugging Email Issues

The form now includes detailed logging. Check the browser console for:

1. **EmailJS Configuration Check**:
   - Service ID
   - Template ID  
   - Public Key status

2. **Submission Data**:
   - All form data being sent
   - Timestamp and ID

3. **Email Send Result**:
   - Success confirmation
   - Detailed error messages if failed

4. **localStorage Status**:
   - Confirmation of storage
   - Total submission count

## 🔧 Common Issues & Solutions

### Email Not Sending
1. Check browser console for specific error
2. Verify EmailJS credentials in `.env` file
3. Ensure EmailJS template variables match: `{{name}}`, `{{email}}`, `{{frustration}}`
4. Check EmailJS dashboard for service status
5. Verify the "To Email" field in template is set to `{{email}}`

### Submissions Not Storing
1. Check if localStorage is enabled in browser
2. Check browser console for storage errors
3. Verify localStorage quota isn't exceeded

### Template Variable Mismatch
The code sends these variables to EmailJS:
- `name` - User's name
- `email` - User's email
- `frustration` - User's frustration text

Make sure your EmailJS template uses: `{{name}}`, `{{email}}`, `{{frustration}}`

## 📧 EmailJS Template Setup

### User Confirmation Template (Current)
- **To Email**: `{{email}}` (sends to user)
- **From Name**: Scrapivo
- **Reply To**: Your admin email
- **Subject**: You're on the Scrapivo waitlist!
- **Body**: Should include `{{name}}` variable

### Recommended: Admin Notification Template (Optional)
Create a second template to notify you of new signups:
- **To Email**: `mirsadatbinrakib01@gmail.com`
- **From Name**: Scrapivo Waitlist
- **Subject**: New Waitlist Signup - {{name}}
- **Body**: 
  ```
  New waitlist signup:
  
  Name: {{name}}
  Email: {{email}}
  Frustration: {{frustration}}
  Timestamp: {{timestamp}}
  ```

## 💾 Data Persistence

- Submissions persist across page refreshes
- Data is stored locally in the user's browser
- Each browser/device has its own localStorage
- To aggregate all submissions, you need to export from each device or implement a backend

## 🚀 Next Steps for Production

For a production system, consider:
1. Backend API to store submissions in a database
2. Email service integration (SendGrid, AWS SES, etc.)
3. Admin dashboard to view all submissions
4. Webhook to notify you of new signups
5. CRM integration (HubSpot, Salesforce, etc.)
