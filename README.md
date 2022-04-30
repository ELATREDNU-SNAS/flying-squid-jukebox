Allows the .nbs file format to run on flying squid.

Place in the plugins folder

Example use:
```js
const Song = require("./flying-squid-jukebox/index.js");

module.exports.server = function (serv) {
  let song = new Song("example.nbs", serv, {
    tempo: 1, //20 is the default tempo
    repeat: true,
  });

  song.play();
};

```

To change the tempo after the song has begun
```
song.updateSpeed(30)
```
