# flying-squid-nbs
Allows the .nbs file format to run on flying squid
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
```
