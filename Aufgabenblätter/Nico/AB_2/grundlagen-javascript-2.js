
//Funktion gibt Vorname und Nachname mit einer Leerstelle dazwischen aus
const name = function(vorname, nachname){
    console.log(vorname + " " + nachname);
}
//Funktionsaufruf von name
name("Nico", "Leistenschneider");


//Aufgabe 2
//Variablen zum Abspeichern der Ergebnisse
const maxBewertung = 5;
const minBewertung = 1;
var anzahlBewertungen = 0;
var letzteBewertung = 0;
//Variable zur Berechnung der gesamtBewertung, normalerweise mit Arrays
var bewertungenSumme = 0;
var gesamtBewertung = 0;
var nameDerBewertung = "";
//Array wo die bewertungen abgespeichert werden
var alleBewertungen = [];
var bewertungen = [];
var sum = 0;

//Modul zum Einlesen auf der Konsole
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


//Ausgabe der Variablen
const ausgabe = function(){

    console.log("Anzahl der Bewertungen: " + anzahlBewertungen);
    console.log("Letzte Bewertung: " + letzteBewertung);
    console.log("durchschnittliche Bewertung: " + gesamtBewertung);
    console.log("Name der Bewertung: " + nameDerBewertung);
    //Ausgabe des Arrays mit Name (length-3), letzte Bewertung (length -2) und Anzahl der Bewertungen (length -1)
    // console.log("Das hier ist mein Array. Array Stelle 0: " + bewertungen[bewertungen.length -3]
    //             + ", Stelle 1(letzteBewertung): " + bewertungen[bewertungen.length -2]
    //             + ", Stelle 2(anzahlBewertungen): " + bewertungen[bewertungen.length -1]
    //             + ", Länge meines Arrays: " + bewertungen.length);
    // console.log("Name der Bewertung: " + bewertungen[bewertungen.length -3]
    //     + ", letzte Bewertung: " + bewertungen[bewertungen.length -2]
    //     + ", anzahlBewertungen: " + bewertungen[bewertungen.length -1]
    //     + ", Länge meines Arrays: " + bewertungen.length);
    console.log("-------------------------------------------------------------------------------------------------------------")
}

//Berechnung der gesamtBewertung und anpassen der Variablen mit dem letzten Wert
const anpassen = function(letzterWert){

    letzteBewertung = letzterWert;
    bewertungenSumme += letzterWert;
    anzahlBewertungen++;
    gesamtBewertung = bewertungenSumme / anzahlBewertungen;
    nameDerBewertung = "BewertungNr" + anzahlBewertungen;
    //hier wird das Array jeweils mit dem Namen, der letzten Bewertung und der Anzahl der Bewertungen gefüllt
    bewertungen.push(nameDerBewertung, letzteBewertung, anzahlBewertungen);
    alleBewertungen.push(letzteBewertung);
}
//Zufallszahl zwischen 1 und 5 um eine Bewertung zu simulieren
//Dabei muss die letzteBewertung angepasst werden und die anzahlBewertungen um 1 steigen
const zufallsZahl = function(){

    return Math.round(Math.random() * (maxBewertung - minBewertung)) + minBewertung;
}

//Ausgabe der ersten Zufallsbewertung
anpassen(zufallsZahl());
ausgabe();

//Tests, ob man bei Variablen und auch Konstanten Typwechsel durchführen kann

//anzahlBewertungen = "Typwechsel";
//ausgabe();

//maxBewertung = 700;
//console.log("Test, ob man Konstanten ändern kann: " + maxBewertung);



//Aufgabe 3


//Eingabe auf der Konsole der Bewertung
const aufgabe3 = function(callback){

    rl.question('Welche Bewertung zwischen 1 und 5 möchten Sie abgeben ?', function (answer){
        //erst prüfen, ob die eingegebene Zahl auch eine Bewertung sein kann. Wenn nicht, Fehlermeldung und Ende des Programms
        if(answer<1 || answer > 5){
            console.log("Falsche Eingabe. Dieses Feld erdorfert eine Zahl zwischen 1 und 5");
        }
        else {
            anpassen(Number(answer));
            ausgabe();
            // Hier Aufruf der Aufgabe 4, damit diese erst startet, sobald Aufgabe 3 beendet ist. Sonst laufen beide Aufgaben gleichzeitig
            callback();
        }})}

//Aufgabe 4
//Bewertung n mal mit random Zahl

const aufgabe4 = function (callback){

    rl.question('Wieviele Bewertungen möchten sie vornehmen ?', function (n) {
        //For Schleife, um für jedes Mal eine Bewertung zu erstellen
        for(var i=0; i<n; i++) {
            var zufallsZahlen = zufallsZahl();
            anpassen(zufallsZahlen);
            ausgabe();
            rl.close();
        }
            callback();
    })};
const testAusgabe = function(){

    console.log("Ausgabe des Arrays: ");
    for(var i=0; i<alleBewertungen.length; i++){
        var nenner = 1;
        console.log(nenner + ".Angabe: " + alleBewertungen[i]);
        nenner++;
    }
}




//aufgabe4();

function Ratings(name, anzahlDerBewertungen, letzteBewertung){

    this.name = name;
    this.anzahlDerBewertungen = anzahlDerBewertungen;
    this.letzteBewertung = letzteBewertung;
    this.durchschnitt = () => {
        for (i = 0; i < alleBewertungen.length; i++) {
            sum += alleBewertungen[i];
        }
        return (sum / this.anzahlDerBewertungen);}
}


let rating1 = new Ratings("Lars", anzahlBewertungen, letzteBewertung);
console.log("Name der Bewertung: " + rating1.name);
const berechneDurchschnitt = function(){
    console.log("Durchschnitt: " + rating1.durchschnitt());
}

//Konstante Werte
const hello = "hello";
//Konkatenation von zwei Konstanten
const konk=function(){
    const world="world";
    const zusammen=hello + world;
    console.log("Hier habe ich zuerst Hello und dann World geschrieben: " + zusammen);
}

const konk2=function(){
    const world = "world";
    const zusammen2=world + hello;
    console.log("Hier habe ich zuerst World und dann Hello geschrieben: " + zusammen2);
}

//Ausführen des Codes
konk();
konk2();
aufgabe3(aufgabe4(berechneDurchschnitt));