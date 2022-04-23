import "dotenv/config"; /* Faz a aplicação acessar o conteúdo das variáveis em env */
import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

import { router } from "./routes";

const app = express();
app.use(cors())

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
  cors: { /* Especifica as fontes que são conectadas com o servidor */
    origin: "*"
  }
});

io.on("connection", socket => {
  console.log(`Usuário conectado no socket: ${socket.id}`);
})

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

export { serverHttp, io }