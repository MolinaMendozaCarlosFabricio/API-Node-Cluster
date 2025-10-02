import cluster from 'cluster';
import { executeServer } from './server.js';

const CPUsAvailable = require('os').cpus().length;

export const executeClusterMode = () => {
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
}
