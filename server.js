const express = require('express');
const JsonFileHandler = require('./handlers/JsonFileHandler');
const JsonFetcher = require('./handlers/JsonFetcher');
const JsonFilter = require('./handlers/JsonFilter');
const WebScraper = require('./handlers/WebScraper');

const app = express();
const port = 3000;

const urlRREO = 'https://apidatalake.tesouro.gov.br/ords/siconfi/tt/rreo?an_exercicio=2023&nr_periodo=6&co_tipo_demonstrativo=RREO&id_ente=41';
const urlBI = "https://wabi-brazil-south-api.analysis.windows.net/public/reports/querydata?synchronous=true";

const payloadPath = './data/payload.json';

const headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
    "ActivityId": "695d1cb5-a4cd-46f5-a5b6-fe4696d75615",
    "Connection": "keep-alive",
    "Content-Type": "application/json;charset=UTF-8",
    "Host": "wabi-brazil-south-api.analysis.windows.net",
    "Origin": "https://app.powerbi.com",
    "Referer": "https://app.powerbi.com/",
    "RequestId": "2e2b8d8a-2458-3404-9df5-18baa4a347d2",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "cross-site",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
    "X-PowerBI-ResourceKey": "8d568ffd-e9ec-420b-a0a8-0fc286725476",
    "sec-ch-ua": "\"Not(A:Brand\";v=\"99\", \"Google Chrome\";v=\"133\", \"Chromium\";v=\"133\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\""
};

app.get('/data', async (req, res) => {
    try {
        const payload = await JsonFileHandler.readJsonFile(payloadPath);
        const scrapedData = await WebScraper.scrapeData(urlBI, payload, headers);
        const jsonData = await JsonFetcher.fetchJsonFromUrl(urlRREO);
        const filteredData = JsonFilter.filterJsonByValues(jsonData);

        if (!Array.isArray(scrapedData['items'])) {
            scrapedData['items'] = [];
        }

        scrapedData['items'] = scrapedData['items'].concat(filteredData);

        res.json(scrapedData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});