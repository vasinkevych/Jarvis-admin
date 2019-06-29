const { google } = require('googleapis');

const scopes = [
  // 'https://www.googleapis.com/auth/spreadsheets',
  // 'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/spreadsheets.readonly',
  'https://www.googleapis.com/auth/drive.readonly'
];

class GoogleSheetToJSON {
  constructor({ CLIENT_EMAIL, PRIVATE_KEY }) {
    const client = new google.auth.JWT(CLIENT_EMAIL, null, PRIVATE_KEY, scopes);
    this.sheets = google.sheets({ version: 'v4', auth: client });
  }

  getJson({ spreadsheetId, range }) {
    return new Promise((resolve, reject) => {
      this.sheets.spreadsheets.values.get(
        { spreadsheetId, range },
        (err, response) => {
          if (err) {
            return reject(err);
          }
          resolve(response);
        }
      );
    });
  }
}

module.exports = GoogleSheetToJSON;
