const meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];

class WebScraper {
    static async scrapeData(url, payload, headers) {
        const fetch = (await import('node-fetch')).default;

        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`Error fetching data from URL: ${url}`);
        }

        const data = await response.json();
        const ds = data.results[0].result.data.dsr.DS[0];
        const valueDicts = ds.ValueDicts.D0;
        const dataResumida = ds.PH[1].DM1.map((item) => {
            const num = item.C[0] + 1;
            return {
                mes: num,
                valor: item.C[1]
            };
        });

        const resumo = {
            "items": dataResumida.map(item => ({
                "origem": "Boletim de Arrecadação DF",
                "exercicio": "2023",
                "mes": item.mes,
                "mesDesc": meses[item.mes - 1],
                "valor": item.valor
            }))
        };

        return resumo;
    }
}

module.exports = WebScraper;