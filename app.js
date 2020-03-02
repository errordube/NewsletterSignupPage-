//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https");


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){

  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const eMail = req.body.email;
  const data = {
    members : [
      {
        email_address: eMail,
        status : "subscribed" ,
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };


  const jsonData = JSON.stringify(data);

  const url = "https://us19.api.mailchimp.com/3.0/lists/282afbfbb7";

  const options = {
    method: "POST",
    auth: "aditya1:e27c2f60fba5f79716f6707c0d6780fa-us19"
  }

  const request = https.request(url, options, function(response){

    if(response.statusCode == 200){

      res.sendFile(__dirname + "/success.html");

    }else{
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data){
      console.log(JSON.parse(data));
    })

  })

  request.write(jsonData);
  request.end();



});


app.post("/failure", function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server running on 3000");
});


//apikey
// e27c2f60fba5f79716f6707c0d6780fa-us19
// uniqueid
// 282afbfbb7
