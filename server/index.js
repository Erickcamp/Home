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

app.get('/auth/user', authCtrl.getUser)
app.post('/auth/register', authCtrl.register)
app.post('/auth/logout', authCtrl.logout)
app.post('/auth/login', authCtrl.login)

app.get('/api/posts/:id', postCtrl.getPost)
app.get('/api/posts', postCtrl.getPosts)
app.post('/api/posts', postCtrl.addPost)
app.put('/api/posts/:id', postCtrl.editPost)
app.delete('/api/posts/:id', postCtrl.deletePost)

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