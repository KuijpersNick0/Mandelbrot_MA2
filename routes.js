let express = require('express');
let router = express.Router();
var bodyParser = require('body-parser');
var cors = require('cors');

//Enable CORS
router.use(cors());
//Parse application/JSON
router.use(bodyParser.json());
//Parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({extended: true}));

let mandelbrotController = require('./controllers/mandelbrotController');

//Liste des routes vers controlleurs
router.get('/', mandelbrotController.formulaire);
router.post('/mandelbrot.json', mandelbrotController.initialise);
router.get('/mandelbrot', mandelbrotController.mandelbrotShow);
router.get("*", function(req,res){
    res.status(404)
    res.send("<h1> ERROR : 404 PAGE NOT FOUND </h1>")
})

module.exports = router;