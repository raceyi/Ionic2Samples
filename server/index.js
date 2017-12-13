var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var app = express();
var multer = require('multer');

var session = require('express-session');
var FileStore = require('session-file-store')(session);

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
    store: new FileStore(),
    secret: 'keyboard cat',
    cookie : {
      maxAge : 1000
    }
}));

var storage =   multer.diskStorage({
          destination: function (req, file, callback) {
            callback(null, './uploads');
          },
          filename: function (req, file, callback) {
            callback(null, file.fieldname + '-' + Date.now());
          }
});

var upload = multer({
          dest: './uploads',
          limits: {fileSize: 10000000, files:1},
        }).single('file')

app.listen(8080);

app.post('/login',function(req,res){
    console.log("req.body:"+JSON.stringify(req.body));
    console.log('login:'+req.body.username+" "+req.body.password);
   
    if(req.body.username=='Ionic2' && req.body.password=='123456'){
        console.log("login success");
	return res.send(JSON.stringify({result:"success",version:0.02})); 		
    }else{ 
        console.log("login failure");
        return res.send(JSON.stringify({result:"failure",version:0.02}));
    }
});

app.get('/getInfo',function(req,res){
    console.log("getInfo comes"+req.url);
    return res.send(JSON.stringify({version:"1.0",name:"www.takit.biz"}));
});

app.post('/ocrFileSubmit',function(req,res){
    console.log("/ocrFileSubmit");
    upload(req,res,function(err) {
        console.log(req.file);
        console.log("upload filename:"+req.file.filename);
        if(err) {
            console.log("Error uploading file. "+ JSON.stringify(err));
            return res.end("Error uploading file.");
        }
        var body={"result":"success"};
         res.end(JSON.stringify(body));
        //var img = req.file.path; // full name
        //console.log("img:"+img); //upload file into s3 storage
    });
});

app.use(function(req, res, next) {
          console.log("404 not found "+req.url);
	  var err = new Error('Not Found');
	  err.status = 404;
	  next(err);
});


