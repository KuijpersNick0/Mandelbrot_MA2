const http = require('http');
const express = require('express');
const route = require('./route');

const app = express();
const server = http.createServer(app);
var bodyParser = require('body-parser');
var cors = require('cors');

//Enable CORS
app.use(cors());
//Parse application/JSON
app.use(bodyParser.json());
//Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// Set up the API route
app.get('/', route);
app.post('/api/calculate', route);
app.get('/mandelbrot', route);

app.listen(3002);
app.listen(3003);
app.listen(3004);



server.listen(80, () => {
  console.log('Server listening on port 80');
});


