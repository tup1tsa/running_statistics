import * as dotenv from 'dotenv';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import { fetchRunsFactory, saveRunsFactory } from './database/queriesFactories';
import { PositionInTime } from '../client/src/common_files/interfaces';

dotenv.load();

const PORT = process.env.PORT || 3007;
const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('client/build'));

// todo: add some kind of tests here (probably integration)
app.post('/saveRuns', async (req, res) => {
  const runs = req.body;
  try {
    await saveRunsFactory(runs);
  } catch (e) {
    res.status(500).end(JSON.stringify(e));
    return;
  }
  const response = { saved: true };
  res.status(200).end(JSON.stringify(response));
});

app.get('/fetchRuns', async (req, res) => {
  let runs: PositionInTime[][] = [];
  try {
    runs = await fetchRunsFactory();
  } catch (e) {
    res.status(500).end(JSON.stringify(e));
  }
  res.status(200).end(JSON.stringify(runs));
});

app.listen(PORT);