const cluster = require('cluster');
const { executeServer } = require('./server');

const CPUsAvailable = require('os').cpus().length;

if (cluster.isMaster){
    console.log(`Cantidad de CPU's: ${CPUsAvailable}`);
    console.log(`PID del proceso padre: ${process.pid}`);

    for(let i = 0; i < CPUsAvailable; i++)
        cluster.fork();

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} terminado`);
        console.log("Vamos a crear un nuevo worker!");
        cluster.fork();
    });
} else {
    executeServer()
}