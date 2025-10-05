import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import lockfile from 'proper-lockfile';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '../../../db/actionsRegistry.json');

class ActionsRegistryService {
    static instance;

    constructor() {}

    static getInstance() {
        if (!ActionsRegistryService.instance) {
            ActionsRegistryService.instance = new ActionsRegistryService();
        }
        return ActionsRegistryService.instance;
    }

    async getActions() {
        try {
            const content = await fs.readFile(filePath, 'utf-8');
            return JSON.parse(content || '[]');
        } catch (error) {
            if (error.code === 'ENOENT') {
                return [];
            }
            throw error;
        }
    }

    async addAction(action) {
        try {
            await lockfile.lock(filePath, { retries: { retries: 5, factor: 1.2, minTimeout: 100 } });
            
            const allActions = await this.getActions();
            allActions.push(action);
            await fs.writeFile(filePath, JSON.stringify(allActions, null, 2));
            
        } finally {
            await lockfile.unlock(filePath);
        }
    }
}

export default ActionsRegistryService.getInstance();