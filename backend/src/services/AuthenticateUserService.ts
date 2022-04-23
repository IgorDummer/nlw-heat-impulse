import axios from "axios";
import prismaClient from "../prisma";
import { sign } from "jsonwebtoken";

/* As interfaces definem quais campos são utilizados na aplicação */
interface IAccessTokenResponse {
  access_token: string
}

interface IUserResponse {
  avatar_url: string,
  login: string,
  id: number,
  name: string
}

class AuthenticateUserService {
  async execute(code: string) {
    const url = "https://github.com/login/oauth/access_token";

    const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      /* Para que retorne como um json */
      headers: {
        "Accept": "application/json"
      }
    })

    const response = await axios.get<IUserResponse>("https://api.github.com/user", {
      /* É possível ver que é do tipo Bearer através do Insomnia */
      headers: {
        authorization: `Bearer ${accessTokenResponse.access_token}`
      }
    })

    const { login, id, avatar_url, name } = response.data

    const user = await prismaClient.user.findFirst({
      /* Busca no banco um usuário com o id igual ao recebido */
      where: {
        github_id: id
      }
    })
    /* Se o usuário não for encontrado, significa que não existe e portanto é criado um novo */
    if (!user) {
      await prismaClient.user.create({
        /* data define os campos a serem salvos */
        data: {
          github_id: id,
          name, /* Como é o mesmo nome, não precisa atribuir */
          avatar_url,
          login
        }
      })
    }

    const token = sign(
      {
        user: {
          name: user.name,
          avatar_url: user.avatar_url,
          id: user.id
        }
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "1d"
      }
    );

    return { token, user };
  }
}

export { AuthenticateUserService }