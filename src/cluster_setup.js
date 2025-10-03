import cluster from 'cluster';
import { executeServer } from './server.js';
import os from 'os';

const CPUsAvailable = os.cpus().length;

export const executeClusterMode = () => {
    if (cluster.isPrimary){
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
