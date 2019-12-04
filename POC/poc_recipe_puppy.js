var request = require("request");

var options = { method: 'GET',
    url: 'http://www.recipepuppy.com/api/',
    qs: { i: 'apple,tomato', p: '1' },
    headers:
        {'cache-control': 'no-cache' } };

request(options, function (error, response, body) {
    if (error) throw new Error(error);

    let recipes = JSON.parse(body);
    console.log(recipes);

});
