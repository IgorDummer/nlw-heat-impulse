import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  /* Caso o Usuário esteja autenticado, usamos o next para passar pra frente */
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      errorCode: "token.invalid"
    });
  }

  /*  Bearer au91903913dad 
      [0] = Bearer
      [1] = au91903913dad
  */
  const [, token] = authToken.split(" ");
  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as IPayload

    request.user_id = sub;

    return next();
  } catch (err) {
    return response.status(401).json({
      errorCode: "token.expired"
    });
  }
}