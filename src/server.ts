import * as dotenv from 'dotenv';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import { getSaveRunQuery } from './database/queries';
import { runQuery } from './database/databaseWrappers';
import { MongoClient } from 'mongodb';

dotenv.load();

const PORT = process.env.PORT || 3007;
const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('client/build'));

app.post('/saveRuns', async (req, res) => {
  const runs = req.body;
  const saveRunQuery = getSaveRunQuery('runs', runs);
  try {
    await runQuery(process.env, MongoClient, saveRunQuery);
  } catch (e) {
    res.status(500).end(JSON.stringify(e));
    return;
  }
  const response = { saved: true };
  res.status(200).end(JSON.stringify(response));
});

app.listen(PORT);