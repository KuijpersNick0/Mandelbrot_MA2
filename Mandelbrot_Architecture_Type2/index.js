const cluster = require('cluster');
const worker = require('./worker');

//check nbre de CPU
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  // Create worker processes as needed
  for (let i = 0; i < numCPUs-1; i++) {
    cluster.fork();
  }
} else {
  // Run worker code
  worker();
}
