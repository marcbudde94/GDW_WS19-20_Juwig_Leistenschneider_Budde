const JSONReader = require ('./mymodule.js');
const readline = require('readline');
const eingabe = readline.createInterface({input: process.stdin, output: process.stdout});
var staedte;
var user;



JSONReader.readJSON('./cities.json', (err,result)=> {
    if (err) throw err
    try{
        let stadt = JSON.parse(result);
        console.log(stadt);
        eingabe.question( '1 = Stadt finden und loeschen, 2 = Stadt Hinzufuegen: ', function (antwort){

        if (antwort == 1){
            eingabe.question( 'Welche Stadt wollen Sie loeschen: ', function( antwhinz){
                eingabe.close();
                JSONReader.stadtFinden ( antwhinz, stadt );
            })
        }

        else if (antwort == 2) {
            console.log('hinzufuegen');
            eingabe.question( 'Name der Stadt: ', function( antwName) {
                eingabe.question( 'Bundesland: ', function( antwBundesland){
                    eingabe.question( 'Einwohnerzahl: ', function( antwEinw){
                        eingabe.close();
                        JSONReader.stadtHinzuf ( antwEinw, antwName, antwBundesland, stadt);
                    })
                })
            }) 
        }

        else {
            console.log('Falsche Eingabe');
            process.exit();
        }
        })
    } catch (error) {
        console.log(error);
        process.exit();
    }
})
const promise = new Promise((resolve, reject) => {
    resolve("good");
        JSONReader.readJSON("./cities.json", (err, result) => {
            if(err) {
                reject(err);
                }
            else {
                resolve(data);
               // staedte = JSON.parse(cities);
            }
        }),
        JSONReader.readJSON("./users.json", (err, result) => {
            if(err) {
                reject(err);
            }
            else {
            resolve(data);
           // user = JSON.parse(users);
            }

        })})
    .then(data => {
        const [cities, users] = data;

        let staedte = JSON.parse(cities);
        let user = JSON.parse(users);


        for (let i = 0; i < staedte.cities.length; i++) {

            for(let j = 0; j< user.users.length; j++){

                if(staedte.cities[i].name == user.users[j].wohnort) {

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


    })
    .catch(err =>{
        console.log("Fehler");
        console.log(err);
        process.exit();
    });

