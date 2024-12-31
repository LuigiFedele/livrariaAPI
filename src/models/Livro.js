import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const livroSchema = new mongoose.Schema(
  {
    id: {type: String},
    titulo: {
      type: String,
      required: [true, "O titulo do livro deve ser informado"]
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'autores', 
      required: [true, "O autor do livro deve ser informado"],
      autopopulate: true
    },
    editora: {
      type: String, 
      required: [true, "A editora do livro deve ser informada"],
      enum: {
        values: ["Casa do Codigo", "Alura"],
        message: "A editora {VALUE} não é uma editora permitida"
      }
    },
    numeroPaginas: {
      type: Number,
    validate: {
      validator: (valor) => {
        return valor >= 10 && valor <= 5000;
      },
      message: "O livro deve ter entre 10 e 5000 paginas.Valor fornecido: {VALUE}"
    }
    }
  }
);

livroSchema.plugin(autopopulate);
const livros= mongoose.model('livros', livroSchema);

export default livros;