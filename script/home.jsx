var Dictionary = require("./dictionary.js");

var Root = React.createClass({
  getInitialState: function(){
    // TODO(miles): start with clear state.
    return { query: "times" };
  },

  _setQuery: function(query) {
    this.setState({ query: query });
  },

  _onInputChange(event) {
    this._setQuery(event.target.value);
  },

  render: function() {
    var entries = Dictionary.search(this.state.query)
    var entryElements = entries.map(function(entry) {
      var key = simpleHash(entry.toki);
      return <WordEntry key={entry.toki} eng={entry.eng} toki={entry.toki} score={entry.score} />
    });

    var instructions =
      <span>Enter a word or phrase in English or Toki Pona.</span>;
    if (entries.length > 0) {
      instructions = null;
    }

    return <div>
      <input autoFocus type="text" onChange={this._onInputChange} />
      {instructions}
      {entryElements}
    </div>;
  }
});

var WordEntry = React.createClass({
  propTypes: {
    eng: React.PropTypes.string.isRequired,
    toki: React.PropTypes.string.isRequired,
    score: React.PropTypes.number.isRequired
  },

  render: function() {
    return <div><b>{this.props.toki} </b><br/>{this.props.eng}</div>;
  }
});

document.addEventListener("DOMContentLoaded", function(event) {
  ReactDOM.render(
      <Root />,
      document.getElementById("react-container")
  );
});

var simpleHash = function() {
  var hash = 0, i, chr, len;
  if (this.length === 0) return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};
