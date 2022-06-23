const admin = require("firebase-admin");
const fs = require("fs");

const serviceAccount = JSON.parse(fs.readFileSync('./chat-test-c1c0a-firebase-adminsdk-vu34g-88595fe985.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = {
  admin
};
