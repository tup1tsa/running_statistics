import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as express from "express";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import fetchRacesRoute from "./routes/fetchRacesRoute";
import saveRacesRoute from "./routes/saveRacesRoute";

admin.initializeApp(functions.config().firebase);

// const db = admin.firestore();
const app = express();

app.use(compression());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/races/", fetchRacesRoute);
app.put('/races/', saveRacesRoute)

export const saveRaces = functions.https.onRequest(app);
