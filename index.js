const nbsReader = require ("nbs-reader");

class Song {
  constructor(file, serv, speed) {
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
this.tempoOffset = 20
if (speed > 0) {
  this.tempoOffset = speed
}
this.tempo = Math.ceil(this.currentSong.Tempo/this.tempoOffset)

this.currentTick = 0

this.serv = serv;
  }

  play() {
    this.serv.on("tick", (e) => {
  this.currentSong.Notes.forEach((item, i) => {
    if (i * this.tempo == Math.floor(this.serv.tickCount - this.currentTick)) {
      item.forEach((inst, t) => {
        if (inst.Inst <= this.instruments.length) {
          this.currentPitch = 63 * Math.pow(2, (inst.Key - 33 + inst.Pitch / 100 - 12) / 12);
          if (this.currentPitch > 255) {
            this.currentPitch = 255;
          }

          this.serv.players.forEach((player, i) => {
            player._client.write("named_sound_effect", {
              soundName: this.instruments[inst.Inst],
              soundCategory: 0,
              x: player.position.x + 0.1,
              y: player.position.y,
              z: player.position.z + 0.1,
              volume: inst.Velocity,
              pitch: this.currentPitch,
            });
          });
        }
      });

      if (i == this.currentSong.Length) {
        this.currentTick = this.serv.tickCount;
      }
    }
  });
});

  }

  pause() {
    this.serv.on("tick", (e) => {
      this.currentTick = this.currentTick - 1
      if (this.currentTick < 0) {
        this.currentTick = 0
      }
    });
  }

  updateSpeed(speedValue) {
    this.tempoOffset = speedValue
  }
}


//EXAMPLE: exampleSong = new Song("example.nbs");


module.exports = Song;
