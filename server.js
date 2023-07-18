const express = require('express')
const app = express()
require("dotenv").config();
const path =require('path')
const { APP_LOCALHOST, APP_PORT } = process.env;

app.use(express.json())
app.use(express.static("client/build"))
app.get('/api/test', (_,res) =>{
    res.send({
        msg: 'whats your name, fuck you toni!'
    })
})

app.get('/*', (_,res) =>{
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})
app.listen(APP_PORT, () => {console.log(`lancé sur http://${APP_LOCALHOST}:${APP_PORT}`)})