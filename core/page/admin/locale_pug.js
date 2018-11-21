import common from '../../../njb/common'
import db from '../../../njb/database'
import locale from '../../../njb/locale'

let table_njb_t = {
  database: 'lps',
  name: 'njb_locale_pug',
  keys: ['page', 'name'],
  fields: ['page', 'name', 'fr', 'en']
}

function Load(req, res, isContent) { return new Promise((resolve, reject) => {
  if (!req.session.admin) {
    res.status(404).end()
    return
  }

  let post = req.body
  let get = req.query

  if (post && post.locale_submit) {
    let row = {
      page: post.locale_page,
      name: post.locale_name,
      fr: post.locale_fr,
      en: post.locale_en
    }

    db.deleteFrom(table_njb_t, row, function(err) {
      if (!err) {
        db.insert(table_njb_t, row, function(err) {
          locale.loadContent(row.page, true).then(() => {})
          if (!err)
            res.redirect(req.headers.referer)
        })
      }
    })
  }
  else if (get && (get.delete_locale_page || get.delete_locale_name)) {
    let row = {
      page: get.delete_locale_page,
      name: get.delete_locale_name
    }
    db.deleteFrom(table_njb_t, row, function(err) {
      if (!err) {
       locale.loadContent(row.page, true).then(() => {})
        res.redirect('/admin/locale_pug')
      }
    })
  }
  else {
    db.query('SELECT DISTINCT pages.name, pages.fr FROM njb_pages as pages, njb_locale_pug as loc WHERE pages.name = loc.page', function(err, rows) {
      if (!err) {
        res.setData('allpages', rows.map(row => { return { name: row.name, fr: row.fr } }))
        let page = (get && get.page) ? get.page : ''
        let table = []
        db.query('SELECT page, name, fr, en FROM njb_locale_pug WHERE page = ? ORDER BY page, name', page, function(err, rows) {
          if (!err) {
            rows.forEach(t => {
              table.push({
                page: t['page'],
                name: t['name'],
                fr: t['fr'],
                en: t['en']
              })
            })
          }
          res.setData('table', table)
          resolve()
        })
      }
    })
  }
})}

let pug = `

.align.main-content
  #lmenu-big.ul.align-reset-h
    li: a(href='/admin/locale_pug') Général
    each page in allpages
      li: a(href='/admin/locale_pug?page='+page.name)
        !=page.fr+' => '+page.name

  .page-content
    each item in table
      form(name='locale-edit-form', method='post')
        div
          span page
          input.border(type='text', name='locale_page', size='35', value=item.page)
          span name
          input.border(type='text', name='locale_name', size='35', value=item.name)
        div
          p fr
          textarea.border(name='locale_fr', rows='7', style='width:50%')
            !=item.fr
          p en
          textarea.border(name='locale_en', rows='7', style='width:50%')
            !=item.en

        input(type='submit', name='locale_submit', value='Sauvegarder')
        a(href='/admin/locale_pug?delete_locale_page='+item.page+'&delete_locale_name='+item.name)  Delete
        br
        br
        br
        br
    br
    p NEW ENTRY
    form(name='locale-edit-form', method='post')
      div
        span page
        input.border(type='text', name='locale_page', size='35')
        span name
        input.border(type='text', name='locale_name', size='35')
      div
        p fr
        textarea.border(name='locale_fr', rows='7', style='width:50%')
        p en
        textarea.border(name='locale_en', rows='7', style='width:50%')

      input(type='submit', name='locale_submit', value='Sauvegarder')
`

module.exports = {
  Load,
  pug,
}
