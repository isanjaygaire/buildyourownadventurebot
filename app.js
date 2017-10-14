var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var twilio = require('twilio');

var oConnections = {};

// Define the port to run on
app.set('port', process.env.PORT || parseInt(process.argv.pop()) || 5100);

// Define the Document Root path
var sPath = path.join(__dirname, '.');

app.use(express.static(sPath));
app.use(bodyParser.urlencoded({ extended: true }));

function fPlay(req, res){
  var sFrom = req.body.From;
  var sAction = req.body.Body;
  var twiml = new twilio.twiml.MessagingResponse();
  if(sAction.toLowerCase().search("Maid") != -1){
    twiml.message("Here is another one.");
    oConnections[sFrom].fCurState = fDencrypt;
  }
  }else{
    twiml.message("Sorry, Its the maid because There are no corners in a circular mansion.")
  }
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
}

function fDencrypt(req, res){
  var sFrom = req.body.From;
  var sAction = req.body.Body;
  var twiml = new twilio.twiml.MessagingResponse();
  if(sAction.toLowerCase().search("bill") != -1){
    oConnections[sFrom].fCurState = fStickOrHydrant;
    twiml.message("A detective who was mere days from cracking an international smuggling ring has suddenly gone missing. While inspecting his last-known location, you find a note: 710 57735 34 5508 51 7718 <br> Currently there are 3 suspects: Bill, John, and Todd. Can you break the detective’s code and find the criminal’s name?");
  }else if(sAction.toLowerCase().search("take") != -1){
    twiml.message("Please play with me. Do you throw the stick?");
    oConnections[sFrom].fCurState = fPlay;
  }else{
    twiml.message("Wow! I've never done " + sAction + " before. Wait .... Over there is that a stick or a fire hydrant?")
    oConnections[sFrom].fCurState = fStickOrHydrant;
  }
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
}

function fStickOrHydrant(req, res){
  var sFrom = req.body.From;
  var sAction = req.body.Body;
  var twiml = new twilio.twiml.MessagingResponse();
  if(sAction.toLowerCase().search("stick") != -1){
    twiml.message("I love sticks.... Should I eat it or take it to my person so he will throw it?");
    oConnections[sFrom].fCurState = fStick;
  }else if(sAction.toLowerCase().search("hydrant") != -1){
    twiml.message("Pee mail! How exciting. Wait .... Over there is that a stick or a fire hydrant?");
  }else {
    twiml.message("Wow! I've never seen " + sAction + " before. Wait .... Over there is that a stick or a fire hydrant?")
  }
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
}

function fBeginning(req, res){
  var sFrom = req.body.From;
  oConnections[sFrom].fCurState = fStickOrHydrant;
  var twiml = new twilio.twiml.MessagingResponse();
  twiml.message('There is a man found dead in a circular mansion. The detective interviews the cook, maid, and babysitter. The cook said he couldn\'t have done it because he was preparing the meal. The maid said she couldn't have done it because she was dusting the corners. The babysitter said she couldn\'t because she was playing with the children. Who was lying?');
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());

}

//define a method for the twilio webhook
app.post('/sms', function(req, res) {
  var sFrom = req.body.From;
  if(!oConnections.hasOwnProperty(sFrom)){
    oConnections[sFrom] = {"fCurState":fBeginning};
  }
  oConnections[sFrom].fCurState(req, res);
});

// Listen for requests
var server = app.listen(app.get('port'), () =>{
  var port = server.address().port;
  console.log('Listening on localhost:' + port);
  console.log("Document Root is " + sPath);
});
