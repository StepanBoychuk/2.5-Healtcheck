const dotenv = require('dotenv');
const express = require('express');
const axios = require('axios');

dotenv.config();

const app = express();

app.get('/random', async function (req, res) {
        try {
            const response = await axios.get('https://yesno.wtf/api');
            if (response.data.answer === 'yes') {
                res.send({'result': true});
            }else if (response.data.answer === 'no') {
                res.send({'result': false})
            }else{
                res.status(500).send({'result': 'maybe'});
            }
        } catch (error) {
            res.status(error.response.status).end();
        }
})

app.get('/healthz', async function (req, res) {
    try {
        const response = await axios({
            method: 'HEAD',
            url: 'https://yesno.wtf'
        })
        res.send(response.data)
    }catch (error) {
        res.status(500).end();
    }
}) 

app.listen(process.env.API_PORT, () => {
    console.log(`Server is running on ${process.env.API_PORT} port`)
});