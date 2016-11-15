
function PreLoad(req, res, isContent) { return new Promise((resolve, reject) => {
  if (req.body.title) {
    console.log("HEY", req.body.title)
    //res.redirect('/')
  }
  resolve()
})}

let pug = `

.main-content.hexpand.align.plr
  .content-box.w100.hexpand
    p Page or View editor
    br
    form.hexpand(name='editor-form', method='post')
      .block
        span.label Title 
        input(type='text', size='35')
        span.label Language 
        input(type='text', size='4')
        span.label Pug File 

      .hMAXh.hCenter
        textarea(name='content', style='width:50%; resize:none')
        textarea(name='content', style='width:50%; resize:none')

      input(type='submit', value='add')
`

module.exports = {
  PreLoad,
  pug,
}
