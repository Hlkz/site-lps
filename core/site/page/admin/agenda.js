import db from '../../../njb/database'

function PreLoad(req, res, isContent) { return new Promise((resolve, reject) => {
  if (!req.session.admin) {
    res.status(404).end()
    return
  }

  let get = req.query
  let post = req.body

  if (post && post.agenda_submit) {
    if (post.event_id) {
      console.log('heyyy')
      db.query('DELETE FROM lps_agenda WHERE id=?', post.event_id, function(err) {
        if (!err) {
          db.query('INSERT INTO lps_agenda (id, date, text, text2, text_en, text2_en, link) VALUES (?,?,?,?,?,?,?)', post.event_id, post.event_date,
            post.event_text, post.event_text2, post.event_text_en, post.event_text2_en, post.event_link, function(err) {
            if (!err)
              res.redirect(req.headers.referer)
          })
        }
      })
    }
    else
      db.query('INSERT INTO lps_agenda (id, date, text, text2, text_en, text2_en, link) VALUES (?,?,?,?,?,?,?)', post.event_id, post.event_date,
        post.event_text, post.event_text2, post.event_text_en, post.event_text2_en, post.event_link, function(err) {
        if (!err)
          res.redirect(req.headers.referer)
      })
  }
  else if (get && get.delete_event_id) {
    db.query('DELETE FROM lps_agenda WHERE id=?', get.delete_event_id, function(err) {
      if (!err)
        res.redirect(req.headers.referer)
    })
  }
  else if (get && get.modify_event_id) {
    db.query('SELECT id, date, text, text2, text_en, text2_en, link FROM lps_agenda WHERE id=?', get.modify_event_id, function(err, row) {
      if (!err && row.length) {
        let event = row[0]
        event.date = event.date.toISOString().substring(0, 10)
        res.setData('modifyEvent', event)
        resolve()
      }
    })
  }
  else
    resolve()
})}

let pug = `

.main-content.hexpand.align.plr
  .content-box.w100.hexpand
    p Modifier l'agenda
    br
    form(name='agenda-event-form', method='post')
      div
        span Id
        input(type='text', name='event_id', size='35', value=modifyEvent?modifyEvent.id:'')
        span Date
        input(type='date', name='event_date', value=modifyEvent?modifyEvent.date:'')
        span Lien
        input(type='text', name='event_link', size='35', value=modifyEvent?modifyEvent.link:'')
      div
        p text fr
        textarea(name='event_text', rows='7', style='width:50%')
          !=modifyEvent?modifyEvent.text:''
        p text2 fr
        textarea(name='event_text2', rows='10', style='width:50%')
          !=modifyEvent?modifyEvent.text2:''
        p text en
        textarea(name='event_text_en', rows='7', style='width:50%; resize:none')
          !=modifyEvent?modifyEvent.text_en:''
        p text2 en
        textarea(name='event_text2_en', rows='10', style='width:50%; resize:none')
          !=modifyEvent?modifyEvent.text2_en:''

      input(type='submit', name='agenda_submit', value='Sauvegarder')
`

module.exports = {
  PreLoad,
  pug,
}
