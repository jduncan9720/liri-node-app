require("dotenv").config();
var axios = require("axios");
var fs = require("fs");
var nodeArgs = process.argv;

var Spotify = require("node-spotify-api")
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var songName = "";

for (var i = 2; i < nodeArgs.length; i++) {

  if (i > 2 && i < nodeArgs.length) {
    songName = songName + "+" + nodeArgs[i];
  } else {
    songName += nodeArgs[i];
  }
}
spotify.search({ type: 'track', query: songName, limit: 1 }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  } 
console.log(JSON.stringify(data.tracks.items[0].artists[0].name));
console.log(JSON.stringify(data.tracks.items[0].name));
console.log(JSON.stringify(data.tracks.items[0].preview_url));
console.log(JSON.stringify(data.tracks.items[0].album.name));
});










// var fsdata = fs.readFileSync("/random.txt");
// var artistQueryUrl = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=trilogy"
// var artistName = "Bad Omens";
// var movieQueryUrl =
// var movieName = "";