# running_statistics

Simple application to keep tracking of running data using geolocation.

Currently available at https://tup1tsa.herokuapp.com/

Installation steps for development needs:
<br /><br />
Prerequisites:
<li>Mongo db v4.0 (running locally) </li>
<li>Node.js (appropriate version is stated in package.json under the 'engine' field)</li>
<li>yarn</li>
<li><a href="https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode">prettier</a></li>
<br /><br />
Next keys should be present in .env file:
<li>SEND_GRID_API_KEY   - api key that is required to send mails using send grid smtp server</li>
<li>MONGODB_URI_LOCAL (default is mongodb://localhost:27017)</li>
<li>MONGODB_NAME_LOCAL (name of the db you want to use for tests). It can be anything </li>
<br /><br />
Before anything else install node_modules
<li>yarn</li>
<li>cd client</li>
<li>yarn</li>
<br /><br />
Steps to run dev server
<li>yarn build</li>
<li>yarn start (there is no watcher currently, so every time server code changes it is necessary to run yarn build and start)</li>
<li>cd client</li>
<li>yarn start</li>
<li>go to localhost:3000 (it should open the browser automatically)</li>
<br /><br />
Tests:
<li>server => yarn test</li>
<li>client => cd client && yarn test</li>
