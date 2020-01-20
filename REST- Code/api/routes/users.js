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
    //Lebensmittel.find({ userID: ID })
    //falls man alle Lebensmittel sehen will, diese Zeile rein nehmen, dafür obere auskommentieren
    Lebensmittel.find()
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
                ingr: req.body.name,
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
        request(options, function (err, response, body) {
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

            protein = food.parsed[0].food.nutrients.PROCNT;
            fett = food.parsed[0].food.nutrients.FAT;
            kohlenhydrate = food.parsed[0].food.nutrients.CHOCDF;
            kcal = food.parsed[0].food.nutrients.ENERC_KCAL;

        })
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



module.exports = router;