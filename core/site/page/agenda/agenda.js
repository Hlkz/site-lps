import common from '../../../njb/common'
import db from '../../../njb/database'

function Load(req, res, isContent) { return new Promise((resolve, reject) => {
  let agenda = []
  let locale = req.locale
  db.query('SELECT id, date, ?? AS text, ?? AS text2, link FROM lps_agenda WHERE date >= CURRENT_DATE() ORDER BY date ASC',
    locale.locField('text_en', 'text'), locale.locField('text2_en', 'text2'),
    function(err, rows) {
    if (!err) {
      rows.forEach(event => {
        const date = new Date(event['date'])
        const dateHTML = locale.getDay(date.getDay())+' '+date.getDate()+' '+locale.getMonth(date.getMonth())+' '+date.getFullYear()
        agenda.push({
          id: event['id'],
          date: dateHTML,
          text: common.textToHTML(event['text']),
          text2: common.textToHTML(event['text2']),
          link: event['link']
        })
      })
    }
    res.setData('agenda', agenda)
    resolve()
  })
})}

let pug = `

style.
  .agenda {
    border-bottom: 1px solid;
    margin: 0 0 20px 0;
    padding: 0 0 12px 0;
  }

.align.main-content
  #lmenu.ul.align-reset-h
    li: !=t.getPageLink('agenda')
    li: !=t.getPageLink('agenda1')

  .page-content-m
    each event in agenda
      .agenda(id='agenda-event-'+event.id)
        b=event.date
        - if (admin)
          a(href='admin/agenda?modify_event_id='+event.id)  Edit
          a(href='admin/agenda?delete_event_id='+event.id)  Delete
        br
        !=event.text
        - if (event.text2 != '' || event.link != '')
          div(id='agenda-toggle-'+event.id).hidden
            - if (event.text2 != '')
              br
              !=event.text2
            - if (event.link != '')
              br
              !=t.getLink(event.link, 'organizer-website', true)
          br
          !=t.getToggleDivLink('agenda-toggle-'+event.id, 'readmore', 'reduce')
`

module.exports = {
  Load,
  pug,
}
