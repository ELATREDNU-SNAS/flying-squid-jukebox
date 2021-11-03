const nbsReader = require ("nbs-reader");

module.exports.server = (serv) => {
  console.log(this);
    opened = nbsReader('example.nbs')
    console.log(opened.Notes);
beginningtick = 0

instruments = [
  'note.harp', //Piano (Air)
  'note.bass', //Double Bass (Wood)
  'note.bd', //Bass Drum (Stone)
  'note.snare', //Snare Drum (Sand)
  'note.hat', //Click (Glass)
  'note.guitar', //Guitar (Wool)                   
  'note.flute', //Flute (Clay)                       
  'note.bell', //Bell (Block of Gold)                 
  'note.chime', //Chime (Packed Ice)                   
  'note.xylophone', //Xylophone (Bone Block)           
  'note.iron_xylophone', //Iron Xylophone (Iron Block) 
  'note.cow_bell', //Cow Bell (Soul Sand)             
  'note.didgeridoo', //Didgeridoo (Pumpkin)            
  'note.bit', //Bit (Block of Emerald)              
  'note.banjo', //Banjo (Hay)                         
  'note.pling', //Pling (Glowstone)
]

tempo = Math.ceil(opened.Tempo/20)

serv.on('tick', (e) => {


opened.Notes.forEach((item, i) => {
  if ((i*tempo) == Math.floor((serv.tickCount - beginningtick)) ) {

    item.forEach((inst, t) => {
if (inst.Inst <= instruments.length) {

        pitchNew = 63 * Math.pow(2,((((inst.Key - 33) + (inst.Pitch / 100)) - 12) / 12))
if (pitchNew > 255) {
  pitchNew = 255
}

serv.players.forEach((player, i) => {

        player._client.write('named_sound_effect', {
                 soundName: instruments[inst.Inst],
                 soundCategory: 0,
                 x: player.position.x,
                 y: player.position.y + 1,
                 z: player.position.z,
                 volume: inst.Velocity,
                 pitch:  pitchNew//63
               })

               });
}


    });

    if (i == opened.Length) {
      beginningtick = serv.tickCount
    }

  }

});


})


}
