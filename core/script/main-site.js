
let njb_headjs_load_css = () => {

  head.load([
    'base',
    'text',
  ].map(e => '/data/build/css/' + e + '.min.css'))

  head.load('/data/build/css/jplayer.blue.monday.min.css')

}

let njb_headjs_load_lib = () => {

  head.load([
    '/data/build/js/jplayer/jquery.jplayer.min.js',
    '/data/build/js/jplayer/jplayer.playlist.min.js',
    '/data/build/js/jplayer/jplayer2.min.js',
    '/data/build/js/jplayer/jplayer3.min.js',
  ])

}
