/** @jsx React.DOM */

var React = require('react');
var Ago   = require('../');

var App = React.createClass({
  render: function() {
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>React Ago Component</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>

        <body>
          <Ago />
        </body>
      </html>
    );
  }
});

if (typeof window !== 'undefined') {
  window.onload = function() {
    React.renderComponent(<App />, document);
  }
}

module.exports = App;
