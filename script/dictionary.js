var data = require("./tokipona.js");
var _ = require("../vendor/lodash.min.js");

var RESULT_LIMIT = 10;

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

// Search backends.
backends = {};

// Lunr backend.
backends.lunr = function() {
  var index = lunr(function() {
    this.field("toki", { boost: 10 });
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
    sufficient: RESULT_LIMIT,
  });

  engine.initialize();

  return function search(query) {
    result = null;
    engine.search(query, function(datums) {
      result = datums;
    });
    return result.slice(0, RESULT_LIMIT);
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

  return function search(query) {
    return fuse.search(query).slice(0, RESULT_LIMIT).map(function(res) {
      res.item.score = res.score;
      return res.item;
    });
  };
};

// The search backends to not seem to grant the appropriate degree of esteem to
// exact matches. For example, 'mi' yields 'lawa', 'li', etc. but 'mi' isn't even
// in the results!
// This function wraps a search function and promotes exact matches on the toki to the top.
function patchSearch(underlyingSearch) {
  var isNotEmptyString = function(s) {
    return s.length !== 0;
  };

  var normalize = function(s) {
    return s.toLowerCase().split(/[\W+]/).filter(isNotEmptyString).join("");
  };

  var exactMatcher = function(query) {
    var normQuery = normalize(query);
    return function match(entry) {
      return normalize(entry.toki) == normQuery;
    }
  }

  var search = function(query) {
    var underlyingResults = underlyingSearch(query);
    var matcher = exactMatcher(query);
    var exactResults = data.filter(matcher);
    var inexactResults = underlyingResults.filter(function(entry) {
      return !matcher(entry);
    });
    return exactResults.concat(inexactResults).slice(0, RESULT_LIMIT);
  }

  return search;
}

exports.init = function(backendName) {
  exports.search = patchSearch(backends[backendName]());
}

exports.search = function() {
  console.error("Run init to select a backend before using the dictionary.");
  console.log("The available backends are:");
  for (var bn in backends) {
    console.log(bn);
  }
}
