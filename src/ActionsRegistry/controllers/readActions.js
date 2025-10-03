import fs from 'fs';
import path from 'path';
import { fileURLToPath, parse } from 'url';
import { Worker } from "worker_threads";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const readActions = (req, res) => {
    // const { query } = parse(req.url, true);

    const filePath = path.join(__dirname, '../db/actionsRegistry.json');

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err){
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
            return;
        }

        let actions;
        try{
            actions = JSON.parse(data);
        }catch(parseErr){
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "Error al parsear archivo" }));
            return;
        }

        if(req.url.includes("?aggregate=true")){
            const worker = new Worker(
                new URL('../workers/statsWorker.js', import.meta.url),
                { workerData: actions }
            );

            worker.on('message', (msg) => {
                if (msg.ok) {
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ stats: msg.stats, data: actions }, null, 2));
                } else {
                    res.writeHead(500, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ error: msg.error }));
                }
            });

            worker.on('error', (err) => {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: err.message }));
            });
        } else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ data: actions }, null, 2));
        }
    });
}