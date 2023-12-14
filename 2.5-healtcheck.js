const dotenv = require('dotenv');
const express = require('express');
const request = require('request');
const https = require('https');

dotenv.config();

const app = express();

app.get('/random', function (req, res) {
    request(
        'https://yesno.wtf/api',
        (err, response, body) => {
            if (err) {
                res.status(500).send({message: err});
            }
            const yesnoResponse = JSON.parse(body)
            if (yesnoResponse.answer === 'yes'){
                res.send({'result': true});
            }else if (yesnoResponse.answer === 'no'){            
                res.send({'result': false});
            }else{
                res.status(500).send({'result': 'maybe'});
            }
        }
    )
});

app.get('/healthz', function (req, res) {
    const healthzReq = https.request('https://yesno.wtf', {method: 'HEAD'}, (result) => {
        res.status(result.statusCode).end();
    }).on('error', (err) => {
        res.status(500).end();
    }).end()
})

app.listen(process.env.API_PORT, () => {
    console.log(`Server is running on ${process.env.API_PORT} port`)
});