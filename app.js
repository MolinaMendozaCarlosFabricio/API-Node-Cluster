import { executeClusterMode } from "./src/cluster_setup.js";
import { executeServer } from "./src/server.js";

// const args = process.argv.slice(2);
// const value = args.slice(1).join(' ') || 'one_thread'
const value = 'cluster';

if (value === 'cluster')
    executeClusterMode();
else
    executeServer();