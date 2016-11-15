$(document).ready(function(){
  new jPlayerPlaylist({
    jPlayer: "#jquery_jplayer_1",
    cssSelectorAncestor: "#jp_container_1"
  }, [
    {
      title:"Mozart, quatuor avec pianoforte K.478, Allegro",
      mp3:"/data/mp3/QuatuorPianoforteK.478,Allegro.mp3"
    },
    {
      title:"Mozart, quatuor avec pianoforte K.493, Larghetto",
      mp3:"/data/mp3/QuatuorPianoforteK.493,Larghetto.mp3"
    },
    {
      title:"Mozart, concerto n° 27 K.595, Vivace",
      mp3:"/data/mp3/MozartConcertoSib3eMvt.mp3"
    }
  ], {
    supplied: "mp3",
    wmode: "window",
    useStateClassSkin: true,
    autoBlur: false,
    smoothPlayBar: true,
    keyEnabled: false
  });
});
