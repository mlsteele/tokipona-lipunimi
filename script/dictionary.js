var data = require("./tokipona.js");
var _ = require("../vendor/lodash.min.js");

// Find and report duplicates in the data.
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

backends = {};

// Lunr backend.
backends.lunr = function() {
  var index = lunr(function() {
    this.field("toki", { boost: 3 });
    this.field("eng");
  });

  var store = {};

  // Load data.
  _.forEach(data, function(entry, i) {
    var doc =  {
      toki: entry.toki,
      eng: entry.eng,
      id: i,
    };
    store[i] = doc;
    index.add(doc);
  });

  return function search(query) {
    var results = index.search(query).map(function(res) {
      return store[res.ref];
    });
    return results;
  };
};

// Bloodhound backend.
backends.bloodhound = function() {
  var isNotEmptyString = function(s) {
    return s.length !== 0;
  }

  var tokenize = function(s) {
    return s.toLowerCase().split(/[\W+]/).filter(isNotEmptyString)
  }

  var queryTokenizer = function(query) {
    return tokenize(query);
  }

  var datumTokenizer = function(datum) {
    return tokenize(datum.toki + "|" + datum.eng);
  }

  var engine = new Bloodhound({
    initialize: false,
    local: data,
    queryTokenizer: queryTokenizer,
    datumTokenizer: datumTokenizer,
    sufficient: 10,
  });

  engine.initialize();

  return function search(query) {
    result = null;
    engine.search(query, function(datums) {
      result = datums;
    });
    return result.slice(0, 10);
  };
};

// Fuse backend.
backends.fuse = function() {
  var fuse = new Fuse(data, {
    caseSensitive: false,
    include: ["score"],
    shouldSort: true,
    threshold: 0.2,
    location: 0,
    distance: 10000,
    maxPatternLength: 128,
    keys: ["eng", "toki"]
  });

  return function search(query){
    return fuse.search(query).slice(0, 10).map(function(res) {
      res.item.score = res.score;
      return res.item;
    });
  };
};

exports.search = backends.lunr();

/* Old custom implementation.
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

var arrayContains = function(array, value) {
  return array.indexOf(value) > -1;
}

var isNotEmptyString = function(s) {
  return s.length !== 0;
}

exports.search = function(query){
  // Rank and sort each entry.
  // Discard entries with 0 score.

  return data.map(function(entry) {
    return {
      entry: entry,
      score: score(query, entry)
    };
  }).filter(function(pair) {
    return pair.score > 0;
  }).sort(function(a, b) {
    if (a.score < b.score) return -1;
    if (a.score > b.score) return 1;
    return 0;
  }).map(function(pair) {
    return pair.entry;
  });
};
*/
