/** @jsx React.DOM */

var React = require('react');
var Ago   = require('../');

var App = React.createClass({
  render: function() {
    var timestamp = new Date(this.props.serverTime);

    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>React Ago Component</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" href="/style.css" />
          <script src="/bundle.js"></script>
        </head>

        <body>
          <h1>This page was requested <Ago date={timestamp} autoUpdate={true} />.</h1>
          <p>In order to see the auto-update, please let some time pass by.</p>
          <p>Hover your mouse over the bold text to see the actual date/time.</p>
        </body>
      </html>
    );
  }
});

if (typeof window !== 'undefined') {
  window.onload = function() {
    var serverTime = new Date(parseInt(document.cookie.split('serverTime=')[1].split(';')[0]));

    React.renderComponent(<App serverTime={serverTime} />, document);
  }
}

module.exports = App;
