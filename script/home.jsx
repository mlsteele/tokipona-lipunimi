"use strict";

var _ = require("../vendor/lodash.min.js");
var Dictionary = require("./dictionary.js");
Dictionary.init(getQueryParameter("backend") || "bloodhound");

var colors = {
  lightOrange: "hsl(30, 100%, 85%)",
  lightBlue: "hsl(175, 50%, 93%)",
  lightGrey: "hsl(0, 0%, 30%)",
}

var Root = React.createClass({
  getInitialState: function(){
    return { query: "" };
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
              eng={entry.eng} toki={entry.toki} />
    });

    var instructions = null;
    if (this.state.query.length == 0) {
      instructions = <div style={_.extend({}, this.styles.subtext, {maxWidth: 350})}>
        Enter a word or phrase in English or Toki Pona.
      </div>;
    }

    var nomatch = null;
    if (this.state.query.length > 0 && entries.length == 0) {
      nomatch = <div style={_.extend({}, this.styles.subtext, {maxWidth: 150})}>
        No matching words.
      </div>;
    }

    return <div>
      <div style={this.styles.inputWrap}>
        <input style={this.styles.tpinput} autoFocus type="text" onChange={this._onInputChange} />
        <About url={"https://github.com/mlsteele/tokipona-lipunimi"} />
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
    padding: "10px 10px",
    backgroundColor: colors.lightOrange,
    marginBottom: 10,
    textAlign: "center",
  },
  tpinput: {
    display: "inline-block",
    borderWidth: 1,
    borderColor: "black",
    maxWidth: 230,
    height: "1.4em",
    fontSize: "1.4em",
    padding: "5px 7px",
    margin: "0 auto",
  },
  subtext: {
    fontFamily: "'Open Sans', sans-serif",
    fontSize: "16px",
    margin: "0 auto",
    color: colors.lightGrey,
    padding: 10,
    paddingTop: 10,
  },
};

var WordEntry = React.createClass({
  propTypes: {
    eng: React.PropTypes.string.isRequired,
    toki: React.PropTypes.string.isRequired,
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

var About = React.createClass({
  propTypes: {
    url: React.PropTypes.string.isRequired,
  },

  render: function() {
    return <a href={this.props.url}>
      <div style={this.styles.box}>
        <span>?</span>
      </div>
    </a>;
  },
});

About.prototype.styles = {
  box: {
    float: "right",
    width: 23,
    height: 23,
    textAlign: "center",
    borderRadius: 50,
    padding: 10,
    margin: 0,
    marginRight: 20,
    backgroundColor: "hsla(0, 0%, 100%, 0.5)",
    fontSize: "23px",
    lineHeight: 1,
    color: "hsl(0, 0%, 50%)",
  }
};

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

function getQueryParameter(name) {
  // https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
