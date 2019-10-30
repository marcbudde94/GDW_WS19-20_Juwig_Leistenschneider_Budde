//Aufgabe 1
//Funktion gibt Vorname und Nachname mit einer Leerstelle dazwischen aus
let name = function(vorname, nachname){
    console.log(vorname + " " + nachname);
}

//Aufgabe 2
//Variablen zum Abspeichern der Ergebnisse
const maxBewertung = 5;
const minBewertung = 1;
var anzahlBewertungen = 0;
var letzteBewertung = 0;
//Variablen zur Berechnung der gesamtBewertung, normalerweise mit Arrays
var bewertungenSumme = 0;
var gesamtBewertung = 0;

//Modul zum Einlesen auf der Konsole
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//Ausgabe der Variablen
var ausgabe = function(){

    console.log("Anzahl der Bewertungen: " + anzahlBewertungen);
    console.log("Letzte Bewertung: " + letzteBewertung);
    console.log("durchschnittliche Bewertung: " + gesamtBewertung);
}

//Berechnung der gesamtBewertung und anpassen der Variablen mit dem letzten Wert
var anpassen = function(letzterWert){

    letzteBewertung = letzterWert;
    bewertungenSumme += letzterWert;
    anzahlBewertungen++;
    gesamtBewertung = bewertungenSumme / anzahlBewertungen;
}

//Zufallszahl zwischen 1 und 5 um eine Bewertung zu simulieren
//Dabei muss die letzteBewertung angepasst werden und die anzahlBewertungen um 1 steigen
var zufallsZahl = function(){

    return Math.round(Math.random() * (maxBewertung - minBewertung)) + minBewertung;
}

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
const aufgabe4 = function (){

    rl.question('Wieviele Bewertungen möchten sie vornehmen ?', function (n) {
        //For Schleife, um für jedes Mal eine Bewertung zu erstellen
        for(var i=0; i<n; i++) {
            var zufallsZahlen = zufallsZahl();
            anpassen(zufallsZahlen);
            ausgabe();
            rl.close();
        }})};

//Aufgabe 1
//Funktionsaufruf von name
name("Nico", "Leistenschneider");

//Aufgabe2
//Ausgabe der ersten Zufallsbewertung
anpassen(zufallsZahl());
ausgabe();

//Tests, ob man bei Variablen und auch Konstanten Typwechsel durchführen kann

//anzahlBewertungen = "Typwechsel";
//ausgabe();

//maxBewertung = 700;
//console.log("Test, ob man Konstanten ändern kann: " + maxBewertung);

aufgabe3(aufgabe4);

