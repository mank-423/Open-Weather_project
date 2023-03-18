const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

//Using the get of the app
app.get("/", function(req, res){

    res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req, res){
    
    const query = req.body.cityName;
    const appid ="d83341028d169a7c0b1fe579054e708b";
    const unit = "metric";

    //Using the URL to use https module of node
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appid+"&units="+unit;
    
    //Get method for the URL
    https.get(url, function(response){
        
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const feel = weatherData.main.feels_like;
            const describe = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png";

            res.write("<div style='background-color:black; padding:0%;margin:0%;'> <center> <div style='background-color:cadetblue; border-style: solid; width:60%; height:100%;'>")
            res.write("<h1>Temperature of " +query+ " is: "+temp+" degree celsius </h1>");
            res.write("<h1>Weather is:"+feel+"</h1>");
            res.write("<h1>Description is:"+describe+"</h1>")
            res.write("<img src="+imgURL+">");
            res.write("</div> </center> </div>")
            res.send();

        });
    });
    

});
    



app.listen(3000, ()=>{
    console.log("Server started at port 3000");
})