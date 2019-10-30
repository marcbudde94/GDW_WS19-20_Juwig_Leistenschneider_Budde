
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


let durchläufe = function (anzahlbewertungen) {
    rl.question("Wie viele Bewertungsdurchgänge möchten sie machen?", (n) => {
        console.log(n);

        anzahlbewertungen(n);
    })
};



    var recursiveAsyncReadLine = function (x) {

        var counter=0;

        rl.question('Wie viele Bewertungen sollen berechnet werden? ', function (n) {
                n = Number(n);
            if (Number.isInteger(n)) {

                var alleBewertungen = new Array(n);

                let i = n;
                while (i > 0) {
                    let bewAktuell = zufallsBewertung();
                    alleBewertungen[i - 1] = bewAktuell;
                    i--;
                }

                for (i = 0; i < n; i++) {
                    console.log(alleBewertungen[i]);
                }

                gesBewertung(alleBewertungen, n);
                counter++;
                if(counter<x)
                {
                    recursiveAsyncReadLine(); //Calling this function again to ask new question
                }
                else {
                    return rl.close();
                }

            }
            else {
                console.log("falsche Eingabe!")
            }
        });
    };



durchläufe(recursiveAsyncReadLine);









