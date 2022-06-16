const express = require('express');                 // retrieves the package
const router = express.Router();
const moment = require('moment');
const { Client } = require('pg');

const client = new Client({  //connecting our DB
    host: process.env.POSTGRESQL_HOST,
    port: process.env.POSTGRESQL_PORT,
    database: process.env.POSTGRESQL_DATABASE,
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

router.post('/', async (req, res) => {      
    console.log(req.body);                 
    let now = moment();
    console.log("inserting into table at : " + (now.format()));

    client.query(`Insert into public."homeReporting" ("name", "isHome") values ("` + (req.body.name) + `", "` + (req.body.isHome) + `");`, (err, res) => {
        if (err) throw err
        console.log(res)
    })
});

router.patch('/', async (req, res) => {
    console.log(req.body);
    let now = moment();
    console.log("updating table value at : " + (now.format()));
    let PGquery = await client.query(`UPDATE public."homeReporting" SET "isHome" = '` + (req.body.isHome) + `' WHERE "name" = '` + (req.body.name) + `';`, (err, res) => {
        if (err) throw err
        console.log(res)
    })
    console.log(PGquery)
    res.json(PGquery);
});

router.get('/', async (req, res) => { 
    console.log(req.body);                   
    let now = moment();
    console.log("get DB info at : " + (now.format()));

    let PGquery = await client.query('SELECT * FROM public."homeReporting" ORDER BY name ASC', (err, res) => {
        if (err) throw err
        console.log(res)
    });
    res.json(PGquery);
});
//---------------------------------------
//END of routeer activity
//---------------------------------------
module.exports = router;