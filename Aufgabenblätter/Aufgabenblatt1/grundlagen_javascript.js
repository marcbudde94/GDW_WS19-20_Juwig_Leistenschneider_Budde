//Aufgabe1
var name = function(vorname, nachname){
    console.log(vorname + " " + nachname);
}

//name("Marc","Budde");


//Aufgabe 2/3/4/5
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//maximale Anzahl an Sternen für Bewertung
const max = 5
const min = 1;

//Anzahl an Bewertungen
var counter = 0;
//berechnet Durchschnittsbewertung
var gesBewertung = function(all, n){
    let summe = 0;
    let erg = 0;
    for (i = 0; i < n; i++) {
         summe = summe + all[i];
         erg = summe / n;
    }
    console.log("Durchschnittsbewertung: " + erg);

};

var zufallsBewertung = function () {
    return Math.round(Math.random() * (max - min)) + min;
};



var bewAktuell;

rl.question('Wie viele Bewertungen sollen ausgeführt werden?', function(n) {

        counter = counter + n;
        var alleBewertungen = new Array(n);

        let i = n;
        while(i > 0){

            //bewAktuell = berechneBewertung();
            bewAktuell = zufallsBewertung();
            alleBewertungen[i-1] = bewAktuell;
            i--;
        }

        for (i = 0; i < n; i++) {
            console.log(alleBewertungen[i]);
        }

        gesBewertung(alleBewertungen,counter);
});


// rl.question('Wie hoch ist ihre Bewertung?(0-5)', function(bewAktuell) {
// //     if(bewAktuell >=0 && bewAktuell <= max) {
// //         console.log(`Deine Bewertung ist: ${bewAktuell}`); // Hier geben wir die eingegebene answer aus
// //         rl.close();
// //         counter++;
// //         console.log(max, counter, parseInt(bewAktuell));
// //     }
// //     else{
// //         console.log("Deine Bewertung liegt nicht im möglichen Bereich!")
// //         rl.close();
// //     }
// // });






