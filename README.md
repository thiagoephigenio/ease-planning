Este Projeto foi criado utilizando [Next.js](https://nextjs.org/)

## Começando

Primeiramente instale as dependências e execute o servidor de desenvolvimento:

```bash
npm run dev
# or
yarn dev
```

Abra o [http://localhost:3000](http://localhost:3000) em seu navegador.

Você irá precisar do banco de dados Postgres devidamente instalado e configurado.

Edite o arquivo .env.local de acordo com a instância do seu banco de dados:

```bash
PGSQL_HOST= 172.18.0.3
PGSQL_PORT= 5432
PGSQL_DATABASE= posts
PGSQL_USER= postgres
PGSQL_PASSWORD= a123456*
```
Utilize o script.sql localizado na raiz do projeto para criação das tabelas do banco de dados.