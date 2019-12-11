var request = require("request");

const { ResourceNotFoundError, InternalError } = require('./errors.js');

var options = { method: 'GET',
    url: 'https://api.edamam.com/api/food-database/parser',
    qs:
        { app_id: '9a036e31',
            app_key: '34cc33028da034f70dfeaa37342b2063',
            'nutrition-type': 'logging',
            ingr: 'aple',
            category: 'Generic%20foods' },
    headers:
        {'cache-control': 'no-cache',
            'Content-Type': 'application/json' } };


new Promise
((resolve,reject)=>{
    request(options, function (err, response, body) {
        if (err){
            reject(err);
        }
        else{
            let food = body;
            resolve(food);
        }
    });
})
    .then(food => {

        food = JSON.parse(food);

        console.log(food.parsed);
        console.log(food.parsed.length);


        if(food.parsed.length == 0){ // Falls es keine Ergebnisse zum Angegebenen Lebensmittel gibt wird Fehler geworfen
            throw err = new ResourceNotFoundError('ingredients', options.qs.ingr);
        }

    })
    .catch(err => {
        console.log(err);
    });

