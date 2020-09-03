const express = require('express')
const handlebars = require('express-handlebars')
const routes = require('./routes')
const path = require('path');

const app = express()

app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'handlebars')


app.use(express.json())
app.use(routes)


app.listen(3000, console.log('> Server open!'))