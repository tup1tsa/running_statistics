import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import { checkAccess } from "./application/routes/checkAccess";
import { fetchRacesRoute } from "./application/routes/fetchRacesRoute";
import { loginRoute } from "./application/routes/loginRoute";
import { registrationRoute } from "./application/routes/registrationRoute";
import { saveRacesRoute } from "./application/routes/saveRacesRoute";

const PORT = process.env.PORT || 3007;
const app = express();

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("client/build"));

app.post("/registration", registrationRoute);
app.post("/login", loginRoute);
app.post("/saveRaces", checkAccess, saveRacesRoute);
app.post("/fetchRaces", checkAccess, fetchRacesRoute);
app.post("/verifyEmail");

app.listen(PORT);
