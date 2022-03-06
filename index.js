const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const { response } = require('express');

app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded(
  { extended: true }
));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  var fname = req.body.fname;
  var lname = req.body.lname;
  var email = req.body.email;

  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields:{
        FNAME:fname,
        LNAME:lname
      }
    }]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us14.api.mailchimp.com/3.0/lists/" + "bb7bd98a85",
    method: "POST",
    headers: {
      "Authorization": "Newsletter " + "b1670a59ddcf86381f3d96b97e239b2a-us14"
    },
    body: jsonData
  };

  request(options, function (error, response, body) {
    if (error) {
      res.sendFile(__dirname+"/failure.html");
    }
    else {
      if(response.statusCode!=200){
        res.sendFile(__dirname+"/failure.html");
      }else{
        res.sendFile(__dirname+"/success.html");
      }
    }
  });
});

app.post("/failure", function (req,res){
  res.redirect('/');
});

app.post("/success", function (req,res){
  res.redirect('/');
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started at port 3000");
});