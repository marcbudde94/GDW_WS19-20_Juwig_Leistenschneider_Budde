
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//maximale Anzahl an Sternen für Bewertung
const max = 5
const min = 1;

//Anzahl an Bewertungen
var counter;
//berechnet Durchschnittsbewertung
var gesBewertung = function(all, n){
    let summe = 0;
    let erg = 0;
    for (i = 0; i < n; i++) {
         summe = summe + all[i];
         erg = summe / n;
    }
    return erg;

    console.log("Durchschnittsbewertung: " + erg);

};

var zufallsBewertung = function () {
    return Math.round(Math.random() * (max - min)) + min;
};

//Aufgabe2

function Rating( name, anzahl, last, durchschnitt) {
    this.name = name;
    this.anzahl = anzahl;
    this.last = last;
    this.durchschnitt = durchschnitt;
};

rl.question('Wie viele Bewertungen sollen ausgeführt werden?', function (n) {

    n = Number(n);
    if (Number.isInteger(n)) {
            var alleBewertungen = new Array(n);

            let i = n;
            while (i > 0) {
                //bewAktuell = berechneBewertung();
                var bewAktuell;
                bewAktuell = zufallsBewertung();
                alleBewertungen[i - 1] = bewAktuell;
                i--;
            }

            for (i = 0; i < n; i++) {
                console.log(alleBewertungen[i]);
            }

            let rating = new Rating("rating1", n, alleBewertungen[n], function(all, n) {
                let summe = 0;
                let erg = 0;
                for (i = 0; i < n; i++) {
                    summe = summe + all[i];
                    erg = summe / n;
                }
                return erg;
            });
            gesBewertung(alleBewertungen, counter);
        }
        else {
            console.log("falsche Eingabe!")
        }
    });







