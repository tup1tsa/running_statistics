import * as dotenv from 'dotenv';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import { connect, disconnect, saveRuns } from './database';

dotenv.load();

const PORT = process.env.PORT || 3007;
const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('client/build'));

app.post('/saveRuns', async (req, res) => {
  const runs = req.body;
  const client = await connect();
  const db = client.db('remote-azure-mongo');
  await saveRuns(db, runs);
  await disconnect(client);
  const response = { saved: true };
  res.status(200).end(JSON.stringify(response));
});

app.listen(PORT);