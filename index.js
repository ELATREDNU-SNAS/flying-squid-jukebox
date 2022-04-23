const nbsReader = require ("nbs-reader");

module.exports.server = (serv) => {

class Song {
  constructor(file) {
this.currentSong = nbsReader(file)

this.instruments = [
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

this.tempo = Math.ceil(this.currentSong.Tempo/20)

this.currentTick = 0
  }

  play() {
    serv.on("tick", (e) => {
  this.currentSong.Notes.forEach((item, i) => {
    if (i * this.tempo == Math.floor(serv.tickCount - this.currentTick)) {
      item.forEach((inst, t) => {
        if (inst.Inst <= this.instruments.length) {
          currentPitch = 63 * Math.pow(2, (inst.Key - 33 + inst.Pitch / 100 - 12) / 12);
          if (currentPitch > 255) {
            currentPitch = 255;
          }

          serv.players.forEach((player, i) => {
            player._client.write("named_sound_effect", {
              soundName: this.instruments[inst.Inst],
              soundCategory: 0,
              x: player.position.x,
              y: player.position.y + 1,
              z: player.position.z,
              volume: inst.Velocity,
              pitch: currentPitch,
            });
          });
        }
      });

      if (i == this.currentSong.Length) {
        this.currentTick = serv.tickCount;
      }
    }
  });
});

  }

  pause() {
    serv.on("tick", (e) => {
      this.currentTick = this.currentTick - 1
      if (this.currentTick < 0) {
        this.currentTick = 0
      }
    });
  }

}


//EXAMPLE: exampleSong = new Song("example.nbs");



}
