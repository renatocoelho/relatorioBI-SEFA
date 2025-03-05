const meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];

class JsonFilter {
    static filterJsonByValues(jsonData) {
        if (!Array.isArray(jsonData["items"])) {
            jsonData["items"] = [jsonData["items"]];
        }

        jsonData["items"] = jsonData["items"].filter(item => item["conta"] === "ICMS");
        jsonData["items"] = jsonData["items"].filter(item => item["anexo"] === "RREO-Anexo 03");
        jsonData["items"] = jsonData["items"].filter(item => !item["coluna"].includes("PREVISÃO"));
        jsonData["items"] = jsonData["items"].filter(item => !item["coluna"].includes("TOTAL"));

        jsonData["items"] = jsonData["items"].map(item => {
            const match = item["coluna"].match(/<MR-(\d+)>/);
            const value = match ? match[1] : 0;
            item["mes"] = 12 - value;
            item["mesDesc"] = meses[12 - value - 1];
            return item;
        });

        return jsonData["items"].map(item => ({
            origem: "Dados do Siconfi",
            exercicio: item["exercicio"],
            mes: item["mes"],
            mesDesc: item["mesDesc"],
            valor: item["valor"]
        }));
    }
}

module.exports = JsonFilter;