/** @jsx React.DOM */

'use strict';

var counterpart = require('counterpart');
var React       = require('react');
var Translate   = require('react-translate-component');
var Ago         = require('../');

// on-demand library translations
counterpart.registerTranslations('de', require('counterpart/locales/de'));
counterpart.registerTranslations('de', require('damals/locales/de'));

// our app's translations
counterpart.registerTranslations('en', require('./locales/en'));
counterpart.registerTranslations('de', require('./locales/de'));

var LocaleSwitcher = React.createClass({
  handleChange: function(e) {
    counterpart.setLocale(e.target.value);
  },

  render: function() {
    return (
      <p>
        <Translate>example.switch_locale</Translate>

        <select defaultValue={counterpart.getLocale()} onChange={this.handleChange}>
          <option>en</option>
          <option>de</option>
        </select>
      </p>
    );
  }
});

var App = React.createClass({
  render: function() {
    var timestamp = new Date(this.props.serverTime);

    // here it comes:
    var ago = <Ago date={timestamp} autoUpdate={true} tooltipFormat="long" />;

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
          <Translate ago={ago} component={React.DOM.h1} scope="example">this_page_was_requested</Translate>

          <Translate component={React.DOM.p} scope="example">auto_update_hint</Translate>
          <Translate component={React.DOM.p} scope="example">tooltip_hint</Translate>

          <LocaleSwitcher />
        </body>
      </html>
    );
  }
});

if (typeof window !== 'undefined') {
  window.onload = function() {
    var serverTime = new Date(parseInt(document.cookie.split('serverTime=')[1].split(';')[0]));

    React.renderComponent(<App serverTime={serverTime} />, document);
  };
}

module.exports = App;
