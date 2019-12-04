const fs = require('fs');
const edit = require('./cities_bearbeiten.js');
const util = require('util');

//zum löschen oder hinzufügen
let stadt1 = "berlin";
let stadt2 = {
    "name": "berlin",
    "einwohner": 3644826,
    "bundesland": "berlin"
};

//gibt promise zurück
var read = util.promisify(fs.readFile);


//.all erstellt ein Array
//dadurch laufen die readFile abfragen parallel und werden nicht hintereinander ausgeführt
Promise
    .all([
        read("cities.json"),
        read("users.json")
    ])
    .then(data => {
        const [cities, users] = data;

        let staedte = JSON.parse(cities);
        let user = JSON.parse(users);

        var together = '{ "user" : []}';
        together = JSON.parse(together);

        //edit.loeschen(staedte.cities,stadt1);

        for (let i = 0; i < staedte.cities.length; i++) {

            for(let j = 0; j< user.users.length; j++){

                if(staedte.cities[i].name == user.users[j].wohnort) {

                    together.user.push( {vorname: user.users[j].vorname,nachname: user.users[j].nachname,email: user.users[j].email,wohnort: user.users[j].wohnort,einwohner: staedte.cities[i].einwohner,bundesland: staedte.cities[i].bundesland} );

                    console.log("Vorname: " + user.users[j].vorname);
                    console.log("Nachname: " + user.users[j].nachname);
                    console.log("Email: " + user.users[j].email);
                    console.log("Wohnort: " + user.users[j].wohnort);
                    console.log("Einwohner: " + staedte.cities[i].einwohner);
                    console.log("Bundesland: " + staedte.cities[i].bundesland);
                    console.log("------------------------------------------");
                }
            }
        }

        together = JSON.stringify(together, null, 2);
        return together;

    })
    .then(data =>{

        fs.writeFile('zusammen.json', data, (err) => {
            if (err) throw err;

            console.log('Data written to file');
        });
    })
    .catch(err =>{ //Asynchrones Error-Handling mit Promises
    console.log("moin");
    console.log(err);
    });








