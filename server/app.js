require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require ('mongoose')
const port = process.env.PORT
const database = process.env.BD_TTD || 'Blog'
const db = mongoose.connection;
mongoose.connect(process.env.DB_KEY, {useNewUrlParser:true});
// mongoose.connect(`mongodb://localhost/${database}`); for testing

app.use(cors())

const routeUser = require('./routes/userRoute') 
const routeArticle = require('./routes/articleRoute')
const routeComment = require('./routes/commentRoute')

app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use('/users',routeUser)
app.use('/articles',routeArticle)
app.use('/comment',routeComment)

app.get('/', (req,res) => {
    res.status(200).json({
        message : `Server On nih`
    })
})

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log(`> CONNECTED TO DB ${database}\n`);
});

app.listen(port, () => {
    console.log(`\n> LISTENING TO PORT ${port}`);
})

module.exports = app