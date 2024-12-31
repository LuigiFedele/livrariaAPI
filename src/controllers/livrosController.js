import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autores, livros } from "../models/index.js";

class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      const buscaLivros = livros.find();

      req.resultado = buscaLivros;

      next();
    } catch (erro) {
      next(erro);
    }
  }

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultados = await livros.findById(id)

      if (livroResultados !== null) {
        res.status(200).send(livroResultados);
      } else {
        next (new NaoEncontrado("Id do Livro nao localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);

      const livroResultado = await livro.save();

      res.status(201).send(livroResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  }

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultados = await livros.findByIdAndUpdate(id, {$set: req.body});

      if (livroResultados !== null) {
        res.status(200).send({message: "Livro atualizado com sucesso"});
      } else {
        next (new NaoEncontrado("Id do Livro não localizado."));
      } 
    } catch (erro) {
      next(erro);
    }
  }

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultados = await livros.findByIdAndDelete(id);

      if (livroResultados === null) {
        res.status(200).send({message: "Livro removido com sucesso"});
      } else {
        new NaoEncontrado("Id do Livro nao localizado.");
      }      
    } catch (erro) {
      next(erro);
    }
  }

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);

      if (busca !== null) {
        const livrosResultado = livros
          .find(busca)

        req.resultado = livrosResultado;
        
        next();
      } else {
        res.status(200).send([]);
      }
    } catch (erro) {
      next(erro);
    }
  };
}

async function processaBusca(parametrosBusca) {
  const {editora, titulo, minPaginas, maxPaginas, nomeAutor} = parametrosBusca;

  let busca = {};

  if (editora) busca.editora = editora;
  if (titulo) busca.titulo = {$regex: titulo, $options: "i"};

  if (minPaginas || maxPaginas) busca.numeroPaginas = {};

  if (minPaginas) busca.numeroPaginas.$gte = minPaginas;
  if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas;

  if (nomeAutor) {
    const autor = await autores.findOne({nome: nomeAutor});

    if (autor !== null) {
      busca.autor =  autor._id;
    } else {
      busca = null;
    }
  }
 
  return busca;
}

export default LivroController