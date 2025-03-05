# Análise Comparativa da Arrecadação de ICMS no Paraná em 2023
Este projeto tem como objetivo gerar os dados para serem usados no relatório de BI que compara os valores de 
arrecadação de ICMS do estado do Paraná para o ano de 2023, utilizando os dados disponíveis no Boletim de 
Arrecadação de Tributos Estaduais e do Distrito Federal e na API do Siconfi.

## Diagrama da solução
![Imagem do diagrama da Solução sistêmica](/docs/diagrama.png)

## Estrutura do Projeto
```
├── .gitignore
├── .vscode/
│   ├── launch.json
├── data/
│   ├── payload.json
├── docs/
│   ├── diagrama.png
├── handlers/
│   ├── JsonFetcher.js
│   ├── JsonFileHandler.js
│   ├── JsonFilter.js
│   ├── WebScraper.js
├── package.json
├── server.js
```

## Funcionalidades
### Leitura de Arquivos JSON
A função readJsonFile em ```filteredData.js``` lê arquivos JSON locais.

### Busca de JSON de URL
A função fetchJsonFromUrl em ```filteredData.js``` busca dados JSON de uma URL.

### Filtragem de Dados JSON
A classe JsonFilter em ```JsonFilter.js``` e a função ```filterJsonByValues``` em ```filteredData.js``` filtram os dados JSON com base em critérios específicos.

## Como Executar
Clone o repositório.
Instale as dependências com npm install.
Execute o projeto com node server.js.


