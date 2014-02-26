# React Ago Component

A multi-lingual component for [React][1] that renders the approximate time ago in words from a specific past date using an HTML5 time element. 

Features:

* configurable to auto-update its display as time passes by
* supports localized output (with the help of [Counterpart][2] and [Damals][3])


## Installation

Install via npm:

```bash
% npm install react-ago-component
```


## Usage

Just require and render:

```js
var Ago  = require('react-ago-component');
var then = new Date('Sat Mar 06 1976 04:05:09 GMT+0100 (CET)');

// render component with
Ago({ date: then });  // JSX: <Ago date={then} />
```

This will output something in the likes of

```html
<time datetime="1976-03-06T04:05:09+01:00" title="Sat, 6 Mar 1976 04:05">about 38 years ago</time>
```

The `date` prop can be set to a Date object, a number holding the milliseconds since Unix epoch, or to a string (which will be parsed as a Date).

There is also a `tooltipFormat` prop to configure the verbosity of the HTML title attribute. Valid values are "short", "long", and "default" (somewhere in-between).

If you want your page to auto-update the visible portion of the rendered HTML element as time passes by, just set the `autoUpdate` prop to `true`. You can also provide an update interval (in seconds) by setting the prop's value to a natural number greater than `0`.

## Localization Support

To localize the rendered output for a locale other than "en" (English), load the corresponding translations and set the locale using [Counterpart][2] and [Damals][3]:

```js
counterpart.registerTranslations('de', require('counterpart/locales/de'));
counterpart.registerTranslations('de', require('damals/locales/de'));

counterpart.setLocale('de');
```

When switching locales the Ago component will auto-adjust its output (no page reloading necessary).


## Example

The examples code is located at the `example` directory. You can clone this repository and run `make install example` and point your web browser to
`http://localhost:3000`.


## Contributing

Here's a quick guide:

1. Fork the repo and `make install`.

2. Run the tests. We only take pull requests with passing tests, and it's great to know that you have a clean slate: `make test`.

3. Add a test for your change. Only refactoring and documentation changes require no new tests. If you are adding functionality or are fixing a bug, we need a test!

4. Make the test pass.

5. Push to your fork and submit a pull request.


## Licence

Released under The MIT License.



[1]: http://facebook.github.io/react/
[2]: https://github.com/martinandert/counterpart
[3]: https://github.com/martinandert/damals
