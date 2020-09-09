const express = require('express')
const handlebars = require('express-handlebars')
const routes = require('./routes')
const path = require('path');
const PORT = process.env.PORT || 3000;
const app = express()

app.engine('handlebars', handlebars({defaultLayout: 'main'}))

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({ extended: true })); 
app.use(routes)


app.listen(PORT, console.log(`> Server YOUTUBE-API-COMENTARIO rodando na porta ${PORT}!`))
