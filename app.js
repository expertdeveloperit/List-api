import express from 'express'; 
import mongoose from 'mongoose';
import bodyParser from 'body-parser'; 
import cors from 'cors';
import path from 'path';
import logger from 'morgan';
import passport from 'passport';
import session from 'express-session';
import config from './config';


// import All routes  from routes folder 
import Routes from './routes';

const port = 4000;

// Create a new Express Instance
const app = express();


//setting url of MongoDb 
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/list-db';

// Configuration and connecting to Databse MongoDb
mongoose.connect(uri,{ useNewUrlParser: true } ,(err) => {
   if (err) {
      console.log('Connection Error: ', err);
   } else {
      console.log('Successfully Connected');
   }
});

mongoose.Promise = global.Promise;

mongoose.set('useFindAndModify', false);

// Cors middleware to handle request cross-origin 
app.use(cors());

// serving static files to the client    
app.use('/public/uploads', express.static(path.join(__dirname + '/public/uploads')));
app.use('/images', express.static(path.join(__dirname + '/public/images')));

//configuration for passport
require('./helpers/passport')(passport);

app.use(session({
   resave: false,
   proxy: true,
   saveUninitialized: true,
   secret:config.auth.session_secret,
   cookie:{
   secure: false,
   domain: 'localhost',
   maxAge: 1000 * 60 * 24 
   }
}));

app.use(passport.initialize());
app.use(passport.session()); //persistent login session

//body-parser middleware to handle form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
}));

//morgan middle-ware to logs the requests.   
app.use(logger('dev'));

// Welcome Route for api 
app.get('/api', function(req, res, next) {
   res.status(200).json({
      status: true,
      message: "Welcome to List API, Ready to Handle Requests..!!"
   });
});

// Api Routes For application 

app.use('/api', Routes.userRoutes);
app.use('/api', Routes.listRoutes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
   var err = new Error("No Matching Route Please Check Again...!!");
   err.status = 404;
   next(err);
});
// error handler 
// define as the last app.use callback
app.use(function(err, req, res, next) {
   res.status(err.status || 500);
   res.json({
      Error: {
         message: err.message
      }
   });
});


app.listen(port, (err) => {
   if(err) {
      console.error("Error",err);
   } 
   console.log("Server is Running on port " + port );
})