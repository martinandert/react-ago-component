var assert      = require('assert');
var React       = require('react');
var counterpart = require('counterpart');
var Ago         = React.createFactory(require('./'));
var render      = React.renderToString;
var date        = new Date('Sat Mar 06 1976 04:05:09 GMT+0100 (CET)');

// opt-in library translations
counterpart.registerTranslations('de', require('counterpart/locales/de'));
counterpart.registerTranslations('de', require('damals/locales/de'));

describe('The Ago component', function() {
  it('transfers props', function() {
    var props  = { className: 'foo' };
    var markup = render(Ago({ className: 'foo' }));

    assert.matches(/^<time [^>]*?class="foo"/, markup);
  });

  it('renders a datetime attribute', function() {
    var markup = render(Ago({ date: date }));
    assert.matches(/\sdatetime="1976-03-06T04:05:09\+01:00"/, markup);
  });

  it('renders a title attribute', function() {
    var markup = render(Ago({ date: date }));
    assert.matches(/\stitle="Sat, 6 Mar 1976 04:05"/, markup);
  });

  it('renders the time ago in words as inner HTML', function() {
    var markup = render(Ago({ date: date }));
    assert.matches(/>[^>]*?\d+ years ago<\/time>/, markup);
  });

  it('allows rendering in a different locale', function() {
    counterpart.withLocale('de', function() {
      var markup = render(Ago({ date: date }));

      assert.matches(/6\. Mär/, markup);
      assert.matches(/\d+ Jahre?/, markup);
    });
  });

  it('works with milliseconds since Unix epoch', function() {
    var markup = render(Ago({ date: date.valueOf() }));
    assert.matches(/\sdatetime="1976-03-06T04:05:09\+01:00"/, markup);
  });

  it('works with string dates', function() {
    var markup = render(Ago({ date: date.toISOString() }));
    assert.matches(/\sdatetime="1976-03-06T04:05:09\+01:00"/, markup);
  });

  it('is cool', function() {
    assert(true);
  });
});



// spec helpers

assert.matches = function(regexp, value, message) {
  if (!regexp.test(value)) {
    assert.fail(value, regexp, message, '=~');
  }
};

assert.doesNotMatch = function(regexp, value, message) {
  if (regexp.test(value)) {
    assert.fail(value, regexp, message, '!~');
  }
};

// raise React console warnings as failed assertions
console.warn = function(message) {
  assert(false, message);
};
