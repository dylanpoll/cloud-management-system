const express = require('express');                         // retrieves the package
const router = express.Router();                            //sets up the sub url router
const isSetScheme = require('../models/isSet');  
//const rest = "http://192.168.2.181:9001/solid/";
const rest = "http://localhost:9001/solid/";
const fetch = require('node-fetch');
const espIP = process.env.REACT_APP_ESP_IP;
const espIP2 = process.env.REACT_APP_ESP2_IP;
const moment = require('moment');


//---------------------------------------
//Post LED color scheme
//---------------------------------------
router.get('/', async (req, res) => {       
  try {                                  
      let isSet = await isSetScheme.find();    
      res.json(isSet);                    
  } catch (err) {
      res.json({ message: err });
      console.log({ message: err });
  }
});

router.post('/', async (req, res) => {      // this would be on http://192.168.2.181:27017/homeReporting/
  console.log(req.body);                  //this logs the post being sent into the console, req.body = Required body, in this case it is a raw JSON body being sent as a byte stream.
  let newIsSet = new isSetScheme({           //this is a new person object using the homeschema template
      isSet: req.body.isSet,                //JSON lets you do things like pull values from specific titled fields
  });
  try {
      let isSet = await newIsSet.save();
      res.json(isSet);
      console.log(isSet);
  }catch(err) {
      res.json({ message: err });
  }
});

// 0 white,1 red,2 yello,3 blue,4 green,5 purple,6 off
router.patch('/', async (req, res) => {         // this would be on http://192.168.2.181:27017/homeReporting/
  try {
      let change = JSON.stringify(req.body.isSet);  
      let isSetCurrently = await isSetScheme.find();
      console.log(isSetCurrently + '  ' + change);
      let response = await isSetScheme.updateOne({isSet: isSetCurrently.isSet},{$set:{isSet: change}});
      res.json(response);
      console.log(response);
  } catch (err) {
      res.json({ message: err });
      console.log({ message: err });
  }
});

router.get('/off', async (req, res) => {       // the '/posts' bit adds to the "route" for the server so this would be on http://localhost:5000/posts/ 
  try {                                        // because this is posts and this "middleware" or "rest subprocess" is marked with "/"
    var data = {
      "token" : "valid",
      "numleds" : "60",
      "rate" : "5",
      "color" : "b"
  };
  let isSet = { "isSet" : 6};
  await fetch(rest, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(isSet)
  });

  let subroute = "/solidColor";
  const respond = await fetch(espIP + subroute, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    await fetch(espIP2 + subroute, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    console.log("turned off");
    res.json(respond);                    // res is short for response, this is responding to the client that sent the request with the data we pulled in the form of a JSON object
    let now = moment();
    console.log('response sent was ' + JSON.stringify(respond) + ' sent at : '+(now.format()));
  } catch (err) {
      res.json({ message: err });
      console.log({ message: err });
  }
});

router.get('/white', async (req, res) => {
  //setTimeout(() => {      // this wraps the middleware in a timeout unique to itself and shorter than the server wide timeout
  try {
    //console.log(req.body);                //uncomment to echo recieved JSON body in terminal
    var data = {
        "token" : "valid",
        "numleds" : "60",
        "rate" : "5",
        "color" : "w"
    };
// 0 white,1 red,2 yello,3 blue,4 green,5 purple,6 off
    let isSet = {isSet : 0};
    await fetch(rest, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(isSet)
    });

    let subroute = "/solidColor";
    const respond = await fetch(espIP + subroute, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    await fetch(espIP2 + subroute, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    console.log("white");
    res.json(respond);                    // res is short for response, this is responding to the client that sent the request with the data we pulled in the form of a JSON object
    let now = moment();
    console.log('response sent was ' + JSON.stringify(respond) + ' sent at : '+(now.format()));
      } catch (err) {
    console.log("failed in white");
  }
 // }, 180000)// this is the timeout value in miliseconds
});

router.get('/red', async (req, res) => {   
    try {
      //console.log(req.body);                //uncomment to echo recieved JSON body in terminal
      var data = {
          "token" : "valid",
          "numleds" : "60",
          "rate" : "5",
          "color" : "r"
      };

// 0 white,1 red,2 yello,3 blue,4 green,5 purple,6 off
let isSet = {isSet : 1};
await fetch(rest, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(isSet)
});

      let subroute = "/solidColor";
      const respond = await fetch(espIP + subroute, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      await fetch(espIP2 + subroute, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      console.log("red");
      res.json(respond);                    // res is short for response, this is responding to the client that sent the request with the data we pulled in the form of a JSON object
      let now = moment();
      console.log('response sent was ' + JSON.stringify(respond) + ' sent at : '+(now.format()));
    } catch (err) {
      console.log("failed in red");
    }
  });

router.get('/blue', async (req, res) => {      
    try {
      //console.log(req.body);                //uncomment to echo recieved JSON body in terminal
      var data = {
          "token" : "valid",
          "numleds" : "60",
          "rate" : "5",
          "color" : "B"
      };

// 0 white,1 red,2 yello,3 blue,4 green,5 purple,6 off
let isSet = {isSet : 4};
await fetch(rest, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(isSet)
});

      let subroute = "/solidColor";
      const respond = await fetch(espIP + subroute, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      await fetch(espIP2 + subroute, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      console.log("blue");
      res.json(respond);                    // res is short for response, this is responding to the client that sent the request with the data we pulled in the form of a JSON object
      let now = moment();
      console.log('response sent was ' + JSON.stringify(respond) + ' sent at : '+(now.format()));
    } catch (err) {
      console.log("failed in blue");
    }
  });

  router.get('/green', async (req, res) => {     
    try {
      //console.log(req.body);                //uncomment to echo recieved JSON body in terminal
      var data = {
          "token" : "valid",
          "numleds" : "60",
          "rate" : "5",
          "color" : "g"
      };

// 0 white,1 red,2 yello,3 blue,4 green,5 purple,6 off
let isSet = {isSet : 4};
await fetch(rest, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(isSet)
});

      let subroute = "/solidColor";
      const respond = await fetch(espIP + subroute, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      await fetch(espIP2 + subroute, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      console.log("green");
      res.json(respond);                    // res is short for response, this is responding to the client that sent the request with the data we pulled in the form of a JSON object
      let now = moment();
      console.log('response sent was ' + JSON.stringify(respond) + ' sent at : '+(now.format()));
    } catch (err) {
      console.log("failed in green");
    }
  });

  router.get('/yellow', async (req, res) => {      
    try {
      //console.log(req.body);                //uncomment to echo recieved JSON body in terminal
      var data = {
          "token" : "valid",
          "numleds" : "60",
          "rate" : "5",
          "color" : "y"
      };

// 0 white,1 red,2 yello,3 blue,4 green,5 purple,6 off
let isSet = {isSet : 3};
await fetch(rest, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(isSet)
});

      let subroute = "/solidColor";
      const respond = await fetch(espIP + subroute, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      await fetch(espIP2 + subroute, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      console.log("yellow");
      res.json(respond);                    // res is short for response, this is responding to the client that sent the request with the data we pulled in the form of a JSON object
      let now = moment();
      console.log('response sent was ' + JSON.stringify(respond) + ' sent at : '+(now.format()));
    } catch (err) {
      console.log("failed in yellow");
    }
  });

  router.get('/purple', async (req, res) => {      
    try {
      //console.log(req.body);                //uncomment to echo recieved JSON body in terminal
      var data = {
          "token" : "valid",
          "numleds" : "60",
          "rate" : "5",
          "color" : "p"
      };

// 0 white,1 red,2 yello,3 blue,4 green,5 purple,6 off
let isSet = {isSet : 5};
await fetch(rest, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(isSet)
});

      let subroute = "/solidColor";
      const respond = await fetch(espIP + subroute, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      await fetch(espIP2 + subroute, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      console.log("purple");
      res.json(respond);                    // res is short for response, this is responding to the client that sent the request with the data we pulled in the form of a JSON object
      let now = moment();
      console.log('response sent was ' + JSON.stringify(respond) + ' sent at : '+(now.format()));
    } catch (err) {

      console.log("failed in purple");
    }
  });

  router.get('/custom', async (req, res) => {      
    try {
      var data = {
          "token" : "valid",
          "numleds" : "60",
          "rate" : "5",
          "color" : "z",
          "dynoC1" : "30",
          "dynoC2" : "0",
          "dynoC3" : "100"
      };
      let subroute = "/solidColor";
      const respond = await fetch(espIP + subroute, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      await fetch(espIP2 + subroute, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      console.log("custom");
      res.json(respond);                    // res is short for response, this is responding to the client that sent the request with the data we pulled in the form of a JSON object
      let now = moment();
      console.log('response sent was ' + JSON.stringify(respond) + ' sent at : '+(now.format()));
    } catch (err) {
      console.log("failed in custom");
    }
  });
//---------------------------------------
//END of routeer activity
//---------------------------------------
module.exports = router;