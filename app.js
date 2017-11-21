var express = require( 'express' );
var path = require( 'path' );
var app = express();
var bodyParser = require( 'body-parser' );
var twilio = require( 'twilio' );
var oConnections = {};
// Define the port to run on
app.set( 'port', process.env.PORT || parseInt( process.argv.pop() ) || 5100 );
// Define the Document Root path
var sPath = path.join( __dirname, '.' );
app.use( express.static( sPath ) );
app.use( bodyParser.urlencoded( {
	extended: true
} ) );

// 10
function fWhoMurdered( req, res ) {
	var sFrom = req.body.From;
	var sAction = req.body.Body;
	var twiml = new twilio.twiml.MessagingResponse();
	if ( sAction.toLowerCase().search( "Sister and Mom" ) != -1 ) {
		oConnections[sFrom].fCurState = fDecrypt;
}else {
	twiml.message("The sister and mom! there in a circle house no corners! and who cooks dinner at 2:00 am!.");
  oConnections[ sFrom ].fCurState = fBeginning;
}
res.writeHead( 200, {'Content-Type': 'text/xml'} );
res.end( twiml.toString() );
}
// 9
function fHunt( req, res ) {
	var sFrom = req.body.From;
	var sAction = req.body.Body;
	var twiml = new twilio.twiml.MessagingResponse();
	if ( sAction.toLowerCase().search( "Sister and Mom" ) != -1 ) {
		oConnections[sFrom].fCurState = f;
}else {
	twiml.message("It was Halloween night and they were dressed up as deer.");
  oConnections[ sFrom ].fCurState = fBeginning;
}
res.writeHead( 200, {'Content-Type': 'text/xml'} );
res.end( twiml.toString() );
}
// 8
function fHowManyWords( req, res ) {
	var sFrom = req.body.From;
	var sAction = req.body.Body;
	var twiml = new twilio.twiml.MessagingResponse();
	if ( sAction.toLowerCase().search( "14" ) != -1 ) {
    twiml.message("A girl and a boy were out one night. They were in the woods, and they saw 3 men hunting. Next day the girl and boy were found dead. Why is this?");
		oConnections[sFrom].fCurState = fHunt;
}else {
	twiml.message("14 'the special word'.");
  oConnections[ sFrom ].fCurState = fBeginning;
}
res.writeHead( 200, {'Content-Type': 'text/xml'} );
res.end( twiml.toString() );
}


// 7
function fMysteryPerson( req, res ) {
	var sFrom = req.body.From;
	var sAction = req.body.Body;
	var twiml = new twilio.twiml.MessagingResponse();
	if ( sAction.toLowerCase().search( "Pregnant" ) != -1 ) {
    twiml.message("one day there were two cops, they got a call saying there was some kind of mystery so they went to the house were the mystery was at, the lady there said she could not figure out how many letters the special word was, later the cops went home knowing that they had done a good job. How many letters was the special word?");
		oConnections[sFrom].fCurState = fHowManyWords;
}else {
	twiml.message("The wife was about to have a baby. They were driving to the hospital. The baby was born, and the wife didn't survive the birth.");
  oConnections[ sFrom ].fCurState = fBeginning;
}
res.writeHead( 200, {'Content-Type': 'text/xml'} );
res.end( twiml.toString() );
}

// 6
function fWhoMurdered( req, res ) {
	var sFrom = req.body.From;
	var sAction = req.body.Body;
	var twiml = new twilio.twiml.MessagingResponse();
	if ( sAction.toLowerCase().search( "Sister and Mom" ) != -1 ) {
		oConnections[sFrom].fCurState = fMysteryPerson;
    twiml.message("It was a dark stormy night and a couple were in a car racing madly through a foreign city. The car broke down and the husband had to go get help from someone who spoke his language. He was afraid to leave his wife alone in the car so he pulled up the windows and locked the car before leaving. When he came back, the car was in the same state as he had left it but his wife was dead, there was blood on the floor and there was a stranger in the car. What happened?");
}else {
	twiml.message("The sister and mom! there in a circle house no corners! and who cooks dinner at 2:00 am!.");
  oConnections[ sFrom ].fCurState = fBeginning;
}
res.writeHead( 200, {'Content-Type': 'text/xml'} );
res.end( twiml.toString() );
}
// 5
function fFather( req, res ) {
	var sFrom = req.body.From;
	var sAction = req.body.Body;
	var twiml = new twilio.twiml.MessagingResponse();
	if ( sAction.toLowerCase().search( "daughter" ) != -1 ) {
    twiml.message("A baby is murdered in a circle house at 2:00 am. The police question everyone and where they were the time at the babies murder. The dad said he was a work, the sister said she was reading in a corner, the mom was cooking dinner, and the son was playing video games in his bedroom. who Is the murder?");
		oConnections[sFrom].fCurState = fWhoMurdered;
}else {
	twiml.message("The child was their daughter.");
  oConnections[ sFrom ].fCurState = fBeginning;
}
res.writeHead( 200, {'Content-Type': 'text/xml'} );
res.end( twiml.toString() );
}
// 4
function fhow( req, res ) {
	var sFrom = req.body.From;
	var sAction = req.body.Body;
	var twiml = new twilio.twiml.MessagingResponse();
	if ( sAction.toLowerCase().search( "wife" ) != -1 ) {
    twiml.message("A father's child, a mother's child, yet no one's son.")
		oConnections[sFrom].fCurState = fFather;
}else {
	twiml.message("The wife because she was sleeping, how could she know that all of that happened?!");
  oConnections[ sFrom ].fCurState = fBeginning;
}
res.writeHead( 200, {'Content-Type': 'text/xml'} );
res.end( twiml.toString() );
}
// 3
function fDecrypt( req, res ) {
	var sFrom = req.body.From;
	var sAction = req.body.Body;
	var twiml = new twilio.twiml.MessagingResponse();
	if ( sAction.toLowerCase().search( "bob" ) != -1 ) {
    twiml.message("A man is found dead one Saturday morning. He was killed while his wife was sleeping. The wife tells the police all that she knows. She tells them that the cook was cooking breakfast, the maid was cleaning and the butler was getting the mail. The police immediately arrest the person who is responsible. Who is responsible and why?");
		oConnections[sFrom].fCurState = fhow;
}else {
	twiml.message( "Bill. If you read the message upside down, you’ll notice that the numbers resemble letters and that those letters form legible sentences. The message is \"Bill is boss. He sells oil.\"." );
  oConnections[ sFrom ].fCurState = fBeginning;
}
res.writeHead( 200, {
	'Content-Type': 'text/xml'
} );
res.end( twiml.toString() );
}
// 2
function fMurder( req, res ) {
	var sFrom = req.body.From;
	var sAction = req.body.Body;
	var twiml = new twilio.twiml.MessagingResponse();
	if ( sAction.toLowerCase().search( "maid" ) != -1 ) {
    twiml.message( "A detective who was mere days from cracking an international smuggling ring has suddenly gone missing. While inspecting his last-known location, you find a note: 710 57735 34 5508 51 7718 <br>Currently there are 3 suspects: Bill, John, and Todd. Can you break the detective’s code and find the criminal’s name?" );
    oConnections[ sFrom ].fCurState = fDecrypt;
} else {
  twiml.message( "Answer: The maid. There are no corners in a circular mansion." );
  oConnections[ sFrom ].fCurState = fBeginning;
}
res.writeHead( 200, {
	'Content-Type': 'text/xml'
} );
res.end( twiml.toString() );
}
// 1
function fPlay( req, res ) {
	var sFrom = req.body.From;
	var sAction = req.body.Body;
	var twiml = new twilio.twiml.MessagingResponse();
	if ( sAction.toLowerCase().search( "yes" ) != -1 ) {
		twiml.message( "There is a man found dead in a circular mansion. The detective interviews the cook, maid, and babysitter. The cook said he couldn\'t have done it because he was preparing the meal. The maid said she couldn't have done it because she was dusting the corners. The babysitter said she couldn't because she was playing with the children. Who was lying?" );
		oConnections[ sFrom ].fCurState = fMurder;
	} else {
		twiml.message("You have failed this city!" );
    oConnections[sFrom].fCurState = fBeginning;
	}
	res.writeHead( 200, {
		'Content-Type': 'text/xml'
	} );
	res.end( twiml.toString() );
}

function fBeginning( req, res ) {
	var sFrom = req.body.From;
	oConnections[ sFrom ].fCurState = fPlay;
	var twiml = new twilio.twiml.MessagingResponse();
	twiml.message( "Welcome, You are a detective. Your job is to solve the mysteries. Do you accept it?" );
	res.writeHead( 200, {'Content-Type': 'text/xml'} );
	res.end( twiml.toString() );
}
//define a method for the twilio webhook
app.post( '/sms', function( req, res ) {
	var sFrom = req.body.From;
	if ( !oConnections.hasOwnProperty( sFrom ) ) {
		oConnections[ sFrom ] = {
			"fCurState": fBeginning
		};
	}
	oConnections[ sFrom ].fCurState( req, res );
} );
// Listen for requests
var server = app.listen( app.get( 'port' ), () => {
	var port = server.address().port;
	console.log( 'Listening on localhost:' + port );
	console.log( "Document Root is " + sPath );
} );
