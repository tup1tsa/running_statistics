import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import checkAccess from "./application/routes/checkAccess";
import fetchRaces from "./application/routes/fetchRacesRoute";
import loadUser from "./application/routes/loadUserRoute";
import saveRaces from "./application/routes/saveRacesRoute";

const PORT = process.env.PORT || 3007;
const app = express();

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("client/build"));

app.post("/saveRaces", loadUser, checkAccess, saveRaces);
app.get("/fetchRaces", loadUser, checkAccess, fetchRaces);

app.listen(PORT);
