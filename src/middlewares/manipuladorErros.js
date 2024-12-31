import mongoose from "mongoose";
import ErroBase from "../erros/ErroBase.js";
import ReqIncorreta from "../erros/ReqIncorreta.js";
import ErroValidacao from "../erros/ErroValidacao.js";

// eslint-disable-next-line no-unused-vars
export function manipuladorErros(erro, req, res, next){
  if (erro instanceof mongoose.Error.CastError) {
    new ReqIncorreta().enviarResposta(res);
  } else if (erro instanceof mongoose.Error.ValidationError) {
    new ErroValidacao(erro).enviarResposta(res);
  } else if (erro instanceof ErroBase){
    erro.enviarResposta(res);
  } else {
    new ErroBase().enviarResposta(res);
  };
}