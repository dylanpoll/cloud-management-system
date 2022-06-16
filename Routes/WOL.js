const moment = require('moment');
const express = require('express');                         // retrieves the package
const router = express.Router();
const { exec } = require('child_process');
//const moment = require('moment');

router.get('/dylanDesktop', async (req,res) => {
  try {
    let now = moment();
    console.log('Executing command [sudo etherwake -i eth0 58:11:22:4C:49:1A] at : '+(now.format()));
    const Etherwake =  
    exec("sudo etherwake -i eth0 58:11:22:4C:49:1A", function (error, stdout, stderr) {
      if (error) {
        console.log(error.stack);
        console.log('Error code: ' + error.code);
        console.log('Signal received: ' + error.signal);
      }
    });
    Etherwake.on('exit', function (code) {
      console.log('Child process exited with exit code ' + code);
    });
    
    res.json({"Attempt": "Success" });
  } catch (err) {
    res.json({ "Attempt": "Failure" });
  }
});

router.get('/dylanLaptop', async (req,res) => {
  try {
    let now = moment();
    console.log('Executing command [sudo etherwake -i eth0 30:9C:23:FC:FB:31] at : '+(now.format()));
    const Etherwake =  
    exec("sudo etherwake -i eth0 58:11:22:4C:49:1A", function (error, stdout, stderr) {
      if (error) {
        console.log(error.stack);
        console.log('Error code: ' + error.code);
        console.log('Signal received: ' + error.signal);
      }
    });
    Etherwake.on('exit', function (code) {
      console.log('Child process exited with exit code ' + code);
    });
    
    res.json({"Attempt": "Success" });
  } catch (err) {
    res.json({ "Attempt": "Failure" });
  }
});
//---------------------------------------
//END of routeer activity
//---------------------------------------
module.exports = router;

