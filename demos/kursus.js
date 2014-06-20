var db = require('../lib/jsonfs.js');

db.connect('db', ['kursus']);


// Rydde op: Hvis antal kurser > 0, skal slettes!!
var kurser = db.kursus.find();
if ( kurser.length > 0) {
	console.log("antal kurser fundet i db = %s",kurser.length );
	db.kursus.remove({});
};


// forventer kurser.length == 0
var kurser = db.kursus.find();
if ( kurser.length == 0) {
	// <database>.<collection>.save(obj)
		var kursusListen = [{
			nummer: 'SU0095',
		    titel : 'Node.js - Det samlede server-side web-udviklingsforløb (inkl. Raspberry Pi)',
		    antalDage : '3',
		    beskrivelse : 'Du lærer at bruge Node.js, et højperformance server-framework, som gør at al server-side webudvikling foregår med JavaScript.'
		},{
		    nummer:'SU0093',
		    titel : 'jQuery – Det samlede client web-udviklingsforløb ',
		    antalDage : '3',
		    beskrivelse : 'Man lærer at forstå og bruge jQuery, det centrale JavaScript framework på client-side mellem frontend-layout og JavaScript funktionalitet.'
		}
		]

	var k = db.kursus.save(kursusListen);
	console.log(k);
}

// run: node kursus.js