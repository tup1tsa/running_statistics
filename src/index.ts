import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import { checkAccess } from "./application/routes/checkAccess";
import fetchRaces from "./application/routes/fetchRacesRoute";
import login from "./application/routes/loginRoute";
import registration from "./application/routes/registrationRoute";
import saveRaces from "./application/routes/saveRacesRoute";
import sendVerificationEmail from "./application/routes/sendVerificationEmailRoute";

const PORT = process.env.PORT || 3007;
const app = express();

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("client/build"));

app.post("/registration", registration, sendVerificationEmail);
app.post("/login", login);
app.post("/sendVerificationEmail", checkAccess, sendVerificationEmail);
app.post("/saveRaces", checkAccess, saveRaces);
app.post("/fetchRaces", checkAccess, fetchRaces);
app.post("/verifyEmail");

app.listen(PORT);
