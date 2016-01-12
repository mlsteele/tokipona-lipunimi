var Dictionary = require("./dictionary.js");

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
    var entryElements = entries.map(function(entry) {
      var key = simpleHash(entry.toki);
      return <WordEntry key={entry.toki} eng={entry.eng} toki={entry.toki} />
    });

    return <div>
      <input autoFocus type="text" onChange={this._onInputChange} />
      <span>{this.state.query}</span>
      {entryElements}
    </div>;
  }
});

var WordEntry = React.createClass({
  propTypes: {
    eng: React.PropTypes.string.isRequired,
    toki: React.PropTypes.string.isRequired
  },

  render: function() {
    return <div><b>{this.props.toki} </b>{this.props.eng}</div>;
  }
});

document.addEventListener("DOMContentLoaded", function(event) {
  function log(e) {
    console.log(e.target.value);
  };

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
