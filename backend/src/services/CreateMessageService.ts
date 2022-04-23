import prismaClient from "../prisma";

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

    return message;
  }
}

export { CreateMessageService }