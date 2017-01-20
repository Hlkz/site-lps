import email from '../../njb/email'
import db from '../../njb/database'

function PreLoad(req, res, isContent) { return new Promise((resolve, reject) => {
  let post = req.body
  if (post && post.adhesion_submit) {
    res.setPost()
    if (true) { //(post.adhesion_name && post.adhesion_address && post.adhesion_mail && post.adhesion_member > 0 && (post.adhesion_donation || post.adhesion_member != 3)) {
      post.adhesion_donation = (post.adhesion_member==1) ? 15 : (post.adhesion_member==2) ? 50 : post.adhesion_donation
      let mailTo = 'hlkz@hotmail.fr'
      let mailSubject = 'Formulaire d\'adhésion : '+post.adhesion_name
      let mailHtml = ''+
      '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">'+
      '<html lang="en">'+
      '<head>'+
      '<title>Adhésion</title>'+
      '</head>'+
      '<body>'+
        '<br>Nom, prénom : '+post.adhesion_name+
        '<br>Adresse : '+post.adhesion_address+
        '<br>          '+post.adhesion_address2+
        '<br>Email : '+post.adhesion_mail+
        '<br>Téléphone : '+post.adhesion_phone+
        '<br>Membre : '+((post.adhesion_member==1) ? 'actif (15€)' :
                        ((post.adhesion_member==2) ? 'bienfaiteur (50€)' :
                        ((post.adhesion_member==3) ? 'autre':'Aucune case cochée' )) )+
        (post.adhesion_member==3 ? ('<br>Don personnalisé : '+post.adhesion_donation) : '')+
        '<br>Reçu fiscal : '+((post.adhesion_fiscal)?'oui':'non')+
        '<br>'+
      '</body>'+
      '</html>';

      db.query('INSERT INTO '+db.prefix+'adhesions (name, address, address2, mail, phone, memberType, donation, fiscal) VALUES (?,?,?,?,?,?,?,?)',
      	post.adhesion_name, post.adhesion_address, post.adhesion_address2, post.adhesion_mail, post.adhesion_phone, post.adhesion_member||0, post.adhesion_donation, post.adhesion_fiscal||0,
      	function(err) {
        if (err)
          res.setForm(1)
        else {
          res.setForm(0)
          email.sendHtml(mailTo, mailSubject, mailHtml)
        }
        resolve()
      })
    }
    else {
      res.setForm(1)
      resolve()
    }
  }
  else
    resolve()
})}


let pug = `

.align.main-content
  .page-content-m
    - if (!post)
      !=t.pug('adhesion')
      form.adhesion(method='post', action='Adhésion')
        .hCenter
          table(border='1')
            tr
              td Nom, Prénom
              td(colspan='2')
                input.underline(type='text', name='adhesion_name', size='25', placeholder='Nom, Prénom')
            tr
              td Adresse
              td(colspan='2')
                input.underline(type='text', name='adhesion_address', size='35', placeholder='Rue, ...')
                br
                input.underline(type='text', name='adhesion_address2', size='35', placeholder='Code postal, ...')
            tr
              td Mail
              td(colspan='2')
                input.underline(type='email', size='35', name='adhesion_mail')
            tr
              td Téléphone (facultatif)
              td(colspan='2')
                input.underline(type='tel', name='adhesion_phone')
            tr
            tr
              td Membre actif
              td 15 euros (€)
              td
                input(type='radio', name='adhesion_member', value='1')
            tr
              td Membre bienfaiteur
              td 50 euros (€)
              td
                input(type='radio', name='adhesion_member', value='2')
            tr
              td Don (montant au choix)
              td
                input(type='number', name='adhesion_donation', placeholder='15', style='width:70px')
                | euros (€)
              td
                input(type='radio', name='adhesion_member', value='3')
            tr
              td(colspan='2') Merci de cocher cette case si vous souhaitez recevoir un reçu fiscal
              td
                input(type='checkbox', name='adhesion_fiscal', value='1')
          br
        div(style='display:flex')
            input(type='submit', name='adhesion_submit', value='Envoyer', style='margin-left:auto')
      !=t.pug('law')
    - else if (!form)
      center
        | Votre formulaire d'adhésion a bien été enregistré.
        br
        br
        form(action='https://www.paypal.com/cgi-bin/webscr', method='post', target='_blank')
          input(type='hidden', name='cmd', value='_s-xclick')
          input(type='hidden', name='hosted_button_id', value='NTC749UFPSDU6')
          input(type='image', src='https://www.paypalobjects.com/fr_FR/FR/i/btn/btn_donateCC_LG.gif', border='0', name='submit', alt='PayPal, le réflexe sécurité pour payer en ligne')
          img(alt='', border='0', src='https://www.paypalobjects.com/fr_FR/i/scr/pixel.gif', width='1', height='1')
    - else
      center
        | Le formulaire comporte une erreur, veuillez réessayer.
`

module.exports = {
  PreLoad,
  pug,
}
