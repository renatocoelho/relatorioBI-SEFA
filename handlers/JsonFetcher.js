const https = require('https');

class JsonFetcher {
    static fetchJsonFromUrl(url) {
        return new Promise((resolve, reject) => {
            https.get(url, (resp) => {
                let data = '';

                resp.on('data', (chunk) => {
                    data += chunk;
                });

                resp.on('end', () => {
                    try {
                        resolve(JSON.parse(data));
                    } catch (err) {
                        reject(new Error(`Error fetching data from URL: ${url}`));
                    }
                });

            }).on("error", (err) => {
                reject(new Error(`Error fetching data from URL: ${url}`));
            });
        });
    }
}

module.exports = JsonFetcher;