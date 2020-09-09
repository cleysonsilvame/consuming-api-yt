const fs = require('fs')


const getSelectedComments = async (req, res) => {
  if (res)
    res.json(oneSelectedComment)
  return [oneSelectedComment]

}


const postSelectedComments = async (req, res) => {
  oneSelectedComment = req.body  

  if (res)
    res.json([oneSelectedComment])
  return [oneSelectedComment]
}

module.exports = {
  postSelectedComments,
  getSelectedComments,
}