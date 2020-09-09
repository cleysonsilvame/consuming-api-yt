const fs = require('fs')

let comentario ={}
let comentarios = [];
const getSelectedComments = async (req, res) => {
  if (res)
    res.json(comentario)
  return comentario

}

const postSelectedComments = async (req,res) => {
 
  console.log(`salvei o comentario ${JSON.stringify(req.body)}`)
  if (res)
    res.json(comentario)

    comentario = req.body;
    comentarios.push(comentario);
    return comentario;
}


module.exports = {
  postSelectedComments,
  getSelectedComments,
}