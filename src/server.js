const http = require('http');

export const executeServer = (port = 3000) => {
    const server = http.createServer((req, res) => {});

    server.listen(() => {
        console.log(`Servidor ejecutandose en http://localhost${port}`);
    });
}
