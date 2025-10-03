import { parse } from "url";
import { readActions } from "../controllers/readActions.js";
import { writeAction } from "../controllers/writeAction.js"

export const initActionsRegistryRoutes = (req, res) => {
    const { pathname } = parse(req.url, true);

    if (pathname === "/actions" && req.method === "POST") {
        writeAction(req, res);
        return 0;
    } 
    else if (pathname === "/actions" && req.method === "GET") {
        readActions(req, res);
        return 0;
    } 
    else {
        return 1;
    }
}