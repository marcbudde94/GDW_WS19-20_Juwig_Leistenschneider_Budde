const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const request = require("request");


const User = require("../models/user");
const Lebensmittel = require("../models/lebensmittel");
const { ResourceNotFoundError, InternalError } = require('./errors.js');

//Erhalte alle User
router.get("/", (req, res, next) => {
    User.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

//erstelle einen User
router.post("/", (req, res, next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        firstName: req.body.firstName,
        street: req.body.street,
        plz: req.body.plz,
        ort: req.body.ort
    });
    user
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Handling POST requests to /users",
                createdUser: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

//Erhalte bestimmten User
router.get("/:userID", (req, res, next) => {
    const id = req.params.userID;
    User.findById(id)
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res
                    .status(404)
                    .json({ message: "No valid entry found for provided ID" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

//Aktualisiere bestimmtem User
//Zum Testen: [{"propName": <Attributname>, "value": <neuer Attributwert>}]
router.put("/:userId", (req, res, next) => {
    const id = req.params.userId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    User.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

//Lösche bestimmten User
router.delete("/:userId", (req, res, next) => {
    const id = req.params.userId;
    Lebensmittel.remove({userID : id})
        .exec()
        .then(result => {
            User.remove({_id: id})
                .exec()
                .then(result => {
                    res.status(200).json(result);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


//Erhalte die Lebensmittelliste des Users
router.get("/:userID/lebensmittel", (req, res, next) => {
    const ID = req.params.userID;
    Lebensmittel.find({ userID: ID })
    //falls man alle Lebensmittel sehen will, diese Zeile rein nehmen, dafür obere auskommentieren
    //Lebensmittel.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

//erstellt ein Lebensmittel
router.post('/:userID/lebensmittel', (req, res, next) => {
    const userID = req.params.userID;
    var protein;
    var kcal;
    var kohlenhydrate;
    var fett;
    var options = {
        method: 'GET',
        url: 'https://api.edamam.com/api/food-database/parser',
        qs:
            {
                app_id: '9a036e31',
                app_key: '34cc33028da034f70dfeaa37342b2063',
                'nutrition-type': 'logging',
                ingr: req.body.name, //der Name des Lebensmittels welcher im Body eingetragen wurde
                category: 'Generic%20foods'
            },
        headers:
            {
                'cache-control': 'no-cache',
                'Content-Type': 'application/json'
            }
    };


    new Promise
    ((resolve, reject) => {
        request(options, function (err, response, body) { //GET request auf externen Webservice
            if (err) {
                reject(err);
            }
            else {
                let food = body;
                resolve(food);
            }
        });
    })
        .then(food => {
            food = JSON.parse(food);
            if (food.parsed.length == 0) { // Falls es keine Ergebnisse zum Angegebenen Lebensmittel gibt wird Fehler geworfen
                throw err = new ResourceNotFoundError('Lebensmittel', options.qs.ingr);
            }
            //hier werden den oben angelegten variablen die Werte aus der Datenbank zugewiesen
            protein = food.parsed[0].food.nutrients.PROCNT;
            fett = food.parsed[0].food.nutrients.FAT;
            kohlenhydrate = food.parsed[0].food.nutrients.CHOCDF;
            kcal = food.parsed[0].food.nutrients.ENERC_KCAL;

        })
        //hier wird das neue Lebensmittel angelegt und mit werten gefüllt
        .then(food =>{
            const lebensmittel = new Lebensmittel({
                _id: new mongoose.Types.ObjectId(),
                userID: userID,
                name: req.body.name,
                istAbzugeben: req.body.istAbzugeben,
                reserviertVon: req.body.reserviertVon,
                protein: protein,
                fett: fett,
                kohlenhydrate: kohlenhydrate,
                kcal: kcal
            });
            lebensmittel
                .save()
                .then(result => {
                    console.log(result);
                    res.status(201).json({
                        message: "Handling POST requests to /user/userID/lebensmittel",
                        createdLebensmittel: result
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

});

//Erhalte bestimmtes Lebensmittel
router.get("/:userId/lebensmittel/:lebensmittelID", (req, res, next) => {
    const id = req.params.lebensmittelID;
    Lebensmittel.findById(id)
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res
                    .status(404)
                    .json({ message: "No valid entry found for provided ID" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

//Aktualisiere bestimmtem User
//Zum Testen: [{"propName": <Attributname>, "value": <neuer Attributwert>}]
router.put("/:userId/lebensmittel/:lebensmittelId", (req, res, next) => {
    const id = req.params.lebensmittelId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Lebensmittel.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


//Lösche bestimmtes Lebensmittel
router.delete("/:userId/lebensmittel/:lebensmittelID", (req, res, next) => {
    const id = req.params.lebensmittelID;
    Lebensmittel.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

//Lösche alle Lebensmittel eines Users
router.delete('/:userID/lebensmittel', (req, res, next) => {
    const userID = req.params.userID;
    Lebensmittel.remove({userID : userID})
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

//Lösche alle User
router.delete("/", (req, res, next) => {
    User.remove()
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


router.get("/:userID/resultierendeGerichte", (req, res, next) => {

    const userID = req.params.userID;

    //Abfrage unserer Lebensmittel eines Users
    var options = {
        'method': 'GET',
        'url': 'https://food-sharing-app.herokuapp.com/users/' + userID + '/lebensmittel',
        'headers': {
            'Content-Type': 'application/json'
        }
    };
    new Promise
    ((resolve, reject) => {
        request(options, function (error, response) {
            if (error) {
                reject(error);
            }
            else {
                // Antwort wird zu JSON formatiert
                var eigeneLebensmittel =JSON.parse(response.body);
                resolve(eigeneLebensmittel);
                console.log(eigeneLebensmittel);
            }
        });
    })
        //Übergabe unserer Lebensmittel
        .then(eigeneLebensmittel => {

            //Array, wo unsere Lebensmittel Namen einzeln abgespeichert werden
            var foodnames = [];
            for(let i=0; i<eigeneLebensmittel.length; i++){
                foodnames.push(eigeneLebensmittel[i].name);
            }
            //test, wie unser Lebensmittelnamen Array aussieht
            console.log('Unsere Lebensmittel: ' + foodnames);


            //Abfrage der Gerichte aus der API mit unseren Lebensmittelnamen
            var options = { method: 'GET',
                url: 'http://www.recipepuppy.com/api/?i=' + foodnames,
                //qs: { i: foodnames, p: '1' },
                headers:
                    {'cache-control': 'no-cache' }
            };

            new Promise
            ((resolve,reject)=>{
                request(options, function (err, response, body) {
                    if (err){
                        reject(err);
                    }
                    else{
                        // Antwort wird zu JSON formatiert
                        let recipe = JSON.parse(body);
                        resolve(recipe);
                       // console.log(recipe);
                    }
                });
            })
                .then(recipe => {
                    var gerichtKohlenhydrate =0;
                    var gerichtKcal=0;
                    var gerichtFett=0;
                    var gerichtProtein=0;
                    // Falls es keine Ergebnisse zum angegebenen Lebensmitteln gibt wird Fehler geworfen
                    if(recipe.results.length == 0){
                        throw err = new ResourceNotFoundError('ingredients', options.qs.i);
                    }
                    //Array, mit den Zutaten der Gerichte mit Kommas und Leerstellen
                    var ingredientsRaw = [];
                    //Variable, um Zutaten zu einem String zu packen
                    var ingredientsString;

                    var antwortArray = [];
                    for (let i=0; i<recipe.results.length; i++){
                        ingredientsRaw.push(recipe.results[i].ingredients);
                        //console.log(ingredients12);
                        ingredientsString=ingredientsRaw.toString();
                        ingredientsString=ingredientsString.replace(/\s/g,'');
                        var ingredientsArr = ingredientsString.split(',');

                        //Counter, ob alle Variablen übereinstimmen
                        //Doppelte For-Schleife, um zu überprüfen, ob unsere Lebensmittel mit den Zutaten übereinstimmen
                        var count=0;
                        for (let k=0; k<ingredientsArr.length; k++){
                            for (let j=0; j<foodnames.length; j++){

                                if(ingredientsArr[k] === foodnames[j]) {
                                    count++;
                                    //Berechnung aller Nährwerte für das Gericht
                                    gerichtFett= gerichtFett + eigeneLebensmittel[j].fett;
                                    gerichtKcal= gerichtKcal + eigeneLebensmittel[j].kcal;
                                    gerichtKohlenhydrate= gerichtKohlenhydrate + eigeneLebensmittel[j].kohlenhydrate;
                                    gerichtProtein= gerichtProtein + eigeneLebensmittel[j].protein;

                                }}}
                         //Wenn Count so groß ist wie die Länge der Zutaten(alle Zutaten sind vorhanden), dann Ergebnis ausgeben
                         if(count===ingredientsArr.length){

                            //console.log('Gericht: ' + recipe.results[i].title);
                            //console.log('Zutaten: ' + recipe.results[i].ingredients);
                            //console.log('GerichtFett: ' + Number((gerichtFett).toFixed(2)));
                            //console.log('GerichtKohlenhydrate: ' + Number((gerichtKohlenhydrate).toFixed(2)));
                            //console.log('GerichtProtein: ' + Number((gerichtProtein).toFixed(2)));
                            //console.log('GerichtKcal: ' + Number((gerichtKcal).toFixed(2)));

                            /*antwortArray.push("Gericht: " + recipe.results[i].title);
                            antwortArray.push("Zutaten: " + recipe.results[i].ingredients);
                            antwortArray.push("Fett: " + Number((gerichtFett).toFixed(2)));
                            antwortArray.push("Kohlenhydrate: " + Number((gerichtKohlenhydrate).toFixed(2)));
                            antwortArray.push("Protein: " + Number((gerichtProtein).toFixed(2)));
                            antwortArray.push("Kcal: " + Number((gerichtKcal).toFixed(2)));*/

                            antwortArray.push({ 'Test': recipe.results[i].title,
                                                'Zutaten' : recipe.results[i].ingredients,
                                                'GerichtFett': Number((gerichtFett).toFixed(2)),
                                                'GerichtKohlenhydrate': Number((gerichtKohlenhydrate).toFixed(2)),
                                                'GerichtProtein': Number((gerichtProtein).toFixed(2)),
                                                'GerichtKcal': Number((gerichtKcal).toFixed(2))
                            })
                         }
                        //leert ingredients array
                        ingredientsRaw.pop();
                        //Nährwerte wieder null setzen für das nächste Gericht
                        gerichtFett=0;
                        gerichtKcal=0;
                        gerichtProtein=0;
                        gerichtKohlenhydrate=0;
                        count=0;
                    }
                    if(antwortArray.length > 0){
                        console.log(antwortArray);
                        res.status(200).json({
                            message: antwortArray
                        })
                    }
                    else{
                        console.log("Keine Gerichte gefunden");
                        res.status(500).json({
                            error: "Keine Gerichte gefunden"
                        })
                    }


                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        //error: error
                    });
                });

        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            });
        });
});


module.exports = router;