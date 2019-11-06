const fs = require('fs');

var arrayausgeben = function (arr) {
    let i = 0;
    while(i<arr.length){
        console.log(arr[i]);
        i++;
    };
};

var loeschen = function(staedte,stadt){

    let i = 0;
    while(i<staedte.length){
        if(staedte[i].name == stadt){
            staedte.splice(i,1);
        }
        i++;
    };
};

var hinzufügen = function(staedte,stadt){
    staedte.splice(staedte.length,0,stadt);
};


module.exports = {
    loeschen,
    hinzufügen
};






