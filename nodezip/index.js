"use strict";

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const zips = require('./zips.json');

const zipCityIndex = zips.reduce((index, record) => {
    const city = record.city.toLowerCase();

    if (!index[city]) {
        index[city] = [];
    }

    index[city].push(record);
    return index;
}, {});

const app = express();

const port = process.env.PORT || 80;
const host = process.env.HOST || '';

app.use(morgan('dev'));
app.use(cors());

app.get('/zips/city/:cityName', (req, res) => {
    let zipsForCity = zipCityIndex[req.params.cityName.toLowerCase()];

    if (!zipsForCity) {
        res.status(404).send();
    }

    res.json(zipsForCity);
});

app.get('/hello/:name', (req, res) => {
    res.send(`Hello ${req.params.name}!`);
})

app.listen(port, host, () => {
    console.log(`server is listening at http://${host}:${port}`)
});