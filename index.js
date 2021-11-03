const nbsReader = require ("nbs-reader");

module.exports.player = (player, serv) => {
    player.opened = nbsReader('necron.nbs')
    //console.log(player.opened);
player.beginningtick = serv.tickCount
tps = 1//13.25

/*
note.bass
note.bassattack
note.bd
note.harp
note.hat
note.pling
note.snare
*/


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
//read https://opennbs.org/nbs // create new array of notes
serv.on('tick', (e) => {
player.opened.Notes.forEach((item, i) => {
  if (i == Math.floor((serv.tickCount - player.beginningtick)) ) {
    //console.log(i);
    item.forEach((inst, t) => {
if (inst.Inst <= instruments.length) {
        //console.log(inst);
        player._client.write('named_sound_effect', {
                 soundName: instruments[inst.Inst],
                 soundCategory: 0,
                 x: player.position.x,
                 y: player.position.y,
                 z: player.position.z,
                 volume: 100,
                 pitch: 40 + inst.Key //63
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
