import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

admin.initializeApp();

export const addMessage = functions.https.onRequest(async (req, res) => {
  res.send("all is fine ").status(200);
});
