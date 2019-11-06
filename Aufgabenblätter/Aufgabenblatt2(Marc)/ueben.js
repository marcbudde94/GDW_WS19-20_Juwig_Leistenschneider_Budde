
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//maximale Anzahl an Sternen für Bewertung
const max = 5
const min = 1;

//berechnet Durchschnittsbewertung
var gesBewertung = function(all, n){
    let summe = 0;
    let erg = 0;
    for (i = 0; i < n; i++) {
         summe = summe + all[i];
         erg = summe / n;
    }
    return erg;
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


let durchläufe = function (callback) {
    rl.question("Wie viele Bewertungsdurchgänge möchten sie machen?", (n) => {
        console.log(n);

        callback(n);
    })
};

var counter=0; // zählt wie oft rl.question ausgeführt wurde

var recursiveAsyncReadLine = function (x) {



        rl.question('Wie viele Bewertungen sollen berechnet werden? ', function (n) {

                counter++; // counter wird hochgezählt, da readline ausgeführt wurde
                n = Number(n); //integer cast

                if (Number.isInteger(n)) { //abfrage ob Eingabe eine Zahl war

                var alleBewertungen = new Array(n);// Array das alle Bewertungen Speichert

                let i = n;
                while (i > 0) { //schleife füllt das Array mit zufallsbewerungen
                    let bewAktuell = zufallsBewertung();
                    alleBewertungen[i - 1] = bewAktuell;
                    i--;
                }

                for (i = 0; i < n; i++) { //gibt alle Werte des Arrays aus
                    console.log(alleBewertungen[i]);
                }

                //vergleicht den Counter mit der Anzahl an Bewertungsdurchgängen die ausgeführt werden soll
                //falls der Counter counter kleiner ist wird die Methode rekusiv aufgerufen
                //so lange bis die Anzahl an Bewertungsdurchgängen erreicht wurde
                if(counter<x)
                {
                    recursiveAsyncReadLine(x); //Calling this function again to ask new question
                }
                else {
                    return rl.close();
                }

                //let rating1 = new Rating("rating1", x, alleBewertungen(n-1))

            }
            else {
                console.log("falsche Eingabe!")
            }
        });
    };



durchläufe(recursiveAsyncReadLine);









