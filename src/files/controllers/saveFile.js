const path = require('path');
const fs = require('fs');

const UPLOAD_DIR = path.join("../../storage");
if (!fs.existsSync(UPLOAD_DIR)){
    fs.mkdir(UPLOAD_DIR);
}

export const saveFile = (req, res) => {
    const boundary = req.headers["Content-Type"].split("boundary=")[1];
    let rawData = "";

    req.on("data", chunk => {
        rawData += chunk.toString("binary");
    });

    req.on("end", () => {
        const parts = rowData.split(`--${boundary}`);

        parts.forEach(part => {
            if (part.includes("Content-Disposition")) {
                const matchFilename = part.match(/filename="(.+?)"/);
                if(matchFilename){
                    const fileName = matchFilename[1];
                    const fileData = part.split("\r\n\r\n")[1];
                    const cleanData = fileData.substring(0, fileData.length - 2);

                    fs.writeFileSync(
                        path.join(UPLOAD_DIR, fileName),
                        Buffer.from(cleanData, "binary"),
                    );
                }
            }
        });

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ "message": "archivo subido" }));
    });
}