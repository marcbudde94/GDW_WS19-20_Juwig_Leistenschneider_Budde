//Nr1,2
console.log("hallo Welt"); //gibt Hallo Welt aus

const maxbewertung=5; //maximale sterne an Bewertung
const minbewertung=0; //minimale sterne an Bewertung
var ctr_bewertungen=0; //aktuelle Anzahl an Bewertungen
var bewertung_aktuell=0; //Bewertung wird hier gespeichert

//bewertung="Top Zustand"; //Typwechseltest


console.log(`Maximale Bewertung =`,maxbewertung);
console.log(`Aktuelle Anzahl an Bewertungen =`,ctr_bewertungen);
console.log(`Aktuelle Bewertung =`, bewertung_aktuell+ `\n`);



//Nr3,4,5



const readline = require('readline');  //zum einlesen von der console
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


var zufallsBewertung = function () {   //zufallszahl zwischen 1 und 5 (max und min-bewertung)
    return Math.round(Math.random() * (maxbewertung - minbewertung)) + minbewertung;
};

var ges_bewertung= function (array,n) { //berechnet die Durchschnittsbewertung

    var gesamt=0;
    //  var x=5;
    // var y=6;

    for (var i=0; i<n; i++) {
        gesamt=gesamt+array[i];
    }

    // console.log(`aa:`,array[0]);
    //console.log(`bb:`,n);

    gesamt=gesamt/n;

    console.log(`\nDurchschnittsbewertung:`,gesamt);
    //x=x+y;
    // console.log(`x/y:`,x);

}

rl.question('Wieviele Bewertungen möchten sie vornehmen ?', function (n) {

    var alleBewertungen = new Array(n);


    for (var i=0; i<n; i++) {
        var zufallsbewertung = zufallsBewertung();
        //console.log(`Eingegebene Berwertung `+ i , `:`, zufallsbewertung); // Hier geben wir die eingegebene, oder zufällige answer aus

        if (zufallsbewertung > 5 || zufallsbewertung < 1) {
            console.log(`Fehler, Bitte geben sie nur Werte von 1-5 ein`);
            //console.log(`Aktuelle Bewertung =`, bewertung);
            i--;
        }
        else {
            alleBewertungen[i]=zufallsbewertung;
            //console.log(`Aktuelle Bewertung =`, bewertung);
            ctr_bewertungen++;
        }

    }

    bewertung_aktuell=alleBewertungen[n-1];

    console.log(`Anzahl an Bewertungen`,ctr_bewertungen);
    console.log(`Aktuelle Bewertungen`,bewertung_aktuell);


    console.log(`Alle Bewertung:\n`);

    for (var i=0; i<n; i++)
    {
        console.log(`Berwertung`,i+1, `:` ,alleBewertungen[i]);

    }

    ges_bewertung(alleBewertungen,n);

    rl.close();

});


/*setTimeout(function () { //Beispiel wie man eine Funktion warten lassen kann
    console.log(`Eingegebene Bewertung =`,bewertung);
    }, 4*1000); //4 Sek wartezeit */