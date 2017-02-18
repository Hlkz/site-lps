import db from '../../../njb/database'
import log from '../../../njb/log'
import email from '../../../njb/email'

function Load(req, res, isContent) { return new Promise((resolve, reject) => {
  if (!req.session.admin) {
    res.status(404).end()
    return
  }

  let post = req.body
  if (post && post.newsletter_send_submit && post.newsletter_subject && post.newsletter_content_text && post.newsletter_content_html) {
    res.setPost()
    let mail = {
      subject: post.newsletter_subject,
      content_text: post.newsletter_content_text,
      content_html: post.newsletter_content_html
    }

    let err0 = 'Error clearing lps_newsletter_suscribers'    
    let err1 = 'Error creating new newsletter: cant create the mail'
    let err2 = 'Error creating new newsletter: cant add receipients to queue'
    let err3 = 'Error creating new newsletter: cant save the mail to lps_newsletter_mail'
    let err_callback = err => {
      log.error(err)
      res.setError(err)
      resolve()
    }
    db.query_c('DELETE FROM lps_newsletter_suscribers_temp WHERE mail NOT REGEXP \'^[a-zA-Z0-9][a-zA-Z0-9._-]*[a-zA-Z0-9._-]@[a-zA-Z0-9][a-zA-Z0-9._-]*[a-zA-Z0-9]\\.[a-zA-Z]{2,4}$\'', err_callback, err0, () => { // _c
      db.query_c('INSERT INTO njb_mail SET ?', mail, err_callback, err1, results => {
      db.query_c('INSERT INTO njb_mail_queue (id, mail) ( SELECT ?, mail FROM lps_newsletter_suscribers_temp )', results.insertId, err_callback, err2, () => {
      db.query_c('INSERT lps_newsletter_mail SET ?', mail, err_callback, err3, () => {
      email.SendQueuedMails()
      res.setForm(1)
      resolve()
    }) }) }) }) // _c

  } else if (post && post.newsletter_test_submit && post.newsletter_test_recipient) {
    email.sendMail(post.newsletter_test_recipient, post.newsletter_subject, post.newsletter_content_text, post.newsletter_content_html).then(() => {
      res.setForm(2)
      resolve()
    }, (err) => {
      res.setError(error.error)
      resolve()
    })
  } else
    resolve()
})}


let pug = `

.main-content
  .page-content
    .content-box
      h1 Nouvelle newsletter
      form(name='newsletter-send-form', method='post')
        p Sujet
        input(type='text', name='newsletter_subject')
        p Contenu plain/text
        div
          textarea(name='newsletter_content_text')
        p Contenu html
        div
          textarea(name='newsletter_content_html')
        input(type='submit', name='newsletter_send_submit', value='Envoyer', onclick='confirm("Confirmation")')
        p Envoi test: destinataire
        input(type='text', name='newsletter_test_recipient')
        input(type='submit', name='newsletter_test_submit', value='Envoi test')
      - if (form === 1)
        p Newsletter crée et en cours d'envoi !
      - if (form === 2)
        p Email de test envoyé !
      - if (error)
        p Error:
        p=error
`

module.exports = {
  Load,
  pug,
}