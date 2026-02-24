
Desenvolver uma aplicação em Node.js que simule a sincronização de dados de "Usuários/RH", processando e consolidando as informações.

Este projeto realiza a integração de dados de usuários provenientes de uma API publica externa, aplica regras de validação e negócio, persiste os dados em banco de dados local e gera um relatório em formato .txt

Tecnologias Usadas - Node.js (v22.14.0), Axios e SQLite.

Após clonar o repositório do git é necessário instalar as dependências utilizadas (Axios e Sqlite). Usando o comando "npm install" será feito a instalação das dependências.

A aplicação conseme a API para buscar dados de usuários gerados randomicamente. A mesma estando configurada dentro do projeto. A cada execução a aplicação busca os usuários, processa os dados aplica regras de negócios e salva as informações no banco local. A Aplicação usa o banco de dados local SQLite para armazenar as informações dos usuários. O arquivo do banco é criado automaticamente após a aplicação ser executada pela primeira vez. Para executar a aplicação use o comando dentro da pasta raiz "node src/index.js" e para ver o relatório gerado vá na pasta "relatorios" onde estará um arquivo .txt gerado.
