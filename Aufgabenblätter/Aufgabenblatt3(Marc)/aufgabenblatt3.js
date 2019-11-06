const fs = require('fs');
const edit = require('./cities_bearbeiten.js');
const util = require('util');


let stadt1 = "berlin";
let stadt2 = {
    "name": "berlin",
    "einwohner": 3644826,
    "bundesland": "berlin"
};

var read = util.promisify(fs.readFile);

Promise
    .all([
        read("cities.json"),
        read("users.json")
    ])
    .then(data => {
        const [cities, users] = data;

        let staedte = JSON.parse(cities);
        let user = JSON.parse(users);

        //edit.loeschen(staedte.cities,stadt1);

        console.log(staedte);
        console.log(user);
        console.log(user.users[0].wohnort);

        let test = staedte.cities;

        let together = Object.assign( test, user.users);
         console.log(together);


        for (let i = 0; i < together.length; i++) {

                console.log("Vorname: " + together[i].vorname);
                console.log("Nachname: " + together[i].nachname);
                console.log("Email: " + together[i].email);
                console.log("Wohnort: " + together[i].wohnort);
                console.log("Einwohner: " + together[i].einwohner);
                console.log("Bundesland: " + together[i].bundesland);
                console.log("------------------------------------------");
        }

        staedte = JSON.stringify(staedte, null, 2);
        return staedte;

    })
    /*.then(data =>{
        fs.writeFile('cities.json', data, (err) => {
            if (err) throw err;

            console.log('Data written to file');
        });
    })*/
    .catch(err =>{
    console.log("moin");
    console.log(err);
    });








