var jPlayerPlaylists = jPlayerPlaylists || []

jPlayerPlaylists.push({
  cssSelector: {
    jPlayer: "#jquery_jplayer_2",
    cssSelectorAncestor: "#jp_container_2"
  },
  playlist: [
    {
      title:"Mozart, quatuor avec pianoforte K.478, Allegro",
      mp3:"/data/mp3/QuatuorPianoforteK.478,Allegro.mp3"
    },
    {
      title:"Mozart, quatuor avec pianoforte K.493, Larghetto",
      mp3:"/data/mp3/QuatuorPianoforteK.493,Larghetto.mp3"
    },
    {
      title:"Mozart, quatuor avec pianoforte K.493, Finale",
      mp3:"/data/mp3/QuatuorPianoforteK.493,Finale.mp3"
    }
  ],
  options: {
    supplied: "mp3",
    wmode: "window",
    useStateClassSkin: true,
    autoBlur: false,
    smoothPlayBar: true,
    keyEnabled: false,
  },
  reloadOnPageUpdate: true,
})