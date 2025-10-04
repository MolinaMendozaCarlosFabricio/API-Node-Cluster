import { initActionsRegistryRoutes } from './ActionsRegistry/routes/actionsRegistryRoutes.js';
import http from 'http';

export const executeServer = (port = 3000) => {
    const server = http.createServer((req, res) => {
        const exit_status = initActionsRegistryRoutes(req, res);
        if(exit_status == 1){
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Ruta no encontrada" }));
        }
    });

    server.listen(port, () => {
        console.log(`Servidor ejecutandose en http://localhost:${port}`);
    });
}