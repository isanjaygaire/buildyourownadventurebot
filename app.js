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
function fhow( req, res ) {
	var sFrom = req.body.From;
	var sAction = req.body.Body;
	var twiml = new twilio.twiml.MessagingResponse();
	if ( sAction.toLowerCase().search( "wife" ) != -1 ) {
		oConnections[sFrom].fCurState = fDecrypt;
}else {
	twiml.message("The wife because she was sleeping, how could she know that all of that happened?!");
}
res.writeHead( 200, {'Content-Type': 'text/xml'} );
res.end( twiml.toString() );
}

function fDecrypt( req, res ) {
	var sFrom = req.body.From;
	var sAction = req.body.Body;
	var twiml = new twilio.twiml.MessagingResponse();
	if ( sAction.toLowerCase().search( "bob" ) != -1 ) {
    twiml.message("A man is found dead one Saturday morning. He was killed while his wife was sleeping. The wife tells the police all that she knows. She tells them that the cook was cooking breakfast, the maid was cleaning and the butler was getting the mail. The police immediately arrest the person who is responsible. Who is responsible and why?");
		oConnections[sFrom].fCurState = fhow;
}else {
	twiml.message( "Bill. If you read the message upside down, you’ll notice that the numbers resemble letters and that those letters form legible sentences. The message is \"Bill is boss. He sells oil.\"." );
}
res.writeHead( 200, {
	'Content-Type': 'text/xml'
} );
res.end( twiml.toString() );
}

function fMurder( req, res ) {
	var sFrom = req.body.From;
	var sAction = req.body.Body;
	var twiml = new twilio.twiml.MessagingResponse();
	if ( sAction.toLowerCase().search( "maid" ) != -1 ) {
    twiml.message( "Answer: The maid. There are no corners in a circular mansion." );
} else {
  oConnections[ sFrom ].fCurState = fDecrypt;
  twiml.message( "A detective who was mere days from cracking an international smuggling ring has suddenly gone missing. While inspecting his last-known location, you find a note: 710 57735 34 5508 51 7718 <br>Currently there are 3 suspects: Bill, John, and Todd. Can you break the detective’s code and find the criminal’s name?" );
}
res.writeHead( 200, {
	'Content-Type': 'text/xml'
} );
res.end( twiml.toString() );
}

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
	twiml.message( "Welcome, You are a detective. Your job is to solve the mystries. Do you accept it?" );
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
