const mandelbrot = require('./mandelbrot');

module.exports = function(real, imag, itt) {
  // Calculate whether a complex number is in the Mandelbrot set and return the result
  const result = mandelbrot(real, imag, itt);
  return result;
}
