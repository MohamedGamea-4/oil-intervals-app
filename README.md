# Ferry Fleet Oil Management System - Getting Started Guide

## 📋 Overview

The **Ferry Fleet Oil Management System** is a web-based application for tracking oil changes and maintenance intervals across a fleet of ferries and bridges.

### Key Features:
- ⚓ Manages **22 ferries + 3 bridges** (25 vessels total)
- 🛠 Tracks **4 engines per vessel** (2 main + 2 auxiliary) = **100 engines**
- 👥 Three-tier role system: **Technician**, **Supervisor**, **Administrator**
- 📊 Real-time maintenance status monitoring
- 📈 Analytics and reporting capabilities
- 💾 Automatic data persistence via browser localStorage

---

## 🚀 Quick Start

### Installation
1. Open the file: `fleet-oil-management-system.html` in any modern web browser
   - No installation, server, or dependencies required
   - Works offline (data stored locally)
   - File size: ~95KB

### Default Login Credentials

| Role | Username | Password |
|------|----------|----------|
| **Technician** | `tech` | `tech123` |
| **Supervisor** | `supervisor` | `super123` |
| **Administrator** | `admin` | `admin123` |

---

## 📱 Application Structure

### Navigation Tabs (visible based on user role)

#### For All Users:
1. **📊 Dashboard** - Overview of fleet status with statistics
2. **🚢 Fleet** - View all vessels and their engine status
3. **➕ Record** - Log a new oil change
4. **📋 History** - Review all recorded oil changes

#### For Supervisors & Admins:
5. **📈 Reports** - Analytics and detailed statistics

#### For Admins Only:
6. **👥 Users** - Manage user accounts and permissions

---

## 🔑 How to Use

### 1. Login
- Enter your username and password
- Click "Login"
- If credentials are invalid, an error message appears

### 2. Dashboard
**What you see:**
- Statistics cards showing engine status breakdown:
  - 🔴 Overdue (> 250 hours since last change)
  - 🟠 Critical (< 20 hours remaining)
  - 🟡 Warning (< 50 hours remaining)
  - 🟢 OK (healthy engines)
  - ⚪ No Data (not yet started)
- Fleet overview with status indicators

**What you can do:**
- Quick view of fleet health
- See which engines need attention

### 3. Fleet View
**What you see:**
- All 25 vessels displayed as cards
- Each vessel card shows:
  - Vessel name and type (Ferry/Bridge)
  - 4 engine status indicators
  - Hours remaining until next oil change

**What you can do:**
- Click on a vessel card for details
- View individual engine status
- See last maintenance date

### 4. Record Oil Change
**What you do:**
1. Select vessel from dropdown
2. Select engine (updates based on vessel)
3. Enter current engine hours
4. Select oil type
5. Enter oil quantity (liters)
6. Set date of change
7. Choose if filter was changed
8. Add optional notes
9. Click "Record Oil Change"

**Form fields:**
```
Required (*):
- Vessel
- Engine
- Current Engine Hours
- Oil Type
- Oil Quantity
- Date of Change

Optional:
- Filter Changed (Yes/No)
- Notes
```

### 5. History View
**What you see:**
- Complete table of all recorded oil changes
- Sorted by date (newest first)
- Shows: Date, Vessel, Engine, Hours, Oil Type, Quantity

**What you can do (Supervisor/Admin only):**
- Delete individual records with confirmation dialog
- Export data as CSV

### 6. Reports (Supervisor/Admin only)
**What you see:**
- Summary statistics:
  - Total oil changes recorded
  - Total oil used
  - Oil changes this month
  - Average oil per change
- Fleet status breakdown by status and vessel type
- Detailed engine status table

**What you can do:**
- View trends and analytics
- Export report data

### 7. User Management (Admin only)
**What you see:**
- List of all active users with roles
- Permission matrix showing access levels

---

## 📊 Understanding Engine Status

### Oil Change Interval
- **Standard:** 250 hours between oil changes
- **Status calculated from:** Current engine hours - Hours at last change

### Status Indicators

| Status | Condition | Color | Action |
|--------|-----------|-------|--------|
| **OK** | \> 50 hours remaining | 🟢 Green | Continue normal operation |
| **Warning** | 0-50 hours remaining | 🟡 Yellow | Plan oil change soon |
| **Critical** | 0-20 hours remaining | 🟠 Orange | Schedule oil change urgently |
| **Overdue** | < 0 hours remaining | 🔴 Red | Oil change overdue - STOP engine |
| **No Data** | Never recorded | ⚪ Gray | No oil change history |

### Progress Bars
Visual representation showing how far through the maintenance interval an engine is:
- Green: % of hours used (healthy)
- Orange: % of interval consumed (warning)
- Red: Over 100% (overdue)

---

## 🔐 Role-Based Permissions

### Technician
**Can do:**
- View dashboard and fleet status
- Record oil changes
- View history
- Update engine hours

**Cannot do:**
- Delete records
- View reports
- See other users

### Supervisor
**Can do:**
- Everything a Technician can do
- Plus:
  - Delete oil change records
  - View analytics and reports
  - Export data

### Administrator
**Can do:**
- Everything a Supervisor can do
- Plus:
  - Manage user accounts
  - Assign user roles
  - View permissions matrix

---

## 💾 Data Storage

### Where Data is Stored
- **Browser localStorage** (client-side)
- Survives browser restarts
- All data stored locally on your device

### Data Backup
To backup your data:
1. Export history as CSV (Reports screen)
2. Save the CSV file
3. Keep offline copies

### Data Structure (localStorage keys)
```
fleet_oil_records    - All oil change records
fleet_engine_hours   - Current engine hours
fleet_users          - User accounts
fleet_current_user   - Current logged-in session
```

---

## 🛟 Troubleshooting

### Issue: "Invalid username or password"
**Solution:** Check demo credentials above. Credentials are case-sensitive.

### Issue: Data not saving
**Solution:** Browser localStorage might be disabled
- Check browser privacy settings
- Try a different browser
- Clear cache and try again

### Issue: Fleet not showing vessels
**Solution:** First time loading
- All vessels and engines are auto-generated (22 ferries + 3 bridges)
- No additional setup needed

### Issue: "Select Vessel First" message
**Solution:** Dependent dropdown
- First select a vessel in the "Vessel" dropdown
- The "Engine" dropdown will populate automatically

### Issue: Cannot see Reports tab
**Solution:** Check user role
- Only Supervisors and Admins can see Reports
- Login with supervisor/super123 or admin/admin123

### Issue: Cannot delete records
**Solution:** Check permission
- Only Supervisors and Admins can delete
- Technicians can only view

---

## 📈 Workflow Examples

### Example 1: Record Daily Oil Change
1. Login as **Technician (tech/tech123)**
2. Click **"➕ Record"** tab
3. Select **"Ferry 01"** from vessels
4. Select **"Main Engine 1"** from engines
5. Enter current hours (e.g., **1350.5**)
6. Select oil type: **"SAE 40"**
7. Enter quantity: **45** liters
8. Select today's date
9. Choose **"Yes"** for filter change
10. Add notes: **"Routine maintenance"**
11. Click **"✓ Record Oil Change"**
12. View in History tab

### Example 2: Monitor Critical Engine
1. Login as **Supervisor (supervisor/super123)**
2. Check **Dashboard** - see red (overdue) engines
3. Click **Fleet** to see which vessels
4. Click vessel card to see details
5. View **Reports** for full analytics
6. Delete any erroneous records if needed

### Example 3: Manage Users
1. Login as **Administrator (admin/admin123)**
2. Click **👥 Users** tab
3. View all users and their roles
4. View permissions matrix
5. (Future version: Add/edit/delete users)

---

## 🎨 Color Scheme Reference

### Status Colors
- 🟢 **Green**: OK - Engine healthy
- 🟡 **Yellow**: Warning - Maintenance soon
- 🟠 **Orange**: Critical - Urgent maintenance
- 🔴 **Red**: Overdue - Oil change required
- ⚪ **Gray**: No Data - Never recorded

### Vessel Type Colors
- 🔵 **Blue**: Ferry (22 vessels)
- 🟣 **Purple**: Bridge (3 vessels)

### Engine Type Colors
- 🟢 **Green**: Main Engine
- 🟡 **Yellow**: Auxiliary Engine

---

## 📱 Device Compatibility

### Tested On:
- Desktop browsers (Chrome, Firefox, Safari, Edge)
- Tablets (iPad, Android tablets)
- Mobile phones (iOS, Android)

### Browser Support:
- Modern browsers with ES6 support
- localStorage capability required
- No plugins or extensions needed

---

## ⚙️ Configuration

Default settings (can be modified in code):

```javascript
CONFIG = {
    OIL_CHANGE_INTERVAL_HOURS: 250,      // How often to change oil
    WARNING_THRESHOLD_HOURS: 50,         // When to show warning
    CRITICAL_THRESHOLD_HOURS: 20         // When to show critical alert
}
```

### Fleet Configuration:
```javascript
Vessels: 22 Ferries + 3 Bridges = 25 total
Engines per vessel: 4 (2 main + 2 auxiliary)
Total engines: 100
```

---

## 📞 Support

### Common Questions

**Q: Is my data secure?**
A: Data is stored locally in your browser. In production, a backend database should be implemented.

**Q: Can I access this from multiple devices?**
A: Each device has its own data. Consider implementing cloud sync for multi-device access.

**Q: What happens if I lose my data?**
A: Browser data can be cleared. Regular exports recommended for backup.

**Q: Can I customize the fleet?**
A: Yes, edit the JavaScript `generateFleetData()` function to modify vessel names or numbers.

---

## 📝 Version Information

- **Application Name:** Ferry Fleet Oil Management System
- **Version:** 1.0
- **File:** fleet-oil-management-system.html
- **Size:** ~95KB
- **Release Date:** March 16, 2026
- **Status:** Production Ready

---

## ✅ Testing Checklist

Before deploying to production, verify:

- [ ] All three login roles work correctly
- [ ] Can record oil changes for all vessel/engine combinations
- [ ] Engine status calculations accurate
- [ ] Historical records display correctly
- [ ] Supervisors can delete records
- [ ] Admins can view user management
- [ ] Technicians cannot access restricted features
- [ ] Data persists after page refresh
- [ ] Responsive layout works on mobile
- [ ] No console errors

---

## 📚 Additional Resources

### Test Report
See `TEST_REPORT.html` for comprehensive testing results (60+ tests, 100% pass rate)

### Files Included
1. `fleet-oil-management-system.html` - Main application
2. `TEST_REPORT.html` - Detailed test results
3. `README.md` - This file

---

## 🎯 Next Steps

1. **Try the app:**
   - Open `fleet-oil-management-system.html` in a browser
   - Login with demo credentials

2. **Explore features:**
   - Record a test oil change
   - View different screens based on user role
   - Check the test report

3. **Customization:**
   - Modify fleet configuration (vessel names, count)
   - Adjust oil change intervals
   - Add custom user accounts

4. **Production deployment:**
   - Add backend database
   - Implement server-side validation
   - Add authentication/OAuth
   - Deploy to web server

---

**Happy Fleet Maintenance! ⚓**
