var express = require('express');
var request = require('request');
var bignumber = require('bignumber.js');
var app = express();


//bignumber.config({ ERRORS: false });


app.get('/steam/civ5achievements', function(httpRequest, httpResponse) {
    // Calculate the Steam API URL we want to use
    var url = 'http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/' +
        'v2/?key=174B919DF918BA5C16B20C8527F85B3B&appid=8930';
    request.get(url, function(error, steamHttpResponse, steamHttpBody) {
        // Once we get the body of the steamHttpResponse, send it to our client
        // as our own httpResponse
        httpResponse.setHeader('Content-Type', 'application/json');
        httpResponse.send(steamHttpBody);
    });
});



var params = "key=174B919DF918BA5C16B20C8527F85B3B&format=JSON&language=en";

function convert64to32bitid(id){
    var userid = new bignumber(id);      
    //convert to 32bit
    var bit32 = new bignumber(76561197960265700);        
    userid = userid.minus(bit32);    
    userid = userid.minus(28);
    

    return userid;
}


app.get('/steam/game/:appid/achievements', function(httpRequest, httpResponse) {
    // Calculate the Steam API URL we want to use
    var url = 'http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/' +
        'v2/?key=174B919DF918BA5C16B20C8527F85B3B&appid=' +
        httpRequest.params.appid;
    request.get(url, function(error, steamHttpResponse, steamHttpBody) {
        httpResponse.setHeader('Content-Type', 'application/json');
        httpResponse.send(steamHttpBody);
    });
});


app.get('/steam/userid/:user', function(httpRequest, httpResponse) {
    var url = "http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?" + params + "&vanityurl=" + httpRequest.params.user;
    request.get(url, function(error, steamHttpResponse, steamHttpBody) {
        // Once we get the body of the steamHttpResponse, send it to our client
        // as our own httpResponse
        httpResponse.setHeader('Content-Type', 'application/json');
        httpResponse.send(steamHttpBody);
    });
});

https://api.opendota.com/api/players/2769570/heroes

app.get('/steam/dota/herostats/:user', function(httpRequest, httpResponse) {    
    var url = 'https://api.opendota.com/api/players/'+convert64to32bitid(httpRequest.params.user) +'/heroes'

    console.log(url);
    request.get(url, function(error, steamHttpResponse, steamHttpBody) {
        // Once we get the body of the steamHttpResponse, send it to our client
        // as our own httpResponse
        httpResponse.setHeader('Content-Type', 'application/json');
        httpResponse.send(steamHttpBody);
    });
});




app.get('/steam/dota/matchhistory/:user', function(httpRequest, httpResponse) {

    var url = 'http://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?'+params + "&account_id=" + convert64to32bitid(httpRequest.params.user);
    request.get(url, function(error, steamHttpResponse, steamHttpBody) {
        // Once we get the body of the steamHttpResponse, send it to our client
        // as our own httpResponse
        httpResponse.setHeader('Content-Type', 'application/json');
        httpResponse.send(steamHttpBody);
    });
});

app.get('/steam/dota/matchhistory', function(httpRequest, httpResponse) {
    // Calculate the Steam API URL we want to use
    var url = 'http://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?'+params;
    request.get(url, function(error, steamHttpResponse, steamHttpBody) {
        // Once we get the body of the steamHttpResponse, send it to our client
        // as our own httpResponse
        httpResponse.setHeader('Content-Type', 'application/json');
        httpResponse.send(steamHttpBody);
    });
});

app.get('/steam/dota/herolist', function(httpRequest, httpResponse) {
    // Calculate the Steam API URL we want to use
    var url = 'http://api.steampowered.com/IEconDOTA2_570/GetHeroes/V1/?' +params;
    request.get(url, function(error, steamHttpResponse, steamHttpBody) {
        // Once we get the body of the steamHttpResponse, send it to our client
        // as our own httpResponse
        httpResponse.setHeader('Content-Type', 'application/json');
        httpResponse.send(steamHttpBody);
    });
});

app.use('/', express.static('public'));


var bodyParser = require('body-parser');

app.use(bodyParser.text());



//app.get('/hello/:name', function(httpRequest, httpResponse) {
//    var name = httpRequest.params.name;
//    httpResponse.send('Hello, ' + name + '!');
//});

//app.post('/frank-blog', function(httpRequest, httpResponse) {
//    console.log(httpRequest.body);
    // We need to respond to the request so the web browser knows
    // something happened.
    // If you've got nothing better to say, it's considered good practice to
    // return the original POST body.
//    httpResponse.status(200).send('Posted today:\n\n' + httpRequest.body);
//});


app.get("*", function(req, res){
    res.sendFile("./public/index.html");
});



var port = 4000;
var server = app.listen(port);
console.log('Listening on port ' + port);

