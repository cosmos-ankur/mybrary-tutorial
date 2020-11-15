const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/author')
const mongoose = require('mongoose')

app.set('view engine','ejs')
app.set('views',__dirname + '/views')
app.set('layout','layouts/layout')


app.use(expressLayouts)
app.use(bodyParser.urlencoded({limit:'10mb',extended:false}))
app.use(express.static('public'))
mongoose.connect('mongodb://localhost/mybrary', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', error=>console.log(error));
db.once('open', ()=> {
  console.log('Connected To Database')
});

app.use('/',indexRouter)
app.use('/authors',authorRouter)

app.listen(process.env.PORT || 3000,()=>{
    console.log('running at 3000')
})