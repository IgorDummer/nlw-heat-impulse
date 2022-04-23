import prismaClient from "../prisma";
import { io } from "../app";

/* Salva o texto digitado pelo usuário e vincula ao seu id */
class CreateMessageService {
  async execute(text: string, user_id: string) {
    const message = await prismaClient.message.create({
      data: {
        text,
        user_id
      },
      include: { /* Para ter todas as informações do usuário */
        user: true
      }
    })

    const infoWs = {
      text: message.text,
      user_id: message.user_id,
      created_at: message.created_at,
      user: {
        name: message.user.name,
        avatar_url: message.user.avatar_url
      },
    }

    io.emit("new_message", infoWs);

    return message;
  }
}

export { CreateMessageService }