
const express = require('express');                     // retrieves the package
const bodyParser = require('body-parser');              //used to handle JSON files
const cors = require('cors');
const moment = require('moment');
require('dotenv/config');                               //used to handle the .env file with the access keys
//const { Client } = require('pg');
const app = express();                                  // app is used to call express

app.use(bodyParser.json());
app.use(cors());

/* const client = new Client({  //connecting our DB
   host: process.env.POSTGRESQL_HOST,
   port: process.env.POSTGRESQL_PORT,
   database:process.env.POSTGRESQL_DATABASE,
   user: process.env.POSTGRESQL_USER,
   password: process.env.POSTGRESQL_PASSWORD,
 })

 client.connect(err => {
   if (err) {
     console.error('connection to postgresDB errored out', err.stack)
   } else {
     console.log('connected to postgresDB successfully')
   }
 })
*/

//import routes
const WOL = require('./Routes/WOL.js')               
const homeReport = require('./Routes/homeReportPG.js')              

//middlewares
app.use('/homereporting', homeReport); 
app.use('/WOL', WOL);

//route
app.get('/', (req, res) => {                           //(req,res) = request and response
   res.send('management system remote shell command API and PSQL DB hook loaded. Do not run this in the public domain, this is for internal closed network use.')
});
const server = app.listen(process.env.EXPRESS_PORT)                        //turning on the server and start listning to the server. the number is the port.
server.timeout = 8000;                                 //sets idle out timer for fetching to 4 seconds

//statement for load
let now = moment();
console.log('management system remote shell command API and PSQL DB hook loaded. Do not run this in the public domain, this is for internal closed network use. The system is loaded at '+ process.env.HOST_SYSTEM + process.env.EXPRESS_PORT + ' and the time is : ' +(now.format()));