'use strict';

var React     = require('react');
var timeAgo   = require('damals');
var localize  = require('globalization').localize;
var strftime  = require('globalization/strftime');

var toString = Object.prototype.toString;

function isString(value) {
  return toString.call(value) == '[object String]';
}

function isNumber(value) {
  return toString.call(value) == '[object Number]';
}

var Ago = React.createClass({
  displayName: 'Ago',

  autoUpdater: null,

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

      this.autoUpdater = setInterval(function() {
        this.forceUpdate();
      }.bind(this), delay);
    }
  },

  componentWillUnmount: function() {
    if (this.autoUpdater) {
      clearInterval(this.autoUpdater);
      this.autoUpdater = null;
    }
  },

  render: function() {
    var date = this.props.date;

    if (isString(date) || isNumber(date)) {
      date = new Date(date);
    }

    var content   = timeAgo(date);
    var dateTime  = strftime(date, "%Y-%m-%dT%H:%M:%S%z");
    var title     = localize(date, { format: this.props.tooltipFormat });

    return this.transferPropsTo(
      React.DOM.time({ dateTime: dateTime, title: title }, content)
    );
  }
});

module.exports = Ago;
