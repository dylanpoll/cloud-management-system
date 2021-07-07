const express = require('express');                 // retrieves the package
const router = express.Router();
const moment = require('moment');
const HomeSchema = require('../models/homeReporting.js');             //the "model" for our "Post" object

//update a field in a collection
router.post('/', async (req, res) => {      // this would be on http://192.168.2.181:27017/homeReporting/
    console.log(req.body);                  //this logs the post being sent into the console, req.body = Required body, in this case it is a raw JSON body being sent as a byte stream.
    let person = new HomeSchema({           //this is a new person object using the homeschema template
        name: req.body.name,                //JSON lets you do things like pull values from specific titled fields
        isHome: req.body.isHome             //so you can have a named field value passed between different languages
    });
    try {
        let savedPerson = await person.save();
        res.json(savedPerson);
        console.log(savedPerson);
    }catch(err) {
        res.json({ message: err });
        let now = moment();
        console.log({ message: err } + "failed to add person at : "+(now.format()));
    }
});

router.patch('/', async (req, res) => {     // this would be on http://192.168.2.181:27017/homeReporting/
    try {
        console.log(JSON.stringify(req.body));
        let person = await HomeSchema.findOne({"name": (req.body.name) });
        console.log(JSON.stringify(person));
        let change = (req.body.isHome);
        let response = await HomeSchema.updateOne({name: person.name},{$set:{isHome: change}});
        res.json(response);
        let now = moment();
        console.log(person.name + ' is now ' + change + '. Time : '+(now.format()));
    } catch (err) {
        res.json({ message: err });
        let now = moment();
        console.log({ message: err } + "failed to update person log at : "+(now.format()));
    }
});

router.get('/', async (req, res) => { // this would be on http://192.168.2.181:27017/homeReporting/report
    try {
        let people = await HomeSchema.find();        //this calls the model post(it is a schema) there are additional sub methods of find
        res.json(people);
    } catch (err) {
        res.json({ message: err });
        let now = moment();
        console.log({ message: err } + " failed to retrieve home data at : "+(now.format()));          
    }
});
//---------------------------------------
//END of routeer activity
//---------------------------------------
module.exports = router;