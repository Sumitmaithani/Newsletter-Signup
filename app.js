const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const { response } = require("express");
const https = require("https");
// const res = require("express/lib/response");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded(
  {extended:true}
));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

  const data ={
    member:{
      email_address:email,
      status:"subcribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }
  };

  const jsonData = JSON.Stringify(data);
});

const url = "https://us14.api.mailchimp.com/3.0/lists/bb7bd98a85";

const options = {
  method: "POST",
  auth: "newsletter:b1670a59ddcf86381f3d96b97e239b2a-us14"
};

const request = https.request(url, options, function(response) {

  if (response.statusCode===200){
    res.sendFile(__dirname + "/success.html");
  }else{
    res.sendFile(__dirname + "/failure.html");
  }
  
  response.on("data", function(data) {
    //console.log(JSON.parse(data));
  })

  request.write(jsonData);
  request.end();

});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${port}`);
});


//api key - b1670a59ddcf86381f3d96b97e239b2a-us14
//list ID -  bb7bd98a85
