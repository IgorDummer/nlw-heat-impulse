/* Faz a parte de conexão com o banco de dados */

import { prisma, PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export default prismaClient;