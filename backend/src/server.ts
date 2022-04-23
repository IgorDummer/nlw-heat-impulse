import { serverHttp } from "../src/app"

/* O número corresponde a porta onde a aplicação irá rodar */
serverHttp.listen(4000, () => console.log('Server is running on PORT 4000'));