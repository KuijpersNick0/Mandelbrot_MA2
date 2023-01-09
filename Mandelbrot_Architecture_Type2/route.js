const worker = require('./worker');

module.exports = function(req, res) {
    // Calculate whether the complex number is in the Mandelbrot set and return the result
    if (req.url === '/api/calculate'){
        const result = worker(req.body.real, req.body.imag, req.body.itt);
        res.send(result);
    }
    if (req.url === '/'){
        res.render('homepage.ejs');
    }

    if(req.url === '/mandelbrot'){
        res.render('mandelbrot.ejs');
    }
}
