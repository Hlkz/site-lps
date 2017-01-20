import common from '../../njb/common'
import db from '../../njb/database'

function PreLoad(req, res, isContent) { return new Promise((resolve, reject) => {
  if (!isContent) {
    res.redirect('/')
    return resolve()
  }

  common.busform(req, post => {
    if (post) {
      res.setPost()
      if (post.newsletter_name) {
        let esc = common.mysql_real_escape_string
        let query = 'INSERT IGNORE INTO '+db.prefix+'newsletter_mail (mail) VALUES (\''+esc(post.newsletter_name)+'\')'
        db.query(query, function(err) { if (err) throw err })
        res.setForm(0)
      }
      else
        res.setForm(1)
      resolve()
    }
    else
      res.redirect('/page/')
  })
})}

let pug = `

.align.main-content
  .page-content
    - if (!post)
      p
    - else if (!form)
      p Vous êtes inscrit !
    - else
      !=t.pug('BadName')
      p Veuillez indiquer une adresse mail valide.
`

module.exports = {
  PreLoad,
  pug,
}
