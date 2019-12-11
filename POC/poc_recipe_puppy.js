var request = require("request");

const { ResourceNotFoundError, InternalError } = require('./errors.js');

var options = { method: 'GET',
    url: 'http://www.recipepuppy.com/api/',
    qs: { i: 'apple', p: '1' },
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
                let recipe = JSON.parse(body);
                resolve(recipe);
            }
        });
    })
    .then(recipe => {
        console.log(recipe);

        //console.log(recipe.results.length);
        //console.log(options.qs.i)

        if(recipe.results.length == 0){ // Falls es keine Ergebnisse zum Angegebenen Lebensmittel gibt wird Fehler geworfen
            throw err = new ResourceNotFoundError('ingredients', options.qs.i);
        }
    })
    .catch(err => {
        console.log(err);
    });



