const { response } = require('express');

exports.formulaire = function(request, response) {
    response.render('homepage.ejs');
}

exports.initialise = function(request, response) {
    let real = request.body.real;
    let imag = request.body.imag;
    let itt = request.body.itt;
    result = checkMandelbrot([parseFloat(real), parseFloat(imag)], parseInt(itt));
    response.json(result);
}

exports.mandelbrotShow = function(request, response) {
    response.render('mandelbrot.ejs');
}

function checkMandelbrot(z, n) {
    //Suite de Mandelbrot
    //(z^2 + c) dont module ne depasse pas 2
    //Avec z = a + bi
    //Et c = x + yi
    
    a = z;
    //Z0 = 0
    //Donc z1 = z0^2 + c = 0 +c
    //Donc z2 = z1^2 + c = c^2 + c
    //Donc z3 = z2^2 + c = c^4 + 2c^3 + c^2 + c 
    //.... ETC
    var i, a, module, b, c;
    for (i = 0; i < n; i++) {
        a = helper(a); //[(a^2 - b^2) + a, (2ab) + b]    
        b = Math.pow(a[0], 2)  //((a^2-b^2) + a)^2  
        c = Math.pow(a[1], 2)   //(2ab + b)^2
        module = Math.pow(b + c, 0.5) //sqrt(((a^2-b^2) + a)^2 + (2ab + b)^2)
        if (module > 2)
            return [false, i];
    }
    return [true, i];
    
    function square(a) {
        var rResult, iResult;
        rResult = a[0] * a[0] - a[1] * a[1]; //a^2 - b^2
        iResult = 2 * a[0] * a[1]; //2ab
        return [rResult, iResult];  //return [a^2 - b^2, 2ab]
    }

    // Compute z^2 + c
    function helper(a) {
        var raisedToPower, sum;
        raisedToPower = square(a); //[a^2 - b^2, 2ab]
        sum = [raisedToPower[0] + z[0], raisedToPower[1] + z[1]]; //[(a^2 - b^2) + a, (2ab) + b]
        return sum;
    }
}