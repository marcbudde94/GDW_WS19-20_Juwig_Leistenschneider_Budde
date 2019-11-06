const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//maximale udn minimale Anzahl an Sternen für Bewertung
const max = 5
const min = 1;


//Berechnet Zufallsbewertung
var zufallsBewertung = function () {
    return Math.round(Math.random() * (max - min)) + min;
};

//Aufgabe2
//Rating-Object
function Rating( name, anzahl, last, all) {
    this.name = name;
    this.anzahl = anzahl;
    this.last = last;
    this.all = all;
    //Aufgabe3
    this.durchschnitt = () => { //Aufgabe 4 arrow
                            let summe = 0;
                            let erg = 0;
                                for (let i = 0; i < this.anzahl; i++) {
                                    summe = summe + this.all[i];
                                    erg = summe / this.anzahl;
                                }
                            return erg;
                            };
};


let erstelleRating = () => rl.question('Wie viele Bewertungen sollen ausgeführt werden?', function (n) {

    n = Number(n);
    if (Number.isInteger(n)) {

            //array wird erstellt
            var alleBewertungen = new Array(n);

            let i = n;
            //array wird befüllt
            while (i > 0) {
                //bewAktuell = berechneBewertung();
                var bewAktuell;
                bewAktuell = zufallsBewertung();
                alleBewertungen[i - 1] = bewAktuell;
                i--;
            }

            //Aufgabe1
            let rating = ['rating1', n, alleBewertungen[alleBewertungen.length-1]];
            console.log("Anzahl Bewertungen: " + rating[1]);
            console.log("Letzte Bewertung: " + rating[2]);

            //für folgende Aufgaben
            let rating1 = new Rating("rating1",n,alleBewertungen[alleBewertungen.length-1],alleBewertungen);

            console.log(rating1);
            console.log("durchschnitt: " + rating1.durchschnitt());

            return rating1;
            rl.close();
        }

        else {
            console.log("falsche Eingabe!")
        }
});


let rating1 = erstelleRating();

//zu Aufgabe 2
//man könnte mehrere Ratings speichern indem man ein Rating nur mit dem Namen erstellt,
// dieses Rating dann an die obere Methode übergibt und die weiteren Attribute eintragen lässt
// und am Ende alles zurückgibt
//,außerdem würde es die Möglichkeit geben bevor man ein Rating erstellt
// abzufragen wie viele Ratings man erstellen möchte
// und die Funktion erstelleRating so lange rekursiv aufzurufen bis die Gewüschte Anzahl an Ratings erreicht wurde



//Aufgabe 5

const hello = "hello";

function helloworld (){
    const world = hello + " World";
    console.log(world);
};

function worldhello (){
    const world = "World " + hello;
    console.log(world);
};

//helloworld();
//worldhello();


















