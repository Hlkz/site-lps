import common from '../../njb/common'
import db from '../../njb/database'

function Load(req, res, isContent) { return new Promise((resolve, reject) => {
  let post = req.body

  if (post.newsletter_suscribe) {
    res.setData('newsletter', 'suscribe')
    db.query('INSERT IGNORE INTO lps_newsletter_suscribers SET ?', { mail: post.newsletter_suscribe }, function(err) {
      if (err)
        res.setForm(1)
      else
        res.setForm(0)
      resolve()
    })
  }
  else if (post.newsletter_unsuscribe) {
    res.setData('newsletter', 'unsuscribe')
    db.query('DELETE FROM lps_newsletter_suscribers WHERE mail = ?', post.newsletter_unsuscribe, function(err) {
      if (err)
        res.setForm(1)
      else
        res.setForm(0)
      resolve()
    })
  }
  else
    resolve()

})}

let pug = `

.align.main-content
  .page-content
    - if (newsletter === 'suscribe')
      - if (!form)
        p Vous êtes inscrit !
      - else
        p Une erreur s'est produite, veuillez réessayer ultérieurement.
    - else if (newsletter === 'unsuscribe')
      - if (!form)
        p Vous êtes désinscrit à la newsletter de La Petite Symphonie.
      - else
        p Une erreur s'est produite, veuillez réessayer ultérieurement.
    - else
      p Vous souhaitez vous désinscrire de la newsletter de La Petite Symphonie ?
      form(name='newsletter-unsuscribe-form', method='post')
        span Votre adresse mail : 
          input.border(type='text', name='newsletter_unsuscribe', size='40')
        input(type='submit', name='locale_submit', value='Se désinscrire')

`

module.exports = {
  Load,
  pug,
}
