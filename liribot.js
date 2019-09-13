// =========================Variable Definition=================================//
require("dotenv").config();

const keys = require("./keys.js");
const axios = require("axios");
let Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify);
const moment = require('moment');
const fs =  require('fs');


// ===========================================================
// Define a new object with two passing argument Array with index 2 & 3//
app(process.argv[2], process.argv[3]);

// ==============================FUNCTION DEFINITION==================================

function app(command, params) {
switch (command) {
case "concert-this":
getMyBands(params);
break;

case "movie-this":
getMovie(params);
break;

case "spotify-this-song":
spotifysong(params);
break;

case "spotify-this-song":
whatToDO(params);
break;

default: 
console.log("liri does not know that command, please try again");
break;
}    
}

// ================Bands================//


function getMyBands(artist) {
const queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

axios.get(queryURL).then(function (response) {
console.log("up coming concerts for " + artist + ":");
for (let i = 0; i < response.data.length; i++) {
const show = response.data[i].venue;

console.log( JSON.stringify(
show.city + ", " + (show.region || show.country) + " at " + 
show.name + " " + moment(show.datetime).format("hh:mn a, MM/DD/YYYY")));
console.log("~~~~~~~~~COMING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~NEAR~~~~~~~~~~~~~~~~~~~~~~~~~~~YOU~~~~~~~~~~~~~~~~~~~~~~~");

}
})
}
// ================MOVIE================//

function getMovie(movie) {
const queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=6c61d62c";

axios.get(queryURL).then(function(response) {
var data = response.data;
console.log("Title: ", data.Title);      
console.log("Year: ", data.Year);      
console.log("Rated: ", data.Rated);      
console.log("IMDB Rating: ", data.imdbRating);      
console.log("Country: ", data.Country);      
console.log("Language: ", data.Language);      
console.log("Plot: ", data.Plot);      
console.log("Actors: ", data.Actors); 
data.Ratings.map(getRottenTomatoes);
console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");     
});
function getRottenTomatoes(tomatoes) {
if(tomatoes.Source === "Rotten Tomatoes"){
console.log("Rotten Tomatoes Rating: ", tomatoes.Value);
};
};
};

// ================spotify================//
function spotifysong(song) {
if(!song){
song = "Backstreet Boys";
} 
spotify
.search({ type: "track", query: song })
.then(function(response) {
console.log(song);
for(let i = 0; i < 5; i++) {

console.log("Artist: " + response.tracks.items[i].artists[0].name),
console.log("Song: " + response.tracks.items[i].album.name),
console.log("Album: " + response.tracks.items[i].Album),
console.log("PreviewSong: " + response.tracks.items.Preview_URL),
console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");     

};
})
.catch(function(err) {
console.log(err);
});
}


// ================LIRI LIRI================//

function whatToDO(){
fs.readFile('random.txt', 'utf8', function(err, data){
if (err){ 
return console.log(err);
}
var dataArr = data.split(',');
UserInputs(dataArr[0], dataArr[1]);
});
}



















