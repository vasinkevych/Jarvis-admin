const mysqldump = require('mysqldump');
//const firebase = require('firebase');
const firebase = require('firebase/app');
require('firebase/firestore');
require('firebase/auth');
require('firebase/storage');
var admin = require("firebase-admin");
const configs = require('../configs');
const DatabaseService = require('../services/database.service');

module.exports = {
  getDatabaseDump() {
    return mysqldump({
      connection: {
        host: configs.DATABASE_HOST,
        database: configs.DATABASE_NAME,
        user: configs.DATABASE_USER,
        password: configs.DATABASE_PASSWORD
      }
    });
  },

  saveFileToCloud(sqlDump) {
    var serviceAccount = {
      "type": "service_account",
      "project_id": "react-native-33df6",
      "private_key_id": "3399825680d5f60ea0bde331f991127c27fc62a5",
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCyy3GOL/VPbfb/\nsr2fk9PZBzYpPN50Zd/2b1rI1qDQPo18vOb2ARRsXGAQCR5HlTu8SOirXyqgWCCp\nlNakJ1KAon0VXDs4cnWe7VKoAvU8BtQm4itVvprJaWooK+vTK3bvH+deSOjWIMLh\nuqj52bQXaQCxvEqZAhVRJtbMZzYtHiVFd4RKCVDKwSul9GPRXlshjYBeoYWsw8VX\n0D94rueCPSW9OqvPgUz8DWIco9OB5ndtuyLp0etCO+4+BrFE2+1ArddKmwwbeIdp\nbkwVSwrhK7cpatiNLhaKGiEdgPC3z96LLJai6hRSChfUAeK/zCcbXqKnmCyBC1ga\n9TQwGOd9AgMBAAECggEAFA6ulnza0CZN5zFuBFDZGyer88RYUEZ9cW/ch1tMfxAF\nX1Dxt/c3C1DxldrwAqfDI8QqFc9/QK2iPGPuEEw4/SU9UwAdxJ9SgpmtBBwQ1sMN\nWa9VnTDcvGuO9SK4OeBOX1T8557WP+887YW7HwxFH7sv0MCGvdN2ALySrCuH8FeZ\nE52Q2dM2t0xSKP/t5tyLL+ddZfli1vs0xHcgqC0GjZee/YAjOwxquziY9htV9bie\nLP5IJWMPuj3Wr5qrZJJJuOVw7CBUWX5nMoMEOQ6ATD3gsmL6mcak4s0fE1HJHqPv\na/UGaMqCqP4+MFyY6kWB++ZUm4zYPBhPL3CZsGwKIQKBgQDwRPYfHGNklPiehdCM\ndxaOHCPsu89zYOhu7YRMedE5mVL5JVh7xZvdBOjghSW17kbnFbc7lNPIKJt06e02\nZZnwTuhhDZdHVZLh8euhsTCPjA+BWELo91NwVgV+0XWCCraJ6OLiuqFDdqYfyyNl\nPQSZZTq0MonRYdSiS+FAw2JTawKBgQC+gCKHLy2QeaWuFt/o8bvj/LAlsi8VWQRv\nOAUEAyAFkPPDrM5iWQVFW5aSWcfLFcMVlJY/yZllxU6LPuGpsn1hrHAodumRLN6o\nf8pM7i0ZLrtgbZSuPGROZ9LT3bQWW03EnspRF+MFGt8fXFdXqmP1ScSlIShovSPu\npQW0bwVStwKBgQC8cro/yHpEh3tAil/56+Wq7HNY2C1rp1RmvLAJc3ognRsxApOV\n8HXBMnqcrpHXUd4WnTer6Zz53q+fUWKWSbYlfx5QEOLYNkwQHzjbByi5TfdTUbCZ\nHHM7Jp0EzLBHoLNvE1Pw1MRrL4I4aZGHdAZJcdZLQ2BI81xdNvqjWxuhpQKBgFkB\nTSCULlm+PGamUV9o8jyHJ1W1dsImoSfFqLJDM4bmPr5B0vuoVAofzK38PJjqRgej\nMMAE1SLzmMr+SjkbJ/Gmu5BsXpxxtmZLrp1a+r81Ul6vVDRECymG4L4Ua7u2VRN0\njVpuKqeL8ouYfUZ8Wc+U88ejQloNZOhvOccfyADpAoGAcv7Lefor5k0D9yNGZHPr\nv0MeK2aJ7Ve7l+a+9UWOpPiRrkWpGRgucfFSONcsiImjfAB0rEIge6DQKC+dQ7dI\nQZgIyOoGEjG5W2wiBdODFrCNqXe4QT+k2tGOnTwMZWb0TSUFYeEl03ObEHMQat7N\nPRnadlOBAwJ053hvyeb5owY=\n-----END PRIVATE KEY-----\n",
      "client_email": "firebase-adminsdk-t170o@react-native-33df6.iam.gserviceaccount.com",
      "client_id": "105177355327133689130",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-t170o%40react-native-33df6.iam.gserviceaccount.com"
    };
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://react-native-33df6.firebaseio.com"
    });
    const storage = admin.storage();
    var bucket = admin.storage().bucket("my-custom-bucket");
    const files = bucket.getFiles();
    return files.then(files => {
      console.log(files);
    });
  },

  clearUsersTable() {
    return DatabaseService.runSql('TRUNCATE TABLE users;');
  },

  clearCarsTable() {
    return DatabaseService.runSql('TRUNCATE TABLE cars;');
  },

  clearUsersCarsTable() {
    return DatabaseService.runSql('TRUNCATE TABLE users_cars;');
  },

  clearDatabase() {
    return this.clearUsersCarsTable()
      .then(() => this.clearCarsTable())
      .then(() => this.clearUsersTable());
  }
};
