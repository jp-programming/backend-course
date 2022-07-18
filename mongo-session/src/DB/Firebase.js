const admin = require("firebase-admin");
const fs = require("fs");

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = {
  admin
};
