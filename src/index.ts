import * as dotenv from 'dotenv';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import { fetchRacesFactory, saveRacesFactory } from './factories/database/queriesFactories';
import { Race } from '../client/src/common_files/interfaces';

dotenv.load();

const PORT = process.env.PORT || 3007;
const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('client/build'));

// todo: add some kind of tests here (probably integration)
app.post('/saveRaces', async (req, res) => {
  const races = req.body;
  try {
    await saveRacesFactory(races);
  } catch (e) {
    res.status(500).end(JSON.stringify(e));
    return;
  }
  const response = { saved: true };
  res.status(200).end(JSON.stringify(response));
});

app.post('/fetchRaces', async (req, res) => {
  let races: Race[] = [];
  try {
    races = await fetchRacesFactory();
  } catch (e) {
    res.status(500).end(JSON.stringify(e));
  }
  res.status(200).end(JSON.stringify(races));
});

app.listen(PORT);