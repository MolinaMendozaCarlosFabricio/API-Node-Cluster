const fs = require('fs');

export const readActions = (req, res) => {
    on('request', () => {
        const src = fs.createReadStream('../db/actionsRegistry.json');
        src.pipe(res);
    });
}