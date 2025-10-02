import { readActions } from "../controllers/readActions.js";
import { writeAction } from "../controllers/writeAction.js"

export const initActionsRegistryRoutes = (req, res) => {
    if (req.url === "actions/" && req.method === "POST"){
        writeAction(req, res);
        return 0;
    }
    else if (req.url === "actions/" && req.method === "GET"){
        readActions(req, res);
        return 0;
    }
    else
        return 1;
}