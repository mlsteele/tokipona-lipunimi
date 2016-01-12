"use strict";

var Dictionary = require("./dictionary.js");
var _ = require("../vendor/lodash.min.js");

var colors = {
  lightOrange: "hsl(30, 100%, 85%)",
  lightBlue: "hsl(175, 50%, 93%)",
  lightGrey: "hsl(0, 0%, 30%)",
}

var Root = React.createClass({
  getInitialState: function(){
    // TODO(miles): start with clear state.
    return { query: "good" };
  },

  _setQuery: function(query) {
    this.setState({ query: query });
  },

  _onInputChange(event) {
    this._setQuery(event.target.value);
  },

  render: function() {
    var entries = Dictionary.search(this.state.query)
    var entryElements = entries.map(function(entry, i) {
      var key = simpleHash(entry.toki);
      return <WordEntry key={entry.toki} i={i}
              eng={entry.eng} toki={entry.toki} score={entry.score} />
    });

    var instructions = null;
    if (this.state.query.length == 0) {
      instructions = <div style={_.extend({}, this.styles.subtext, {width: 350})}>
        Enter a word or phrase in English or Toki Pona.
      </div>;
    }

    var nomatch = null;
    if (this.state.query.length > 0 && entries.length == 0) {
      nomatch = <div style={_.extend({}, this.styles.subtext, {width: 150})}>
        No matching words.
      </div>;
    }

    return <div>
      <div style={this.styles.inputWrap}>
        <input style={this.styles.tpinput} autoFocus type="text" onChange={this._onInputChange} />
      </div>
      {instructions}
      {nomatch}
      {entryElements}
    </div>;
  }
});

Root.prototype.styles = {
  inputWrap: {
    width: "100%",
    padding: 10,
    backgroundColor: colors.lightOrange,
    marginBottom: 10,
  },
  tpinput: {
    display: "block",
    borderWidth: 1,
    borderColor: "black",
    width: 180,
    height: 30,
    fontSize: "20px",
    padding: "5px 7px",
    margin: "0 auto",
  },
  subtext: {
    fontFamily: "'Open Sans', sans-serif",
    fontSize: "16px",
    margin: "0 auto",
    color: colors.lightGrey,
    paddingTop: 10,
  },
};

var WordEntry = React.createClass({
  propTypes: {
    eng: React.PropTypes.string.isRequired,
    toki: React.PropTypes.string.isRequired,
    score: React.PropTypes.number.isRequired,
    i: React.PropTypes.number.isRequired
  },

  render: function() {
    var boxStyle = this.styles.box;
    if (this.props.i % 2 === 0) {
      boxStyle = _.extend({}, this.styles.box, this.styles.even);
    }

    return <div style={boxStyle}>
      <p style={this.styles.toki}>{this.props.toki}</p>
      <p style={this.styles.eng}>{this.props.eng}</p>
    </div>;
  }
});

WordEntry.prototype.styles = {
  box: {
    padding: "15px 25px",
    width: "80%",
    margin: "5px auto",
    borderBottom: "1px solid #444",
  },
  toki: {
    color: colors.lightGrey,
    fontFamily: "'Open Sans', sans-serif",
    fontWeight: 600,
    margin: 0,
    padding: 0
  },
  eng: {
    color: colors.lightGrey,
    fontFamily: "'Open Sans', sans-serif",
    margin: 0,
    padding: 0
  },
  even: {
    // backgroundColor: colors.lightBlue,
  }
}

document.addEventListener("DOMContentLoaded", function(event) {
  ReactDOM.render(
      <Root />,
      document.getElementById("react-container")
  );
});

var simpleHash = function(x) {
  var hash = 0, i, chr, len;
  if (x.length === 0) return hash;
  for (i = 0, len = x.length; i < len; i++) {
    chr   = x.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};
