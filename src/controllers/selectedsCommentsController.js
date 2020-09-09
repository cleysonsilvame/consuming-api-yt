const fs = require('fs')


const getSelectedComments = async (req, res) => {

  if (fs.existsSync('./selecteds-comments.tmp')) {
    console.log(fs.readFile('./selecteds-comments.tmp', 'utf8', (err, contents) => {
      return JSON.parse(contents)
    }))
  } else {
    return [{
      message: 'No selected comments'
    }]
  }

}


const postSelectedComments = async (req, res) => {
  let oneComment = req.body

  if (fs.existsSync('./selecteds-comments.tmp')) {
    fs.readFile('./selecteds-comments.tmp', 'utf8', (err, contents) => {
      let selectedsComments = JSON.parse(contents)

      selectedsComments.push(oneComment)

      fs.writeFileSync('./selecteds-comments.tmp', JSON.stringify(selectedsComments))
    })
  } else {
    fs.writeFileSync('./selecteds-comments.tmp', JSON.stringify([oneComment]))
  }

  if (res)
    res.json(oneComment)
  return [oneComment]
}

module.exports = {
  postSelectedComments,
  getSelectedComments,
}