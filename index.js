'use strict';

var React       = require('react');
var timeAgo     = require('damals');
var counterpart = require('counterpart');
var strftime    = require('counterpart/strftime');
var assign      = require('object-assign');

var toString = Object.prototype.toString;

function isString(value) {
  return toString.call(value) === '[object String]';
}

function isNumber(value) {
  return toString.call(value) === '[object Number]';
}

var Ago = React.createClass({
  displayName: 'Ago',
  ticker: null,

  getDefaultProps: function() {
    return {
      date: new Date(),
      tooltipFormat: 'default',
      autoUpdate: 0
    };
  },

  componentDidMount: function() {
    if (this.props.autoUpdate) {
      var delay = isNumber(this.props.autoUpdate) ? this.props.autoUpdate * 1000 : 2600;

      this.ticker = setInterval(this.invalidate, delay);
    }

    counterpart.onLocaleChange(this.invalidate);
  },

  componentWillUnmount: function() {
    if (this.ticker) {
      clearInterval(this.ticker);
      this.ticker = null;
    }

    counterpart.offLocaleChange(this.invalidate);
  },

  invalidate: function() {
    this.forceUpdate();
  },

  render: function() {
    var date = this.props.date;

    if (isString(date) || isNumber(date)) {
      date = new Date(date);
    }

    var content   = timeAgo(date);
    var dateTime  = strftime(date, "%Y-%m-%dT%H:%M:%S%z");
    var title     = counterpart.localize(date, { format: this.props.tooltipFormat });

    var props = assign({}, this.props, { dateTime: dateTime, title: title });
    delete props.date;
    delete props.tooltipFormat;
    delete props.autoUpdate;

    return React.DOM.time(props, content);
  }
});

module.exports = Ago;
