var data = require("./tokipona.js");

// Find duplicates.
(function() {
  // https://stackoverflow.com/questions/840781/easiest-way-to-find-duplicate-values-in-a-javascript-array
  var arr = data.map(function(entry) {return entry.toki.toLowerCase()});
  var sorted_arr = arr.sort();
  var results = [];
  for (var i = 0; i < arr.length - 1; i++) {
      if (sorted_arr[i + 1] == sorted_arr[i]) {
          results.push(sorted_arr[i]);
      }
  }

  if (results.length > 0) {
    console.warn("Duplicate toki entries in dictionary.");
    console.log(results);
  }
})()

var fuse = new Fuse(data, {
  caseSensitive: false,
  includeScore: false,
  shouldSort: true,
  threshold: 0.2,
  location: 0,
  distance: 10000,
  maxPatternLength: 128,
  keys: ["eng", "toki"]
});

exports.search = function(query){
  return fuse.search(query).slice(0, 10);
};

/*
var score = function(query, entry) {
  var toki_words = [entry.toki.toLowerCase()]
      .filter(isNotEmptyString)
      .map((s) => s.trim());
  var eng_words = entry.eng.toLowerCase().split(/[,!?]/)
      .filter(isNotEmptyString)
      .map((s) => s.trim());

  var score = 0;

  if (arrayContains(toki_words, query)) {
    score += 1;
  }

  if (arrayContains(eng_words, query)) {
    score += 1;
  }

  return score;
}
*/

var arrayContains = function(array, value) {
  return array.indexOf(value) > -1;
}

var isNotEmptyString = function(s) {
  return s.length !== 0;
}

// exports.search = function(query){
//   // Rank and sort each entry.
//   // Discard entries with 0 score.

//   return data.map(function(entry) {
//     return {
//       entry: entry,
//       score: score(query, entry)
//     };
//   }).filter(function(pair) {
//     return pair.score > 0;
//   }).sort(function(a, b) {
//     if (a.score < b.score) return -1;
//     if (a.score > b.score) return 1;
//     return 0;
//   }).map(function(pair) {
//     return pair.entry;
//   });
// };
