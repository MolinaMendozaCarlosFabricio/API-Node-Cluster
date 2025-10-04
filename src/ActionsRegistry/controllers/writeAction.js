import { ActionsRegistry } from '../model/action.js';
import actionsRegistryService  from '../services/actionsRegistryService.js';

export const writeAction = (req, res) => {
    let body = "";
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async  () => {
        try{
            console.log("Ejecutando consulta")
            const data = JSON.parse(body);

            const actual_date = new Date();
            const action = new ActionsRegistry(
                data.actor, 
                data.action,
                `${actual_date.getDate()}/${actual_date.getMonth() + 1}/${actual_date.getFullYear()}`
            );

            await actionsRegistryService.addAction(action);

            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Registro guardado exitosamente" }));
        }catch(err){
            console.log("Error:", err);
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: err.message || "Error interno del servidor" }));
        }
    });
}