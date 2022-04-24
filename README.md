Allows the .nbs file format to run on flying squid.

Place in the plugins folder

Example use:
```
const Song = require('./flying-squid-jukebox/index.js')

module.exports.server = function (serv) {
let song = new Song('example.nbs', serv, 20) // 20 is the default tempo

song.play()
}
```

To change the tempo after the song has begun
```
song.updateSpeed(30)
=======
Plays music in the .nbs format within a flying-squid server.

Use example:
```
exampleSong = new Song("example.nbs");

exampleSong.play()
