const express = require("express");
const https=require("https");
const bodyParser= require("body-parser")
const app= express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
})
app.post("/",function(req,res){
  const query=req.body.city;
  const url= "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=bdde0b386c266b9c1041d39a9d1b5532&units=metric";
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      const weatherData =JSON.parse(data);
      const temp=weatherData.main.temp;
      const descp = weatherData.weather[0].description;
      const icon = "https://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png";
      res.write("<h1>the weather is currently "+descp+"<h1>")
      res.write("<h1>the temperature in "+weatherData.name+" is "+temp+" degree celcius<h1>");
      res.write("<img src="+icon+">");
      res.send();
    })
  })
})





app.listen(3000,function(){
  console.log("Server is running at port 3000");
})
