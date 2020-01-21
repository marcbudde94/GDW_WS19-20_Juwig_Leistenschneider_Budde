var request = require("request");

const { ResourceNotFoundError, InternalError } = require('./errors.js');


var text = '{ "lebensmittel" : [' +
    '{ "lebensmittelID":1 , "name": "apple", "istAbzugeben": false}, {"lebensmittelID":2 , "name": "banana", "istAbzugeben": false}]}';

var obj = JSON.parse(text);
var names = [];

for (let i=0; i<obj.lebensmittel.length; i++) {
    names.push(obj.lebensmittel[i].name);
}
//var foodname = obj.lebensmittel[0].name;

console.log(obj);

for (let i=0; i<obj.lebensmittel.length; i++) {


    var options = {
        method: 'GET',
        url: 'https://api.edamam.com/api/food-database/parser',
        qs:
            {
                app_id: '9a036e31',
                app_key: '34cc33028da034f70dfeaa37342b2063',
                'nutrition-type': 'logging',
                ingr: names[i],
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

            //console.log(food);
            food = JSON.parse(food);

            if (food.parsed.length == 0) { // Falls es keine Ergebnisse zum Angegebenen Lebensmittel gibt wird Fehler geworfen
                throw err = new ResourceNotFoundError('Lebensmittel', options.qs.ingr);
            }

            obj.lebensmittel[i].protein = food.parsed[0].food.nutrients.PROCNT;
            obj.lebensmittel[i].fett = food.parsed[0].food.nutrients.FAT;
            obj.lebensmittel[i].kohlenhydrate = food.parsed[0].food.nutrients.CHOCDF;
            obj.lebensmittel[i].kcal = food.parsed[0].food.nutrients.ENERC_KCAL;

            console.log(obj);
        })
        .catch(err => {
            console.log(err);
        });

}