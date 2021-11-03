const nbsReader = require ("nbs-reader");

module.exports.player = (player, serv) => {
    player.opened = nbsReader('necron.nbs')
    console.log(player.opened.Notes);
player.beginningtick = serv.tickCount

instruments = [
  'note.harp', //Piano (Air)
  'note.bass', //Double Bass (Wood)
  'note.bd', //Bass Drum (Stone)
  'note.snare', //Snare Drum (Sand)
  'note.hat', //Click (Glass)
  'note.guitar', //Guitar (Wool)                       //DOESN'T PLAY 1.8.9
  'note.flute', //Flute (Clay)                         //DOESN'T PLAY 1.8.9
  'note.bell', //Bell (Block of Gold)                  //DOESN'T PLAY 1.8.9
  'note.chime', //Chime (Packed Ice)                   //DOESN'T PLAY 1.8.9
  'note.xylophone', //Xylophone (Bone Block)           //DOESN'T PLAY 1.8.9
  'note.iron_xylophone', //Iron Xylophone (Iron Block) //DOESN'T PLAY 1.8.9
  'note.cow_bell', //Cow Bell (Soul Sand)              //DOESN'T PLAY 1.8.9
  'note.didgeridoo', //Didgeridoo (Pumpkin)            //DOESN'T PLAY 1.8.9
  'note.bit', //Bit (Block of Emerald)                 //DOESN'T PLAY 1.8.9
  'note.banjo', //Banjo (Hay)                          //DOESN'T PLAY 1.8.9
  'note.pling', //Pling (Glowstone)
]

serv.on('tick', (e) => {
tempo = Math.ceil(player.opened.Tempo/20)
console.log(tempo);
player.opened.Notes.forEach((item, i) => {
  if ((i*tempo) == Math.floor((serv.tickCount - player.beginningtick)) ) {
    //console.log(i);
    item.forEach((inst, t) => {
if (inst.Inst <= instruments.length) {

        pitchNew = 63 * Math.pow(2,((((inst.Key - 33) + (inst.Pitch / 100)) - 12) / 12))
        
        player._client.write('named_sound_effect', {
                 soundName: instruments[inst.Inst],
                 soundCategory: 0,
                 x: player.position.x,
                 y: player.position.y + 1,
                 z: player.position.z,
                 volume: inst.Velocity,
                 pitch:  pitchNew//63
               })
}


    });

    if (i == player.opened.Length) {
      player.beginningtick = serv.tickCount
    }

  }

});


})


}
