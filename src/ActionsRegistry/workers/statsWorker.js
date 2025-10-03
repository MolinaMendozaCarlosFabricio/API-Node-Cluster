import fs from 'fs';
import { parentPort, workerData } from 'worker_threads';

try{
    const data = workerData;

    const total = data.length;

    const byActor = {};
    const byAction = {};
    const byDate = {};

    let firstAction = null;
    let lastAction = null;

    for (const entry of data) {
        byActor[entry.actor] = (byActor[entry.actor] || 0) + 1;
        byAction[entry.action] = (byAction[entry.action] || 0) + 1;
        byDate[entry.date] = (byDate[entry.date] || 0) + 1;

        if (!firstAction || new Date(entry.date) < new Date(firstAction)) {
            firstAction = entry.date;
        }
        if (!lastAction || new Date(entry.date) > new Date(lastAction)) {
            lastAction = entry.date;
        }
    }

    const stats = {
        total,
        byActor,
        byAction,
        byDate,
        firstAction,
        lastAction
    };

    parentPort.postMessage({ ok: true, stats });
}catch(err){
    parentPort.postMessage({ ok: false, error: err.message });
}