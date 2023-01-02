const express = require('express');
const cluster = require('cluster');

// Check the number of available CPU.
const numCPUs = require('os').cpus().length;

const app = express();
app.use(express.urlencoded({extended:true}));
const PORT = 3001;

let routes = require('./routes');
app.use('/', routes);

//pour css-images-js
app.use(express.static('public'));

// Master process
if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs-1; i++) {
        cluster.fork();
    }

    // This event is firs when worker died
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
}

// Worker process
else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    app.listen(PORT, err => {
        err ?
        console.log("Error in server setup") :
        console.log(`Worker ${process.pid} started`);
    });
}
