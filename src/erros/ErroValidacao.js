import ReqIncorreta from "./ReqIncorreta.js";

class ErroValidacao extends ReqIncorreta {
  constructor(erro){
    const mensagensErro = Object.values(erro.errors)
      .map(erro => erro.message)
      .join("; ");

    super({message: `Os seguintes erros foram encontrado ${mensagensErro}`});
  }
}
export default ErroValidacao;