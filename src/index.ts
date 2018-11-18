import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import { Race } from "../client/src/application/common_files/interfaces";
import { fetchRaces } from "./application/database/queries/fetchRaces";
import { checkAccess } from "./application/routes/checkAccess";
import { regularLogin } from "./application/routes/regularLogin";
import { regularRegistration } from "./application/routes/regularRegistation";
import { saveRacesRoute } from "./application/routes/saveRacesRoute";

const PORT = process.env.PORT || 3007;
const app = express();

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("client/build"));

app.post("/registration", regularRegistration);
app.post("/login", regularLogin);
app.post("/saveRaces", checkAccess, saveRacesRoute);

app.post("/fetchRaces", async (req, res) => {
  let races: ReadonlyArray<Race> = [];
  try {
    races = await fetchRaces();
  } catch (e) {
    res.status(500).end(JSON.stringify(e));
  }
  res.status(200).end(JSON.stringify(races));
});

app.listen(PORT);
