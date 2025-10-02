import { initActionsRegistryRoutes } from './ActionsRegistry/routes/actionsRegistryRoutes.js';

const http = require('http');

export const executeServer = (port = 3000) => {
    const server = http.createServer((req, res) => {
        const exit_status = initActionsRegistryRoutes(req, res);
        if(exit_status == 1){
            res.status(404).send({ "error": "Ruta no encontrada" });
        }
    });

    server.listen(() => {
        console.log(`Servidor ejecutandose en http://localhost${port}`);
    });
}