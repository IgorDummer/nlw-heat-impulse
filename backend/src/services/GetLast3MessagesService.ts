import prismaClient from "../prisma";

/* Salva o texto digitado pelo usuário e vincula ao seu id */
class GetLast3MessagesService {
  async execute() {
    const messages = await prismaClient.message.findMany({
      take: 3, /* Pega as 3 ultimas */
      orderBy: {
        created_at: "desc"
      },
      /* Pega, também, as informações do usuário */
      include: {
        user: true,
      }
    });

    // SELECT * FROM MESSAGES LIMIT 3 ORDER BY CREATED_AT DESC

    return messages;
  }
}

export { GetLast3MessagesService }