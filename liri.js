require("dotenv").config();

var axios = require("axios");

var fs = require("fs");
var fsdata = fs.readFileSync("/random.txt");

var Spotify = require("node-spotify-api")
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var artistQueryUrl = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=trilogy"
var artistName = "Bad Omens";

var songQueryUrl =
var songName = "";

var movieQueryUrl =
var movieName = "";

axios
    .get(artistQueryUrl)

.then(function(response) {
  console.log(response.data)
})