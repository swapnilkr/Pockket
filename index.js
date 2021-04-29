const express = require('express')

const app = express();

const port = 8000;


//calling db
const db = require('./config/mongoose');

const router = express.Router();

//adding express ejs layout
const expressLayouts = require('express-ejs-layouts');

app.listen(port,function(err){
    if (err){
        // interpolation
        console.log(`Error in running the server : ${err}`);
    }

})



//adding static file
app.use(express.static('./assets'));


// to set up view engine
app.set('view engine','ejs');

// to join path
app.set('views','./views');


app.use('/',require('./routes/index'));