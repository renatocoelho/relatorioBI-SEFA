const fs = require('fs');

class JsonFileHandler {
    static readJsonFile(filePath) {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    reject(new Error(`File not found: ${filePath}`));
                } else {
                    resolve(JSON.parse(data));
                }
            });
        });
    }
}

module.exports = JsonFileHandler;