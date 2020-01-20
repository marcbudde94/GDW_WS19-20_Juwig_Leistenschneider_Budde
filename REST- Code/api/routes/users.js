const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
var request = require("request");


const User = require("../models/user");
const Lebensmittel = require("../models/lebensmittel");
const { ResourceNotFoundError, InternalError } = require('./errors.js');

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

router.get("/:userId", (req, res, next) => {
    const id = req.params.userId;
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

router.delete("/:userId", (req, res, next) => {
    const id = req.params.userId;
    User.remove({ _id: id })
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

router.get("/:userID/lebensmittel", (req, res, next) => {
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

router.post("/:userID/lebensmittel", (req, res, next) => {
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
                    .then(result => {

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

router.get("/:userId/lebensmittel/:lebensmittelID", (req, res, next) => {
    const id = req.params.lebensmittelId;
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

router.put("/:userId/lebensmittel/:lebensmittelID", (req, res, next) => {
    const id = req.params.lebensmitelID;
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

module.exports = router;