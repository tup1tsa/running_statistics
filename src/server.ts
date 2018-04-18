import * as express from 'express';

const PORT = process.env.PORT || 3007;
const app = express();

app.use(express.static('client/build'));

app.listen(PORT);