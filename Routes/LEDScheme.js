const express = require('express');                         // retrieves the package
const router = express.Router();                            //sets up the sub url router
//const Scheme = require('../models/LEDscheme.js');         //the "model" for our "Post" object this is only if you setup a database(not required)
const fetch = require('node-fetch');
const espIP = process.env.REACT_APP_ESP_IP;
//---------------------------------------
//Post LED color scheme
//---------------------------------------
router.post('/', async (req, res) => {      
  try {
    //console.log(req.body);                //uncomment to echo recieved JSON body in terminal
    let subroute = "/postLEDSchema";
      const res = await fetch(espIP + subroute, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body)
      });
      res.json({"Attempt" : "Success"});   //waits for the response from the rest API 
  } catch (err) {
    res.json({"Attempt" : "Failure"});
  }
});
//---------------------------------------
//END of routeer activity
//---------------------------------------
module.exports = router;
