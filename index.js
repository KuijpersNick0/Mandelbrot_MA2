const express = require('express');
const cluster = require('cluster');

//check nbre de CPU
const numCPUs = require('os').cpus().length;

const app = express();
app.use(express.urlencoded({extended:true}));
const PORT = 80;

let routes = require('./routes');

//pour css-images-js
app.use(express.static('/public'));
//routes
app.use('/', routes);

//SI NGINX AS REVERSE PROXY
// app.listen(80);
// app.listen(3002);
// app.listen(3003);
// app.listen(3004);

// SI CLUSTER
// Master process
if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers
    for (let i = 0; i < numCPUs-1; i++) {
        cluster.fork();
    }

    // This event is firs when worker died
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });

} // Worker process
else {
    //Partage connection 
    app.listen(PORT, err => {
        err ?
        console.log("Error in server setup") :
        console.log(`Worker ${process.pid} started`);
    });
    app.listen(3002);
    app.listen(3003);
    app.listen(3004);
}
