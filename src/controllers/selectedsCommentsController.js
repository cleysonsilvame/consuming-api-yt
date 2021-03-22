let comentario = [];

const getSelectedComments = async (req, res) => {
  if (res) res.json(comentario);
  return comentario;
};

const postSelectedComments = async (req, res) => {
  comentario[0] = req.body;
  if (res) res.redirect('/broadcast/comment');
  return comentario;
};

module.exports = {
  postSelectedComments,
  getSelectedComments,
};
