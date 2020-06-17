require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const app = express()
const authCtrl = require('./controllers/authController')
const postCtrl = require('./controllers/postController')

const {SESSION_SECRET, SERVER_PORT, CONNECTION_STRING} = process.env

app.use(express.json())
app.use(session({
    resave:false,
    saveUninitialized:true,
    cookie:{maxAge: 1000 * 60 * 60 * 24 * 30},
    secret: SESSION_SECRET
}))

//endpoints will go here

massive({
    connectionString: CONNECTION_STRING,
    ssl:
        {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db)
    console.log('beating cancer one db at a time')
    app.listen(SERVER_PORT, () => {
        console.log(`Getting ws on port ${SERVER_PORT}`)
    })
})