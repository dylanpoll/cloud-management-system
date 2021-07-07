const express = require('express');                         // retrieves the package
const router = express.Router();                            //sets up the sub url router
//const Scheme = require('../models/LEDscheme.js');         //the "model" for our "Post" object this is only if you setup a database(not required)
const fetch = require('node-fetch');
const espIP = process.env.REACT_APP_ESP_IP;
const data = {
    "token" : "valid",
    "numleds" : "60",
    "rate" : "10",
    "led0": "r",
    "led1": "g",
    "led2": "B",
    "led3": "p",
    "led4": "w",
    "led5": "r",
    "led6": "r",
    "led7": "g",
    "led8": "B",
    "led9": "w",
    "led10": "r",
    "led11": "r",
    "led12": "g",
    "led13": "B",
    "led14": "w",
    "led15": "r",
    "led16": "r",
    "led17": "g",
    "led18": "B",
    "led19": "w",
    "led20": "r",
    "led21": "r",
    "led22": "g",
    "led23": "B",
    "led24": "w",
    "led25": "w",
    "led26": "r",
    "led27": "g",
    "led28": "B",
    "led29": "w",
    "led30": "r",
    "led31": "r",
    "led32": "r",
    "led33": "r",
    "led34": "r",
    "led35": "r",
    "led36": "r",
    "led37": "r",
    "led38": "r",
    "led39": "r",
    "led40": "r",
    "led41": "r",
    "led42": "r",
    "led43": "r",
    "led44": "r",
    "led45": "r",
    "led46": "r",
    "led47": "r",
    "led48": "r",
    "led49": "r",
    "led50": "r",
    "led51": "r",
    "led52": "r",
    "led53": "B",
    "led54": "B",
    "led55": "B",
    "led56": "r",
    "led57": "r",
    "led58": "r",
    "led59": "r",
    "led60": "r"
};
//---------------------------------------
//Post LED color scheme
//---------------------------------------
router.get('/', async () => {     
  try {
    //console.log(req.body);                //uncomment to echo recieved JSON body in terminal
    let subroute = "/postLEDSchema";
      const res = await fetch(espIP + subroute, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      console.log("passed in test");
      res.json({"Attempt" : "Success"});   //waits for the response from the rest API 
  } catch (err) {
    console.log("failed in test");
  }
});
//---------------------------------------
//END of routeer activity
//---------------------------------------
module.exports = router;