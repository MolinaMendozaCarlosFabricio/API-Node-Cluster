import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const readActions = (req, res) => {
    const filePath = path.join(__dirname, '../db/actionsRegistry.json');

    if(!fs.existsSync(filePath)){
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify([]));
        return;
    }

    const src = fs.createReadStream(filePath);
    res.writeHead(200, { "Content-Type": "application/json" });
    src.pipe(res);
}