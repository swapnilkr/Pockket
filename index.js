const express = require('express')

//get cookie parser
const cookieParser = require('cookie-parser');

const app = express();

const port = 8000;


//calling db
const db = require('./config/mongoose');

// used for session cookie
// express -session for using session encrypted cookie
const session = require('express-session');

// passport js
const passport = require('passport');

// startegy for passport
const passportLocal = require('./config/passport-local-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

// require mongo store
const MongoStore = require('connect-mongo').default;

const router = express.Router();

//adding express ejs layout
const expressLayouts = require('express-ejs-layouts');

const exphbs = require('express-handlebars');

const bodyParser = require('body-parser');


var messagebird = require('messagebird')();

app.use(express.urlencoded({extended: false}));

app.use(cookieParser());

//adding static file
app.use(express.static('./assets'));


// to set up view engine
app.set('view engine','ejs');

// to join path
app.set('views','./views');

// a MW which takes session cookie and encrypts it
app.use(session({
    // name of cookie
    name : 'pockket' , 
    // TODO change the secret before deployment in production mode
    // encrypted key
    secret : 'blah_something',

    saveUninitialized:false,
    resave:false,
    cookie:{
        // in ms
        maxAge:(1000 * 60 * 100)
    }
    
}));

app.use(passport.initialize());

app.use(passport.session());

// whether a session cookie is present or not
// user will be stored in locals
app.use(passport.setAuthenticatedUser);

app.use(bodyParser.urlencoded({defaultLayout: 'main'}));

app.use('/',require('./routes'));


app.listen(port,function(err){
    if (err){
        // interpolation
        console.log(`Error in running the server : ${err}`);
    }

})

app.post('/otp2',function(req,res){
    var number = req.body.number;

    messagebird.verify.create(number,{
        template:"Your verification code is %token."
    },function(err,response){
        if (err){
            console.log(err);
            res.render('otp2',{
                
            });
        } else {
            console.log(response);
            res.render('otp2',{
                id:response.id
            })
        }
    }
    )
})

app.post('/otp3',function(req,res){
    var id = req.body.id;
    var token = req.body.token;

    messagebird.verify.verify(id,token,function(err,response){
        if (err){
            console.log(err);
            res.render('successful',{
                
            });
        } else {
            console.log(response);
            res.render('successful',{
                id:response.id
            })
        }
    }
    )
})