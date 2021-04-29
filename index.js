const express = require('express')

const app = express();

const port = 8000;

const router = express.Router();

app.listen(port,function(err){
    if (err){
        // interpolation
        console.log(`Error in running the server : ${err}`);
    }

})



// to set up view engine
app.set('view engine','ejs');

// to join path
app.set('views','./views');


app.use('/',require('./routes/index'));