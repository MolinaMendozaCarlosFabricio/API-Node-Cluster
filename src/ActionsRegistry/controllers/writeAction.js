import { ActionsRegistry } from '../model/action.js';

const fs = require('fs');

export const writeAction = (req, res) => {
    const actual_date = new Date();
    const action = new ActionsRegistry(
        req.body.actor, 
        req.body.action,
        `${actual_date.getDay()}/${actual_date.getMonth()}/${actual_date.getFullYear()}`
    );

    fs.appendFile(
        '../db/actionsRegistry.json',
        `{ "actor": ${action.actor}, "action": ${action.action}, "date": ${action.date} },`,
        (err) => {
            if (err) {
                console.log("Error al escribir sobre el registro:", err);
                res.status(500).send({ "error": err });
            }
            console.log("Registro guardado");
            res.status(201).send({ "message": "Registro guardado exitosamente" });
        }
    );
}