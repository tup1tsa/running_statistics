import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import checkAccess from "./application/routes/checkAccess";
import fetchRaces from "./application/routes/fetchRacesRoute";
import loadUser from "./application/routes/loadUserRoute";
import login from "./application/routes/loginRoute";
import registration from "./application/routes/registrationRoute";
import saveRaces from "./application/routes/saveRacesRoute";
import sendVerificationEmail from "./application/routes/sendVerificationEmailRoute";
import updateTokenCookies from "./application/routes/updateTokenCookiesRoute";
import verifyEmail from "./application/routes/verifyEmailRoute";

const PORT = process.env.PORT || 3007;
const app = express();

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("client/build"));

app.post("/login", login);
app.post(
  "/registration",
  registration,
  updateTokenCookies,
  sendVerificationEmail
);

app.post(
  "/sendVerificationEmail",
  loadUser,
  updateTokenCookies,
  sendVerificationEmail
);
app.post("/verifyEmail", verifyEmail);

app.post("/saveRaces", loadUser, checkAccess, updateTokenCookies, saveRaces);
app.post("/fetchRaces", loadUser, checkAccess, updateTokenCookies, fetchRaces);

app.listen(PORT);
