const { response } = require('express');

exports.formulaire = function(request, response) {
    response.render('homepage.ejs');
}

exports.initialise = function(request, response) {
    let real = request.body.real;
    let imag = request.body.imag;
    let itt = request.body.itt;
    result = inMandelbrot([parseFloat(real), parseFloat(imag)], parseInt(itt));
    response.json(result);
}

exports.mandelbrotShow = function(request, response) {
    response.render('mandelbrot.ejs');
}

function inMandelbrot(z, n) {
    var i, a, phi, b, c;
    a = z;
    for (i = 0; i < n; i++) {
        a = helper(a);    
        b = Math.pow(a[0], 2)   
        c = Math.pow(a[1], 2)   
        phi = Math.pow(b + c, 0.5)
        if (phi > 2)
            return [false, i];
    }
    return [true, i];

    // Compute z^2 + c
    function helper(a) {
        var raisedToPower, sum;
        raisedToPower = square(a);
        sum = [raisedToPower[0] + z[0], raisedToPower[1] + z[1]];
        return sum;
    }
}

function square(z) {
    var rResult, iResult;
    rResult = z[0] * z[0] - z[1] * z[1];
    iResult = 2 * z[0] * z[1];
    return [rResult, iResult];
}