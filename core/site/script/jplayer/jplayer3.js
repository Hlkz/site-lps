var jPlayerPlaylists = jPlayerPlaylists || []

jPlayerPlaylists.push({
  cssSelector: {
    jPlayer: "#jquery_jplayer_3",
    cssSelectorAncestor: "#jp_container_3"
  },
  playlist: [
    {
      title:"Mozart concerto pour piano forte n°13 K.415, Andante",
      mp3:"/data/mp3/MozartConcertoDoMvtLent.mp3"
    },
    {
      title:"Mozart, concerto pour pianoforte n°14 K.449, Vivace",
      mp3:"/data/mp3/MozartConcertoMib1erMvt.mp3"
    },
    {
      title:"Mozart, concerto pour pianoforte n°27 K595, Finale allegro",
      mp3:"/data/mp3/MozartConcertoSib3eMvt.mp3"
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
