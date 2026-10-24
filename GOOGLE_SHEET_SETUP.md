# AquaShine Google Sheets Integration Setup (2 Minutes)

Follow these simple steps to link your AquaShine website directly to your Google Sheet. Every time a customer books a service, a new row will automatically appear in your spreadsheet in real-time.

---

### Step 1: Create a Google Spreadsheet
1. Open [Google Sheets](https://sheets.new) in your web browser.
2. Name the spreadsheet (e.g. **"AquaShine Customer Bookings"**).

---

### Step 2: Paste the Automation Script
1. In the top Google Sheets menu, click **Extensions** > **Apps Script**.
2. A code editor will open. Select everything in `Code.gs` and delete it.
3. Open the file [`google-apps-script.js`](./google-apps-script.js) in this project, copy its entire contents, and paste it into the editor.
4. Click the **Save** icon (diskette icon) or press `Ctrl + S` / `Cmd + S`.

---

### Step 3: Deploy as a Web App
1. Click the blue **Deploy** button at the top right and select **New deployment**.
2. Click the gear icon (⚙️) next to *Select type* and choose **Web app**.
3. Configure the three settings:
   - **Description**: `AquaShine Booking Webhook`
   - **Execute as**: `Me (your_email@gmail.com)`
   - **Who has access**: **`Anyone`** *(Important: Must be "Anyone" so the website can submit rows)*
4. Click **Deploy**.
5. Google will ask you to *Authorize access*. Click *Review permissions*, choose your Google account, click *Advanced*, then click *Go to Untitled project (unsafe)*, and finally click *Allow*.
6. Google will now display a **Web app URL** that ends with `/exec`. Copy this URL!

---

### Step 4: Add to Your Website Configuration
1. In your project root, open or create the file `.env.local`:
   ```bash
   GOOGLE_SHEET_WEBHOOK_URL="https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"
   ```
2. Restart your development/production server:
   ```bash
   npm run dev
   # or
   npm run build && npm run start
   ```

---

### Step 5: Test & Verify
1. Go to your booking page ([http://localhost:3005/contact](http://localhost:3005/contact)).
2. Submit a test booking.
3. Open your Google Sheet — the header row and your new booking row will be added immediately!
4. You can also view all bookings anytime on your local Admin Dashboard at [http://localhost:3005/admin](http://localhost:3005/admin).

