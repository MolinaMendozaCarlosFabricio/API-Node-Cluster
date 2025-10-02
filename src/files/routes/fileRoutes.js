import { saveFile } from "../controllers/saveFile"

const initRoutes = (req, res) => {
    if (req.url === "files/" && req.method == "POST")
        saveFile(req, res);
    if (req.url === "files/" && req.method == "GET"){}
}