const dotenv = require('dotenv');
const express = require('express');
const axios = require('axios');
const https = require('https');


dotenv.config();

const app = express();

app.get('/random', function (req, res) {
    axios.get('https://yesno.wtf/api')
    .then((response) => {
        if (response.data.answer === 'yes') {
            res.send({'result': true});
        }else if (response.data.answer === 'no') {
            res.send({'result': false})
        }else{
            res.status(500).send({'result': 'maybe'});
        }
    })
    .catch((error) => {
        res.status(error.response.status).end();
    })
})

app.get('/healthz', function (req, res) {
    https.request('https://yesno.wtf', {method: 'HEAD'}, (result) => {
        res.status(result.statusCode).end();
    }).on('error', (err) => {
        res.status(500).end();
    }).end()
})

app.listen(process.env.API_PORT, () => {
    console.log(`Server is running on ${process.env.API_PORT} port`)
});