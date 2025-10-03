import { fileURLToPath } from 'url';
import { ActionsRegistry } from '../model/action.js';
import fs from 'fs';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const writeAction = (req, res) => {
    let body = "";
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        try{
            console.log("Ejecutando consulta")
            const data = JSON.parse(body);

            const actual_date = new Date();
            const action = new ActionsRegistry(
                data.actor, 
                data.action,
                `${actual_date.getDay()}/${actual_date.getMonth()}/${actual_date.getFullYear()}`
            );

            const filePath = path.join(__dirname, '../db/actionsRegistry.json');

            let existing = [];
            if(fs.existsSync(filePath)){
                const content = fs.readFileSync(filePath, 'utf-8').trim();
                if (content)
                    existing = JSON.parse(content);
            }

            existing.push(action);

            fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));
            
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Registro guardado exitosamente" }));
        }catch(err){
            console.log("Error:", err);
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: err }));
        }
    });
}