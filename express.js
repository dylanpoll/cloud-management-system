
const express = require('express');                     // retrieves the package
const mongoose = require('mongoose');                   //used to access mongoDB
const bodyParser = require('body-parser');              //used to handle JSON files
const cors = require('cors');
const moment = require('moment');

require('dotenv/config');                               //used to handle the .env file with the access keys
const app = express();                                  // app is used to call express

app.use(bodyParser.json());
app.use(cors());

//import routes
const test = require('./Routes/test.js')                // the './' indicates it is in a subfolder
const solid = require('./Routes/solid.js')   
const homeReport = require('./Routes/homeReport.js')   
//const postRoute = require('./Routes/posts.js') 
//const post = require('./Routes/LEDScheme.js')   

//middlewares
app.use('/homereporting', homeReport);   
app.use('/test', test);                                //preps for middleware testing 
app.use('/solid', solid);   
//app.use('/posts',postRoute);                         //imports the posts.js, preps for middleware etc

//route
app.get('/', (req, res) => {                           //(req,res) = request and response
   res.send('Cloud managment system loaded.')
});
const server = app.listen(9001)                        //turning on the server and start listning to the server. the number is the port.
server.timeout = 8000;                                 //sets idle out timer for fetching to 4 seconds

//statement for load
let now = moment();
console.log('Cloud managment system loaded at http://192.168.2.141:9001 the time is : '+(now.format()));

//connect to DB
mongoose.connect(
    process.env.DB_CONNECTION,                          // process calls the file ".env", and pulls what DB_CONNECTION is equivalent to
        { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        },
    () => console.log('..Successfully accessed the database.')
);                                                      //feed-back signifying successful connection.

