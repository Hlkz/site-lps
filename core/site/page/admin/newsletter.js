import db from '../../../njb/database'

function PreLoad(req, res, isContent) { return new Promise((resolve, reject) => {
  let post = req.body
  if (post && post.newsletter_submit) {
    if (post.newsletter_name) {
      res.setPost()
      let esc = common.mysql_real_escape_string
      let query = 'INSERT IGNORE INTO '+db.prefix+'newsletter_mail (mail) VALUES (\''+esc(post.newsletter_name)+'\')'
      req.app.get('database').query(query, function(err) { if (err) throw err })
      res.viewLocals['form'] = true
    }
    resolve()
  }
  console.log(req.body)
  if (req.body.title) {
    console.log("HEY", req.body.title)
    //res.redirect('/')
  }
  resolve()
})}


let pug = `

.main-content
  .content-box
    p Newsletter pâââge
    form(name='newsletter-form', method='post')
      span Subject
      input(type='text', name='newsletter_subject')
      span Content
      textarea(name='newsletter_content')
      input(type='submit', name='newsletter_submit', value='Envoyer')
`

module.exports = {
  PreLoad,
  pug,
}