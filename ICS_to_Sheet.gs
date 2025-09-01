
/**
 * Google Apps Script: ICS → Google Sheet with Countdown Columns
 * 
 * Steps:
 * 1. Create Google Sheet with columns:
 *    Event ID | Event Title | Start Date | T-5 | T-1 | Today
 * 2. Paste this script in Extensions → Apps Script
 * 3. Set your ICS_URL
 * 4. Run fetchICS()
 */

const ICS_URL = 'PASTE_YOUR_ICS_URL_HERE';
const SHEET_NAME = 'Sheet1';

function fetchICS() {
  const res = UrlFetchApp.fetch(ICS_URL);
  const icsText = res.getContentText();
  
  // Parse VEVENT blocks
  const events = [];
  const veventRegex = /BEGIN:VEVENT([\s\S]*?)END:VEVENT/g;
  let match;
  while ((match = veventRegex.exec(icsText)) !== null) {
    const block = match[1];
    const uidMatch = block.match(/UID:(.+)/);
    const summaryMatch = block.match(/SUMMARY:(.+)/);
    const dtstartMatch = block.match(/DTSTART(?:;TZID=[^:]+)?:([0-9T]+)/);

    if (uidMatch && summaryMatch && dtstartMatch) {
      const uid = uidMatch[1].trim();
      const title = summaryMatch[1].trim();
      const startDateRaw = dtstartMatch[1].trim();
      
      // Convert ICS date (20250901T091500) to YYYY-MM-DD
      const startDate = parseICSDate(startDateRaw);
      
      events.push({ uid, title, startDate });
    }
  }
  
  // Populate Sheet
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  sheet.clearContents();
  sheet.appendRow(['Event ID', 'Event Title', 'Start Date', 'T-5', 'T-1', 'Today']);
  
  const today = new Date();
  events.forEach(ev => {
    const t5 = isSameDate(addDays(today, 5), ev.startDate) ? 'Yes' : '';
    const t1 = isSameDate(addDays(today, 1), ev.startDate) ? 'Yes' : '';
    const t0 = isSameDate(today, ev.startDate) ? 'Yes' : '';
    sheet.appendRow([ev.uid, ev.title, formatDate(ev.startDate), t5, t1, t0]);
  });
}

function parseICSDate(dt) {
  // dt example: 20250901T091500
  const year = parseInt(dt.substr(0,4));
  const month = parseInt(dt.substr(4,2)) - 1; // JS months 0-11
  const day = parseInt(dt.substr(6,2));
  const hour = parseInt(dt.substr(9,2));
  const min = parseInt(dt.substr(11,2));
  const sec = parseInt(dt.substr(13,2));
  return new Date(year, month, day, hour, min, sec);
}

function isSameDate(d1, d2) {
  return d1.getFullYear()===d2.getFullYear() &&
         d1.getMonth()===d2.getMonth() &&
         d1.getDate()===d2.getDate();
}

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function formatDate(date) {
  return Utilities.formatDate(date, Session.getScriptTimeZone(), 'yyyy-MM-dd');
}
