var express = require('express');
var app = express();
var PORT = 8079;
require('events').EventEmitter.prototype._maxListeners = 100;
const fetch = require('node-fetch');


function postMethod(req){
  console.log("entered postmethod");
  const chunks = [];
  req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => {
      const data = Buffer.concat(chunks);
      var incomingData = JSON.parse(data);
      console.log(incomingData);
      jsonCall(incomingData);
  });
}

app.listen(process.env.PORT || PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})


app.post("/",function(req,response,err){
    if (req.method === 'POST') {
      console.log("post");
      try{
        postMethod(req);
        response.writeHead(200,{ "Content-type": "text/plain"}),
        response.write("received");
      }catch(err){
        response.writeHead(400,{ "Content-type": "text/plain"}),
        response.write("error");
      }
    }
})

async function  jsonCall(incomingData){
  let url = `https://cliq.zoho.com/api/v2/bots/dsmbot/incoming?zapikey=1001.8690e3b26a53b3f3a879853428de4d3f.d6f77b0e08b607fe39a18273b241ae82`
  // let url = `https://cliq.zoho.com/company/64396901/api/v2/channelsbyname/apitestingb/message?zapikey=1001.8690e3b26a53b3f3a879853428de4d3f.d6f77b0e08b607fe39a18273b241ae82`;
  fetch(`${url}`, {
    method: "POST",
    body: JSON.stringify(incomingData),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
  })
  console.log("finished");
}


