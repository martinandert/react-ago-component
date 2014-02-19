'use strict';

var React     = require('react');
var timeAgo   = require('damals');
var localize  = require('globalization').localize;
var strftime  = require('globalization/strftime');

function isString(value) {
  return Object.prototype.toString.call(value) == '[object String]';
}

function isNumber(value) {
  return Object.prototype.toString.call(value) == '[object Number]';
}

var Ago = React.createClass({
  displayName: 'Ago',

  getDefaultProps: function() {
    return { date: new Date(), tooltipFormat: "default" };
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
