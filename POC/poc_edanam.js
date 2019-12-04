var request = require("request");

var options = { method: 'GET',
    url: 'https://api.edamam.com/api/food-database/parser',
    qs:
        { app_id: '9a036e31',
            app_key: '34cc33028da034f70dfeaa37342b2063',
            'nutrition-type': 'logging',
            ingr: 'apple',
            category: 'Generic%20foods' },
    headers:
        {'cache-control': 'no-cache',
            'Content-Type': 'application/json' } };

request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
});
