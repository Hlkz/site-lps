import { CorePath, ConfigPath } from '../../../njb/path'
let config = require(ConfigPath)

function Load(req, res, isContent) { return new Promise((resolve, reject) => {
  if (req.body.adminDeco) {
    req.session.admin = false
    res.redirect(req.headers.referer)
  }
  else if (req.body.adminCode) {
    if (req.body.adminCode === config.adminpassword)
      req.session.admin = true
    else
      req.session.admin = false
    res.redirect(req.headers.referer)
  }
  else
    resolve()
})}

let pug = `

.main-content.hexpand.align.plr
  - if (admin)
    p Vous êtes authentifié en tant qu'administrateur.
    a(href='admin/agenda') Gérer l'agenda
    a(href='admin/locale_t') Traductions (mots)
    a(href='admin/locale_pug') Traductions (pug)
    a(href='admin/newsletter') Envoi de newsletter
    form(action='Admin', method='post')
      button(name='adminDeco', value='y', type='submit') Déconnexion
  - else
    p Vous n'êtes actuellement pas authentifié en tant qu'administrateur.
    form(action='', method='post')
      | Code: 
      input(type='password', name='adminCode')
      br
      button(type='submit') Connexion
`

module.exports = {
  Load,
  pug,
}
