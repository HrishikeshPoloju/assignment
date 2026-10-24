/**
 * AquaShine Facility Care — Google Sheets Booking Webhook Script
 * 
 * INSTRUCTIONS:
 * 1. Open Google Sheets (https://sheets.new) and name the spreadsheet (e.g. "AquaShine Bookings").
 * 2. In the top menu, go to: Extensions > Apps Script.
 * 3. Delete any default code in Code.gs, paste this entire script, and click the Save (floppy disk) icon.
 * 4. Click the blue "Deploy" button at top right > "New deployment".
 * 5. Click the gear icon next to "Select type" and choose "Web app".
 * 6. Set Description: "AquaShine Booking Receiver"
 * 7. Set "Execute as": "Me" (your Google account)
 * 8. Set "Who has access": "Anyone"  <-- CRITICAL so your website can post bookings
 * 9. Click "Deploy", Authorize access if prompted, and COPY the "Web app URL" (ends in /exec).
 * 10. Paste this URL in your project's .env.local file:
 *     GOOGLE_SHEET_WEBHOOK_URL="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Auto-create styled headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      var headers = [
        "Date Received",
        "Booking Ref",
        "Customer Name",
        "Phone / WhatsApp",
        "Locality (Pune)",
        "Exact Location / Maps Link",
        "Service Category",
        "Primary Service",
        "Selected Add-ons",
        "Preferred Date",
        "Time Window",
        "Property Type",
        "Special Notes / Address",
        "Status"
      ];
      sheet.appendRow(headers);
      
      // Style headers: AquaShine Teal (#123B46), White bold text, auto-fit
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#123B46");
      headerRange.setFontColor("#FFFFFF");
      headerRange.setHorizontalAlignment("center");
      sheet.setFrozenRows(1);
    }
    
    // Parse incoming JSON booking payload
    var data = {};
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e && e.parameter) {
      data = e.parameter;
    }
    
    var timestamp = data.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    var enquiryRef = data.enquiryRef || "AQS-DIRECT";
    var fullName = data.fullName || "Customer";
    var phone = data.phone || "";
    var locality = data.locality || "Viman Nagar";
    var exactLocation = data.mapsUrl ? (data.exactAddress ? data.exactAddress + " (" + data.mapsUrl + ")" : data.mapsUrl) : (data.exactAddress || "");
    var categoryName = data.categoryName || "";
    var serviceName = data.serviceName || "";
    var addOnNames = data.addOnNames || "None";
    var preferredDate = data.preferredDate || "Flexible";
    var preferredTimeWindow = data.preferredTimeWindow || "";
    var propertyType = data.propertyType || "Apartment / Flat";
    var addressAndInstructions = data.addressAndInstructions || "";
    var status = data.status || "New Booking";

    // Append booking row
    sheet.appendRow([
      timestamp,
      enquiryRef,
      fullName,
      phone,
      locality,
      exactLocation,
      categoryName,
      serviceName,
      addOnNames,
      preferredDate,
      preferredTimeWindow,
      propertyType,
      addressAndInstructions,
      status
    ]);
    
    var lastRow = sheet.getLastRow();
    
    // Format the phone number as plain text so leading zero or formatting is preserved
    sheet.getRange(lastRow, 4).setNumberFormat("@");
    
    // Subtle alternate row shading
    if (lastRow % 2 === 0) {
      sheet.getRange(lastRow, 1, 1, 13).setBackground("#F8FAF9");
    }

    return ContentService.createTextOutput(JSON.stringify({
      result: "success",
      bookingRef: enquiryRef,
      row: lastRow
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      result: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function: Run this inside Apps Script to verify permissions
function testSheet() {
  doPost({
    postData: {
      contents: JSON.stringify({
        timestamp: "Test Run",
        enquiryRef: "AQS-TEST-001",
        fullName: "Test Customer",
        phone: "9876543210",
        locality: "Viman Nagar",
        categoryName: "Water Tank & Water Care",
        serviceName: "Overhead Water Tank Cleaning",
        addOnNames: "TDS Measurement",
        preferredDate: "Tomorrow",
        preferredTimeWindow: "Morning",
        propertyType: "Apartment",
        addressAndInstructions: "Testing automated row addition",
        status: "Test Entry"
      })
    }
  });
}

