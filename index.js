require('dotenv').config()
const express = require('express')
const app =  express()
const bodyParser = require('body-parser')
const axios = require('axios')
const twilio = require('twilio')(process.env.TWILIO_SID,process.env.TWILIO_AUTH_TOKEN)

app.use(bodyParser.json())

function translate(req, res) {
  axios.post('https://translate.yandex.net/api/v1.5/tr.json/translate', null, {
    params: { key: process.env.YANDEX_KEY, lang: req.body.lang, text: req.body.message }
  })
    .then(response => sendMessage(response.data.text[0], req.body.tel))
    .then(() => res.status(200).json({ message: 'Message Sent ' }))
    .catch(err => console.log(err))
}

function sendMessage(body, to) {
  return twilio.messages.create({
    from: process.env.TWILIO_NUMBER,
    to,
    body
  })
}

app.post('/message', translate)

app.listen(4000, () => console.log('App is running on port 4000'))
