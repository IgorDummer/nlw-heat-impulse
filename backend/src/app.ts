import "dotenv/config"; /* Faz a aplicação acessar o conteúdo das variáveis em env */
import express from "express";

import { router } from "./routes";

const app = express();

app.use(express.json()); /* Especifica que pode receber tipo json */

app.use(router);

/* Faz a rota de login */
app.get("/github", (request, response) => {
  response.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
    /* Se usa crase (`) quando desejamos adicionar variáveis junto ao texto */
  );
});

app.get("/signin/callback", (request, response) => {
  const { code } = request.query;

  return response.json(code);
});

/* O número corresponde a porte onde a aplicação irá rodar */
app.listen(4000, () => console.log('Server is running on PORT 4000'));

/* Por padrão o node não entende arquivos ts, então é feito um script no package.json que roda a aplicação com ts-node-dev */