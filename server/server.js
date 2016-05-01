/**
 * Created by Karen on 01-05-2016.
 */
var mongoose = require('mongoose'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    path = require('path');

//Setting up express app and body parser
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../public')));

// Register the routing
var productRoutes = require('./product/product.routes');
var categoryRoutes = require('./category/category.routes');
var productFlagRoutes = require('./productflag/product.flag.routes');
var uploadRoutes = require('./upload/upload.routes');

//Use routes
app.use(productRoutes);
app.use(categoryRoutes);
app.use(productFlagRoutes);
app.use(uploadRoutes);

//Setup db connection
mongoose.connect('mongodb://localhost/staudestedet');

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', startServer);

// Function used to start up the server
function startServer(){
    var server = app.listen(process.env.PORT || 3000, function(){
        var port = server.address().port;
        console.log('Listening on port ' + port);
    });
}