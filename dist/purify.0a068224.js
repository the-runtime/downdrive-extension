// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  externals,
  distDir,
  publicUrl,
  devServer
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        if (externals[name]) {
          return externals[name];
        }
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      if (res === false) {
        return {};
      }
      // Synthesize a module to follow re-exports.
      if (Array.isArray(res)) {
        var m = {__esModule: true};
        res.forEach(function (v) {
          var key = v[0];
          var id = v[1];
          var exp = v[2] || v[0];
          var x = newRequire(id);
          if (key === '*') {
            Object.keys(x).forEach(function (key) {
              if (
                key === 'default' ||
                key === '__esModule' ||
                Object.prototype.hasOwnProperty.call(m, key)
              ) {
                return;
              }

              Object.defineProperty(m, key, {
                enumerable: true,
                get: function () {
                  return x[key];
                },
              });
            });
          } else if (exp === '*') {
            Object.defineProperty(m, key, {
              enumerable: true,
              value: x,
            });
          } else {
            Object.defineProperty(m, key, {
              enumerable: true,
              get: function () {
                if (exp === 'default') {
                  return x.__esModule ? x.default : x;
                }
                return x[exp];
              },
            });
          }
        });
        return m;
      }
      return newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  // INSERT_LOAD_HERE

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})({"1UMBI":[function(require,module,exports,__globalThis) {
/*! @license DOMPurify 3.3.0 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.0/LICENSE */ (function(global, factory) {
    module.exports = factory();
})(this, function() {
    'use strict';
    const { entries, setPrototypeOf, isFrozen, getPrototypeOf, getOwnPropertyDescriptor } = Object;
    let { freeze, seal, create } = Object; // eslint-disable-line import/no-mutable-exports
    let { apply, construct } = typeof Reflect !== 'undefined' && Reflect;
    if (!freeze) freeze = function freeze(x) {
        return x;
    };
    if (!seal) seal = function seal(x) {
        return x;
    };
    if (!apply) apply = function apply(func, thisArg) {
        for(var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++)args[_key - 2] = arguments[_key];
        return func.apply(thisArg, args);
    };
    if (!construct) construct = function construct(Func) {
        for(var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++)args[_key2 - 1] = arguments[_key2];
        return new Func(...args);
    };
    const arrayForEach = unapply(Array.prototype.forEach);
    const arrayLastIndexOf = unapply(Array.prototype.lastIndexOf);
    const arrayPop = unapply(Array.prototype.pop);
    const arrayPush = unapply(Array.prototype.push);
    const arraySplice = unapply(Array.prototype.splice);
    const stringToLowerCase = unapply(String.prototype.toLowerCase);
    const stringToString = unapply(String.prototype.toString);
    const stringMatch = unapply(String.prototype.match);
    const stringReplace = unapply(String.prototype.replace);
    const stringIndexOf = unapply(String.prototype.indexOf);
    const stringTrim = unapply(String.prototype.trim);
    const objectHasOwnProperty = unapply(Object.prototype.hasOwnProperty);
    const regExpTest = unapply(RegExp.prototype.test);
    const typeErrorCreate = unconstruct(TypeError);
    /**
   * Creates a new function that calls the given function with a specified thisArg and arguments.
   *
   * @param func - The function to be wrapped and called.
   * @returns A new function that calls the given function with a specified thisArg and arguments.
   */ function unapply(func) {
        return function(thisArg) {
            if (thisArg instanceof RegExp) thisArg.lastIndex = 0;
            for(var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++)args[_key3 - 1] = arguments[_key3];
            return apply(func, thisArg, args);
        };
    }
    /**
   * Creates a new function that constructs an instance of the given constructor function with the provided arguments.
   *
   * @param func - The constructor function to be wrapped and called.
   * @returns A new function that constructs an instance of the given constructor function with the provided arguments.
   */ function unconstruct(Func) {
        return function() {
            for(var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++)args[_key4] = arguments[_key4];
            return construct(Func, args);
        };
    }
    /**
   * Add properties to a lookup table
   *
   * @param set - The set to which elements will be added.
   * @param array - The array containing elements to be added to the set.
   * @param transformCaseFunc - An optional function to transform the case of each element before adding to the set.
   * @returns The modified set with added elements.
   */ function addToSet(set, array) {
        let transformCaseFunc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : stringToLowerCase;
        if (setPrototypeOf) // Make 'in' and truthy checks like Boolean(set.constructor)
        // independent of any properties defined on Object.prototype.
        // Prevent prototype setters from intercepting set as a this value.
        setPrototypeOf(set, null);
        let l = array.length;
        while(l--){
            let element = array[l];
            if (typeof element === 'string') {
                const lcElement = transformCaseFunc(element);
                if (lcElement !== element) {
                    // Config presets (e.g. tags.js, attrs.js) are immutable.
                    if (!isFrozen(array)) array[l] = lcElement;
                    element = lcElement;
                }
            }
            set[element] = true;
        }
        return set;
    }
    /**
   * Clean up an array to harden against CSPP
   *
   * @param array - The array to be cleaned.
   * @returns The cleaned version of the array
   */ function cleanArray(array) {
        for(let index = 0; index < array.length; index++){
            const isPropertyExist = objectHasOwnProperty(array, index);
            if (!isPropertyExist) array[index] = null;
        }
        return array;
    }
    /**
   * Shallow clone an object
   *
   * @param object - The object to be cloned.
   * @returns A new object that copies the original.
   */ function clone(object) {
        const newObject = create(null);
        for (const [property, value] of entries(object)){
            const isPropertyExist = objectHasOwnProperty(object, property);
            if (isPropertyExist) {
                if (Array.isArray(value)) newObject[property] = cleanArray(value);
                else if (value && typeof value === 'object' && value.constructor === Object) newObject[property] = clone(value);
                else newObject[property] = value;
            }
        }
        return newObject;
    }
    /**
   * This method automatically checks if the prop is function or getter and behaves accordingly.
   *
   * @param object - The object to look up the getter function in its prototype chain.
   * @param prop - The property name for which to find the getter function.
   * @returns The getter function found in the prototype chain or a fallback function.
   */ function lookupGetter(object, prop) {
        while(object !== null){
            const desc = getOwnPropertyDescriptor(object, prop);
            if (desc) {
                if (desc.get) return unapply(desc.get);
                if (typeof desc.value === 'function') return unapply(desc.value);
            }
            object = getPrototypeOf(object);
        }
        function fallbackValue() {
            return null;
        }
        return fallbackValue;
    }
    const html$1 = freeze([
        'a',
        'abbr',
        'acronym',
        'address',
        'area',
        'article',
        'aside',
        'audio',
        'b',
        'bdi',
        'bdo',
        'big',
        'blink',
        'blockquote',
        'body',
        'br',
        'button',
        'canvas',
        'caption',
        'center',
        'cite',
        'code',
        'col',
        'colgroup',
        'content',
        'data',
        'datalist',
        'dd',
        'decorator',
        'del',
        'details',
        'dfn',
        'dialog',
        'dir',
        'div',
        'dl',
        'dt',
        'element',
        'em',
        'fieldset',
        'figcaption',
        'figure',
        'font',
        'footer',
        'form',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'head',
        'header',
        'hgroup',
        'hr',
        'html',
        'i',
        'img',
        'input',
        'ins',
        'kbd',
        'label',
        'legend',
        'li',
        'main',
        'map',
        'mark',
        'marquee',
        'menu',
        'menuitem',
        'meter',
        'nav',
        'nobr',
        'ol',
        'optgroup',
        'option',
        'output',
        'p',
        'picture',
        'pre',
        'progress',
        'q',
        'rp',
        'rt',
        'ruby',
        's',
        'samp',
        'search',
        'section',
        'select',
        'shadow',
        'slot',
        'small',
        'source',
        'spacer',
        'span',
        'strike',
        'strong',
        'style',
        'sub',
        'summary',
        'sup',
        'table',
        'tbody',
        'td',
        'template',
        'textarea',
        'tfoot',
        'th',
        'thead',
        'time',
        'tr',
        'track',
        'tt',
        'u',
        'ul',
        'var',
        'video',
        'wbr'
    ]);
    const svg$1 = freeze([
        'svg',
        'a',
        'altglyph',
        'altglyphdef',
        'altglyphitem',
        'animatecolor',
        'animatemotion',
        'animatetransform',
        'circle',
        'clippath',
        'defs',
        'desc',
        'ellipse',
        'enterkeyhint',
        'exportparts',
        'filter',
        'font',
        'g',
        'glyph',
        'glyphref',
        'hkern',
        'image',
        'inputmode',
        'line',
        'lineargradient',
        'marker',
        'mask',
        'metadata',
        'mpath',
        'part',
        'path',
        'pattern',
        'polygon',
        'polyline',
        'radialgradient',
        'rect',
        'stop',
        'style',
        'switch',
        'symbol',
        'text',
        'textpath',
        'title',
        'tref',
        'tspan',
        'view',
        'vkern'
    ]);
    const svgFilters = freeze([
        'feBlend',
        'feColorMatrix',
        'feComponentTransfer',
        'feComposite',
        'feConvolveMatrix',
        'feDiffuseLighting',
        'feDisplacementMap',
        'feDistantLight',
        'feDropShadow',
        'feFlood',
        'feFuncA',
        'feFuncB',
        'feFuncG',
        'feFuncR',
        'feGaussianBlur',
        'feImage',
        'feMerge',
        'feMergeNode',
        'feMorphology',
        'feOffset',
        'fePointLight',
        'feSpecularLighting',
        'feSpotLight',
        'feTile',
        'feTurbulence'
    ]);
    // List of SVG elements that are disallowed by default.
    // We still need to know them so that we can do namespace
    // checks properly in case one wants to add them to
    // allow-list.
    const svgDisallowed = freeze([
        'animate',
        'color-profile',
        'cursor',
        'discard',
        'font-face',
        'font-face-format',
        'font-face-name',
        'font-face-src',
        'font-face-uri',
        'foreignobject',
        'hatch',
        'hatchpath',
        'mesh',
        'meshgradient',
        'meshpatch',
        'meshrow',
        'missing-glyph',
        'script',
        'set',
        'solidcolor',
        'unknown',
        'use'
    ]);
    const mathMl$1 = freeze([
        'math',
        'menclose',
        'merror',
        'mfenced',
        'mfrac',
        'mglyph',
        'mi',
        'mlabeledtr',
        'mmultiscripts',
        'mn',
        'mo',
        'mover',
        'mpadded',
        'mphantom',
        'mroot',
        'mrow',
        'ms',
        'mspace',
        'msqrt',
        'mstyle',
        'msub',
        'msup',
        'msubsup',
        'mtable',
        'mtd',
        'mtext',
        'mtr',
        'munder',
        'munderover',
        'mprescripts'
    ]);
    // Similarly to SVG, we want to know all MathML elements,
    // even those that we disallow by default.
    const mathMlDisallowed = freeze([
        'maction',
        'maligngroup',
        'malignmark',
        'mlongdiv',
        'mscarries',
        'mscarry',
        'msgroup',
        'mstack',
        'msline',
        'msrow',
        'semantics',
        'annotation',
        'annotation-xml',
        'mprescripts',
        'none'
    ]);
    const text = freeze([
        '#text'
    ]);
    const html = freeze([
        'accept',
        'action',
        'align',
        'alt',
        'autocapitalize',
        'autocomplete',
        'autopictureinpicture',
        'autoplay',
        'background',
        'bgcolor',
        'border',
        'capture',
        'cellpadding',
        'cellspacing',
        'checked',
        'cite',
        'class',
        'clear',
        'color',
        'cols',
        'colspan',
        'controls',
        'controlslist',
        'coords',
        'crossorigin',
        'datetime',
        'decoding',
        'default',
        'dir',
        'disabled',
        'disablepictureinpicture',
        'disableremoteplayback',
        'download',
        'draggable',
        'enctype',
        'enterkeyhint',
        'exportparts',
        'face',
        'for',
        'headers',
        'height',
        'hidden',
        'high',
        'href',
        'hreflang',
        'id',
        'inert',
        'inputmode',
        'integrity',
        'ismap',
        'kind',
        'label',
        'lang',
        'list',
        'loading',
        'loop',
        'low',
        'max',
        'maxlength',
        'media',
        'method',
        'min',
        'minlength',
        'multiple',
        'muted',
        'name',
        'nonce',
        'noshade',
        'novalidate',
        'nowrap',
        'open',
        'optimum',
        'part',
        'pattern',
        'placeholder',
        'playsinline',
        'popover',
        'popovertarget',
        'popovertargetaction',
        'poster',
        'preload',
        'pubdate',
        'radiogroup',
        'readonly',
        'rel',
        'required',
        'rev',
        'reversed',
        'role',
        'rows',
        'rowspan',
        'spellcheck',
        'scope',
        'selected',
        'shape',
        'size',
        'sizes',
        'slot',
        'span',
        'srclang',
        'start',
        'src',
        'srcset',
        'step',
        'style',
        'summary',
        'tabindex',
        'title',
        'translate',
        'type',
        'usemap',
        'valign',
        'value',
        'width',
        'wrap',
        'xmlns',
        'slot'
    ]);
    const svg = freeze([
        'accent-height',
        'accumulate',
        'additive',
        'alignment-baseline',
        'amplitude',
        'ascent',
        'attributename',
        'attributetype',
        'azimuth',
        'basefrequency',
        'baseline-shift',
        'begin',
        'bias',
        'by',
        'class',
        'clip',
        'clippathunits',
        'clip-path',
        'clip-rule',
        'color',
        'color-interpolation',
        'color-interpolation-filters',
        'color-profile',
        'color-rendering',
        'cx',
        'cy',
        'd',
        'dx',
        'dy',
        'diffuseconstant',
        'direction',
        'display',
        'divisor',
        'dur',
        'edgemode',
        'elevation',
        'end',
        'exponent',
        'fill',
        'fill-opacity',
        'fill-rule',
        'filter',
        'filterunits',
        'flood-color',
        'flood-opacity',
        'font-family',
        'font-size',
        'font-size-adjust',
        'font-stretch',
        'font-style',
        'font-variant',
        'font-weight',
        'fx',
        'fy',
        'g1',
        'g2',
        'glyph-name',
        'glyphref',
        'gradientunits',
        'gradienttransform',
        'height',
        'href',
        'id',
        'image-rendering',
        'in',
        'in2',
        'intercept',
        'k',
        'k1',
        'k2',
        'k3',
        'k4',
        'kerning',
        'keypoints',
        'keysplines',
        'keytimes',
        'lang',
        'lengthadjust',
        'letter-spacing',
        'kernelmatrix',
        'kernelunitlength',
        'lighting-color',
        'local',
        'marker-end',
        'marker-mid',
        'marker-start',
        'markerheight',
        'markerunits',
        'markerwidth',
        'maskcontentunits',
        'maskunits',
        'max',
        'mask',
        'mask-type',
        'media',
        'method',
        'mode',
        'min',
        'name',
        'numoctaves',
        'offset',
        'operator',
        'opacity',
        'order',
        'orient',
        'orientation',
        'origin',
        'overflow',
        'paint-order',
        'path',
        'pathlength',
        'patterncontentunits',
        'patterntransform',
        'patternunits',
        'points',
        'preservealpha',
        'preserveaspectratio',
        'primitiveunits',
        'r',
        'rx',
        'ry',
        'radius',
        'refx',
        'refy',
        'repeatcount',
        'repeatdur',
        'restart',
        'result',
        'rotate',
        'scale',
        'seed',
        'shape-rendering',
        'slope',
        'specularconstant',
        'specularexponent',
        'spreadmethod',
        'startoffset',
        'stddeviation',
        'stitchtiles',
        'stop-color',
        'stop-opacity',
        'stroke-dasharray',
        'stroke-dashoffset',
        'stroke-linecap',
        'stroke-linejoin',
        'stroke-miterlimit',
        'stroke-opacity',
        'stroke',
        'stroke-width',
        'style',
        'surfacescale',
        'systemlanguage',
        'tabindex',
        'tablevalues',
        'targetx',
        'targety',
        'transform',
        'transform-origin',
        'text-anchor',
        'text-decoration',
        'text-rendering',
        'textlength',
        'type',
        'u1',
        'u2',
        'unicode',
        'values',
        'viewbox',
        'visibility',
        'version',
        'vert-adv-y',
        'vert-origin-x',
        'vert-origin-y',
        'width',
        'word-spacing',
        'wrap',
        'writing-mode',
        'xchannelselector',
        'ychannelselector',
        'x',
        'x1',
        'x2',
        'xmlns',
        'y',
        'y1',
        'y2',
        'z',
        'zoomandpan'
    ]);
    const mathMl = freeze([
        'accent',
        'accentunder',
        'align',
        'bevelled',
        'close',
        'columnsalign',
        'columnlines',
        'columnspan',
        'denomalign',
        'depth',
        'dir',
        'display',
        'displaystyle',
        'encoding',
        'fence',
        'frame',
        'height',
        'href',
        'id',
        'largeop',
        'length',
        'linethickness',
        'lspace',
        'lquote',
        'mathbackground',
        'mathcolor',
        'mathsize',
        'mathvariant',
        'maxsize',
        'minsize',
        'movablelimits',
        'notation',
        'numalign',
        'open',
        'rowalign',
        'rowlines',
        'rowspacing',
        'rowspan',
        'rspace',
        'rquote',
        'scriptlevel',
        'scriptminsize',
        'scriptsizemultiplier',
        'selection',
        'separator',
        'separators',
        'stretchy',
        'subscriptshift',
        'supscriptshift',
        'symmetric',
        'voffset',
        'width',
        'xmlns'
    ]);
    const xml = freeze([
        'xlink:href',
        'xml:id',
        'xlink:title',
        'xml:space',
        'xmlns:xlink'
    ]);
    // eslint-disable-next-line unicorn/better-regex
    const MUSTACHE_EXPR = seal(/\{\{[\w\W]*|[\w\W]*\}\}/gm); // Specify template detection regex for SAFE_FOR_TEMPLATES mode
    const ERB_EXPR = seal(/<%[\w\W]*|[\w\W]*%>/gm);
    const TMPLIT_EXPR = seal(/\$\{[\w\W]*/gm); // eslint-disable-line unicorn/better-regex
    const DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]+$/); // eslint-disable-line no-useless-escape
    const ARIA_ATTR = seal(/^aria-[\-\w]+$/); // eslint-disable-line no-useless-escape
    const IS_ALLOWED_URI = seal(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i // eslint-disable-line no-useless-escape
    );
    const IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
    const ATTR_WHITESPACE = seal(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g // eslint-disable-line no-control-regex
    );
    const DOCTYPE_NAME = seal(/^html$/i);
    const CUSTOM_ELEMENT = seal(/^[a-z][.\w]*(-[.\w]+)+$/i);
    var EXPRESSIONS = /*#__PURE__*/ Object.freeze({
        __proto__: null,
        ARIA_ATTR: ARIA_ATTR,
        ATTR_WHITESPACE: ATTR_WHITESPACE,
        CUSTOM_ELEMENT: CUSTOM_ELEMENT,
        DATA_ATTR: DATA_ATTR,
        DOCTYPE_NAME: DOCTYPE_NAME,
        ERB_EXPR: ERB_EXPR,
        IS_ALLOWED_URI: IS_ALLOWED_URI,
        IS_SCRIPT_OR_DATA: IS_SCRIPT_OR_DATA,
        MUSTACHE_EXPR: MUSTACHE_EXPR,
        TMPLIT_EXPR: TMPLIT_EXPR
    });
    /* eslint-disable @typescript-eslint/indent */ // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
    const NODE_TYPE = {
        element: 1,
        attribute: 2,
        text: 3,
        cdataSection: 4,
        entityReference: 5,
        // Deprecated
        entityNode: 6,
        // Deprecated
        progressingInstruction: 7,
        comment: 8,
        document: 9,
        documentType: 10,
        documentFragment: 11,
        notation: 12 // Deprecated
    };
    const getGlobal = function getGlobal() {
        return typeof window === 'undefined' ? null : window;
    };
    /**
   * Creates a no-op policy for internal use only.
   * Don't export this function outside this module!
   * @param trustedTypes The policy factory.
   * @param purifyHostElement The Script element used to load DOMPurify (to determine policy name suffix).
   * @return The policy created (or null, if Trusted Types
   * are not supported or creating the policy failed).
   */ const _createTrustedTypesPolicy = function _createTrustedTypesPolicy(trustedTypes, purifyHostElement) {
        if (typeof trustedTypes !== 'object' || typeof trustedTypes.createPolicy !== 'function') return null;
        // Allow the callers to control the unique policy name
        // by adding a data-tt-policy-suffix to the script element with the DOMPurify.
        // Policy creation with duplicate names throws in Trusted Types.
        let suffix = null;
        const ATTR_NAME = 'data-tt-policy-suffix';
        if (purifyHostElement && purifyHostElement.hasAttribute(ATTR_NAME)) suffix = purifyHostElement.getAttribute(ATTR_NAME);
        const policyName = 'dompurify' + (suffix ? '#' + suffix : '');
        try {
            return trustedTypes.createPolicy(policyName, {
                createHTML (html) {
                    return html;
                },
                createScriptURL (scriptUrl) {
                    return scriptUrl;
                }
            });
        } catch (_) {
            // Policy creation failed (most likely another DOMPurify script has
            // already run). Skip creating the policy, as this will only cause errors
            // if TT are enforced.
            console.warn('TrustedTypes policy ' + policyName + ' could not be created.');
            return null;
        }
    };
    const _createHooksMap = function _createHooksMap() {
        return {
            afterSanitizeAttributes: [],
            afterSanitizeElements: [],
            afterSanitizeShadowDOM: [],
            beforeSanitizeAttributes: [],
            beforeSanitizeElements: [],
            beforeSanitizeShadowDOM: [],
            uponSanitizeAttribute: [],
            uponSanitizeElement: [],
            uponSanitizeShadowNode: []
        };
    };
    function createDOMPurify() {
        let window1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getGlobal();
        const DOMPurify = (root)=>createDOMPurify(root);
        DOMPurify.version = '3.3.0';
        DOMPurify.removed = [];
        if (!window1 || !window1.document || window1.document.nodeType !== NODE_TYPE.document || !window1.Element) {
            // Not running in a browser, provide a factory function
            // so that you can pass your own Window
            DOMPurify.isSupported = false;
            return DOMPurify;
        }
        let { document } = window1;
        const originalDocument = document;
        const currentScript = originalDocument.currentScript;
        const { DocumentFragment, HTMLTemplateElement, Node, Element, NodeFilter, NamedNodeMap = window1.NamedNodeMap || window1.MozNamedAttrMap, HTMLFormElement, DOMParser, trustedTypes } = window1;
        const ElementPrototype = Element.prototype;
        const cloneNode = lookupGetter(ElementPrototype, 'cloneNode');
        const remove = lookupGetter(ElementPrototype, 'remove');
        const getNextSibling = lookupGetter(ElementPrototype, 'nextSibling');
        const getChildNodes = lookupGetter(ElementPrototype, 'childNodes');
        const getParentNode = lookupGetter(ElementPrototype, 'parentNode');
        // As per issue #47, the web-components registry is inherited by a
        // new document created via createHTMLDocument. As per the spec
        // (http://w3c.github.io/webcomponents/spec/custom/#creating-and-passing-registries)
        // a new empty registry is used when creating a template contents owner
        // document, so we use that as our parent document to ensure nothing
        // is inherited.
        if (typeof HTMLTemplateElement === 'function') {
            const template = document.createElement('template');
            if (template.content && template.content.ownerDocument) document = template.content.ownerDocument;
        }
        let trustedTypesPolicy;
        let emptyHTML = '';
        const { implementation, createNodeIterator, createDocumentFragment, getElementsByTagName } = document;
        const { importNode } = originalDocument;
        let hooks = _createHooksMap();
        /**
     * Expose whether this browser supports running the full DOMPurify.
     */ DOMPurify.isSupported = typeof entries === 'function' && typeof getParentNode === 'function' && implementation && implementation.createHTMLDocument !== undefined;
        const { MUSTACHE_EXPR, ERB_EXPR, TMPLIT_EXPR, DATA_ATTR, ARIA_ATTR, IS_SCRIPT_OR_DATA, ATTR_WHITESPACE, CUSTOM_ELEMENT } = EXPRESSIONS;
        let { IS_ALLOWED_URI: IS_ALLOWED_URI$1 } = EXPRESSIONS;
        /**
     * We consider the elements and attributes below to be safe. Ideally
     * don't add any new ones but feel free to remove unwanted ones.
     */ /* allowed element names */ let ALLOWED_TAGS = null;
        const DEFAULT_ALLOWED_TAGS = addToSet({}, [
            ...html$1,
            ...svg$1,
            ...svgFilters,
            ...mathMl$1,
            ...text
        ]);
        /* Allowed attribute names */ let ALLOWED_ATTR = null;
        const DEFAULT_ALLOWED_ATTR = addToSet({}, [
            ...html,
            ...svg,
            ...mathMl,
            ...xml
        ]);
        /*
     * Configure how DOMPurify should handle custom elements and their attributes as well as customized built-in elements.
     * @property {RegExp|Function|null} tagNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any custom elements)
     * @property {RegExp|Function|null} attributeNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any attributes not on the allow list)
     * @property {boolean} allowCustomizedBuiltInElements allow custom elements derived from built-ins if they pass CUSTOM_ELEMENT_HANDLING.tagNameCheck. Default: `false`.
     */ let CUSTOM_ELEMENT_HANDLING = Object.seal(create(null, {
            tagNameCheck: {
                writable: true,
                configurable: false,
                enumerable: true,
                value: null
            },
            attributeNameCheck: {
                writable: true,
                configurable: false,
                enumerable: true,
                value: null
            },
            allowCustomizedBuiltInElements: {
                writable: true,
                configurable: false,
                enumerable: true,
                value: false
            }
        }));
        /* Explicitly forbidden tags (overrides ALLOWED_TAGS/ADD_TAGS) */ let FORBID_TAGS = null;
        /* Explicitly forbidden attributes (overrides ALLOWED_ATTR/ADD_ATTR) */ let FORBID_ATTR = null;
        /* Config object to store ADD_TAGS/ADD_ATTR functions (when used as functions) */ const EXTRA_ELEMENT_HANDLING = Object.seal(create(null, {
            tagCheck: {
                writable: true,
                configurable: false,
                enumerable: true,
                value: null
            },
            attributeCheck: {
                writable: true,
                configurable: false,
                enumerable: true,
                value: null
            }
        }));
        /* Decide if ARIA attributes are okay */ let ALLOW_ARIA_ATTR = true;
        /* Decide if custom data attributes are okay */ let ALLOW_DATA_ATTR = true;
        /* Decide if unknown protocols are okay */ let ALLOW_UNKNOWN_PROTOCOLS = false;
        /* Decide if self-closing tags in attributes are allowed.
     * Usually removed due to a mXSS issue in jQuery 3.0 */ let ALLOW_SELF_CLOSE_IN_ATTR = true;
        /* Output should be safe for common template engines.
     * This means, DOMPurify removes data attributes, mustaches and ERB
     */ let SAFE_FOR_TEMPLATES = false;
        /* Output should be safe even for XML used within HTML and alike.
     * This means, DOMPurify removes comments when containing risky content.
     */ let SAFE_FOR_XML = true;
        /* Decide if document with <html>... should be returned */ let WHOLE_DOCUMENT = false;
        /* Track whether config is already set on this instance of DOMPurify. */ let SET_CONFIG = false;
        /* Decide if all elements (e.g. style, script) must be children of
     * document.body. By default, browsers might move them to document.head */ let FORCE_BODY = false;
        /* Decide if a DOM `HTMLBodyElement` should be returned, instead of a html
     * string (or a TrustedHTML object if Trusted Types are supported).
     * If `WHOLE_DOCUMENT` is enabled a `HTMLHtmlElement` will be returned instead
     */ let RETURN_DOM = false;
        /* Decide if a DOM `DocumentFragment` should be returned, instead of a html
     * string  (or a TrustedHTML object if Trusted Types are supported) */ let RETURN_DOM_FRAGMENT = false;
        /* Try to return a Trusted Type object instead of a string, return a string in
     * case Trusted Types are not supported  */ let RETURN_TRUSTED_TYPE = false;
        /* Output should be free from DOM clobbering attacks?
     * This sanitizes markups named with colliding, clobberable built-in DOM APIs.
     */ let SANITIZE_DOM = true;
        /* Achieve full DOM Clobbering protection by isolating the namespace of named
     * properties and JS variables, mitigating attacks that abuse the HTML/DOM spec rules.
     *
     * HTML/DOM spec rules that enable DOM Clobbering:
     *   - Named Access on Window (§7.3.3)
     *   - DOM Tree Accessors (§3.1.5)
     *   - Form Element Parent-Child Relations (§4.10.3)
     *   - Iframe srcdoc / Nested WindowProxies (§4.8.5)
     *   - HTMLCollection (§4.2.10.2)
     *
     * Namespace isolation is implemented by prefixing `id` and `name` attributes
     * with a constant string, i.e., `user-content-`
     */ let SANITIZE_NAMED_PROPS = false;
        const SANITIZE_NAMED_PROPS_PREFIX = 'user-content-';
        /* Keep element content when removing element? */ let KEEP_CONTENT = true;
        /* If a `Node` is passed to sanitize(), then performs sanitization in-place instead
     * of importing it into a new Document and returning a sanitized copy */ let IN_PLACE = false;
        /* Allow usage of profiles like html, svg and mathMl */ let USE_PROFILES = {};
        /* Tags to ignore content of when KEEP_CONTENT is true */ let FORBID_CONTENTS = null;
        const DEFAULT_FORBID_CONTENTS = addToSet({}, [
            'annotation-xml',
            'audio',
            'colgroup',
            'desc',
            'foreignobject',
            'head',
            'iframe',
            'math',
            'mi',
            'mn',
            'mo',
            'ms',
            'mtext',
            'noembed',
            'noframes',
            'noscript',
            'plaintext',
            'script',
            'style',
            'svg',
            'template',
            'thead',
            'title',
            'video',
            'xmp'
        ]);
        /* Tags that are safe for data: URIs */ let DATA_URI_TAGS = null;
        const DEFAULT_DATA_URI_TAGS = addToSet({}, [
            'audio',
            'video',
            'img',
            'source',
            'image',
            'track'
        ]);
        /* Attributes safe for values like "javascript:" */ let URI_SAFE_ATTRIBUTES = null;
        const DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, [
            'alt',
            'class',
            'for',
            'id',
            'label',
            'name',
            'pattern',
            'placeholder',
            'role',
            'summary',
            'title',
            'value',
            'style',
            'xmlns'
        ]);
        const MATHML_NAMESPACE = 'http://www.w3.org/1998/Math/MathML';
        const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
        const HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';
        /* Document namespace */ let NAMESPACE = HTML_NAMESPACE;
        let IS_EMPTY_INPUT = false;
        /* Allowed XHTML+XML namespaces */ let ALLOWED_NAMESPACES = null;
        const DEFAULT_ALLOWED_NAMESPACES = addToSet({}, [
            MATHML_NAMESPACE,
            SVG_NAMESPACE,
            HTML_NAMESPACE
        ], stringToString);
        let MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, [
            'mi',
            'mo',
            'mn',
            'ms',
            'mtext'
        ]);
        let HTML_INTEGRATION_POINTS = addToSet({}, [
            'annotation-xml'
        ]);
        // Certain elements are allowed in both SVG and HTML
        // namespace. We need to specify them explicitly
        // so that they don't get erroneously deleted from
        // HTML namespace.
        const COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, [
            'title',
            'style',
            'font',
            'a',
            'script'
        ]);
        /* Parsing of strict XHTML documents */ let PARSER_MEDIA_TYPE = null;
        const SUPPORTED_PARSER_MEDIA_TYPES = [
            'application/xhtml+xml',
            'text/html'
        ];
        const DEFAULT_PARSER_MEDIA_TYPE = 'text/html';
        let transformCaseFunc = null;
        /* Keep a reference to config to pass to hooks */ let CONFIG = null;
        /* Ideally, do not touch anything below this line */ /* ______________________________________________ */ const formElement = document.createElement('form');
        const isRegexOrFunction = function isRegexOrFunction(testValue) {
            return testValue instanceof RegExp || testValue instanceof Function;
        };
        /**
     * _parseConfig
     *
     * @param cfg optional config literal
     */ // eslint-disable-next-line complexity
        const _parseConfig = function _parseConfig() {
            let cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            if (CONFIG && CONFIG === cfg) return;
            /* Shield configuration object from tampering */ if (!cfg || typeof cfg !== 'object') cfg = {};
            /* Shield configuration object from prototype pollution */ cfg = clone(cfg);
            PARSER_MEDIA_TYPE = // eslint-disable-next-line unicorn/prefer-includes
            SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? DEFAULT_PARSER_MEDIA_TYPE : cfg.PARSER_MEDIA_TYPE;
            // HTML tags and attributes are not case-sensitive, converting to lowercase. Keeping XHTML as is.
            transformCaseFunc = PARSER_MEDIA_TYPE === 'application/xhtml+xml' ? stringToString : stringToLowerCase;
            /* Set configuration parameters */ ALLOWED_TAGS = objectHasOwnProperty(cfg, 'ALLOWED_TAGS') ? addToSet({}, cfg.ALLOWED_TAGS, transformCaseFunc) : DEFAULT_ALLOWED_TAGS;
            ALLOWED_ATTR = objectHasOwnProperty(cfg, 'ALLOWED_ATTR') ? addToSet({}, cfg.ALLOWED_ATTR, transformCaseFunc) : DEFAULT_ALLOWED_ATTR;
            ALLOWED_NAMESPACES = objectHasOwnProperty(cfg, 'ALLOWED_NAMESPACES') ? addToSet({}, cfg.ALLOWED_NAMESPACES, stringToString) : DEFAULT_ALLOWED_NAMESPACES;
            URI_SAFE_ATTRIBUTES = objectHasOwnProperty(cfg, 'ADD_URI_SAFE_ATTR') ? addToSet(clone(DEFAULT_URI_SAFE_ATTRIBUTES), cfg.ADD_URI_SAFE_ATTR, transformCaseFunc) : DEFAULT_URI_SAFE_ATTRIBUTES;
            DATA_URI_TAGS = objectHasOwnProperty(cfg, 'ADD_DATA_URI_TAGS') ? addToSet(clone(DEFAULT_DATA_URI_TAGS), cfg.ADD_DATA_URI_TAGS, transformCaseFunc) : DEFAULT_DATA_URI_TAGS;
            FORBID_CONTENTS = objectHasOwnProperty(cfg, 'FORBID_CONTENTS') ? addToSet({}, cfg.FORBID_CONTENTS, transformCaseFunc) : DEFAULT_FORBID_CONTENTS;
            FORBID_TAGS = objectHasOwnProperty(cfg, 'FORBID_TAGS') ? addToSet({}, cfg.FORBID_TAGS, transformCaseFunc) : clone({});
            FORBID_ATTR = objectHasOwnProperty(cfg, 'FORBID_ATTR') ? addToSet({}, cfg.FORBID_ATTR, transformCaseFunc) : clone({});
            USE_PROFILES = objectHasOwnProperty(cfg, 'USE_PROFILES') ? cfg.USE_PROFILES : false;
            ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false; // Default true
            ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false; // Default true
            ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false; // Default false
            ALLOW_SELF_CLOSE_IN_ATTR = cfg.ALLOW_SELF_CLOSE_IN_ATTR !== false; // Default true
            SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false; // Default false
            SAFE_FOR_XML = cfg.SAFE_FOR_XML !== false; // Default true
            WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false; // Default false
            RETURN_DOM = cfg.RETURN_DOM || false; // Default false
            RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false; // Default false
            RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false; // Default false
            FORCE_BODY = cfg.FORCE_BODY || false; // Default false
            SANITIZE_DOM = cfg.SANITIZE_DOM !== false; // Default true
            SANITIZE_NAMED_PROPS = cfg.SANITIZE_NAMED_PROPS || false; // Default false
            KEEP_CONTENT = cfg.KEEP_CONTENT !== false; // Default true
            IN_PLACE = cfg.IN_PLACE || false; // Default false
            IS_ALLOWED_URI$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI;
            NAMESPACE = cfg.NAMESPACE || HTML_NAMESPACE;
            MATHML_TEXT_INTEGRATION_POINTS = cfg.MATHML_TEXT_INTEGRATION_POINTS || MATHML_TEXT_INTEGRATION_POINTS;
            HTML_INTEGRATION_POINTS = cfg.HTML_INTEGRATION_POINTS || HTML_INTEGRATION_POINTS;
            CUSTOM_ELEMENT_HANDLING = cfg.CUSTOM_ELEMENT_HANDLING || {};
            if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck)) CUSTOM_ELEMENT_HANDLING.tagNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck;
            if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)) CUSTOM_ELEMENT_HANDLING.attributeNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck;
            if (cfg.CUSTOM_ELEMENT_HANDLING && typeof cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements === 'boolean') CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements;
            if (SAFE_FOR_TEMPLATES) ALLOW_DATA_ATTR = false;
            if (RETURN_DOM_FRAGMENT) RETURN_DOM = true;
            /* Parse profile info */ if (USE_PROFILES) {
                ALLOWED_TAGS = addToSet({}, text);
                ALLOWED_ATTR = [];
                if (USE_PROFILES.html === true) {
                    addToSet(ALLOWED_TAGS, html$1);
                    addToSet(ALLOWED_ATTR, html);
                }
                if (USE_PROFILES.svg === true) {
                    addToSet(ALLOWED_TAGS, svg$1);
                    addToSet(ALLOWED_ATTR, svg);
                    addToSet(ALLOWED_ATTR, xml);
                }
                if (USE_PROFILES.svgFilters === true) {
                    addToSet(ALLOWED_TAGS, svgFilters);
                    addToSet(ALLOWED_ATTR, svg);
                    addToSet(ALLOWED_ATTR, xml);
                }
                if (USE_PROFILES.mathMl === true) {
                    addToSet(ALLOWED_TAGS, mathMl$1);
                    addToSet(ALLOWED_ATTR, mathMl);
                    addToSet(ALLOWED_ATTR, xml);
                }
            }
            /* Merge configuration parameters */ if (cfg.ADD_TAGS) {
                if (typeof cfg.ADD_TAGS === 'function') EXTRA_ELEMENT_HANDLING.tagCheck = cfg.ADD_TAGS;
                else {
                    if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) ALLOWED_TAGS = clone(ALLOWED_TAGS);
                    addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
                }
            }
            if (cfg.ADD_ATTR) {
                if (typeof cfg.ADD_ATTR === 'function') EXTRA_ELEMENT_HANDLING.attributeCheck = cfg.ADD_ATTR;
                else {
                    if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) ALLOWED_ATTR = clone(ALLOWED_ATTR);
                    addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
                }
            }
            if (cfg.ADD_URI_SAFE_ATTR) addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR, transformCaseFunc);
            if (cfg.FORBID_CONTENTS) {
                if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) FORBID_CONTENTS = clone(FORBID_CONTENTS);
                addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS, transformCaseFunc);
            }
            /* Add #text in case KEEP_CONTENT is set to true */ if (KEEP_CONTENT) ALLOWED_TAGS['#text'] = true;
            /* Add html, head and body to ALLOWED_TAGS in case WHOLE_DOCUMENT is true */ if (WHOLE_DOCUMENT) addToSet(ALLOWED_TAGS, [
                'html',
                'head',
                'body'
            ]);
            /* Add tbody to ALLOWED_TAGS in case tables are permitted, see #286, #365 */ if (ALLOWED_TAGS.table) {
                addToSet(ALLOWED_TAGS, [
                    'tbody'
                ]);
                delete FORBID_TAGS.tbody;
            }
            if (cfg.TRUSTED_TYPES_POLICY) {
                if (typeof cfg.TRUSTED_TYPES_POLICY.createHTML !== 'function') throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
                if (typeof cfg.TRUSTED_TYPES_POLICY.createScriptURL !== 'function') throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
                // Overwrite existing TrustedTypes policy.
                trustedTypesPolicy = cfg.TRUSTED_TYPES_POLICY;
                // Sign local variables required by `sanitize`.
                emptyHTML = trustedTypesPolicy.createHTML('');
            } else {
                // Uninitialized policy, attempt to initialize the internal dompurify policy.
                if (trustedTypesPolicy === undefined) trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, currentScript);
                // If creating the internal policy succeeded sign internal variables.
                if (trustedTypesPolicy !== null && typeof emptyHTML === 'string') emptyHTML = trustedTypesPolicy.createHTML('');
            }
            // Prevent further manipulation of configuration.
            // Not available in IE8, Safari 5, etc.
            if (freeze) freeze(cfg);
            CONFIG = cfg;
        };
        /* Keep track of all possible SVG and MathML tags
     * so that we can perform the namespace checks
     * correctly. */ const ALL_SVG_TAGS = addToSet({}, [
            ...svg$1,
            ...svgFilters,
            ...svgDisallowed
        ]);
        const ALL_MATHML_TAGS = addToSet({}, [
            ...mathMl$1,
            ...mathMlDisallowed
        ]);
        /**
     * @param element a DOM element whose namespace is being checked
     * @returns Return false if the element has a
     *  namespace that a spec-compliant parser would never
     *  return. Return true otherwise.
     */ const _checkValidNamespace = function _checkValidNamespace(element) {
            let parent = getParentNode(element);
            // In JSDOM, if we're inside shadow DOM, then parentNode
            // can be null. We just simulate parent in this case.
            if (!parent || !parent.tagName) parent = {
                namespaceURI: NAMESPACE,
                tagName: 'template'
            };
            const tagName = stringToLowerCase(element.tagName);
            const parentTagName = stringToLowerCase(parent.tagName);
            if (!ALLOWED_NAMESPACES[element.namespaceURI]) return false;
            if (element.namespaceURI === SVG_NAMESPACE) {
                // The only way to switch from HTML namespace to SVG
                // is via <svg>. If it happens via any other tag, then
                // it should be killed.
                if (parent.namespaceURI === HTML_NAMESPACE) return tagName === 'svg';
                // The only way to switch from MathML to SVG is via`
                // svg if parent is either <annotation-xml> or MathML
                // text integration points.
                if (parent.namespaceURI === MATHML_NAMESPACE) return tagName === 'svg' && (parentTagName === 'annotation-xml' || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
                // We only allow elements that are defined in SVG
                // spec. All others are disallowed in SVG namespace.
                return Boolean(ALL_SVG_TAGS[tagName]);
            }
            if (element.namespaceURI === MATHML_NAMESPACE) {
                // The only way to switch from HTML namespace to MathML
                // is via <math>. If it happens via any other tag, then
                // it should be killed.
                if (parent.namespaceURI === HTML_NAMESPACE) return tagName === 'math';
                // The only way to switch from SVG to MathML is via
                // <math> and HTML integration points
                if (parent.namespaceURI === SVG_NAMESPACE) return tagName === 'math' && HTML_INTEGRATION_POINTS[parentTagName];
                // We only allow elements that are defined in MathML
                // spec. All others are disallowed in MathML namespace.
                return Boolean(ALL_MATHML_TAGS[tagName]);
            }
            if (element.namespaceURI === HTML_NAMESPACE) {
                // The only way to switch from SVG to HTML is via
                // HTML integration points, and from MathML to HTML
                // is via MathML text integration points
                if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) return false;
                if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) return false;
                // We disallow tags that are specific for MathML
                // or SVG and should never appear in HTML namespace
                return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
            }
            // For XHTML and XML documents that support custom namespaces
            if (PARSER_MEDIA_TYPE === 'application/xhtml+xml' && ALLOWED_NAMESPACES[element.namespaceURI]) return true;
            // The code should never reach this place (this means
            // that the element somehow got namespace that is not
            // HTML, SVG, MathML or allowed via ALLOWED_NAMESPACES).
            // Return false just in case.
            return false;
        };
        /**
     * _forceRemove
     *
     * @param node a DOM node
     */ const _forceRemove = function _forceRemove(node) {
            arrayPush(DOMPurify.removed, {
                element: node
            });
            try {
                // eslint-disable-next-line unicorn/prefer-dom-node-remove
                getParentNode(node).removeChild(node);
            } catch (_) {
                remove(node);
            }
        };
        /**
     * _removeAttribute
     *
     * @param name an Attribute name
     * @param element a DOM node
     */ const _removeAttribute = function _removeAttribute(name, element) {
            try {
                arrayPush(DOMPurify.removed, {
                    attribute: element.getAttributeNode(name),
                    from: element
                });
            } catch (_) {
                arrayPush(DOMPurify.removed, {
                    attribute: null,
                    from: element
                });
            }
            element.removeAttribute(name);
            // We void attribute values for unremovable "is" attributes
            if (name === 'is') {
                if (RETURN_DOM || RETURN_DOM_FRAGMENT) try {
                    _forceRemove(element);
                } catch (_) {}
                else try {
                    element.setAttribute(name, '');
                } catch (_) {}
            }
        };
        /**
     * _initDocument
     *
     * @param dirty - a string of dirty markup
     * @return a DOM, filled with the dirty markup
     */ const _initDocument = function _initDocument(dirty) {
            /* Create a HTML document */ let doc = null;
            let leadingWhitespace = null;
            if (FORCE_BODY) dirty = '<remove></remove>' + dirty;
            else {
                /* If FORCE_BODY isn't used, leading whitespace needs to be preserved manually */ const matches = stringMatch(dirty, /^[\r\n\t ]+/);
                leadingWhitespace = matches && matches[0];
            }
            if (PARSER_MEDIA_TYPE === 'application/xhtml+xml' && NAMESPACE === HTML_NAMESPACE) // Root of XHTML doc must contain xmlns declaration (see https://www.w3.org/TR/xhtml1/normative.html#strict)
            dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + '</body></html>';
            const dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
            /*
       * Use the DOMParser API by default, fallback later if needs be
       * DOMParser not work for svg when has multiple root element.
       */ if (NAMESPACE === HTML_NAMESPACE) try {
                doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
            } catch (_) {}
            /* Use createHTMLDocument in case DOMParser is not available */ if (!doc || !doc.documentElement) {
                doc = implementation.createDocument(NAMESPACE, 'template', null);
                try {
                    doc.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
                } catch (_) {
                // Syntax error if dirtyPayload is invalid xml
                }
            }
            const body = doc.body || doc.documentElement;
            if (dirty && leadingWhitespace) body.insertBefore(document.createTextNode(leadingWhitespace), body.childNodes[0] || null);
            /* Work on whole document or just its body */ if (NAMESPACE === HTML_NAMESPACE) return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? 'html' : 'body')[0];
            return WHOLE_DOCUMENT ? doc.documentElement : body;
        };
        /**
     * Creates a NodeIterator object that you can use to traverse filtered lists of nodes or elements in a document.
     *
     * @param root The root element or node to start traversing on.
     * @return The created NodeIterator
     */ const _createNodeIterator = function _createNodeIterator(root) {
            return createNodeIterator.call(root.ownerDocument || root, root, // eslint-disable-next-line no-bitwise
            NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT | NodeFilter.SHOW_PROCESSING_INSTRUCTION | NodeFilter.SHOW_CDATA_SECTION, null);
        };
        /**
     * _isClobbered
     *
     * @param element element to check for clobbering attacks
     * @return true if clobbered, false if safe
     */ const _isClobbered = function _isClobbered(element) {
            return element instanceof HTMLFormElement && (typeof element.nodeName !== 'string' || typeof element.textContent !== 'string' || typeof element.removeChild !== 'function' || !(element.attributes instanceof NamedNodeMap) || typeof element.removeAttribute !== 'function' || typeof element.setAttribute !== 'function' || typeof element.namespaceURI !== 'string' || typeof element.insertBefore !== 'function' || typeof element.hasChildNodes !== 'function');
        };
        /**
     * Checks whether the given object is a DOM node.
     *
     * @param value object to check whether it's a DOM node
     * @return true is object is a DOM node
     */ const _isNode = function _isNode(value) {
            return typeof Node === 'function' && value instanceof Node;
        };
        function _executeHooks(hooks, currentNode, data) {
            arrayForEach(hooks, (hook)=>{
                hook.call(DOMPurify, currentNode, data, CONFIG);
            });
        }
        /**
     * _sanitizeElements
     *
     * @protect nodeName
     * @protect textContent
     * @protect removeChild
     * @param currentNode to check for permission to exist
     * @return true if node was killed, false if left alive
     */ const _sanitizeElements = function _sanitizeElements(currentNode) {
            let content = null;
            /* Execute a hook if present */ _executeHooks(hooks.beforeSanitizeElements, currentNode, null);
            /* Check if element is clobbered or can clobber */ if (_isClobbered(currentNode)) {
                _forceRemove(currentNode);
                return true;
            }
            /* Now let's check the element's type and name */ const tagName = transformCaseFunc(currentNode.nodeName);
            /* Execute a hook if present */ _executeHooks(hooks.uponSanitizeElement, currentNode, {
                tagName,
                allowedTags: ALLOWED_TAGS
            });
            /* Detect mXSS attempts abusing namespace confusion */ if (SAFE_FOR_XML && currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && regExpTest(/<[/\w!]/g, currentNode.innerHTML) && regExpTest(/<[/\w!]/g, currentNode.textContent)) {
                _forceRemove(currentNode);
                return true;
            }
            /* Remove any occurrence of processing instructions */ if (currentNode.nodeType === NODE_TYPE.progressingInstruction) {
                _forceRemove(currentNode);
                return true;
            }
            /* Remove any kind of possibly harmful comments */ if (SAFE_FOR_XML && currentNode.nodeType === NODE_TYPE.comment && regExpTest(/<[/\w]/g, currentNode.data)) {
                _forceRemove(currentNode);
                return true;
            }
            /* Remove element if anything forbids its presence */ if (!(EXTRA_ELEMENT_HANDLING.tagCheck instanceof Function && EXTRA_ELEMENT_HANDLING.tagCheck(tagName)) && (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName])) {
                /* Check if we have a custom element to handle */ if (!FORBID_TAGS[tagName] && _isBasicCustomElement(tagName)) {
                    if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) return false;
                    if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName)) return false;
                }
                /* Keep content except for bad-listed elements */ if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
                    const parentNode = getParentNode(currentNode) || currentNode.parentNode;
                    const childNodes = getChildNodes(currentNode) || currentNode.childNodes;
                    if (childNodes && parentNode) {
                        const childCount = childNodes.length;
                        for(let i = childCount - 1; i >= 0; --i){
                            const childClone = cloneNode(childNodes[i], true);
                            childClone.__removalCount = (currentNode.__removalCount || 0) + 1;
                            parentNode.insertBefore(childClone, getNextSibling(currentNode));
                        }
                    }
                }
                _forceRemove(currentNode);
                return true;
            }
            /* Check whether element has a valid namespace */ if (currentNode instanceof Element && !_checkValidNamespace(currentNode)) {
                _forceRemove(currentNode);
                return true;
            }
            /* Make sure that older browsers don't get fallback-tag mXSS */ if ((tagName === 'noscript' || tagName === 'noembed' || tagName === 'noframes') && regExpTest(/<\/no(script|embed|frames)/i, currentNode.innerHTML)) {
                _forceRemove(currentNode);
                return true;
            }
            /* Sanitize element content to be template-safe */ if (SAFE_FOR_TEMPLATES && currentNode.nodeType === NODE_TYPE.text) {
                /* Get the element's text content */ content = currentNode.textContent;
                arrayForEach([
                    MUSTACHE_EXPR,
                    ERB_EXPR,
                    TMPLIT_EXPR
                ], (expr)=>{
                    content = stringReplace(content, expr, ' ');
                });
                if (currentNode.textContent !== content) {
                    arrayPush(DOMPurify.removed, {
                        element: currentNode.cloneNode()
                    });
                    currentNode.textContent = content;
                }
            }
            /* Execute a hook if present */ _executeHooks(hooks.afterSanitizeElements, currentNode, null);
            return false;
        };
        /**
     * _isValidAttribute
     *
     * @param lcTag Lowercase tag name of containing element.
     * @param lcName Lowercase attribute name.
     * @param value Attribute value.
     * @return Returns true if `value` is valid, otherwise false.
     */ // eslint-disable-next-line complexity
        const _isValidAttribute = function _isValidAttribute(lcTag, lcName, value) {
            /* Make sure attribute cannot clobber */ if (SANITIZE_DOM && (lcName === 'id' || lcName === 'name') && (value in document || value in formElement)) return false;
            /* Allow valid data-* attributes: At least one character after "-"
          (https://html.spec.whatwg.org/multipage/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes)
          XML-compatible (https://html.spec.whatwg.org/multipage/infrastructure.html#xml-compatible and http://www.w3.org/TR/xml/#d0e804)
          We don't need to check the value; it's always URI safe. */ if (ALLOW_DATA_ATTR && !FORBID_ATTR[lcName] && regExpTest(DATA_ATTR, lcName)) ;
            else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR, lcName)) ;
            else if (EXTRA_ELEMENT_HANDLING.attributeCheck instanceof Function && EXTRA_ELEMENT_HANDLING.attributeCheck(lcName, lcTag)) ;
            else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
                if (// First condition does a very basic check if a) it's basically a valid custom element tagname AND
                // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
                // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
                _isBasicCustomElement(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName, lcTag)) || // Alternative, second condition checks if it's an `is`-attribute, AND
                // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
                lcName === 'is' && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value))) ;
                else return false;
            /* Check value is safe. First, is attr inert? If so, is safe */ } else if (URI_SAFE_ATTRIBUTES[lcName]) ;
            else if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE, ''))) ;
            else if ((lcName === 'src' || lcName === 'xlink:href' || lcName === 'href') && lcTag !== 'script' && stringIndexOf(value, 'data:') === 0 && DATA_URI_TAGS[lcTag]) ;
            else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA, stringReplace(value, ATTR_WHITESPACE, ''))) ;
            else if (value) return false;
            return true;
        };
        /**
     * _isBasicCustomElement
     * checks if at least one dash is included in tagName, and it's not the first char
     * for more sophisticated checking see https://github.com/sindresorhus/validate-element-name
     *
     * @param tagName name of the tag of the node to sanitize
     * @returns Returns true if the tag name meets the basic criteria for a custom element, otherwise false.
     */ const _isBasicCustomElement = function _isBasicCustomElement(tagName) {
            return tagName !== 'annotation-xml' && stringMatch(tagName, CUSTOM_ELEMENT);
        };
        /**
     * _sanitizeAttributes
     *
     * @protect attributes
     * @protect nodeName
     * @protect removeAttribute
     * @protect setAttribute
     *
     * @param currentNode to sanitize
     */ const _sanitizeAttributes = function _sanitizeAttributes(currentNode) {
            /* Execute a hook if present */ _executeHooks(hooks.beforeSanitizeAttributes, currentNode, null);
            const { attributes } = currentNode;
            /* Check if we have attributes; if not we might have a text node */ if (!attributes || _isClobbered(currentNode)) return;
            const hookEvent = {
                attrName: '',
                attrValue: '',
                keepAttr: true,
                allowedAttributes: ALLOWED_ATTR,
                forceKeepAttr: undefined
            };
            let l = attributes.length;
            /* Go backwards over all attributes; safely remove bad ones */ while(l--){
                const attr = attributes[l];
                const { name, namespaceURI, value: attrValue } = attr;
                const lcName = transformCaseFunc(name);
                const initValue = attrValue;
                let value = name === 'value' ? initValue : stringTrim(initValue);
                /* Execute a hook if present */ hookEvent.attrName = lcName;
                hookEvent.attrValue = value;
                hookEvent.keepAttr = true;
                hookEvent.forceKeepAttr = undefined; // Allows developers to see this is a property they can set
                _executeHooks(hooks.uponSanitizeAttribute, currentNode, hookEvent);
                value = hookEvent.attrValue;
                /* Full DOM Clobbering protection via namespace isolation,
         * Prefix id and name attributes with `user-content-`
         */ if (SANITIZE_NAMED_PROPS && (lcName === 'id' || lcName === 'name')) {
                    // Remove the attribute with this value
                    _removeAttribute(name, currentNode);
                    // Prefix the value and later re-create the attribute with the sanitized value
                    value = SANITIZE_NAMED_PROPS_PREFIX + value;
                }
                /* Work around a security issue with comments inside attributes */ if (SAFE_FOR_XML && regExpTest(/((--!?|])>)|<\/(style|title|textarea)/i, value)) {
                    _removeAttribute(name, currentNode);
                    continue;
                }
                /* Make sure we cannot easily use animated hrefs, even if animations are allowed */ if (lcName === 'attributename' && stringMatch(value, 'href')) {
                    _removeAttribute(name, currentNode);
                    continue;
                }
                /* Did the hooks approve of the attribute? */ if (hookEvent.forceKeepAttr) continue;
                /* Did the hooks approve of the attribute? */ if (!hookEvent.keepAttr) {
                    _removeAttribute(name, currentNode);
                    continue;
                }
                /* Work around a security issue in jQuery 3.0 */ if (!ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(/\/>/i, value)) {
                    _removeAttribute(name, currentNode);
                    continue;
                }
                /* Sanitize attribute content to be template-safe */ if (SAFE_FOR_TEMPLATES) arrayForEach([
                    MUSTACHE_EXPR,
                    ERB_EXPR,
                    TMPLIT_EXPR
                ], (expr)=>{
                    value = stringReplace(value, expr, ' ');
                });
                /* Is `value` valid for this attribute? */ const lcTag = transformCaseFunc(currentNode.nodeName);
                if (!_isValidAttribute(lcTag, lcName, value)) {
                    _removeAttribute(name, currentNode);
                    continue;
                }
                /* Handle attributes that require Trusted Types */ if (trustedTypesPolicy && typeof trustedTypes === 'object' && typeof trustedTypes.getAttributeType === 'function') {
                    if (namespaceURI) ;
                    else switch(trustedTypes.getAttributeType(lcTag, lcName)){
                        case 'TrustedHTML':
                            value = trustedTypesPolicy.createHTML(value);
                            break;
                        case 'TrustedScriptURL':
                            value = trustedTypesPolicy.createScriptURL(value);
                            break;
                    }
                }
                /* Handle invalid data-* attribute set by try-catching it */ if (value !== initValue) try {
                    if (namespaceURI) currentNode.setAttributeNS(namespaceURI, name, value);
                    else /* Fallback to setAttribute() for browser-unrecognized namespaces e.g. "x-schema". */ currentNode.setAttribute(name, value);
                    if (_isClobbered(currentNode)) _forceRemove(currentNode);
                    else arrayPop(DOMPurify.removed);
                } catch (_) {
                    _removeAttribute(name, currentNode);
                }
            }
            /* Execute a hook if present */ _executeHooks(hooks.afterSanitizeAttributes, currentNode, null);
        };
        /**
     * _sanitizeShadowDOM
     *
     * @param fragment to iterate over recursively
     */ const _sanitizeShadowDOM = function _sanitizeShadowDOM(fragment) {
            let shadowNode = null;
            const shadowIterator = _createNodeIterator(fragment);
            /* Execute a hook if present */ _executeHooks(hooks.beforeSanitizeShadowDOM, fragment, null);
            while(shadowNode = shadowIterator.nextNode()){
                /* Execute a hook if present */ _executeHooks(hooks.uponSanitizeShadowNode, shadowNode, null);
                /* Sanitize tags and elements */ _sanitizeElements(shadowNode);
                /* Check attributes next */ _sanitizeAttributes(shadowNode);
                /* Deep shadow DOM detected */ if (shadowNode.content instanceof DocumentFragment) _sanitizeShadowDOM(shadowNode.content);
            }
            /* Execute a hook if present */ _executeHooks(hooks.afterSanitizeShadowDOM, fragment, null);
        };
        // eslint-disable-next-line complexity
        DOMPurify.sanitize = function(dirty) {
            let cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            let body = null;
            let importedNode = null;
            let currentNode = null;
            let returnNode = null;
            /* Make sure we have a string to sanitize.
        DO NOT return early, as this will return the wrong type if
        the user has requested a DOM object rather than a string */ IS_EMPTY_INPUT = !dirty;
            if (IS_EMPTY_INPUT) dirty = '<!-->';
            /* Stringify, in case dirty is an object */ if (typeof dirty !== 'string' && !_isNode(dirty)) {
                if (typeof dirty.toString === 'function') {
                    dirty = dirty.toString();
                    if (typeof dirty !== 'string') throw typeErrorCreate('dirty is not a string, aborting');
                } else throw typeErrorCreate('toString is not a function');
            }
            /* Return dirty HTML if DOMPurify cannot run */ if (!DOMPurify.isSupported) return dirty;
            /* Assign config vars */ if (!SET_CONFIG) _parseConfig(cfg);
            /* Clean up removed elements */ DOMPurify.removed = [];
            /* Check if dirty is correctly typed for IN_PLACE */ if (typeof dirty === 'string') IN_PLACE = false;
            if (IN_PLACE) /* Do some early pre-sanitization to avoid unsafe root nodes */ {
                if (dirty.nodeName) {
                    const tagName = transformCaseFunc(dirty.nodeName);
                    if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) throw typeErrorCreate('root node is forbidden and cannot be sanitized in-place');
                }
            } else if (dirty instanceof Node) {
                /* If dirty is a DOM element, append to an empty document to avoid
           elements being stripped by the parser */ body = _initDocument('<!---->');
                importedNode = body.ownerDocument.importNode(dirty, true);
                if (importedNode.nodeType === NODE_TYPE.element && importedNode.nodeName === 'BODY') /* Node is already a body, use as is */ body = importedNode;
                else if (importedNode.nodeName === 'HTML') body = importedNode;
                else // eslint-disable-next-line unicorn/prefer-dom-node-append
                body.appendChild(importedNode);
            } else {
                /* Exit directly if we have nothing to do */ if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT && // eslint-disable-next-line unicorn/prefer-includes
                dirty.indexOf('<') === -1) return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
                /* Initialize the document to work on */ body = _initDocument(dirty);
                /* Check we have a DOM node from the data */ if (!body) return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : '';
            }
            /* Remove first element node (ours) if FORCE_BODY is set */ if (body && FORCE_BODY) _forceRemove(body.firstChild);
            /* Get node iterator */ const nodeIterator = _createNodeIterator(IN_PLACE ? dirty : body);
            /* Now start iterating over the created document */ while(currentNode = nodeIterator.nextNode()){
                /* Sanitize tags and elements */ _sanitizeElements(currentNode);
                /* Check attributes next */ _sanitizeAttributes(currentNode);
                /* Shadow DOM detected, sanitize it */ if (currentNode.content instanceof DocumentFragment) _sanitizeShadowDOM(currentNode.content);
            }
            /* If we sanitized `dirty` in-place, return it. */ if (IN_PLACE) return dirty;
            /* Return sanitized string or DOM */ if (RETURN_DOM) {
                if (RETURN_DOM_FRAGMENT) {
                    returnNode = createDocumentFragment.call(body.ownerDocument);
                    while(body.firstChild)// eslint-disable-next-line unicorn/prefer-dom-node-append
                    returnNode.appendChild(body.firstChild);
                } else returnNode = body;
                if (ALLOWED_ATTR.shadowroot || ALLOWED_ATTR.shadowrootmode) /*
            AdoptNode() is not used because internal state is not reset
            (e.g. the past names map of a HTMLFormElement), this is safe
            in theory but we would rather not risk another attack vector.
            The state that is cloned by importNode() is explicitly defined
            by the specs.
          */ returnNode = importNode.call(originalDocument, returnNode, true);
                return returnNode;
            }
            let serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
            /* Serialize doctype if allowed */ if (WHOLE_DOCUMENT && ALLOWED_TAGS['!doctype'] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) serializedHTML = '<!DOCTYPE ' + body.ownerDocument.doctype.name + '>\n' + serializedHTML;
            /* Sanitize final string template-safe */ if (SAFE_FOR_TEMPLATES) arrayForEach([
                MUSTACHE_EXPR,
                ERB_EXPR,
                TMPLIT_EXPR
            ], (expr)=>{
                serializedHTML = stringReplace(serializedHTML, expr, ' ');
            });
            return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
        };
        DOMPurify.setConfig = function() {
            let cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            _parseConfig(cfg);
            SET_CONFIG = true;
        };
        DOMPurify.clearConfig = function() {
            CONFIG = null;
            SET_CONFIG = false;
        };
        DOMPurify.isValidAttribute = function(tag, attr, value) {
            /* Initialize shared config vars if necessary. */ if (!CONFIG) _parseConfig({});
            const lcTag = transformCaseFunc(tag);
            const lcName = transformCaseFunc(attr);
            return _isValidAttribute(lcTag, lcName, value);
        };
        DOMPurify.addHook = function(entryPoint, hookFunction) {
            if (typeof hookFunction !== 'function') return;
            arrayPush(hooks[entryPoint], hookFunction);
        };
        DOMPurify.removeHook = function(entryPoint, hookFunction) {
            if (hookFunction !== undefined) {
                const index = arrayLastIndexOf(hooks[entryPoint], hookFunction);
                return index === -1 ? undefined : arraySplice(hooks[entryPoint], index, 1)[0];
            }
            return arrayPop(hooks[entryPoint]);
        };
        DOMPurify.removeHooks = function(entryPoint) {
            hooks[entryPoint] = [];
        };
        DOMPurify.removeAllHooks = function() {
            hooks = _createHooksMap();
        };
        return DOMPurify;
    }
    var purify = createDOMPurify();
    return purify;
});

},{}]},[], null, "parcelRequire6043", {})

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0EseUwsRyxDLFMsTSxFLE87SSxPLE8sRztBLEMsRSxJLEU7STtJQ0FBLE1BQU0sRUFDSkEsT0FBTyxFQUNQQyxjQUFjLEVBQ2RDLFFBQVEsRUFDUkMsY0FBYyxFQUNkQyx3QkFBQUEsRUFDRCxHQUFHQztJQUVKLElBQUksRUFBRUMsTUFBTSxFQUFFQyxJQUFJLEVBQUVDLE1BQUFBLEVBQVEsR0FBR0gsUUFBTCxnREFBQTtJQUMxQixJQUFJLEVBQUVJLEtBQUssRUFBRUMsU0FBQUEsRUFBVyxHQUFHLE9BQU9DLFlBQVksZUFBZUE7SUFFN0QsSUFBSSxDQUFDTCxRQUNIQSxTQUFTLFNBQUFBLE9BQWFNLENBQUk7UUFDeEIsT0FBT0E7SUFDUjtJQUdILElBQUksQ0FBQ0wsTUFDSEEsT0FBTyxTQUFBQSxLQUFhSyxDQUFJO1FBQ3RCLE9BQU9BO0lBQ1I7SUFHSCxJQUFJLENBQUNILE9BQ0hBLFFBQVEsU0FBQUEsTUFDTkksSUFBeUMsRUFDekNDLE9BQVk7UUFDRSxJQUFBQyxJQUFBQSxPQUFBQyxVQUFBQyxNQUFBLEVBQVhDLE9BQVcsSUFBQUMsTUFBQUosT0FBQUEsSUFBQUEsT0FBQSxJQUFBLElBQUFLLE9BQUEsR0FBQUEsT0FBQUwsTUFBQUssT0FBWEYsSUFBVyxDQUFBRSxPQUFBSixFQUFBQSxHQUFBQSxTQUFBLENBQUFJLEtBQUE7UUFFZCxPQUFPUCxLQUFLSixLQUFLLENBQUNLLFNBQVNJO0lBQzVCO0lBR0gsSUFBSSxDQUFDUixXQUNIQSxZQUFZLFNBQUFBLFVBQWFXLElBQStCO1FBQWdCLElBQUFDLElBQUFBLFFBQUFOLFVBQUFDLE1BQUEsRUFBWEMsT0FBVyxJQUFBQyxNQUFBRyxRQUFBQSxJQUFBQSxRQUFBLElBQUEsSUFBQUMsUUFBQSxHQUFBQSxRQUFBRCxPQUFBQyxRQUFYTCxJQUFXLENBQUFLLFFBQUFQLEVBQUFBLEdBQUFBLFNBQUEsQ0FBQU8sTUFBQTtRQUN0RSxPQUFPLElBQUlGLFFBQVFIO0lBQ3BCO0lBR0gsTUFBTU0sZUFBZUMsUUFBUU4sTUFBTU8sU0FBUyxDQUFDQyxPQUFPO0lBRXBELE1BQU1DLG1CQUFtQkgsUUFBUU4sTUFBTU8sU0FBUyxDQUFDRyxXQUFXO0lBQzVELE1BQU1DLFdBQVdMLFFBQVFOLE1BQU1PLFNBQVMsQ0FBQ0ssR0FBRztJQUM1QyxNQUFNQyxZQUFZUCxRQUFRTixNQUFNTyxTQUFTLENBQUNPLElBQUk7SUFFOUMsTUFBTUMsY0FBY1QsUUFBUU4sTUFBTU8sU0FBUyxDQUFDUyxNQUFNO0lBRWxELE1BQU1DLG9CQUFvQlgsUUFBUVksT0FBT1gsU0FBUyxDQUFDWSxXQUFXO0lBQzlELE1BQU1DLGlCQUFpQmQsUUFBUVksT0FBT1gsU0FBUyxDQUFDYyxRQUFRO0lBQ3hELE1BQU1DLGNBQWNoQixRQUFRWSxPQUFPWCxTQUFTLENBQUNnQixLQUFLO0lBQ2xELE1BQU1DLGdCQUFnQmxCLFFBQVFZLE9BQU9YLFNBQVMsQ0FBQ2tCLE9BQU87SUFDdEQsTUFBTUMsZ0JBQWdCcEIsUUFBUVksT0FBT1gsU0FBUyxDQUFDb0IsT0FBTztJQUN0RCxNQUFNQyxhQUFhdEIsUUFBUVksT0FBT1gsU0FBUyxDQUFDc0IsSUFBSTtJQUVoRCxNQUFNQyx1QkFBdUJ4QixRQUFRcEIsT0FBT3FCLFNBQVMsQ0FBQ3dCLGNBQWM7SUFFcEUsTUFBTUMsYUFBYTFCLFFBQVEyQixPQUFPMUIsU0FBUyxDQUFDMkIsSUFBSTtJQUVoRCxNQUFNQyxrQkFBa0JDLFlBQVlDO0lBRXBDOzs7OztHQUtHLEdBQ0gsU0FBUy9CLFFBQ1BaLElBQXlDO1FBRXpDLE9BQU8sU0FBQ0MsT0FBWTtZQUNsQixJQUFJQSxtQkFBbUJzQyxRQUNyQnRDLFFBQVEyQyxTQUFTLEdBQUc7WUFDckIsSUFBQUMsSUFBQUEsUUFBQTFDLFVBQUFDLE1BQUEsRUFIc0JDLE9BQVcsSUFBQUMsTUFBQXVDLFFBQUFBLElBQUFBLFFBQUEsSUFBQSxJQUFBQyxRQUFBLEdBQUFBLFFBQUFELE9BQUFDLFFBQVh6QyxJQUFXLENBQUF5QyxRQUFBM0MsRUFBQUEsR0FBQUEsU0FBQSxDQUFBMkMsTUFBQTtZQUtsQyxPQUFPbEQsTUFBTUksTUFBTUMsU0FBU0k7UUFDN0I7SUFDSDtJQUVBOzs7OztHQUtHLEdBQ0gsU0FBU3FDLFlBQ1BsQyxJQUErQjtRQUUvQixPQUFPO1lBQUEsSUFBQSxJQUFBdUMsUUFBQTVDLFVBQUFDLE1BQUEsRUFBSUMsT0FBV0MsSUFBQUEsTUFBQXlDLFFBQUFDLFFBQUEsR0FBQUEsUUFBQUQsT0FBQUMsUUFBWDNDLElBQVcsQ0FBQTJDLE1BQUE3QyxHQUFBQSxTQUFBLENBQUE2QyxNQUFBO1lBQUEsT0FBUW5ELFVBQVVXLE1BQU1IO1FBQUs7SUFDckQ7SUFFQTs7Ozs7OztHQU9HLEdBQ0gsU0FBUzRDLFNBQ1BDLEdBQXdCLEVBQ3hCQyxLQUFxQjtRQUNvRCxJQUF6RUMsb0JBQUFBLFVBQUFBLE1BQUFBLEdBQUFBLEtBQUFBLFNBQUFBLENBQUFBLEVBQUFBLEtBQUFBLFlBQUFBLFNBQUFBLENBQUFBLEVBQUFBLEdBQXdEN0I7UUFFeEQsSUFBSW5DLGdCQUNGLDREQUFBO1FBQ0EsNkRBQUE7UUFDQSxtRUFBQTtRQUNBQSxlQUFlOEQsS0FBSztRQUd0QixJQUFJRyxJQUFJRixNQUFNL0MsTUFBTTtRQUNwQixNQUFPaUQsSUFBSztZQUNWLElBQUlDLFVBQVVILEtBQUssQ0FBQ0UsRUFBRTtZQUN0QixJQUFJLE9BQU9DLFlBQVksVUFBVTtnQkFDL0IsTUFBTUMsWUFBWUgsa0JBQWtCRTtnQkFDcEMsSUFBSUMsY0FBY0QsU0FBUztvQkFDekIseURBQUE7b0JBQ0EsSUFBSSxDQUFDakUsU0FBUzhELFFBQ1hBLEtBQWUsQ0FBQ0UsRUFBRSxHQUFHRTtvQkFHeEJELFVBQVVDO2dCQUNaO1lBQ0Y7WUFFQUwsR0FBRyxDQUFDSSxRQUFRLEdBQUc7UUFDakI7UUFFQSxPQUFPSjtJQUNUO0lBRUE7Ozs7O0dBS0csR0FDSCxTQUFTTSxXQUFjTCxLQUFVO1FBQy9CLElBQUssSUFBSU0sUUFBUSxHQUFHQSxRQUFRTixNQUFNL0MsTUFBTSxFQUFFcUQsUUFBUztZQUNqRCxNQUFNQyxrQkFBa0J0QixxQkFBcUJlLE9BQU9NO1lBRXBELElBQUksQ0FBQ0MsaUJBQ0hQLEtBQUssQ0FBQ00sTUFBTSxHQUFHO1FBRW5CO1FBRUEsT0FBT047SUFDVDtJQUVBOzs7OztHQUtHLEdBQ0gsU0FBU1EsTUFBcUNDLE1BQVM7UUFDckQsTUFBTUMsWUFBWWxFLE9BQU87UUFFekIsS0FBSyxNQUFNLENBQUNtRSxVQUFVQyxNQUFNLElBQUk1RSxRQUFReUUsUUFBUztZQUMvQyxNQUFNRixrQkFBa0J0QixxQkFBcUJ3QixRQUFRRTtZQUVyRCxJQUFJSixpQkFBaUI7Z0JBQ25CLElBQUlwRCxNQUFNMEQsT0FBTyxDQUFDRCxRQUNoQkYsU0FBUyxDQUFDQyxTQUFTLEdBQUdOLFdBQVdPO3FCQUM1QixJQUNMQSxTQUNBLE9BQU9BLFVBQVUsWUFDakJBLE1BQU1FLFdBQVcsS0FBS3pFLFFBRXRCcUUsU0FBUyxDQUFDQyxTQUFTLEdBQUdILE1BQU1JO3FCQUU1QkYsU0FBUyxDQUFDQyxTQUFTLEdBQUdDO1lBRTFCO1FBQ0Y7UUFFQSxPQUFPRjtJQUNUO0lBRUE7Ozs7OztHQU1HLEdBQ0gsU0FBU0ssYUFDUE4sTUFBUyxFQUNUTyxJQUFZO1FBRVosTUFBT1AsV0FBVyxLQUFNO1lBQ3RCLE1BQU1RLE9BQU83RSx5QkFBeUJxRSxRQUFRTztZQUU5QyxJQUFJQyxNQUFNO2dCQUNSLElBQUlBLEtBQUtDLEdBQUcsRUFDVixPQUFPekQsUUFBUXdELEtBQUtDLEdBQUc7Z0JBR3pCLElBQUksT0FBT0QsS0FBS0wsS0FBSyxLQUFLLFlBQ3hCLE9BQU9uRCxRQUFRd0QsS0FBS0wsS0FBSztZQUU3QjtZQUVBSCxTQUFTdEUsZUFBZXNFO1FBQzFCO1FBRUEsU0FBU1U7WUFDUCxPQUFPO1FBQ1Q7UUFFQSxPQUFPQTtJQUNUO0lDak5PLE1BQU1DLFNBQU85RSxPQUFPO1FBQ3pCO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7S0FDUTtJQUVILE1BQU0rRSxRQUFNL0UsT0FBTztRQUN4QjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO0tBQ1E7SUFFSCxNQUFNZ0YsYUFBYWhGLE9BQU87UUFDL0I7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7S0FDUTtJQUVWLHVEQUFBO0lBQ0EseURBQUE7SUFDQSxtREFBQTtJQUNBLGNBQUE7SUFDTyxNQUFNaUYsZ0JBQWdCakYsT0FBTztRQUNsQztRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtLQUNRO0lBRUgsTUFBTWtGLFdBQVNsRixPQUFPO1FBQzNCO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtLQUNRO0lBRVYseURBQUE7SUFDQSwwQ0FBQTtJQUNPLE1BQU1tRixtQkFBbUJuRixPQUFPO1FBQ3JDO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtLQUNRO0lBRUgsTUFBTW9GLE9BQU9wRixPQUFPO1FBQUM7S0FBaUI7SUMxUnRDLE1BQU04RSxPQUFPOUUsT0FBTztRQUN6QjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7S0FDUTtJQUVILE1BQU0rRSxNQUFNL0UsT0FBTztRQUN4QjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO0tBQ1E7SUFFSCxNQUFNa0YsU0FBU2xGLE9BQU87UUFDM0I7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtLQUNEO0lBRU0sTUFBTXFGLE1BQU1yRixPQUFPO1FBQ3hCO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7S0FDUTtJQ3JYVixnREFBQTtJ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QixHQUFHLFNBQVVDLEdBQUcsRUFBRXZCLElBQUksRUFBRWxQLEtBQUs7WUFDckQsK0NBQUEsR0FDQSxJQUFJLENBQUMrSixRQUNISyxhQUFhLENBQUE7WUFHZixNQUFNcUUsUUFBUXBQLGtCQUFrQm9SO1lBQ2hDLE1BQU0vQixTQUFTclAsa0JBQWtCNlA7WUFDakMsT0FBT1Ysa0JBQWtCQyxPQUFPQyxRQUFRMU87UUFDekM7UUFFRGtFLFVBQVV3TSxPQUFPLEdBQUcsU0FDbEJDLFVBQTBCLEVBQzFCQyxZQUEwQjtZQUUxQixJQUFJLE9BQU9BLGlCQUFpQixZQUMxQjtZQUdGeFQsVUFBVWlKLEtBQUssQ0FBQ3NLLFdBQVcsRUFBRUM7UUFDOUI7UUFFRDFNLFVBQVUyTSxVQUFVLEdBQUcsU0FDckJGLFVBQTBCLEVBQzFCQyxZQUEwQjtZQUUxQixJQUFJQSxpQkFBaUIzTSxXQUFXO2dCQUM5QixNQUFNdkUsUUFBUTFDLGlCQUFpQnFKLEtBQUssQ0FBQ3NLLFdBQVcsRUFBRUM7Z0JBRWxELE9BQU9sUixVQUFVLEtBQ2J1RSxZQUNBM0csWUFBWStJLEtBQUssQ0FBQ3NLLFdBQVcsRUFBRWpSLE9BQU8sRUFBRSxDQUFDLEVBQUU7WUFDakQ7WUFFQSxPQUFPeEMsU0FBU21KLEtBQUssQ0FBQ3NLLFdBQVc7UUFDbEM7UUFFRHpNLFVBQVU0TSxXQUFXLEdBQUcsU0FBVUgsVUFBMEI7WUFDMUR0SyxLQUFLLENBQUNzSyxXQUFXLEdBQUcsRUFBRTtRQUN2QjtRQUVEek0sVUFBVTZNLGNBQWMsR0FBRztZQUN6QjFLLFFBQVEvQztRQUNUO1FBRUQsT0FBT1k7SUFDVDtJQUVBLElBQUEsU0FBZUY7SSxPO0EiLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9kb21wdXJpZnkvZGlzdC9wdXJpZnkuanMiLCJub2RlX21vZHVsZXMvZG9tcHVyaWZ5L3NyYy91dGlscy50cyIsIm5vZGVfbW9kdWxlcy9kb21wdXJpZnkvc3JjL3RhZ3MudHMiLCJub2RlX21vZHVsZXMvZG9tcHVyaWZ5L3NyYy9hdHRycy50cyIsIm5vZGVfbW9kdWxlcy9kb21wdXJpZnkvc3JjL3JlZ2V4cC50cyIsIm5vZGVfbW9kdWxlcy9kb21wdXJpZnkvc3JjL3B1cmlmeS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgQGxpY2Vuc2UgRE9NUHVyaWZ5IDMuMy4wIHwgKGMpIEN1cmU1MyBhbmQgb3RoZXIgY29udHJpYnV0b3JzIHwgUmVsZWFzZWQgdW5kZXIgdGhlIEFwYWNoZSBsaWNlbnNlIDIuMCBhbmQgTW96aWxsYSBQdWJsaWMgTGljZW5zZSAyLjAgfCBnaXRodWIuY29tL2N1cmU1My9ET01QdXJpZnkvYmxvYi8zLjMuMC9MSUNFTlNFICovXG5cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDpcbiAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGZhY3RvcnkpIDpcbiAgKGdsb2JhbCA9IHR5cGVvZiBnbG9iYWxUaGlzICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbFRoaXMgOiBnbG9iYWwgfHwgc2VsZiwgZ2xvYmFsLkRPTVB1cmlmeSA9IGZhY3RvcnkoKSk7XG59KSh0aGlzLCAoZnVuY3Rpb24gKCkgeyAndXNlIHN0cmljdCc7XG5cbiAgY29uc3Qge1xuICAgIGVudHJpZXMsXG4gICAgc2V0UHJvdG90eXBlT2YsXG4gICAgaXNGcm96ZW4sXG4gICAgZ2V0UHJvdG90eXBlT2YsXG4gICAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yXG4gIH0gPSBPYmplY3Q7XG4gIGxldCB7XG4gICAgZnJlZXplLFxuICAgIHNlYWwsXG4gICAgY3JlYXRlXG4gIH0gPSBPYmplY3Q7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgaW1wb3J0L25vLW11dGFibGUtZXhwb3J0c1xuICBsZXQge1xuICAgIGFwcGx5LFxuICAgIGNvbnN0cnVjdFxuICB9ID0gdHlwZW9mIFJlZmxlY3QgIT09ICd1bmRlZmluZWQnICYmIFJlZmxlY3Q7XG4gIGlmICghZnJlZXplKSB7XG4gICAgZnJlZXplID0gZnVuY3Rpb24gZnJlZXplKHgpIHtcbiAgICAgIHJldHVybiB4O1xuICAgIH07XG4gIH1cbiAgaWYgKCFzZWFsKSB7XG4gICAgc2VhbCA9IGZ1bmN0aW9uIHNlYWwoeCkge1xuICAgICAgcmV0dXJuIHg7XG4gICAgfTtcbiAgfVxuICBpZiAoIWFwcGx5KSB7XG4gICAgYXBwbHkgPSBmdW5jdGlvbiBhcHBseShmdW5jLCB0aGlzQXJnKSB7XG4gICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuID4gMiA/IF9sZW4gLSAyIDogMCksIF9rZXkgPSAyOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIGFyZ3NbX2tleSAtIDJdID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpc0FyZywgYXJncyk7XG4gICAgfTtcbiAgfVxuICBpZiAoIWNvbnN0cnVjdCkge1xuICAgIGNvbnN0cnVjdCA9IGZ1bmN0aW9uIGNvbnN0cnVjdChGdW5jKSB7XG4gICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjIgPiAxID8gX2xlbjIgLSAxIDogMCksIF9rZXkyID0gMTsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgICBhcmdzW19rZXkyIC0gMV0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBGdW5jKC4uLmFyZ3MpO1xuICAgIH07XG4gIH1cbiAgY29uc3QgYXJyYXlGb3JFYWNoID0gdW5hcHBseShBcnJheS5wcm90b3R5cGUuZm9yRWFjaCk7XG4gIGNvbnN0IGFycmF5TGFzdEluZGV4T2YgPSB1bmFwcGx5KEFycmF5LnByb3RvdHlwZS5sYXN0SW5kZXhPZik7XG4gIGNvbnN0IGFycmF5UG9wID0gdW5hcHBseShBcnJheS5wcm90b3R5cGUucG9wKTtcbiAgY29uc3QgYXJyYXlQdXNoID0gdW5hcHBseShBcnJheS5wcm90b3R5cGUucHVzaCk7XG4gIGNvbnN0IGFycmF5U3BsaWNlID0gdW5hcHBseShBcnJheS5wcm90b3R5cGUuc3BsaWNlKTtcbiAgY29uc3Qgc3RyaW5nVG9Mb3dlckNhc2UgPSB1bmFwcGx5KFN0cmluZy5wcm90b3R5cGUudG9Mb3dlckNhc2UpO1xuICBjb25zdCBzdHJpbmdUb1N0cmluZyA9IHVuYXBwbHkoU3RyaW5nLnByb3RvdHlwZS50b1N0cmluZyk7XG4gIGNvbnN0IHN0cmluZ01hdGNoID0gdW5hcHBseShTdHJpbmcucHJvdG90eXBlLm1hdGNoKTtcbiAgY29uc3Qgc3RyaW5nUmVwbGFjZSA9IHVuYXBwbHkoU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlKTtcbiAgY29uc3Qgc3RyaW5nSW5kZXhPZiA9IHVuYXBwbHkoU3RyaW5nLnByb3RvdHlwZS5pbmRleE9mKTtcbiAgY29uc3Qgc3RyaW5nVHJpbSA9IHVuYXBwbHkoU3RyaW5nLnByb3RvdHlwZS50cmltKTtcbiAgY29uc3Qgb2JqZWN0SGFzT3duUHJvcGVydHkgPSB1bmFwcGx5KE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkpO1xuICBjb25zdCByZWdFeHBUZXN0ID0gdW5hcHBseShSZWdFeHAucHJvdG90eXBlLnRlc3QpO1xuICBjb25zdCB0eXBlRXJyb3JDcmVhdGUgPSB1bmNvbnN0cnVjdChUeXBlRXJyb3IpO1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBmdW5jdGlvbiB0aGF0IGNhbGxzIHRoZSBnaXZlbiBmdW5jdGlvbiB3aXRoIGEgc3BlY2lmaWVkIHRoaXNBcmcgYW5kIGFyZ3VtZW50cy5cbiAgICpcbiAgICogQHBhcmFtIGZ1bmMgLSBUaGUgZnVuY3Rpb24gdG8gYmUgd3JhcHBlZCBhbmQgY2FsbGVkLlxuICAgKiBAcmV0dXJucyBBIG5ldyBmdW5jdGlvbiB0aGF0IGNhbGxzIHRoZSBnaXZlbiBmdW5jdGlvbiB3aXRoIGEgc3BlY2lmaWVkIHRoaXNBcmcgYW5kIGFyZ3VtZW50cy5cbiAgICovXG4gIGZ1bmN0aW9uIHVuYXBwbHkoZnVuYykge1xuICAgIHJldHVybiBmdW5jdGlvbiAodGhpc0FyZykge1xuICAgICAgaWYgKHRoaXNBcmcgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgdGhpc0FyZy5sYXN0SW5kZXggPSAwO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgX2xlbjMgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4zID4gMSA/IF9sZW4zIC0gMSA6IDApLCBfa2V5MyA9IDE7IF9rZXkzIDwgX2xlbjM7IF9rZXkzKyspIHtcbiAgICAgICAgYXJnc1tfa2V5MyAtIDFdID0gYXJndW1lbnRzW19rZXkzXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhcHBseShmdW5jLCB0aGlzQXJnLCBhcmdzKTtcbiAgICB9O1xuICB9XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGZ1bmN0aW9uIHRoYXQgY29uc3RydWN0cyBhbiBpbnN0YW5jZSBvZiB0aGUgZ2l2ZW4gY29uc3RydWN0b3IgZnVuY3Rpb24gd2l0aCB0aGUgcHJvdmlkZWQgYXJndW1lbnRzLlxuICAgKlxuICAgKiBAcGFyYW0gZnVuYyAtIFRoZSBjb25zdHJ1Y3RvciBmdW5jdGlvbiB0byBiZSB3cmFwcGVkIGFuZCBjYWxsZWQuXG4gICAqIEByZXR1cm5zIEEgbmV3IGZ1bmN0aW9uIHRoYXQgY29uc3RydWN0cyBhbiBpbnN0YW5jZSBvZiB0aGUgZ2l2ZW4gY29uc3RydWN0b3IgZnVuY3Rpb24gd2l0aCB0aGUgcHJvdmlkZWQgYXJndW1lbnRzLlxuICAgKi9cbiAgZnVuY3Rpb24gdW5jb25zdHJ1Y3QoRnVuYykge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuNCA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjQpLCBfa2V5NCA9IDA7IF9rZXk0IDwgX2xlbjQ7IF9rZXk0KyspIHtcbiAgICAgICAgYXJnc1tfa2V5NF0gPSBhcmd1bWVudHNbX2tleTRdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnN0cnVjdChGdW5jLCBhcmdzKTtcbiAgICB9O1xuICB9XG4gIC8qKlxuICAgKiBBZGQgcHJvcGVydGllcyB0byBhIGxvb2t1cCB0YWJsZVxuICAgKlxuICAgKiBAcGFyYW0gc2V0IC0gVGhlIHNldCB0byB3aGljaCBlbGVtZW50cyB3aWxsIGJlIGFkZGVkLlxuICAgKiBAcGFyYW0gYXJyYXkgLSBUaGUgYXJyYXkgY29udGFpbmluZyBlbGVtZW50cyB0byBiZSBhZGRlZCB0byB0aGUgc2V0LlxuICAgKiBAcGFyYW0gdHJhbnNmb3JtQ2FzZUZ1bmMgLSBBbiBvcHRpb25hbCBmdW5jdGlvbiB0byB0cmFuc2Zvcm0gdGhlIGNhc2Ugb2YgZWFjaCBlbGVtZW50IGJlZm9yZSBhZGRpbmcgdG8gdGhlIHNldC5cbiAgICogQHJldHVybnMgVGhlIG1vZGlmaWVkIHNldCB3aXRoIGFkZGVkIGVsZW1lbnRzLlxuICAgKi9cbiAgZnVuY3Rpb24gYWRkVG9TZXQoc2V0LCBhcnJheSkge1xuICAgIGxldCB0cmFuc2Zvcm1DYXNlRnVuYyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogc3RyaW5nVG9Mb3dlckNhc2U7XG4gICAgaWYgKHNldFByb3RvdHlwZU9mKSB7XG4gICAgICAvLyBNYWtlICdpbicgYW5kIHRydXRoeSBjaGVja3MgbGlrZSBCb29sZWFuKHNldC5jb25zdHJ1Y3RvcilcbiAgICAgIC8vIGluZGVwZW5kZW50IG9mIGFueSBwcm9wZXJ0aWVzIGRlZmluZWQgb24gT2JqZWN0LnByb3RvdHlwZS5cbiAgICAgIC8vIFByZXZlbnQgcHJvdG90eXBlIHNldHRlcnMgZnJvbSBpbnRlcmNlcHRpbmcgc2V0IGFzIGEgdGhpcyB2YWx1ZS5cbiAgICAgIHNldFByb3RvdHlwZU9mKHNldCwgbnVsbCk7XG4gICAgfVxuICAgIGxldCBsID0gYXJyYXkubGVuZ3RoO1xuICAgIHdoaWxlIChsLS0pIHtcbiAgICAgIGxldCBlbGVtZW50ID0gYXJyYXlbbF07XG4gICAgICBpZiAodHlwZW9mIGVsZW1lbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNvbnN0IGxjRWxlbWVudCA9IHRyYW5zZm9ybUNhc2VGdW5jKGVsZW1lbnQpO1xuICAgICAgICBpZiAobGNFbGVtZW50ICE9PSBlbGVtZW50KSB7XG4gICAgICAgICAgLy8gQ29uZmlnIHByZXNldHMgKGUuZy4gdGFncy5qcywgYXR0cnMuanMpIGFyZSBpbW11dGFibGUuXG4gICAgICAgICAgaWYgKCFpc0Zyb3plbihhcnJheSkpIHtcbiAgICAgICAgICAgIGFycmF5W2xdID0gbGNFbGVtZW50O1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbGVtZW50ID0gbGNFbGVtZW50O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBzZXRbZWxlbWVudF0gPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gc2V0O1xuICB9XG4gIC8qKlxuICAgKiBDbGVhbiB1cCBhbiBhcnJheSB0byBoYXJkZW4gYWdhaW5zdCBDU1BQXG4gICAqXG4gICAqIEBwYXJhbSBhcnJheSAtIFRoZSBhcnJheSB0byBiZSBjbGVhbmVkLlxuICAgKiBAcmV0dXJucyBUaGUgY2xlYW5lZCB2ZXJzaW9uIG9mIHRoZSBhcnJheVxuICAgKi9cbiAgZnVuY3Rpb24gY2xlYW5BcnJheShhcnJheSkge1xuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBhcnJheS5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIGNvbnN0IGlzUHJvcGVydHlFeGlzdCA9IG9iamVjdEhhc093blByb3BlcnR5KGFycmF5LCBpbmRleCk7XG4gICAgICBpZiAoIWlzUHJvcGVydHlFeGlzdCkge1xuICAgICAgICBhcnJheVtpbmRleF0gPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJyYXk7XG4gIH1cbiAgLyoqXG4gICAqIFNoYWxsb3cgY2xvbmUgYW4gb2JqZWN0XG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgLSBUaGUgb2JqZWN0IHRvIGJlIGNsb25lZC5cbiAgICogQHJldHVybnMgQSBuZXcgb2JqZWN0IHRoYXQgY29waWVzIHRoZSBvcmlnaW5hbC5cbiAgICovXG4gIGZ1bmN0aW9uIGNsb25lKG9iamVjdCkge1xuICAgIGNvbnN0IG5ld09iamVjdCA9IGNyZWF0ZShudWxsKTtcbiAgICBmb3IgKGNvbnN0IFtwcm9wZXJ0eSwgdmFsdWVdIG9mIGVudHJpZXMob2JqZWN0KSkge1xuICAgICAgY29uc3QgaXNQcm9wZXJ0eUV4aXN0ID0gb2JqZWN0SGFzT3duUHJvcGVydHkob2JqZWN0LCBwcm9wZXJ0eSk7XG4gICAgICBpZiAoaXNQcm9wZXJ0eUV4aXN0KSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgIG5ld09iamVjdFtwcm9wZXJ0eV0gPSBjbGVhbkFycmF5KHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlLmNvbnN0cnVjdG9yID09PSBPYmplY3QpIHtcbiAgICAgICAgICBuZXdPYmplY3RbcHJvcGVydHldID0gY2xvbmUodmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5ld09iamVjdFtwcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmV3T2JqZWN0O1xuICB9XG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBhdXRvbWF0aWNhbGx5IGNoZWNrcyBpZiB0aGUgcHJvcCBpcyBmdW5jdGlvbiBvciBnZXR0ZXIgYW5kIGJlaGF2ZXMgYWNjb3JkaW5nbHkuXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgLSBUaGUgb2JqZWN0IHRvIGxvb2sgdXAgdGhlIGdldHRlciBmdW5jdGlvbiBpbiBpdHMgcHJvdG90eXBlIGNoYWluLlxuICAgKiBAcGFyYW0gcHJvcCAtIFRoZSBwcm9wZXJ0eSBuYW1lIGZvciB3aGljaCB0byBmaW5kIHRoZSBnZXR0ZXIgZnVuY3Rpb24uXG4gICAqIEByZXR1cm5zIFRoZSBnZXR0ZXIgZnVuY3Rpb24gZm91bmQgaW4gdGhlIHByb3RvdHlwZSBjaGFpbiBvciBhIGZhbGxiYWNrIGZ1bmN0aW9uLlxuICAgKi9cbiAgZnVuY3Rpb24gbG9va3VwR2V0dGVyKG9iamVjdCwgcHJvcCkge1xuICAgIHdoaWxlIChvYmplY3QgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGRlc2MgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wKTtcbiAgICAgIGlmIChkZXNjKSB7XG4gICAgICAgIGlmIChkZXNjLmdldCkge1xuICAgICAgICAgIHJldHVybiB1bmFwcGx5KGRlc2MuZ2V0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGRlc2MudmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICByZXR1cm4gdW5hcHBseShkZXNjLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgb2JqZWN0ID0gZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZmFsbGJhY2tWYWx1ZSgpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gZmFsbGJhY2tWYWx1ZTtcbiAgfVxuXG4gIGNvbnN0IGh0bWwkMSA9IGZyZWV6ZShbJ2EnLCAnYWJicicsICdhY3JvbnltJywgJ2FkZHJlc3MnLCAnYXJlYScsICdhcnRpY2xlJywgJ2FzaWRlJywgJ2F1ZGlvJywgJ2InLCAnYmRpJywgJ2JkbycsICdiaWcnLCAnYmxpbmsnLCAnYmxvY2txdW90ZScsICdib2R5JywgJ2JyJywgJ2J1dHRvbicsICdjYW52YXMnLCAnY2FwdGlvbicsICdjZW50ZXInLCAnY2l0ZScsICdjb2RlJywgJ2NvbCcsICdjb2xncm91cCcsICdjb250ZW50JywgJ2RhdGEnLCAnZGF0YWxpc3QnLCAnZGQnLCAnZGVjb3JhdG9yJywgJ2RlbCcsICdkZXRhaWxzJywgJ2RmbicsICdkaWFsb2cnLCAnZGlyJywgJ2RpdicsICdkbCcsICdkdCcsICdlbGVtZW50JywgJ2VtJywgJ2ZpZWxkc2V0JywgJ2ZpZ2NhcHRpb24nLCAnZmlndXJlJywgJ2ZvbnQnLCAnZm9vdGVyJywgJ2Zvcm0nLCAnaDEnLCAnaDInLCAnaDMnLCAnaDQnLCAnaDUnLCAnaDYnLCAnaGVhZCcsICdoZWFkZXInLCAnaGdyb3VwJywgJ2hyJywgJ2h0bWwnLCAnaScsICdpbWcnLCAnaW5wdXQnLCAnaW5zJywgJ2tiZCcsICdsYWJlbCcsICdsZWdlbmQnLCAnbGknLCAnbWFpbicsICdtYXAnLCAnbWFyaycsICdtYXJxdWVlJywgJ21lbnUnLCAnbWVudWl0ZW0nLCAnbWV0ZXInLCAnbmF2JywgJ25vYnInLCAnb2wnLCAnb3B0Z3JvdXAnLCAnb3B0aW9uJywgJ291dHB1dCcsICdwJywgJ3BpY3R1cmUnLCAncHJlJywgJ3Byb2dyZXNzJywgJ3EnLCAncnAnLCAncnQnLCAncnVieScsICdzJywgJ3NhbXAnLCAnc2VhcmNoJywgJ3NlY3Rpb24nLCAnc2VsZWN0JywgJ3NoYWRvdycsICdzbG90JywgJ3NtYWxsJywgJ3NvdXJjZScsICdzcGFjZXInLCAnc3BhbicsICdzdHJpa2UnLCAnc3Ryb25nJywgJ3N0eWxlJywgJ3N1YicsICdzdW1tYXJ5JywgJ3N1cCcsICd0YWJsZScsICd0Ym9keScsICd0ZCcsICd0ZW1wbGF0ZScsICd0ZXh0YXJlYScsICd0Zm9vdCcsICd0aCcsICd0aGVhZCcsICd0aW1lJywgJ3RyJywgJ3RyYWNrJywgJ3R0JywgJ3UnLCAndWwnLCAndmFyJywgJ3ZpZGVvJywgJ3diciddKTtcbiAgY29uc3Qgc3ZnJDEgPSBmcmVlemUoWydzdmcnLCAnYScsICdhbHRnbHlwaCcsICdhbHRnbHlwaGRlZicsICdhbHRnbHlwaGl0ZW0nLCAnYW5pbWF0ZWNvbG9yJywgJ2FuaW1hdGVtb3Rpb24nLCAnYW5pbWF0ZXRyYW5zZm9ybScsICdjaXJjbGUnLCAnY2xpcHBhdGgnLCAnZGVmcycsICdkZXNjJywgJ2VsbGlwc2UnLCAnZW50ZXJrZXloaW50JywgJ2V4cG9ydHBhcnRzJywgJ2ZpbHRlcicsICdmb250JywgJ2cnLCAnZ2x5cGgnLCAnZ2x5cGhyZWYnLCAnaGtlcm4nLCAnaW1hZ2UnLCAnaW5wdXRtb2RlJywgJ2xpbmUnLCAnbGluZWFyZ3JhZGllbnQnLCAnbWFya2VyJywgJ21hc2snLCAnbWV0YWRhdGEnLCAnbXBhdGgnLCAncGFydCcsICdwYXRoJywgJ3BhdHRlcm4nLCAncG9seWdvbicsICdwb2x5bGluZScsICdyYWRpYWxncmFkaWVudCcsICdyZWN0JywgJ3N0b3AnLCAnc3R5bGUnLCAnc3dpdGNoJywgJ3N5bWJvbCcsICd0ZXh0JywgJ3RleHRwYXRoJywgJ3RpdGxlJywgJ3RyZWYnLCAndHNwYW4nLCAndmlldycsICd2a2VybiddKTtcbiAgY29uc3Qgc3ZnRmlsdGVycyA9IGZyZWV6ZShbJ2ZlQmxlbmQnLCAnZmVDb2xvck1hdHJpeCcsICdmZUNvbXBvbmVudFRyYW5zZmVyJywgJ2ZlQ29tcG9zaXRlJywgJ2ZlQ29udm9sdmVNYXRyaXgnLCAnZmVEaWZmdXNlTGlnaHRpbmcnLCAnZmVEaXNwbGFjZW1lbnRNYXAnLCAnZmVEaXN0YW50TGlnaHQnLCAnZmVEcm9wU2hhZG93JywgJ2ZlRmxvb2QnLCAnZmVGdW5jQScsICdmZUZ1bmNCJywgJ2ZlRnVuY0cnLCAnZmVGdW5jUicsICdmZUdhdXNzaWFuQmx1cicsICdmZUltYWdlJywgJ2ZlTWVyZ2UnLCAnZmVNZXJnZU5vZGUnLCAnZmVNb3JwaG9sb2d5JywgJ2ZlT2Zmc2V0JywgJ2ZlUG9pbnRMaWdodCcsICdmZVNwZWN1bGFyTGlnaHRpbmcnLCAnZmVTcG90TGlnaHQnLCAnZmVUaWxlJywgJ2ZlVHVyYnVsZW5jZSddKTtcbiAgLy8gTGlzdCBvZiBTVkcgZWxlbWVudHMgdGhhdCBhcmUgZGlzYWxsb3dlZCBieSBkZWZhdWx0LlxuICAvLyBXZSBzdGlsbCBuZWVkIHRvIGtub3cgdGhlbSBzbyB0aGF0IHdlIGNhbiBkbyBuYW1lc3BhY2VcbiAgLy8gY2hlY2tzIHByb3Blcmx5IGluIGNhc2Ugb25lIHdhbnRzIHRvIGFkZCB0aGVtIHRvXG4gIC8vIGFsbG93LWxpc3QuXG4gIGNvbnN0IHN2Z0Rpc2FsbG93ZWQgPSBmcmVlemUoWydhbmltYXRlJywgJ2NvbG9yLXByb2ZpbGUnLCAnY3Vyc29yJywgJ2Rpc2NhcmQnLCAnZm9udC1mYWNlJywgJ2ZvbnQtZmFjZS1mb3JtYXQnLCAnZm9udC1mYWNlLW5hbWUnLCAnZm9udC1mYWNlLXNyYycsICdmb250LWZhY2UtdXJpJywgJ2ZvcmVpZ25vYmplY3QnLCAnaGF0Y2gnLCAnaGF0Y2hwYXRoJywgJ21lc2gnLCAnbWVzaGdyYWRpZW50JywgJ21lc2hwYXRjaCcsICdtZXNocm93JywgJ21pc3NpbmctZ2x5cGgnLCAnc2NyaXB0JywgJ3NldCcsICdzb2xpZGNvbG9yJywgJ3Vua25vd24nLCAndXNlJ10pO1xuICBjb25zdCBtYXRoTWwkMSA9IGZyZWV6ZShbJ21hdGgnLCAnbWVuY2xvc2UnLCAnbWVycm9yJywgJ21mZW5jZWQnLCAnbWZyYWMnLCAnbWdseXBoJywgJ21pJywgJ21sYWJlbGVkdHInLCAnbW11bHRpc2NyaXB0cycsICdtbicsICdtbycsICdtb3ZlcicsICdtcGFkZGVkJywgJ21waGFudG9tJywgJ21yb290JywgJ21yb3cnLCAnbXMnLCAnbXNwYWNlJywgJ21zcXJ0JywgJ21zdHlsZScsICdtc3ViJywgJ21zdXAnLCAnbXN1YnN1cCcsICdtdGFibGUnLCAnbXRkJywgJ210ZXh0JywgJ210cicsICdtdW5kZXInLCAnbXVuZGVyb3ZlcicsICdtcHJlc2NyaXB0cyddKTtcbiAgLy8gU2ltaWxhcmx5IHRvIFNWRywgd2Ugd2FudCB0byBrbm93IGFsbCBNYXRoTUwgZWxlbWVudHMsXG4gIC8vIGV2ZW4gdGhvc2UgdGhhdCB3ZSBkaXNhbGxvdyBieSBkZWZhdWx0LlxuICBjb25zdCBtYXRoTWxEaXNhbGxvd2VkID0gZnJlZXplKFsnbWFjdGlvbicsICdtYWxpZ25ncm91cCcsICdtYWxpZ25tYXJrJywgJ21sb25nZGl2JywgJ21zY2FycmllcycsICdtc2NhcnJ5JywgJ21zZ3JvdXAnLCAnbXN0YWNrJywgJ21zbGluZScsICdtc3JvdycsICdzZW1hbnRpY3MnLCAnYW5ub3RhdGlvbicsICdhbm5vdGF0aW9uLXhtbCcsICdtcHJlc2NyaXB0cycsICdub25lJ10pO1xuICBjb25zdCB0ZXh0ID0gZnJlZXplKFsnI3RleHQnXSk7XG5cbiAgY29uc3QgaHRtbCA9IGZyZWV6ZShbJ2FjY2VwdCcsICdhY3Rpb24nLCAnYWxpZ24nLCAnYWx0JywgJ2F1dG9jYXBpdGFsaXplJywgJ2F1dG9jb21wbGV0ZScsICdhdXRvcGljdHVyZWlucGljdHVyZScsICdhdXRvcGxheScsICdiYWNrZ3JvdW5kJywgJ2JnY29sb3InLCAnYm9yZGVyJywgJ2NhcHR1cmUnLCAnY2VsbHBhZGRpbmcnLCAnY2VsbHNwYWNpbmcnLCAnY2hlY2tlZCcsICdjaXRlJywgJ2NsYXNzJywgJ2NsZWFyJywgJ2NvbG9yJywgJ2NvbHMnLCAnY29sc3BhbicsICdjb250cm9scycsICdjb250cm9sc2xpc3QnLCAnY29vcmRzJywgJ2Nyb3Nzb3JpZ2luJywgJ2RhdGV0aW1lJywgJ2RlY29kaW5nJywgJ2RlZmF1bHQnLCAnZGlyJywgJ2Rpc2FibGVkJywgJ2Rpc2FibGVwaWN0dXJlaW5waWN0dXJlJywgJ2Rpc2FibGVyZW1vdGVwbGF5YmFjaycsICdkb3dubG9hZCcsICdkcmFnZ2FibGUnLCAnZW5jdHlwZScsICdlbnRlcmtleWhpbnQnLCAnZXhwb3J0cGFydHMnLCAnZmFjZScsICdmb3InLCAnaGVhZGVycycsICdoZWlnaHQnLCAnaGlkZGVuJywgJ2hpZ2gnLCAnaHJlZicsICdocmVmbGFuZycsICdpZCcsICdpbmVydCcsICdpbnB1dG1vZGUnLCAnaW50ZWdyaXR5JywgJ2lzbWFwJywgJ2tpbmQnLCAnbGFiZWwnLCAnbGFuZycsICdsaXN0JywgJ2xvYWRpbmcnLCAnbG9vcCcsICdsb3cnLCAnbWF4JywgJ21heGxlbmd0aCcsICdtZWRpYScsICdtZXRob2QnLCAnbWluJywgJ21pbmxlbmd0aCcsICdtdWx0aXBsZScsICdtdXRlZCcsICduYW1lJywgJ25vbmNlJywgJ25vc2hhZGUnLCAnbm92YWxpZGF0ZScsICdub3dyYXAnLCAnb3BlbicsICdvcHRpbXVtJywgJ3BhcnQnLCAncGF0dGVybicsICdwbGFjZWhvbGRlcicsICdwbGF5c2lubGluZScsICdwb3BvdmVyJywgJ3BvcG92ZXJ0YXJnZXQnLCAncG9wb3ZlcnRhcmdldGFjdGlvbicsICdwb3N0ZXInLCAncHJlbG9hZCcsICdwdWJkYXRlJywgJ3JhZGlvZ3JvdXAnLCAncmVhZG9ubHknLCAncmVsJywgJ3JlcXVpcmVkJywgJ3JldicsICdyZXZlcnNlZCcsICdyb2xlJywgJ3Jvd3MnLCAncm93c3BhbicsICdzcGVsbGNoZWNrJywgJ3Njb3BlJywgJ3NlbGVjdGVkJywgJ3NoYXBlJywgJ3NpemUnLCAnc2l6ZXMnLCAnc2xvdCcsICdzcGFuJywgJ3NyY2xhbmcnLCAnc3RhcnQnLCAnc3JjJywgJ3NyY3NldCcsICdzdGVwJywgJ3N0eWxlJywgJ3N1bW1hcnknLCAndGFiaW5kZXgnLCAndGl0bGUnLCAndHJhbnNsYXRlJywgJ3R5cGUnLCAndXNlbWFwJywgJ3ZhbGlnbicsICd2YWx1ZScsICd3aWR0aCcsICd3cmFwJywgJ3htbG5zJywgJ3Nsb3QnXSk7XG4gIGNvbnN0IHN2ZyA9IGZyZWV6ZShbJ2FjY2VudC1oZWlnaHQnLCAnYWNjdW11bGF0ZScsICdhZGRpdGl2ZScsICdhbGlnbm1lbnQtYmFzZWxpbmUnLCAnYW1wbGl0dWRlJywgJ2FzY2VudCcsICdhdHRyaWJ1dGVuYW1lJywgJ2F0dHJpYnV0ZXR5cGUnLCAnYXppbXV0aCcsICdiYXNlZnJlcXVlbmN5JywgJ2Jhc2VsaW5lLXNoaWZ0JywgJ2JlZ2luJywgJ2JpYXMnLCAnYnknLCAnY2xhc3MnLCAnY2xpcCcsICdjbGlwcGF0aHVuaXRzJywgJ2NsaXAtcGF0aCcsICdjbGlwLXJ1bGUnLCAnY29sb3InLCAnY29sb3ItaW50ZXJwb2xhdGlvbicsICdjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnMnLCAnY29sb3ItcHJvZmlsZScsICdjb2xvci1yZW5kZXJpbmcnLCAnY3gnLCAnY3knLCAnZCcsICdkeCcsICdkeScsICdkaWZmdXNlY29uc3RhbnQnLCAnZGlyZWN0aW9uJywgJ2Rpc3BsYXknLCAnZGl2aXNvcicsICdkdXInLCAnZWRnZW1vZGUnLCAnZWxldmF0aW9uJywgJ2VuZCcsICdleHBvbmVudCcsICdmaWxsJywgJ2ZpbGwtb3BhY2l0eScsICdmaWxsLXJ1bGUnLCAnZmlsdGVyJywgJ2ZpbHRlcnVuaXRzJywgJ2Zsb29kLWNvbG9yJywgJ2Zsb29kLW9wYWNpdHknLCAnZm9udC1mYW1pbHknLCAnZm9udC1zaXplJywgJ2ZvbnQtc2l6ZS1hZGp1c3QnLCAnZm9udC1zdHJldGNoJywgJ2ZvbnQtc3R5bGUnLCAnZm9udC12YXJpYW50JywgJ2ZvbnQtd2VpZ2h0JywgJ2Z4JywgJ2Z5JywgJ2cxJywgJ2cyJywgJ2dseXBoLW5hbWUnLCAnZ2x5cGhyZWYnLCAnZ3JhZGllbnR1bml0cycsICdncmFkaWVudHRyYW5zZm9ybScsICdoZWlnaHQnLCAnaHJlZicsICdpZCcsICdpbWFnZS1yZW5kZXJpbmcnLCAnaW4nLCAnaW4yJywgJ2ludGVyY2VwdCcsICdrJywgJ2sxJywgJ2syJywgJ2szJywgJ2s0JywgJ2tlcm5pbmcnLCAna2V5cG9pbnRzJywgJ2tleXNwbGluZXMnLCAna2V5dGltZXMnLCAnbGFuZycsICdsZW5ndGhhZGp1c3QnLCAnbGV0dGVyLXNwYWNpbmcnLCAna2VybmVsbWF0cml4JywgJ2tlcm5lbHVuaXRsZW5ndGgnLCAnbGlnaHRpbmctY29sb3InLCAnbG9jYWwnLCAnbWFya2VyLWVuZCcsICdtYXJrZXItbWlkJywgJ21hcmtlci1zdGFydCcsICdtYXJrZXJoZWlnaHQnLCAnbWFya2VydW5pdHMnLCAnbWFya2Vyd2lkdGgnLCAnbWFza2NvbnRlbnR1bml0cycsICdtYXNrdW5pdHMnLCAnbWF4JywgJ21hc2snLCAnbWFzay10eXBlJywgJ21lZGlhJywgJ21ldGhvZCcsICdtb2RlJywgJ21pbicsICduYW1lJywgJ251bW9jdGF2ZXMnLCAnb2Zmc2V0JywgJ29wZXJhdG9yJywgJ29wYWNpdHknLCAnb3JkZXInLCAnb3JpZW50JywgJ29yaWVudGF0aW9uJywgJ29yaWdpbicsICdvdmVyZmxvdycsICdwYWludC1vcmRlcicsICdwYXRoJywgJ3BhdGhsZW5ndGgnLCAncGF0dGVybmNvbnRlbnR1bml0cycsICdwYXR0ZXJudHJhbnNmb3JtJywgJ3BhdHRlcm51bml0cycsICdwb2ludHMnLCAncHJlc2VydmVhbHBoYScsICdwcmVzZXJ2ZWFzcGVjdHJhdGlvJywgJ3ByaW1pdGl2ZXVuaXRzJywgJ3InLCAncngnLCAncnknLCAncmFkaXVzJywgJ3JlZngnLCAncmVmeScsICdyZXBlYXRjb3VudCcsICdyZXBlYXRkdXInLCAncmVzdGFydCcsICdyZXN1bHQnLCAncm90YXRlJywgJ3NjYWxlJywgJ3NlZWQnLCAnc2hhcGUtcmVuZGVyaW5nJywgJ3Nsb3BlJywgJ3NwZWN1bGFyY29uc3RhbnQnLCAnc3BlY3VsYXJleHBvbmVudCcsICdzcHJlYWRtZXRob2QnLCAnc3RhcnRvZmZzZXQnLCAnc3RkZGV2aWF0aW9uJywgJ3N0aXRjaHRpbGVzJywgJ3N0b3AtY29sb3InLCAnc3RvcC1vcGFjaXR5JywgJ3N0cm9rZS1kYXNoYXJyYXknLCAnc3Ryb2tlLWRhc2hvZmZzZXQnLCAnc3Ryb2tlLWxpbmVjYXAnLCAnc3Ryb2tlLWxpbmVqb2luJywgJ3N0cm9rZS1taXRlcmxpbWl0JywgJ3N0cm9rZS1vcGFjaXR5JywgJ3N0cm9rZScsICdzdHJva2Utd2lkdGgnLCAnc3R5bGUnLCAnc3VyZmFjZXNjYWxlJywgJ3N5c3RlbWxhbmd1YWdlJywgJ3RhYmluZGV4JywgJ3RhYmxldmFsdWVzJywgJ3RhcmdldHgnLCAndGFyZ2V0eScsICd0cmFuc2Zvcm0nLCAndHJhbnNmb3JtLW9yaWdpbicsICd0ZXh0LWFuY2hvcicsICd0ZXh0LWRlY29yYXRpb24nLCAndGV4dC1yZW5kZXJpbmcnLCAndGV4dGxlbmd0aCcsICd0eXBlJywgJ3UxJywgJ3UyJywgJ3VuaWNvZGUnLCAndmFsdWVzJywgJ3ZpZXdib3gnLCAndmlzaWJpbGl0eScsICd2ZXJzaW9uJywgJ3ZlcnQtYWR2LXknLCAndmVydC1vcmlnaW4teCcsICd2ZXJ0LW9yaWdpbi15JywgJ3dpZHRoJywgJ3dvcmQtc3BhY2luZycsICd3cmFwJywgJ3dyaXRpbmctbW9kZScsICd4Y2hhbm5lbHNlbGVjdG9yJywgJ3ljaGFubmVsc2VsZWN0b3InLCAneCcsICd4MScsICd4MicsICd4bWxucycsICd5JywgJ3kxJywgJ3kyJywgJ3onLCAnem9vbWFuZHBhbiddKTtcbiAgY29uc3QgbWF0aE1sID0gZnJlZXplKFsnYWNjZW50JywgJ2FjY2VudHVuZGVyJywgJ2FsaWduJywgJ2JldmVsbGVkJywgJ2Nsb3NlJywgJ2NvbHVtbnNhbGlnbicsICdjb2x1bW5saW5lcycsICdjb2x1bW5zcGFuJywgJ2Rlbm9tYWxpZ24nLCAnZGVwdGgnLCAnZGlyJywgJ2Rpc3BsYXknLCAnZGlzcGxheXN0eWxlJywgJ2VuY29kaW5nJywgJ2ZlbmNlJywgJ2ZyYW1lJywgJ2hlaWdodCcsICdocmVmJywgJ2lkJywgJ2xhcmdlb3AnLCAnbGVuZ3RoJywgJ2xpbmV0aGlja25lc3MnLCAnbHNwYWNlJywgJ2xxdW90ZScsICdtYXRoYmFja2dyb3VuZCcsICdtYXRoY29sb3InLCAnbWF0aHNpemUnLCAnbWF0aHZhcmlhbnQnLCAnbWF4c2l6ZScsICdtaW5zaXplJywgJ21vdmFibGVsaW1pdHMnLCAnbm90YXRpb24nLCAnbnVtYWxpZ24nLCAnb3BlbicsICdyb3dhbGlnbicsICdyb3dsaW5lcycsICdyb3dzcGFjaW5nJywgJ3Jvd3NwYW4nLCAncnNwYWNlJywgJ3JxdW90ZScsICdzY3JpcHRsZXZlbCcsICdzY3JpcHRtaW5zaXplJywgJ3NjcmlwdHNpemVtdWx0aXBsaWVyJywgJ3NlbGVjdGlvbicsICdzZXBhcmF0b3InLCAnc2VwYXJhdG9ycycsICdzdHJldGNoeScsICdzdWJzY3JpcHRzaGlmdCcsICdzdXBzY3JpcHRzaGlmdCcsICdzeW1tZXRyaWMnLCAndm9mZnNldCcsICd3aWR0aCcsICd4bWxucyddKTtcbiAgY29uc3QgeG1sID0gZnJlZXplKFsneGxpbms6aHJlZicsICd4bWw6aWQnLCAneGxpbms6dGl0bGUnLCAneG1sOnNwYWNlJywgJ3htbG5zOnhsaW5rJ10pO1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB1bmljb3JuL2JldHRlci1yZWdleFxuICBjb25zdCBNVVNUQUNIRV9FWFBSID0gc2VhbCgvXFx7XFx7W1xcd1xcV10qfFtcXHdcXFddKlxcfVxcfS9nbSk7IC8vIFNwZWNpZnkgdGVtcGxhdGUgZGV0ZWN0aW9uIHJlZ2V4IGZvciBTQUZFX0ZPUl9URU1QTEFURVMgbW9kZVxuICBjb25zdCBFUkJfRVhQUiA9IHNlYWwoLzwlW1xcd1xcV10qfFtcXHdcXFddKiU+L2dtKTtcbiAgY29uc3QgVE1QTElUX0VYUFIgPSBzZWFsKC9cXCRcXHtbXFx3XFxXXSovZ20pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHVuaWNvcm4vYmV0dGVyLXJlZ2V4XG4gIGNvbnN0IERBVEFfQVRUUiA9IHNlYWwoL15kYXRhLVtcXC1cXHcuXFx1MDBCNy1cXHVGRkZGXSskLyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdXNlbGVzcy1lc2NhcGVcbiAgY29uc3QgQVJJQV9BVFRSID0gc2VhbCgvXmFyaWEtW1xcLVxcd10rJC8pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVzZWxlc3MtZXNjYXBlXG4gIGNvbnN0IElTX0FMTE9XRURfVVJJID0gc2VhbCgvXig/Oig/Oig/OmZ8aHQpdHBzP3xtYWlsdG98dGVsfGNhbGx0b3xzbXN8Y2lkfHhtcHB8bWF0cml4KTp8W15hLXpdfFthLXorLlxcLV0rKD86W15hLXorLlxcLTpdfCQpKS9pIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdXNlbGVzcy1lc2NhcGVcbiAgKTtcbiAgY29uc3QgSVNfU0NSSVBUX09SX0RBVEEgPSBzZWFsKC9eKD86XFx3K3NjcmlwdHxkYXRhKTovaSk7XG4gIGNvbnN0IEFUVFJfV0hJVEVTUEFDRSA9IHNlYWwoL1tcXHUwMDAwLVxcdTAwMjBcXHUwMEEwXFx1MTY4MFxcdTE4MEVcXHUyMDAwLVxcdTIwMjlcXHUyMDVGXFx1MzAwMF0vZyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnRyb2wtcmVnZXhcbiAgKTtcbiAgY29uc3QgRE9DVFlQRV9OQU1FID0gc2VhbCgvXmh0bWwkL2kpO1xuICBjb25zdCBDVVNUT01fRUxFTUVOVCA9IHNlYWwoL15bYS16XVsuXFx3XSooLVsuXFx3XSspKyQvaSk7XG5cbiAgdmFyIEVYUFJFU1NJT05TID0gLyojX19QVVJFX18qL09iamVjdC5mcmVlemUoe1xuICAgIF9fcHJvdG9fXzogbnVsbCxcbiAgICBBUklBX0FUVFI6IEFSSUFfQVRUUixcbiAgICBBVFRSX1dISVRFU1BBQ0U6IEFUVFJfV0hJVEVTUEFDRSxcbiAgICBDVVNUT01fRUxFTUVOVDogQ1VTVE9NX0VMRU1FTlQsXG4gICAgREFUQV9BVFRSOiBEQVRBX0FUVFIsXG4gICAgRE9DVFlQRV9OQU1FOiBET0NUWVBFX05BTUUsXG4gICAgRVJCX0VYUFI6IEVSQl9FWFBSLFxuICAgIElTX0FMTE9XRURfVVJJOiBJU19BTExPV0VEX1VSSSxcbiAgICBJU19TQ1JJUFRfT1JfREFUQTogSVNfU0NSSVBUX09SX0RBVEEsXG4gICAgTVVTVEFDSEVfRVhQUjogTVVTVEFDSEVfRVhQUixcbiAgICBUTVBMSVRfRVhQUjogVE1QTElUX0VYUFJcbiAgfSk7XG5cbiAgLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L2luZGVudCAqL1xuICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvTm9kZS9ub2RlVHlwZVxuICBjb25zdCBOT0RFX1RZUEUgPSB7XG4gICAgZWxlbWVudDogMSxcbiAgICBhdHRyaWJ1dGU6IDIsXG4gICAgdGV4dDogMyxcbiAgICBjZGF0YVNlY3Rpb246IDQsXG4gICAgZW50aXR5UmVmZXJlbmNlOiA1LFxuICAgIC8vIERlcHJlY2F0ZWRcbiAgICBlbnRpdHlOb2RlOiA2LFxuICAgIC8vIERlcHJlY2F0ZWRcbiAgICBwcm9ncmVzc2luZ0luc3RydWN0aW9uOiA3LFxuICAgIGNvbW1lbnQ6IDgsXG4gICAgZG9jdW1lbnQ6IDksXG4gICAgZG9jdW1lbnRUeXBlOiAxMCxcbiAgICBkb2N1bWVudEZyYWdtZW50OiAxMSxcbiAgICBub3RhdGlvbjogMTIgLy8gRGVwcmVjYXRlZFxuICB9O1xuICBjb25zdCBnZXRHbG9iYWwgPSBmdW5jdGlvbiBnZXRHbG9iYWwoKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnID8gbnVsbCA6IHdpbmRvdztcbiAgfTtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuby1vcCBwb2xpY3kgZm9yIGludGVybmFsIHVzZSBvbmx5LlxuICAgKiBEb24ndCBleHBvcnQgdGhpcyBmdW5jdGlvbiBvdXRzaWRlIHRoaXMgbW9kdWxlIVxuICAgKiBAcGFyYW0gdHJ1c3RlZFR5cGVzIFRoZSBwb2xpY3kgZmFjdG9yeS5cbiAgICogQHBhcmFtIHB1cmlmeUhvc3RFbGVtZW50IFRoZSBTY3JpcHQgZWxlbWVudCB1c2VkIHRvIGxvYWQgRE9NUHVyaWZ5ICh0byBkZXRlcm1pbmUgcG9saWN5IG5hbWUgc3VmZml4KS5cbiAgICogQHJldHVybiBUaGUgcG9saWN5IGNyZWF0ZWQgKG9yIG51bGwsIGlmIFRydXN0ZWQgVHlwZXNcbiAgICogYXJlIG5vdCBzdXBwb3J0ZWQgb3IgY3JlYXRpbmcgdGhlIHBvbGljeSBmYWlsZWQpLlxuICAgKi9cbiAgY29uc3QgX2NyZWF0ZVRydXN0ZWRUeXBlc1BvbGljeSA9IGZ1bmN0aW9uIF9jcmVhdGVUcnVzdGVkVHlwZXNQb2xpY3kodHJ1c3RlZFR5cGVzLCBwdXJpZnlIb3N0RWxlbWVudCkge1xuICAgIGlmICh0eXBlb2YgdHJ1c3RlZFR5cGVzICE9PSAnb2JqZWN0JyB8fCB0eXBlb2YgdHJ1c3RlZFR5cGVzLmNyZWF0ZVBvbGljeSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIC8vIEFsbG93IHRoZSBjYWxsZXJzIHRvIGNvbnRyb2wgdGhlIHVuaXF1ZSBwb2xpY3kgbmFtZVxuICAgIC8vIGJ5IGFkZGluZyBhIGRhdGEtdHQtcG9saWN5LXN1ZmZpeCB0byB0aGUgc2NyaXB0IGVsZW1lbnQgd2l0aCB0aGUgRE9NUHVyaWZ5LlxuICAgIC8vIFBvbGljeSBjcmVhdGlvbiB3aXRoIGR1cGxpY2F0ZSBuYW1lcyB0aHJvd3MgaW4gVHJ1c3RlZCBUeXBlcy5cbiAgICBsZXQgc3VmZml4ID0gbnVsbDtcbiAgICBjb25zdCBBVFRSX05BTUUgPSAnZGF0YS10dC1wb2xpY3ktc3VmZml4JztcbiAgICBpZiAocHVyaWZ5SG9zdEVsZW1lbnQgJiYgcHVyaWZ5SG9zdEVsZW1lbnQuaGFzQXR0cmlidXRlKEFUVFJfTkFNRSkpIHtcbiAgICAgIHN1ZmZpeCA9IHB1cmlmeUhvc3RFbGVtZW50LmdldEF0dHJpYnV0ZShBVFRSX05BTUUpO1xuICAgIH1cbiAgICBjb25zdCBwb2xpY3lOYW1lID0gJ2RvbXB1cmlmeScgKyAoc3VmZml4ID8gJyMnICsgc3VmZml4IDogJycpO1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gdHJ1c3RlZFR5cGVzLmNyZWF0ZVBvbGljeShwb2xpY3lOYW1lLCB7XG4gICAgICAgIGNyZWF0ZUhUTUwoaHRtbCkge1xuICAgICAgICAgIHJldHVybiBodG1sO1xuICAgICAgICB9LFxuICAgICAgICBjcmVhdGVTY3JpcHRVUkwoc2NyaXB0VXJsKSB7XG4gICAgICAgICAgcmV0dXJuIHNjcmlwdFVybDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoXykge1xuICAgICAgLy8gUG9saWN5IGNyZWF0aW9uIGZhaWxlZCAobW9zdCBsaWtlbHkgYW5vdGhlciBET01QdXJpZnkgc2NyaXB0IGhhc1xuICAgICAgLy8gYWxyZWFkeSBydW4pLiBTa2lwIGNyZWF0aW5nIHRoZSBwb2xpY3ksIGFzIHRoaXMgd2lsbCBvbmx5IGNhdXNlIGVycm9yc1xuICAgICAgLy8gaWYgVFQgYXJlIGVuZm9yY2VkLlxuICAgICAgY29uc29sZS53YXJuKCdUcnVzdGVkVHlwZXMgcG9saWN5ICcgKyBwb2xpY3lOYW1lICsgJyBjb3VsZCBub3QgYmUgY3JlYXRlZC4nKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfTtcbiAgY29uc3QgX2NyZWF0ZUhvb2tzTWFwID0gZnVuY3Rpb24gX2NyZWF0ZUhvb2tzTWFwKCkge1xuICAgIHJldHVybiB7XG4gICAgICBhZnRlclNhbml0aXplQXR0cmlidXRlczogW10sXG4gICAgICBhZnRlclNhbml0aXplRWxlbWVudHM6IFtdLFxuICAgICAgYWZ0ZXJTYW5pdGl6ZVNoYWRvd0RPTTogW10sXG4gICAgICBiZWZvcmVTYW5pdGl6ZUF0dHJpYnV0ZXM6IFtdLFxuICAgICAgYmVmb3JlU2FuaXRpemVFbGVtZW50czogW10sXG4gICAgICBiZWZvcmVTYW5pdGl6ZVNoYWRvd0RPTTogW10sXG4gICAgICB1cG9uU2FuaXRpemVBdHRyaWJ1dGU6IFtdLFxuICAgICAgdXBvblNhbml0aXplRWxlbWVudDogW10sXG4gICAgICB1cG9uU2FuaXRpemVTaGFkb3dOb2RlOiBbXVxuICAgIH07XG4gIH07XG4gIGZ1bmN0aW9uIGNyZWF0ZURPTVB1cmlmeSgpIHtcbiAgICBsZXQgd2luZG93ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBnZXRHbG9iYWwoKTtcbiAgICBjb25zdCBET01QdXJpZnkgPSByb290ID0+IGNyZWF0ZURPTVB1cmlmeShyb290KTtcbiAgICBET01QdXJpZnkudmVyc2lvbiA9ICczLjMuMCc7XG4gICAgRE9NUHVyaWZ5LnJlbW92ZWQgPSBbXTtcbiAgICBpZiAoIXdpbmRvdyB8fCAhd2luZG93LmRvY3VtZW50IHx8IHdpbmRvdy5kb2N1bWVudC5ub2RlVHlwZSAhPT0gTk9ERV9UWVBFLmRvY3VtZW50IHx8ICF3aW5kb3cuRWxlbWVudCkge1xuICAgICAgLy8gTm90IHJ1bm5pbmcgaW4gYSBicm93c2VyLCBwcm92aWRlIGEgZmFjdG9yeSBmdW5jdGlvblxuICAgICAgLy8gc28gdGhhdCB5b3UgY2FuIHBhc3MgeW91ciBvd24gV2luZG93XG4gICAgICBET01QdXJpZnkuaXNTdXBwb3J0ZWQgPSBmYWxzZTtcbiAgICAgIHJldHVybiBET01QdXJpZnk7XG4gICAgfVxuICAgIGxldCB7XG4gICAgICBkb2N1bWVudFxuICAgIH0gPSB3aW5kb3c7XG4gICAgY29uc3Qgb3JpZ2luYWxEb2N1bWVudCA9IGRvY3VtZW50O1xuICAgIGNvbnN0IGN1cnJlbnRTY3JpcHQgPSBvcmlnaW5hbERvY3VtZW50LmN1cnJlbnRTY3JpcHQ7XG4gICAgY29uc3Qge1xuICAgICAgRG9jdW1lbnRGcmFnbWVudCxcbiAgICAgIEhUTUxUZW1wbGF0ZUVsZW1lbnQsXG4gICAgICBOb2RlLFxuICAgICAgRWxlbWVudCxcbiAgICAgIE5vZGVGaWx0ZXIsXG4gICAgICBOYW1lZE5vZGVNYXAgPSB3aW5kb3cuTmFtZWROb2RlTWFwIHx8IHdpbmRvdy5Nb3pOYW1lZEF0dHJNYXAsXG4gICAgICBIVE1MRm9ybUVsZW1lbnQsXG4gICAgICBET01QYXJzZXIsXG4gICAgICB0cnVzdGVkVHlwZXNcbiAgICB9ID0gd2luZG93O1xuICAgIGNvbnN0IEVsZW1lbnRQcm90b3R5cGUgPSBFbGVtZW50LnByb3RvdHlwZTtcbiAgICBjb25zdCBjbG9uZU5vZGUgPSBsb29rdXBHZXR0ZXIoRWxlbWVudFByb3RvdHlwZSwgJ2Nsb25lTm9kZScpO1xuICAgIGNvbnN0IHJlbW92ZSA9IGxvb2t1cEdldHRlcihFbGVtZW50UHJvdG90eXBlLCAncmVtb3ZlJyk7XG4gICAgY29uc3QgZ2V0TmV4dFNpYmxpbmcgPSBsb29rdXBHZXR0ZXIoRWxlbWVudFByb3RvdHlwZSwgJ25leHRTaWJsaW5nJyk7XG4gICAgY29uc3QgZ2V0Q2hpbGROb2RlcyA9IGxvb2t1cEdldHRlcihFbGVtZW50UHJvdG90eXBlLCAnY2hpbGROb2RlcycpO1xuICAgIGNvbnN0IGdldFBhcmVudE5vZGUgPSBsb29rdXBHZXR0ZXIoRWxlbWVudFByb3RvdHlwZSwgJ3BhcmVudE5vZGUnKTtcbiAgICAvLyBBcyBwZXIgaXNzdWUgIzQ3LCB0aGUgd2ViLWNvbXBvbmVudHMgcmVnaXN0cnkgaXMgaW5oZXJpdGVkIGJ5IGFcbiAgICAvLyBuZXcgZG9jdW1lbnQgY3JlYXRlZCB2aWEgY3JlYXRlSFRNTERvY3VtZW50LiBBcyBwZXIgdGhlIHNwZWNcbiAgICAvLyAoaHR0cDovL3czYy5naXRodWIuaW8vd2ViY29tcG9uZW50cy9zcGVjL2N1c3RvbS8jY3JlYXRpbmctYW5kLXBhc3NpbmctcmVnaXN0cmllcylcbiAgICAvLyBhIG5ldyBlbXB0eSByZWdpc3RyeSBpcyB1c2VkIHdoZW4gY3JlYXRpbmcgYSB0ZW1wbGF0ZSBjb250ZW50cyBvd25lclxuICAgIC8vIGRvY3VtZW50LCBzbyB3ZSB1c2UgdGhhdCBhcyBvdXIgcGFyZW50IGRvY3VtZW50IHRvIGVuc3VyZSBub3RoaW5nXG4gICAgLy8gaXMgaW5oZXJpdGVkLlxuICAgIGlmICh0eXBlb2YgSFRNTFRlbXBsYXRlRWxlbWVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xuICAgICAgaWYgKHRlbXBsYXRlLmNvbnRlbnQgJiYgdGVtcGxhdGUuY29udGVudC5vd25lckRvY3VtZW50KSB7XG4gICAgICAgIGRvY3VtZW50ID0gdGVtcGxhdGUuY29udGVudC5vd25lckRvY3VtZW50O1xuICAgICAgfVxuICAgIH1cbiAgICBsZXQgdHJ1c3RlZFR5cGVzUG9saWN5O1xuICAgIGxldCBlbXB0eUhUTUwgPSAnJztcbiAgICBjb25zdCB7XG4gICAgICBpbXBsZW1lbnRhdGlvbixcbiAgICAgIGNyZWF0ZU5vZGVJdGVyYXRvcixcbiAgICAgIGNyZWF0ZURvY3VtZW50RnJhZ21lbnQsXG4gICAgICBnZXRFbGVtZW50c0J5VGFnTmFtZVxuICAgIH0gPSBkb2N1bWVudDtcbiAgICBjb25zdCB7XG4gICAgICBpbXBvcnROb2RlXG4gICAgfSA9IG9yaWdpbmFsRG9jdW1lbnQ7XG4gICAgbGV0IGhvb2tzID0gX2NyZWF0ZUhvb2tzTWFwKCk7XG4gICAgLyoqXG4gICAgICogRXhwb3NlIHdoZXRoZXIgdGhpcyBicm93c2VyIHN1cHBvcnRzIHJ1bm5pbmcgdGhlIGZ1bGwgRE9NUHVyaWZ5LlxuICAgICAqL1xuICAgIERPTVB1cmlmeS5pc1N1cHBvcnRlZCA9IHR5cGVvZiBlbnRyaWVzID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBnZXRQYXJlbnROb2RlID09PSAnZnVuY3Rpb24nICYmIGltcGxlbWVudGF0aW9uICYmIGltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudCAhPT0gdW5kZWZpbmVkO1xuICAgIGNvbnN0IHtcbiAgICAgIE1VU1RBQ0hFX0VYUFIsXG4gICAgICBFUkJfRVhQUixcbiAgICAgIFRNUExJVF9FWFBSLFxuICAgICAgREFUQV9BVFRSLFxuICAgICAgQVJJQV9BVFRSLFxuICAgICAgSVNfU0NSSVBUX09SX0RBVEEsXG4gICAgICBBVFRSX1dISVRFU1BBQ0UsXG4gICAgICBDVVNUT01fRUxFTUVOVFxuICAgIH0gPSBFWFBSRVNTSU9OUztcbiAgICBsZXQge1xuICAgICAgSVNfQUxMT1dFRF9VUkk6IElTX0FMTE9XRURfVVJJJDFcbiAgICB9ID0gRVhQUkVTU0lPTlM7XG4gICAgLyoqXG4gICAgICogV2UgY29uc2lkZXIgdGhlIGVsZW1lbnRzIGFuZCBhdHRyaWJ1dGVzIGJlbG93IHRvIGJlIHNhZmUuIElkZWFsbHlcbiAgICAgKiBkb24ndCBhZGQgYW55IG5ldyBvbmVzIGJ1dCBmZWVsIGZyZWUgdG8gcmVtb3ZlIHVud2FudGVkIG9uZXMuXG4gICAgICovXG4gICAgLyogYWxsb3dlZCBlbGVtZW50IG5hbWVzICovXG4gICAgbGV0IEFMTE9XRURfVEFHUyA9IG51bGw7XG4gICAgY29uc3QgREVGQVVMVF9BTExPV0VEX1RBR1MgPSBhZGRUb1NldCh7fSwgWy4uLmh0bWwkMSwgLi4uc3ZnJDEsIC4uLnN2Z0ZpbHRlcnMsIC4uLm1hdGhNbCQxLCAuLi50ZXh0XSk7XG4gICAgLyogQWxsb3dlZCBhdHRyaWJ1dGUgbmFtZXMgKi9cbiAgICBsZXQgQUxMT1dFRF9BVFRSID0gbnVsbDtcbiAgICBjb25zdCBERUZBVUxUX0FMTE9XRURfQVRUUiA9IGFkZFRvU2V0KHt9LCBbLi4uaHRtbCwgLi4uc3ZnLCAuLi5tYXRoTWwsIC4uLnhtbF0pO1xuICAgIC8qXG4gICAgICogQ29uZmlndXJlIGhvdyBET01QdXJpZnkgc2hvdWxkIGhhbmRsZSBjdXN0b20gZWxlbWVudHMgYW5kIHRoZWlyIGF0dHJpYnV0ZXMgYXMgd2VsbCBhcyBjdXN0b21pemVkIGJ1aWx0LWluIGVsZW1lbnRzLlxuICAgICAqIEBwcm9wZXJ0eSB7UmVnRXhwfEZ1bmN0aW9ufG51bGx9IHRhZ05hbWVDaGVjayBvbmUgb2YgW251bGwsIHJlZ2V4UGF0dGVybiwgcHJlZGljYXRlXS4gRGVmYXVsdDogYG51bGxgIChkaXNhbGxvdyBhbnkgY3VzdG9tIGVsZW1lbnRzKVxuICAgICAqIEBwcm9wZXJ0eSB7UmVnRXhwfEZ1bmN0aW9ufG51bGx9IGF0dHJpYnV0ZU5hbWVDaGVjayBvbmUgb2YgW251bGwsIHJlZ2V4UGF0dGVybiwgcHJlZGljYXRlXS4gRGVmYXVsdDogYG51bGxgIChkaXNhbGxvdyBhbnkgYXR0cmlidXRlcyBub3Qgb24gdGhlIGFsbG93IGxpc3QpXG4gICAgICogQHByb3BlcnR5IHtib29sZWFufSBhbGxvd0N1c3RvbWl6ZWRCdWlsdEluRWxlbWVudHMgYWxsb3cgY3VzdG9tIGVsZW1lbnRzIGRlcml2ZWQgZnJvbSBidWlsdC1pbnMgaWYgdGhleSBwYXNzIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjay4gRGVmYXVsdDogYGZhbHNlYC5cbiAgICAgKi9cbiAgICBsZXQgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcgPSBPYmplY3Quc2VhbChjcmVhdGUobnVsbCwge1xuICAgICAgdGFnTmFtZUNoZWNrOiB7XG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogbnVsbFxuICAgICAgfSxcbiAgICAgIGF0dHJpYnV0ZU5hbWVDaGVjazoge1xuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IG51bGxcbiAgICAgIH0sXG4gICAgICBhbGxvd0N1c3RvbWl6ZWRCdWlsdEluRWxlbWVudHM6IHtcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiBmYWxzZVxuICAgICAgfVxuICAgIH0pKTtcbiAgICAvKiBFeHBsaWNpdGx5IGZvcmJpZGRlbiB0YWdzIChvdmVycmlkZXMgQUxMT1dFRF9UQUdTL0FERF9UQUdTKSAqL1xuICAgIGxldCBGT1JCSURfVEFHUyA9IG51bGw7XG4gICAgLyogRXhwbGljaXRseSBmb3JiaWRkZW4gYXR0cmlidXRlcyAob3ZlcnJpZGVzIEFMTE9XRURfQVRUUi9BRERfQVRUUikgKi9cbiAgICBsZXQgRk9SQklEX0FUVFIgPSBudWxsO1xuICAgIC8qIENvbmZpZyBvYmplY3QgdG8gc3RvcmUgQUREX1RBR1MvQUREX0FUVFIgZnVuY3Rpb25zICh3aGVuIHVzZWQgYXMgZnVuY3Rpb25zKSAqL1xuICAgIGNvbnN0IEVYVFJBX0VMRU1FTlRfSEFORExJTkcgPSBPYmplY3Quc2VhbChjcmVhdGUobnVsbCwge1xuICAgICAgdGFnQ2hlY2s6IHtcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiBudWxsXG4gICAgICB9LFxuICAgICAgYXR0cmlidXRlQ2hlY2s6IHtcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiBudWxsXG4gICAgICB9XG4gICAgfSkpO1xuICAgIC8qIERlY2lkZSBpZiBBUklBIGF0dHJpYnV0ZXMgYXJlIG9rYXkgKi9cbiAgICBsZXQgQUxMT1dfQVJJQV9BVFRSID0gdHJ1ZTtcbiAgICAvKiBEZWNpZGUgaWYgY3VzdG9tIGRhdGEgYXR0cmlidXRlcyBhcmUgb2theSAqL1xuICAgIGxldCBBTExPV19EQVRBX0FUVFIgPSB0cnVlO1xuICAgIC8qIERlY2lkZSBpZiB1bmtub3duIHByb3RvY29scyBhcmUgb2theSAqL1xuICAgIGxldCBBTExPV19VTktOT1dOX1BST1RPQ09MUyA9IGZhbHNlO1xuICAgIC8qIERlY2lkZSBpZiBzZWxmLWNsb3NpbmcgdGFncyBpbiBhdHRyaWJ1dGVzIGFyZSBhbGxvd2VkLlxuICAgICAqIFVzdWFsbHkgcmVtb3ZlZCBkdWUgdG8gYSBtWFNTIGlzc3VlIGluIGpRdWVyeSAzLjAgKi9cbiAgICBsZXQgQUxMT1dfU0VMRl9DTE9TRV9JTl9BVFRSID0gdHJ1ZTtcbiAgICAvKiBPdXRwdXQgc2hvdWxkIGJlIHNhZmUgZm9yIGNvbW1vbiB0ZW1wbGF0ZSBlbmdpbmVzLlxuICAgICAqIFRoaXMgbWVhbnMsIERPTVB1cmlmeSByZW1vdmVzIGRhdGEgYXR0cmlidXRlcywgbXVzdGFjaGVzIGFuZCBFUkJcbiAgICAgKi9cbiAgICBsZXQgU0FGRV9GT1JfVEVNUExBVEVTID0gZmFsc2U7XG4gICAgLyogT3V0cHV0IHNob3VsZCBiZSBzYWZlIGV2ZW4gZm9yIFhNTCB1c2VkIHdpdGhpbiBIVE1MIGFuZCBhbGlrZS5cbiAgICAgKiBUaGlzIG1lYW5zLCBET01QdXJpZnkgcmVtb3ZlcyBjb21tZW50cyB3aGVuIGNvbnRhaW5pbmcgcmlza3kgY29udGVudC5cbiAgICAgKi9cbiAgICBsZXQgU0FGRV9GT1JfWE1MID0gdHJ1ZTtcbiAgICAvKiBEZWNpZGUgaWYgZG9jdW1lbnQgd2l0aCA8aHRtbD4uLi4gc2hvdWxkIGJlIHJldHVybmVkICovXG4gICAgbGV0IFdIT0xFX0RPQ1VNRU5UID0gZmFsc2U7XG4gICAgLyogVHJhY2sgd2hldGhlciBjb25maWcgaXMgYWxyZWFkeSBzZXQgb24gdGhpcyBpbnN0YW5jZSBvZiBET01QdXJpZnkuICovXG4gICAgbGV0IFNFVF9DT05GSUcgPSBmYWxzZTtcbiAgICAvKiBEZWNpZGUgaWYgYWxsIGVsZW1lbnRzIChlLmcuIHN0eWxlLCBzY3JpcHQpIG11c3QgYmUgY2hpbGRyZW4gb2ZcbiAgICAgKiBkb2N1bWVudC5ib2R5LiBCeSBkZWZhdWx0LCBicm93c2VycyBtaWdodCBtb3ZlIHRoZW0gdG8gZG9jdW1lbnQuaGVhZCAqL1xuICAgIGxldCBGT1JDRV9CT0RZID0gZmFsc2U7XG4gICAgLyogRGVjaWRlIGlmIGEgRE9NIGBIVE1MQm9keUVsZW1lbnRgIHNob3VsZCBiZSByZXR1cm5lZCwgaW5zdGVhZCBvZiBhIGh0bWxcbiAgICAgKiBzdHJpbmcgKG9yIGEgVHJ1c3RlZEhUTUwgb2JqZWN0IGlmIFRydXN0ZWQgVHlwZXMgYXJlIHN1cHBvcnRlZCkuXG4gICAgICogSWYgYFdIT0xFX0RPQ1VNRU5UYCBpcyBlbmFibGVkIGEgYEhUTUxIdG1sRWxlbWVudGAgd2lsbCBiZSByZXR1cm5lZCBpbnN0ZWFkXG4gICAgICovXG4gICAgbGV0IFJFVFVSTl9ET00gPSBmYWxzZTtcbiAgICAvKiBEZWNpZGUgaWYgYSBET00gYERvY3VtZW50RnJhZ21lbnRgIHNob3VsZCBiZSByZXR1cm5lZCwgaW5zdGVhZCBvZiBhIGh0bWxcbiAgICAgKiBzdHJpbmcgIChvciBhIFRydXN0ZWRIVE1MIG9iamVjdCBpZiBUcnVzdGVkIFR5cGVzIGFyZSBzdXBwb3J0ZWQpICovXG4gICAgbGV0IFJFVFVSTl9ET01fRlJBR01FTlQgPSBmYWxzZTtcbiAgICAvKiBUcnkgdG8gcmV0dXJuIGEgVHJ1c3RlZCBUeXBlIG9iamVjdCBpbnN0ZWFkIG9mIGEgc3RyaW5nLCByZXR1cm4gYSBzdHJpbmcgaW5cbiAgICAgKiBjYXNlIFRydXN0ZWQgVHlwZXMgYXJlIG5vdCBzdXBwb3J0ZWQgICovXG4gICAgbGV0IFJFVFVSTl9UUlVTVEVEX1RZUEUgPSBmYWxzZTtcbiAgICAvKiBPdXRwdXQgc2hvdWxkIGJlIGZyZWUgZnJvbSBET00gY2xvYmJlcmluZyBhdHRhY2tzP1xuICAgICAqIFRoaXMgc2FuaXRpemVzIG1hcmt1cHMgbmFtZWQgd2l0aCBjb2xsaWRpbmcsIGNsb2JiZXJhYmxlIGJ1aWx0LWluIERPTSBBUElzLlxuICAgICAqL1xuICAgIGxldCBTQU5JVElaRV9ET00gPSB0cnVlO1xuICAgIC8qIEFjaGlldmUgZnVsbCBET00gQ2xvYmJlcmluZyBwcm90ZWN0aW9uIGJ5IGlzb2xhdGluZyB0aGUgbmFtZXNwYWNlIG9mIG5hbWVkXG4gICAgICogcHJvcGVydGllcyBhbmQgSlMgdmFyaWFibGVzLCBtaXRpZ2F0aW5nIGF0dGFja3MgdGhhdCBhYnVzZSB0aGUgSFRNTC9ET00gc3BlYyBydWxlcy5cbiAgICAgKlxuICAgICAqIEhUTUwvRE9NIHNwZWMgcnVsZXMgdGhhdCBlbmFibGUgRE9NIENsb2JiZXJpbmc6XG4gICAgICogICAtIE5hbWVkIEFjY2VzcyBvbiBXaW5kb3cgKMKnNy4zLjMpXG4gICAgICogICAtIERPTSBUcmVlIEFjY2Vzc29ycyAowqczLjEuNSlcbiAgICAgKiAgIC0gRm9ybSBFbGVtZW50IFBhcmVudC1DaGlsZCBSZWxhdGlvbnMgKMKnNC4xMC4zKVxuICAgICAqICAgLSBJZnJhbWUgc3JjZG9jIC8gTmVzdGVkIFdpbmRvd1Byb3hpZXMgKMKnNC44LjUpXG4gICAgICogICAtIEhUTUxDb2xsZWN0aW9uICjCpzQuMi4xMC4yKVxuICAgICAqXG4gICAgICogTmFtZXNwYWNlIGlzb2xhdGlvbiBpcyBpbXBsZW1lbnRlZCBieSBwcmVmaXhpbmcgYGlkYCBhbmQgYG5hbWVgIGF0dHJpYnV0ZXNcbiAgICAgKiB3aXRoIGEgY29uc3RhbnQgc3RyaW5nLCBpLmUuLCBgdXNlci1jb250ZW50LWBcbiAgICAgKi9cbiAgICBsZXQgU0FOSVRJWkVfTkFNRURfUFJPUFMgPSBmYWxzZTtcbiAgICBjb25zdCBTQU5JVElaRV9OQU1FRF9QUk9QU19QUkVGSVggPSAndXNlci1jb250ZW50LSc7XG4gICAgLyogS2VlcCBlbGVtZW50IGNvbnRlbnQgd2hlbiByZW1vdmluZyBlbGVtZW50PyAqL1xuICAgIGxldCBLRUVQX0NPTlRFTlQgPSB0cnVlO1xuICAgIC8qIElmIGEgYE5vZGVgIGlzIHBhc3NlZCB0byBzYW5pdGl6ZSgpLCB0aGVuIHBlcmZvcm1zIHNhbml0aXphdGlvbiBpbi1wbGFjZSBpbnN0ZWFkXG4gICAgICogb2YgaW1wb3J0aW5nIGl0IGludG8gYSBuZXcgRG9jdW1lbnQgYW5kIHJldHVybmluZyBhIHNhbml0aXplZCBjb3B5ICovXG4gICAgbGV0IElOX1BMQUNFID0gZmFsc2U7XG4gICAgLyogQWxsb3cgdXNhZ2Ugb2YgcHJvZmlsZXMgbGlrZSBodG1sLCBzdmcgYW5kIG1hdGhNbCAqL1xuICAgIGxldCBVU0VfUFJPRklMRVMgPSB7fTtcbiAgICAvKiBUYWdzIHRvIGlnbm9yZSBjb250ZW50IG9mIHdoZW4gS0VFUF9DT05URU5UIGlzIHRydWUgKi9cbiAgICBsZXQgRk9SQklEX0NPTlRFTlRTID0gbnVsbDtcbiAgICBjb25zdCBERUZBVUxUX0ZPUkJJRF9DT05URU5UUyA9IGFkZFRvU2V0KHt9LCBbJ2Fubm90YXRpb24teG1sJywgJ2F1ZGlvJywgJ2NvbGdyb3VwJywgJ2Rlc2MnLCAnZm9yZWlnbm9iamVjdCcsICdoZWFkJywgJ2lmcmFtZScsICdtYXRoJywgJ21pJywgJ21uJywgJ21vJywgJ21zJywgJ210ZXh0JywgJ25vZW1iZWQnLCAnbm9mcmFtZXMnLCAnbm9zY3JpcHQnLCAncGxhaW50ZXh0JywgJ3NjcmlwdCcsICdzdHlsZScsICdzdmcnLCAndGVtcGxhdGUnLCAndGhlYWQnLCAndGl0bGUnLCAndmlkZW8nLCAneG1wJ10pO1xuICAgIC8qIFRhZ3MgdGhhdCBhcmUgc2FmZSBmb3IgZGF0YTogVVJJcyAqL1xuICAgIGxldCBEQVRBX1VSSV9UQUdTID0gbnVsbDtcbiAgICBjb25zdCBERUZBVUxUX0RBVEFfVVJJX1RBR1MgPSBhZGRUb1NldCh7fSwgWydhdWRpbycsICd2aWRlbycsICdpbWcnLCAnc291cmNlJywgJ2ltYWdlJywgJ3RyYWNrJ10pO1xuICAgIC8qIEF0dHJpYnV0ZXMgc2FmZSBmb3IgdmFsdWVzIGxpa2UgXCJqYXZhc2NyaXB0OlwiICovXG4gICAgbGV0IFVSSV9TQUZFX0FUVFJJQlVURVMgPSBudWxsO1xuICAgIGNvbnN0IERFRkFVTFRfVVJJX1NBRkVfQVRUUklCVVRFUyA9IGFkZFRvU2V0KHt9LCBbJ2FsdCcsICdjbGFzcycsICdmb3InLCAnaWQnLCAnbGFiZWwnLCAnbmFtZScsICdwYXR0ZXJuJywgJ3BsYWNlaG9sZGVyJywgJ3JvbGUnLCAnc3VtbWFyeScsICd0aXRsZScsICd2YWx1ZScsICdzdHlsZScsICd4bWxucyddKTtcbiAgICBjb25zdCBNQVRITUxfTkFNRVNQQUNFID0gJ2h0dHA6Ly93d3cudzMub3JnLzE5OTgvTWF0aC9NYXRoTUwnO1xuICAgIGNvbnN0IFNWR19OQU1FU1BBQ0UgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnO1xuICAgIGNvbnN0IEhUTUxfTkFNRVNQQUNFID0gJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwnO1xuICAgIC8qIERvY3VtZW50IG5hbWVzcGFjZSAqL1xuICAgIGxldCBOQU1FU1BBQ0UgPSBIVE1MX05BTUVTUEFDRTtcbiAgICBsZXQgSVNfRU1QVFlfSU5QVVQgPSBmYWxzZTtcbiAgICAvKiBBbGxvd2VkIFhIVE1MK1hNTCBuYW1lc3BhY2VzICovXG4gICAgbGV0IEFMTE9XRURfTkFNRVNQQUNFUyA9IG51bGw7XG4gICAgY29uc3QgREVGQVVMVF9BTExPV0VEX05BTUVTUEFDRVMgPSBhZGRUb1NldCh7fSwgW01BVEhNTF9OQU1FU1BBQ0UsIFNWR19OQU1FU1BBQ0UsIEhUTUxfTkFNRVNQQUNFXSwgc3RyaW5nVG9TdHJpbmcpO1xuICAgIGxldCBNQVRITUxfVEVYVF9JTlRFR1JBVElPTl9QT0lOVFMgPSBhZGRUb1NldCh7fSwgWydtaScsICdtbycsICdtbicsICdtcycsICdtdGV4dCddKTtcbiAgICBsZXQgSFRNTF9JTlRFR1JBVElPTl9QT0lOVFMgPSBhZGRUb1NldCh7fSwgWydhbm5vdGF0aW9uLXhtbCddKTtcbiAgICAvLyBDZXJ0YWluIGVsZW1lbnRzIGFyZSBhbGxvd2VkIGluIGJvdGggU1ZHIGFuZCBIVE1MXG4gICAgLy8gbmFtZXNwYWNlLiBXZSBuZWVkIHRvIHNwZWNpZnkgdGhlbSBleHBsaWNpdGx5XG4gICAgLy8gc28gdGhhdCB0aGV5IGRvbid0IGdldCBlcnJvbmVvdXNseSBkZWxldGVkIGZyb21cbiAgICAvLyBIVE1MIG5hbWVzcGFjZS5cbiAgICBjb25zdCBDT01NT05fU1ZHX0FORF9IVE1MX0VMRU1FTlRTID0gYWRkVG9TZXQoe30sIFsndGl0bGUnLCAnc3R5bGUnLCAnZm9udCcsICdhJywgJ3NjcmlwdCddKTtcbiAgICAvKiBQYXJzaW5nIG9mIHN0cmljdCBYSFRNTCBkb2N1bWVudHMgKi9cbiAgICBsZXQgUEFSU0VSX01FRElBX1RZUEUgPSBudWxsO1xuICAgIGNvbnN0IFNVUFBPUlRFRF9QQVJTRVJfTUVESUFfVFlQRVMgPSBbJ2FwcGxpY2F0aW9uL3hodG1sK3htbCcsICd0ZXh0L2h0bWwnXTtcbiAgICBjb25zdCBERUZBVUxUX1BBUlNFUl9NRURJQV9UWVBFID0gJ3RleHQvaHRtbCc7XG4gICAgbGV0IHRyYW5zZm9ybUNhc2VGdW5jID0gbnVsbDtcbiAgICAvKiBLZWVwIGEgcmVmZXJlbmNlIHRvIGNvbmZpZyB0byBwYXNzIHRvIGhvb2tzICovXG4gICAgbGV0IENPTkZJRyA9IG51bGw7XG4gICAgLyogSWRlYWxseSwgZG8gbm90IHRvdWNoIGFueXRoaW5nIGJlbG93IHRoaXMgbGluZSAqL1xuICAgIC8qIF9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX18gKi9cbiAgICBjb25zdCBmb3JtRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICBjb25zdCBpc1JlZ2V4T3JGdW5jdGlvbiA9IGZ1bmN0aW9uIGlzUmVnZXhPckZ1bmN0aW9uKHRlc3RWYWx1ZSkge1xuICAgICAgcmV0dXJuIHRlc3RWYWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCB8fCB0ZXN0VmFsdWUgaW5zdGFuY2VvZiBGdW5jdGlvbjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIF9wYXJzZUNvbmZpZ1xuICAgICAqXG4gICAgICogQHBhcmFtIGNmZyBvcHRpb25hbCBjb25maWcgbGl0ZXJhbFxuICAgICAqL1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb21wbGV4aXR5XG4gICAgY29uc3QgX3BhcnNlQ29uZmlnID0gZnVuY3Rpb24gX3BhcnNlQ29uZmlnKCkge1xuICAgICAgbGV0IGNmZyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG4gICAgICBpZiAoQ09ORklHICYmIENPTkZJRyA9PT0gY2ZnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8qIFNoaWVsZCBjb25maWd1cmF0aW9uIG9iamVjdCBmcm9tIHRhbXBlcmluZyAqL1xuICAgICAgaWYgKCFjZmcgfHwgdHlwZW9mIGNmZyAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgY2ZnID0ge307XG4gICAgICB9XG4gICAgICAvKiBTaGllbGQgY29uZmlndXJhdGlvbiBvYmplY3QgZnJvbSBwcm90b3R5cGUgcG9sbHV0aW9uICovXG4gICAgICBjZmcgPSBjbG9uZShjZmcpO1xuICAgICAgUEFSU0VSX01FRElBX1RZUEUgPVxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHVuaWNvcm4vcHJlZmVyLWluY2x1ZGVzXG4gICAgICBTVVBQT1JURURfUEFSU0VSX01FRElBX1RZUEVTLmluZGV4T2YoY2ZnLlBBUlNFUl9NRURJQV9UWVBFKSA9PT0gLTEgPyBERUZBVUxUX1BBUlNFUl9NRURJQV9UWVBFIDogY2ZnLlBBUlNFUl9NRURJQV9UWVBFO1xuICAgICAgLy8gSFRNTCB0YWdzIGFuZCBhdHRyaWJ1dGVzIGFyZSBub3QgY2FzZS1zZW5zaXRpdmUsIGNvbnZlcnRpbmcgdG8gbG93ZXJjYXNlLiBLZWVwaW5nIFhIVE1MIGFzIGlzLlxuICAgICAgdHJhbnNmb3JtQ2FzZUZ1bmMgPSBQQVJTRVJfTUVESUFfVFlQRSA9PT0gJ2FwcGxpY2F0aW9uL3hodG1sK3htbCcgPyBzdHJpbmdUb1N0cmluZyA6IHN0cmluZ1RvTG93ZXJDYXNlO1xuICAgICAgLyogU2V0IGNvbmZpZ3VyYXRpb24gcGFyYW1ldGVycyAqL1xuICAgICAgQUxMT1dFRF9UQUdTID0gb2JqZWN0SGFzT3duUHJvcGVydHkoY2ZnLCAnQUxMT1dFRF9UQUdTJykgPyBhZGRUb1NldCh7fSwgY2ZnLkFMTE9XRURfVEFHUywgdHJhbnNmb3JtQ2FzZUZ1bmMpIDogREVGQVVMVF9BTExPV0VEX1RBR1M7XG4gICAgICBBTExPV0VEX0FUVFIgPSBvYmplY3RIYXNPd25Qcm9wZXJ0eShjZmcsICdBTExPV0VEX0FUVFInKSA/IGFkZFRvU2V0KHt9LCBjZmcuQUxMT1dFRF9BVFRSLCB0cmFuc2Zvcm1DYXNlRnVuYykgOiBERUZBVUxUX0FMTE9XRURfQVRUUjtcbiAgICAgIEFMTE9XRURfTkFNRVNQQUNFUyA9IG9iamVjdEhhc093blByb3BlcnR5KGNmZywgJ0FMTE9XRURfTkFNRVNQQUNFUycpID8gYWRkVG9TZXQoe30sIGNmZy5BTExPV0VEX05BTUVTUEFDRVMsIHN0cmluZ1RvU3RyaW5nKSA6IERFRkFVTFRfQUxMT1dFRF9OQU1FU1BBQ0VTO1xuICAgICAgVVJJX1NBRkVfQVRUUklCVVRFUyA9IG9iamVjdEhhc093blByb3BlcnR5KGNmZywgJ0FERF9VUklfU0FGRV9BVFRSJykgPyBhZGRUb1NldChjbG9uZShERUZBVUxUX1VSSV9TQUZFX0FUVFJJQlVURVMpLCBjZmcuQUREX1VSSV9TQUZFX0FUVFIsIHRyYW5zZm9ybUNhc2VGdW5jKSA6IERFRkFVTFRfVVJJX1NBRkVfQVRUUklCVVRFUztcbiAgICAgIERBVEFfVVJJX1RBR1MgPSBvYmplY3RIYXNPd25Qcm9wZXJ0eShjZmcsICdBRERfREFUQV9VUklfVEFHUycpID8gYWRkVG9TZXQoY2xvbmUoREVGQVVMVF9EQVRBX1VSSV9UQUdTKSwgY2ZnLkFERF9EQVRBX1VSSV9UQUdTLCB0cmFuc2Zvcm1DYXNlRnVuYykgOiBERUZBVUxUX0RBVEFfVVJJX1RBR1M7XG4gICAgICBGT1JCSURfQ09OVEVOVFMgPSBvYmplY3RIYXNPd25Qcm9wZXJ0eShjZmcsICdGT1JCSURfQ09OVEVOVFMnKSA/IGFkZFRvU2V0KHt9LCBjZmcuRk9SQklEX0NPTlRFTlRTLCB0cmFuc2Zvcm1DYXNlRnVuYykgOiBERUZBVUxUX0ZPUkJJRF9DT05URU5UUztcbiAgICAgIEZPUkJJRF9UQUdTID0gb2JqZWN0SGFzT3duUHJvcGVydHkoY2ZnLCAnRk9SQklEX1RBR1MnKSA/IGFkZFRvU2V0KHt9LCBjZmcuRk9SQklEX1RBR1MsIHRyYW5zZm9ybUNhc2VGdW5jKSA6IGNsb25lKHt9KTtcbiAgICAgIEZPUkJJRF9BVFRSID0gb2JqZWN0SGFzT3duUHJvcGVydHkoY2ZnLCAnRk9SQklEX0FUVFInKSA/IGFkZFRvU2V0KHt9LCBjZmcuRk9SQklEX0FUVFIsIHRyYW5zZm9ybUNhc2VGdW5jKSA6IGNsb25lKHt9KTtcbiAgICAgIFVTRV9QUk9GSUxFUyA9IG9iamVjdEhhc093blByb3BlcnR5KGNmZywgJ1VTRV9QUk9GSUxFUycpID8gY2ZnLlVTRV9QUk9GSUxFUyA6IGZhbHNlO1xuICAgICAgQUxMT1dfQVJJQV9BVFRSID0gY2ZnLkFMTE9XX0FSSUFfQVRUUiAhPT0gZmFsc2U7IC8vIERlZmF1bHQgdHJ1ZVxuICAgICAgQUxMT1dfREFUQV9BVFRSID0gY2ZnLkFMTE9XX0RBVEFfQVRUUiAhPT0gZmFsc2U7IC8vIERlZmF1bHQgdHJ1ZVxuICAgICAgQUxMT1dfVU5LTk9XTl9QUk9UT0NPTFMgPSBjZmcuQUxMT1dfVU5LTk9XTl9QUk9UT0NPTFMgfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcbiAgICAgIEFMTE9XX1NFTEZfQ0xPU0VfSU5fQVRUUiA9IGNmZy5BTExPV19TRUxGX0NMT1NFX0lOX0FUVFIgIT09IGZhbHNlOyAvLyBEZWZhdWx0IHRydWVcbiAgICAgIFNBRkVfRk9SX1RFTVBMQVRFUyA9IGNmZy5TQUZFX0ZPUl9URU1QTEFURVMgfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcbiAgICAgIFNBRkVfRk9SX1hNTCA9IGNmZy5TQUZFX0ZPUl9YTUwgIT09IGZhbHNlOyAvLyBEZWZhdWx0IHRydWVcbiAgICAgIFdIT0xFX0RPQ1VNRU5UID0gY2ZnLldIT0xFX0RPQ1VNRU5UIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXG4gICAgICBSRVRVUk5fRE9NID0gY2ZnLlJFVFVSTl9ET00gfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcbiAgICAgIFJFVFVSTl9ET01fRlJBR01FTlQgPSBjZmcuUkVUVVJOX0RPTV9GUkFHTUVOVCB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuICAgICAgUkVUVVJOX1RSVVNURURfVFlQRSA9IGNmZy5SRVRVUk5fVFJVU1RFRF9UWVBFIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXG4gICAgICBGT1JDRV9CT0RZID0gY2ZnLkZPUkNFX0JPRFkgfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcbiAgICAgIFNBTklUSVpFX0RPTSA9IGNmZy5TQU5JVElaRV9ET00gIT09IGZhbHNlOyAvLyBEZWZhdWx0IHRydWVcbiAgICAgIFNBTklUSVpFX05BTUVEX1BST1BTID0gY2ZnLlNBTklUSVpFX05BTUVEX1BST1BTIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXG4gICAgICBLRUVQX0NPTlRFTlQgPSBjZmcuS0VFUF9DT05URU5UICE9PSBmYWxzZTsgLy8gRGVmYXVsdCB0cnVlXG4gICAgICBJTl9QTEFDRSA9IGNmZy5JTl9QTEFDRSB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuICAgICAgSVNfQUxMT1dFRF9VUkkkMSA9IGNmZy5BTExPV0VEX1VSSV9SRUdFWFAgfHwgSVNfQUxMT1dFRF9VUkk7XG4gICAgICBOQU1FU1BBQ0UgPSBjZmcuTkFNRVNQQUNFIHx8IEhUTUxfTkFNRVNQQUNFO1xuICAgICAgTUFUSE1MX1RFWFRfSU5URUdSQVRJT05fUE9JTlRTID0gY2ZnLk1BVEhNTF9URVhUX0lOVEVHUkFUSU9OX1BPSU5UUyB8fCBNQVRITUxfVEVYVF9JTlRFR1JBVElPTl9QT0lOVFM7XG4gICAgICBIVE1MX0lOVEVHUkFUSU9OX1BPSU5UUyA9IGNmZy5IVE1MX0lOVEVHUkFUSU9OX1BPSU5UUyB8fCBIVE1MX0lOVEVHUkFUSU9OX1BPSU5UUztcbiAgICAgIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HID0gY2ZnLkNVU1RPTV9FTEVNRU5UX0hBTkRMSU5HIHx8IHt9O1xuICAgICAgaWYgKGNmZy5DVVNUT01fRUxFTUVOVF9IQU5ETElORyAmJiBpc1JlZ2V4T3JGdW5jdGlvbihjZmcuQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrKSkge1xuICAgICAgICBDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sgPSBjZmcuQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrO1xuICAgICAgfVxuICAgICAgaWYgKGNmZy5DVVNUT01fRUxFTUVOVF9IQU5ETElORyAmJiBpc1JlZ2V4T3JGdW5jdGlvbihjZmcuQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYXR0cmlidXRlTmFtZUNoZWNrKSkge1xuICAgICAgICBDVVNUT01fRUxFTUVOVF9IQU5ETElORy5hdHRyaWJ1dGVOYW1lQ2hlY2sgPSBjZmcuQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYXR0cmlidXRlTmFtZUNoZWNrO1xuICAgICAgfVxuICAgICAgaWYgKGNmZy5DVVNUT01fRUxFTUVOVF9IQU5ETElORyAmJiB0eXBlb2YgY2ZnLkNVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLmFsbG93Q3VzdG9taXplZEJ1aWx0SW5FbGVtZW50cyA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLmFsbG93Q3VzdG9taXplZEJ1aWx0SW5FbGVtZW50cyA9IGNmZy5DVVNUT01fRUxFTUVOVF9IQU5ETElORy5hbGxvd0N1c3RvbWl6ZWRCdWlsdEluRWxlbWVudHM7XG4gICAgICB9XG4gICAgICBpZiAoU0FGRV9GT1JfVEVNUExBVEVTKSB7XG4gICAgICAgIEFMTE9XX0RBVEFfQVRUUiA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKFJFVFVSTl9ET01fRlJBR01FTlQpIHtcbiAgICAgICAgUkVUVVJOX0RPTSA9IHRydWU7XG4gICAgICB9XG4gICAgICAvKiBQYXJzZSBwcm9maWxlIGluZm8gKi9cbiAgICAgIGlmIChVU0VfUFJPRklMRVMpIHtcbiAgICAgICAgQUxMT1dFRF9UQUdTID0gYWRkVG9TZXQoe30sIHRleHQpO1xuICAgICAgICBBTExPV0VEX0FUVFIgPSBbXTtcbiAgICAgICAgaWYgKFVTRV9QUk9GSUxFUy5odG1sID09PSB0cnVlKSB7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9UQUdTLCBodG1sJDEpO1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgaHRtbCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFVTRV9QUk9GSUxFUy5zdmcgPT09IHRydWUpIHtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX1RBR1MsIHN2ZyQxKTtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX0FUVFIsIHN2Zyk7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9BVFRSLCB4bWwpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChVU0VfUFJPRklMRVMuc3ZnRmlsdGVycyA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfVEFHUywgc3ZnRmlsdGVycyk7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9BVFRSLCBzdmcpO1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgeG1sKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoVVNFX1BST0ZJTEVTLm1hdGhNbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfVEFHUywgbWF0aE1sJDEpO1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgbWF0aE1sKTtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX0FUVFIsIHhtbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8qIE1lcmdlIGNvbmZpZ3VyYXRpb24gcGFyYW1ldGVycyAqL1xuICAgICAgaWYgKGNmZy5BRERfVEFHUykge1xuICAgICAgICBpZiAodHlwZW9mIGNmZy5BRERfVEFHUyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIEVYVFJBX0VMRU1FTlRfSEFORExJTkcudGFnQ2hlY2sgPSBjZmcuQUREX1RBR1M7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKEFMTE9XRURfVEFHUyA9PT0gREVGQVVMVF9BTExPV0VEX1RBR1MpIHtcbiAgICAgICAgICAgIEFMTE9XRURfVEFHUyA9IGNsb25lKEFMTE9XRURfVEFHUyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfVEFHUywgY2ZnLkFERF9UQUdTLCB0cmFuc2Zvcm1DYXNlRnVuYyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChjZmcuQUREX0FUVFIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjZmcuQUREX0FUVFIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBFWFRSQV9FTEVNRU5UX0hBTkRMSU5HLmF0dHJpYnV0ZUNoZWNrID0gY2ZnLkFERF9BVFRSO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChBTExPV0VEX0FUVFIgPT09IERFRkFVTFRfQUxMT1dFRF9BVFRSKSB7XG4gICAgICAgICAgICBBTExPV0VEX0FUVFIgPSBjbG9uZShBTExPV0VEX0FUVFIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX0FUVFIsIGNmZy5BRERfQVRUUiwgdHJhbnNmb3JtQ2FzZUZ1bmMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoY2ZnLkFERF9VUklfU0FGRV9BVFRSKSB7XG4gICAgICAgIGFkZFRvU2V0KFVSSV9TQUZFX0FUVFJJQlVURVMsIGNmZy5BRERfVVJJX1NBRkVfQVRUUiwgdHJhbnNmb3JtQ2FzZUZ1bmMpO1xuICAgICAgfVxuICAgICAgaWYgKGNmZy5GT1JCSURfQ09OVEVOVFMpIHtcbiAgICAgICAgaWYgKEZPUkJJRF9DT05URU5UUyA9PT0gREVGQVVMVF9GT1JCSURfQ09OVEVOVFMpIHtcbiAgICAgICAgICBGT1JCSURfQ09OVEVOVFMgPSBjbG9uZShGT1JCSURfQ09OVEVOVFMpO1xuICAgICAgICB9XG4gICAgICAgIGFkZFRvU2V0KEZPUkJJRF9DT05URU5UUywgY2ZnLkZPUkJJRF9DT05URU5UUywgdHJhbnNmb3JtQ2FzZUZ1bmMpO1xuICAgICAgfVxuICAgICAgLyogQWRkICN0ZXh0IGluIGNhc2UgS0VFUF9DT05URU5UIGlzIHNldCB0byB0cnVlICovXG4gICAgICBpZiAoS0VFUF9DT05URU5UKSB7XG4gICAgICAgIEFMTE9XRURfVEFHU1snI3RleHQnXSA9IHRydWU7XG4gICAgICB9XG4gICAgICAvKiBBZGQgaHRtbCwgaGVhZCBhbmQgYm9keSB0byBBTExPV0VEX1RBR1MgaW4gY2FzZSBXSE9MRV9ET0NVTUVOVCBpcyB0cnVlICovXG4gICAgICBpZiAoV0hPTEVfRE9DVU1FTlQpIHtcbiAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9UQUdTLCBbJ2h0bWwnLCAnaGVhZCcsICdib2R5J10pO1xuICAgICAgfVxuICAgICAgLyogQWRkIHRib2R5IHRvIEFMTE9XRURfVEFHUyBpbiBjYXNlIHRhYmxlcyBhcmUgcGVybWl0dGVkLCBzZWUgIzI4NiwgIzM2NSAqL1xuICAgICAgaWYgKEFMTE9XRURfVEFHUy50YWJsZSkge1xuICAgICAgICBhZGRUb1NldChBTExPV0VEX1RBR1MsIFsndGJvZHknXSk7XG4gICAgICAgIGRlbGV0ZSBGT1JCSURfVEFHUy50Ym9keTtcbiAgICAgIH1cbiAgICAgIGlmIChjZmcuVFJVU1RFRF9UWVBFU19QT0xJQ1kpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjZmcuVFJVU1RFRF9UWVBFU19QT0xJQ1kuY3JlYXRlSFRNTCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHRocm93IHR5cGVFcnJvckNyZWF0ZSgnVFJVU1RFRF9UWVBFU19QT0xJQ1kgY29uZmlndXJhdGlvbiBvcHRpb24gbXVzdCBwcm92aWRlIGEgXCJjcmVhdGVIVE1MXCIgaG9vay4nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGNmZy5UUlVTVEVEX1RZUEVTX1BPTElDWS5jcmVhdGVTY3JpcHRVUkwgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB0aHJvdyB0eXBlRXJyb3JDcmVhdGUoJ1RSVVNURURfVFlQRVNfUE9MSUNZIGNvbmZpZ3VyYXRpb24gb3B0aW9uIG11c3QgcHJvdmlkZSBhIFwiY3JlYXRlU2NyaXB0VVJMXCIgaG9vay4nKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBPdmVyd3JpdGUgZXhpc3RpbmcgVHJ1c3RlZFR5cGVzIHBvbGljeS5cbiAgICAgICAgdHJ1c3RlZFR5cGVzUG9saWN5ID0gY2ZnLlRSVVNURURfVFlQRVNfUE9MSUNZO1xuICAgICAgICAvLyBTaWduIGxvY2FsIHZhcmlhYmxlcyByZXF1aXJlZCBieSBgc2FuaXRpemVgLlxuICAgICAgICBlbXB0eUhUTUwgPSB0cnVzdGVkVHlwZXNQb2xpY3kuY3JlYXRlSFRNTCgnJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBVbmluaXRpYWxpemVkIHBvbGljeSwgYXR0ZW1wdCB0byBpbml0aWFsaXplIHRoZSBpbnRlcm5hbCBkb21wdXJpZnkgcG9saWN5LlxuICAgICAgICBpZiAodHJ1c3RlZFR5cGVzUG9saWN5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0cnVzdGVkVHlwZXNQb2xpY3kgPSBfY3JlYXRlVHJ1c3RlZFR5cGVzUG9saWN5KHRydXN0ZWRUeXBlcywgY3VycmVudFNjcmlwdCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgY3JlYXRpbmcgdGhlIGludGVybmFsIHBvbGljeSBzdWNjZWVkZWQgc2lnbiBpbnRlcm5hbCB2YXJpYWJsZXMuXG4gICAgICAgIGlmICh0cnVzdGVkVHlwZXNQb2xpY3kgIT09IG51bGwgJiYgdHlwZW9mIGVtcHR5SFRNTCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBlbXB0eUhUTUwgPSB0cnVzdGVkVHlwZXNQb2xpY3kuY3JlYXRlSFRNTCgnJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIFByZXZlbnQgZnVydGhlciBtYW5pcHVsYXRpb24gb2YgY29uZmlndXJhdGlvbi5cbiAgICAgIC8vIE5vdCBhdmFpbGFibGUgaW4gSUU4LCBTYWZhcmkgNSwgZXRjLlxuICAgICAgaWYgKGZyZWV6ZSkge1xuICAgICAgICBmcmVlemUoY2ZnKTtcbiAgICAgIH1cbiAgICAgIENPTkZJRyA9IGNmZztcbiAgICB9O1xuICAgIC8qIEtlZXAgdHJhY2sgb2YgYWxsIHBvc3NpYmxlIFNWRyBhbmQgTWF0aE1MIHRhZ3NcbiAgICAgKiBzbyB0aGF0IHdlIGNhbiBwZXJmb3JtIHRoZSBuYW1lc3BhY2UgY2hlY2tzXG4gICAgICogY29ycmVjdGx5LiAqL1xuICAgIGNvbnN0IEFMTF9TVkdfVEFHUyA9IGFkZFRvU2V0KHt9LCBbLi4uc3ZnJDEsIC4uLnN2Z0ZpbHRlcnMsIC4uLnN2Z0Rpc2FsbG93ZWRdKTtcbiAgICBjb25zdCBBTExfTUFUSE1MX1RBR1MgPSBhZGRUb1NldCh7fSwgWy4uLm1hdGhNbCQxLCAuLi5tYXRoTWxEaXNhbGxvd2VkXSk7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIGVsZW1lbnQgYSBET00gZWxlbWVudCB3aG9zZSBuYW1lc3BhY2UgaXMgYmVpbmcgY2hlY2tlZFxuICAgICAqIEByZXR1cm5zIFJldHVybiBmYWxzZSBpZiB0aGUgZWxlbWVudCBoYXMgYVxuICAgICAqICBuYW1lc3BhY2UgdGhhdCBhIHNwZWMtY29tcGxpYW50IHBhcnNlciB3b3VsZCBuZXZlclxuICAgICAqICByZXR1cm4uIFJldHVybiB0cnVlIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBjb25zdCBfY2hlY2tWYWxpZE5hbWVzcGFjZSA9IGZ1bmN0aW9uIF9jaGVja1ZhbGlkTmFtZXNwYWNlKGVsZW1lbnQpIHtcbiAgICAgIGxldCBwYXJlbnQgPSBnZXRQYXJlbnROb2RlKGVsZW1lbnQpO1xuICAgICAgLy8gSW4gSlNET00sIGlmIHdlJ3JlIGluc2lkZSBzaGFkb3cgRE9NLCB0aGVuIHBhcmVudE5vZGVcbiAgICAgIC8vIGNhbiBiZSBudWxsLiBXZSBqdXN0IHNpbXVsYXRlIHBhcmVudCBpbiB0aGlzIGNhc2UuXG4gICAgICBpZiAoIXBhcmVudCB8fCAhcGFyZW50LnRhZ05hbWUpIHtcbiAgICAgICAgcGFyZW50ID0ge1xuICAgICAgICAgIG5hbWVzcGFjZVVSSTogTkFNRVNQQUNFLFxuICAgICAgICAgIHRhZ05hbWU6ICd0ZW1wbGF0ZSdcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHRhZ05hbWUgPSBzdHJpbmdUb0xvd2VyQ2FzZShlbGVtZW50LnRhZ05hbWUpO1xuICAgICAgY29uc3QgcGFyZW50VGFnTmFtZSA9IHN0cmluZ1RvTG93ZXJDYXNlKHBhcmVudC50YWdOYW1lKTtcbiAgICAgIGlmICghQUxMT1dFRF9OQU1FU1BBQ0VTW2VsZW1lbnQubmFtZXNwYWNlVVJJXSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoZWxlbWVudC5uYW1lc3BhY2VVUkkgPT09IFNWR19OQU1FU1BBQ0UpIHtcbiAgICAgICAgLy8gVGhlIG9ubHkgd2F5IHRvIHN3aXRjaCBmcm9tIEhUTUwgbmFtZXNwYWNlIHRvIFNWR1xuICAgICAgICAvLyBpcyB2aWEgPHN2Zz4uIElmIGl0IGhhcHBlbnMgdmlhIGFueSBvdGhlciB0YWcsIHRoZW5cbiAgICAgICAgLy8gaXQgc2hvdWxkIGJlIGtpbGxlZC5cbiAgICAgICAgaWYgKHBhcmVudC5uYW1lc3BhY2VVUkkgPT09IEhUTUxfTkFNRVNQQUNFKSB7XG4gICAgICAgICAgcmV0dXJuIHRhZ05hbWUgPT09ICdzdmcnO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRoZSBvbmx5IHdheSB0byBzd2l0Y2ggZnJvbSBNYXRoTUwgdG8gU1ZHIGlzIHZpYWBcbiAgICAgICAgLy8gc3ZnIGlmIHBhcmVudCBpcyBlaXRoZXIgPGFubm90YXRpb24teG1sPiBvciBNYXRoTUxcbiAgICAgICAgLy8gdGV4dCBpbnRlZ3JhdGlvbiBwb2ludHMuXG4gICAgICAgIGlmIChwYXJlbnQubmFtZXNwYWNlVVJJID09PSBNQVRITUxfTkFNRVNQQUNFKSB7XG4gICAgICAgICAgcmV0dXJuIHRhZ05hbWUgPT09ICdzdmcnICYmIChwYXJlbnRUYWdOYW1lID09PSAnYW5ub3RhdGlvbi14bWwnIHx8IE1BVEhNTF9URVhUX0lOVEVHUkFUSU9OX1BPSU5UU1twYXJlbnRUYWdOYW1lXSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gV2Ugb25seSBhbGxvdyBlbGVtZW50cyB0aGF0IGFyZSBkZWZpbmVkIGluIFNWR1xuICAgICAgICAvLyBzcGVjLiBBbGwgb3RoZXJzIGFyZSBkaXNhbGxvd2VkIGluIFNWRyBuYW1lc3BhY2UuXG4gICAgICAgIHJldHVybiBCb29sZWFuKEFMTF9TVkdfVEFHU1t0YWdOYW1lXSk7XG4gICAgICB9XG4gICAgICBpZiAoZWxlbWVudC5uYW1lc3BhY2VVUkkgPT09IE1BVEhNTF9OQU1FU1BBQ0UpIHtcbiAgICAgICAgLy8gVGhlIG9ubHkgd2F5IHRvIHN3aXRjaCBmcm9tIEhUTUwgbmFtZXNwYWNlIHRvIE1hdGhNTFxuICAgICAgICAvLyBpcyB2aWEgPG1hdGg+LiBJZiBpdCBoYXBwZW5zIHZpYSBhbnkgb3RoZXIgdGFnLCB0aGVuXG4gICAgICAgIC8vIGl0IHNob3VsZCBiZSBraWxsZWQuXG4gICAgICAgIGlmIChwYXJlbnQubmFtZXNwYWNlVVJJID09PSBIVE1MX05BTUVTUEFDRSkge1xuICAgICAgICAgIHJldHVybiB0YWdOYW1lID09PSAnbWF0aCc7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGhlIG9ubHkgd2F5IHRvIHN3aXRjaCBmcm9tIFNWRyB0byBNYXRoTUwgaXMgdmlhXG4gICAgICAgIC8vIDxtYXRoPiBhbmQgSFRNTCBpbnRlZ3JhdGlvbiBwb2ludHNcbiAgICAgICAgaWYgKHBhcmVudC5uYW1lc3BhY2VVUkkgPT09IFNWR19OQU1FU1BBQ0UpIHtcbiAgICAgICAgICByZXR1cm4gdGFnTmFtZSA9PT0gJ21hdGgnICYmIEhUTUxfSU5URUdSQVRJT05fUE9JTlRTW3BhcmVudFRhZ05hbWVdO1xuICAgICAgICB9XG4gICAgICAgIC8vIFdlIG9ubHkgYWxsb3cgZWxlbWVudHMgdGhhdCBhcmUgZGVmaW5lZCBpbiBNYXRoTUxcbiAgICAgICAgLy8gc3BlYy4gQWxsIG90aGVycyBhcmUgZGlzYWxsb3dlZCBpbiBNYXRoTUwgbmFtZXNwYWNlLlxuICAgICAgICByZXR1cm4gQm9vbGVhbihBTExfTUFUSE1MX1RBR1NbdGFnTmFtZV0pO1xuICAgICAgfVxuICAgICAgaWYgKGVsZW1lbnQubmFtZXNwYWNlVVJJID09PSBIVE1MX05BTUVTUEFDRSkge1xuICAgICAgICAvLyBUaGUgb25seSB3YXkgdG8gc3dpdGNoIGZyb20gU1ZHIHRvIEhUTUwgaXMgdmlhXG4gICAgICAgIC8vIEhUTUwgaW50ZWdyYXRpb24gcG9pbnRzLCBhbmQgZnJvbSBNYXRoTUwgdG8gSFRNTFxuICAgICAgICAvLyBpcyB2aWEgTWF0aE1MIHRleHQgaW50ZWdyYXRpb24gcG9pbnRzXG4gICAgICAgIGlmIChwYXJlbnQubmFtZXNwYWNlVVJJID09PSBTVkdfTkFNRVNQQUNFICYmICFIVE1MX0lOVEVHUkFUSU9OX1BPSU5UU1twYXJlbnRUYWdOYW1lXSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGFyZW50Lm5hbWVzcGFjZVVSSSA9PT0gTUFUSE1MX05BTUVTUEFDRSAmJiAhTUFUSE1MX1RFWFRfSU5URUdSQVRJT05fUE9JTlRTW3BhcmVudFRhZ05hbWVdKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8vIFdlIGRpc2FsbG93IHRhZ3MgdGhhdCBhcmUgc3BlY2lmaWMgZm9yIE1hdGhNTFxuICAgICAgICAvLyBvciBTVkcgYW5kIHNob3VsZCBuZXZlciBhcHBlYXIgaW4gSFRNTCBuYW1lc3BhY2VcbiAgICAgICAgcmV0dXJuICFBTExfTUFUSE1MX1RBR1NbdGFnTmFtZV0gJiYgKENPTU1PTl9TVkdfQU5EX0hUTUxfRUxFTUVOVFNbdGFnTmFtZV0gfHwgIUFMTF9TVkdfVEFHU1t0YWdOYW1lXSk7XG4gICAgICB9XG4gICAgICAvLyBGb3IgWEhUTUwgYW5kIFhNTCBkb2N1bWVudHMgdGhhdCBzdXBwb3J0IGN1c3RvbSBuYW1lc3BhY2VzXG4gICAgICBpZiAoUEFSU0VSX01FRElBX1RZUEUgPT09ICdhcHBsaWNhdGlvbi94aHRtbCt4bWwnICYmIEFMTE9XRURfTkFNRVNQQUNFU1tlbGVtZW50Lm5hbWVzcGFjZVVSSV0pIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICAvLyBUaGUgY29kZSBzaG91bGQgbmV2ZXIgcmVhY2ggdGhpcyBwbGFjZSAodGhpcyBtZWFuc1xuICAgICAgLy8gdGhhdCB0aGUgZWxlbWVudCBzb21laG93IGdvdCBuYW1lc3BhY2UgdGhhdCBpcyBub3RcbiAgICAgIC8vIEhUTUwsIFNWRywgTWF0aE1MIG9yIGFsbG93ZWQgdmlhIEFMTE9XRURfTkFNRVNQQUNFUykuXG4gICAgICAvLyBSZXR1cm4gZmFsc2UganVzdCBpbiBjYXNlLlxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogX2ZvcmNlUmVtb3ZlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbm9kZSBhIERPTSBub2RlXG4gICAgICovXG4gICAgY29uc3QgX2ZvcmNlUmVtb3ZlID0gZnVuY3Rpb24gX2ZvcmNlUmVtb3ZlKG5vZGUpIHtcbiAgICAgIGFycmF5UHVzaChET01QdXJpZnkucmVtb3ZlZCwge1xuICAgICAgICBlbGVtZW50OiBub2RlXG4gICAgICB9KTtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB1bmljb3JuL3ByZWZlci1kb20tbm9kZS1yZW1vdmVcbiAgICAgICAgZ2V0UGFyZW50Tm9kZShub2RlKS5yZW1vdmVDaGlsZChub2RlKTtcbiAgICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgICAgcmVtb3ZlKG5vZGUpO1xuICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogX3JlbW92ZUF0dHJpYnV0ZVxuICAgICAqXG4gICAgICogQHBhcmFtIG5hbWUgYW4gQXR0cmlidXRlIG5hbWVcbiAgICAgKiBAcGFyYW0gZWxlbWVudCBhIERPTSBub2RlXG4gICAgICovXG4gICAgY29uc3QgX3JlbW92ZUF0dHJpYnV0ZSA9IGZ1bmN0aW9uIF9yZW1vdmVBdHRyaWJ1dGUobmFtZSwgZWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgYXJyYXlQdXNoKERPTVB1cmlmeS5yZW1vdmVkLCB7XG4gICAgICAgICAgYXR0cmlidXRlOiBlbGVtZW50LmdldEF0dHJpYnV0ZU5vZGUobmFtZSksXG4gICAgICAgICAgZnJvbTogZWxlbWVudFxuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgICAgYXJyYXlQdXNoKERPTVB1cmlmeS5yZW1vdmVkLCB7XG4gICAgICAgICAgYXR0cmlidXRlOiBudWxsLFxuICAgICAgICAgIGZyb206IGVsZW1lbnRcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbiAgICAgIC8vIFdlIHZvaWQgYXR0cmlidXRlIHZhbHVlcyBmb3IgdW5yZW1vdmFibGUgXCJpc1wiIGF0dHJpYnV0ZXNcbiAgICAgIGlmIChuYW1lID09PSAnaXMnKSB7XG4gICAgICAgIGlmIChSRVRVUk5fRE9NIHx8IFJFVFVSTl9ET01fRlJBR01FTlQpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgX2ZvcmNlUmVtb3ZlKGVsZW1lbnQpO1xuICAgICAgICAgIH0gY2F0Y2ggKF8pIHt9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKG5hbWUsICcnKTtcbiAgICAgICAgICB9IGNhdGNoIChfKSB7fVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBfaW5pdERvY3VtZW50XG4gICAgICpcbiAgICAgKiBAcGFyYW0gZGlydHkgLSBhIHN0cmluZyBvZiBkaXJ0eSBtYXJrdXBcbiAgICAgKiBAcmV0dXJuIGEgRE9NLCBmaWxsZWQgd2l0aCB0aGUgZGlydHkgbWFya3VwXG4gICAgICovXG4gICAgY29uc3QgX2luaXREb2N1bWVudCA9IGZ1bmN0aW9uIF9pbml0RG9jdW1lbnQoZGlydHkpIHtcbiAgICAgIC8qIENyZWF0ZSBhIEhUTUwgZG9jdW1lbnQgKi9cbiAgICAgIGxldCBkb2MgPSBudWxsO1xuICAgICAgbGV0IGxlYWRpbmdXaGl0ZXNwYWNlID0gbnVsbDtcbiAgICAgIGlmIChGT1JDRV9CT0RZKSB7XG4gICAgICAgIGRpcnR5ID0gJzxyZW1vdmU+PC9yZW1vdmU+JyArIGRpcnR5O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLyogSWYgRk9SQ0VfQk9EWSBpc24ndCB1c2VkLCBsZWFkaW5nIHdoaXRlc3BhY2UgbmVlZHMgdG8gYmUgcHJlc2VydmVkIG1hbnVhbGx5ICovXG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSBzdHJpbmdNYXRjaChkaXJ0eSwgL15bXFxyXFxuXFx0IF0rLyk7XG4gICAgICAgIGxlYWRpbmdXaGl0ZXNwYWNlID0gbWF0Y2hlcyAmJiBtYXRjaGVzWzBdO1xuICAgICAgfVxuICAgICAgaWYgKFBBUlNFUl9NRURJQV9UWVBFID09PSAnYXBwbGljYXRpb24veGh0bWwreG1sJyAmJiBOQU1FU1BBQ0UgPT09IEhUTUxfTkFNRVNQQUNFKSB7XG4gICAgICAgIC8vIFJvb3Qgb2YgWEhUTUwgZG9jIG11c3QgY29udGFpbiB4bWxucyBkZWNsYXJhdGlvbiAoc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi94aHRtbDEvbm9ybWF0aXZlLmh0bWwjc3RyaWN0KVxuICAgICAgICBkaXJ0eSA9ICc8aHRtbCB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWxcIj48aGVhZD48L2hlYWQ+PGJvZHk+JyArIGRpcnR5ICsgJzwvYm9keT48L2h0bWw+JztcbiAgICAgIH1cbiAgICAgIGNvbnN0IGRpcnR5UGF5bG9hZCA9IHRydXN0ZWRUeXBlc1BvbGljeSA/IHRydXN0ZWRUeXBlc1BvbGljeS5jcmVhdGVIVE1MKGRpcnR5KSA6IGRpcnR5O1xuICAgICAgLypcbiAgICAgICAqIFVzZSB0aGUgRE9NUGFyc2VyIEFQSSBieSBkZWZhdWx0LCBmYWxsYmFjayBsYXRlciBpZiBuZWVkcyBiZVxuICAgICAgICogRE9NUGFyc2VyIG5vdCB3b3JrIGZvciBzdmcgd2hlbiBoYXMgbXVsdGlwbGUgcm9vdCBlbGVtZW50LlxuICAgICAgICovXG4gICAgICBpZiAoTkFNRVNQQUNFID09PSBIVE1MX05BTUVTUEFDRSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGRvYyA9IG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoZGlydHlQYXlsb2FkLCBQQVJTRVJfTUVESUFfVFlQRSk7XG4gICAgICAgIH0gY2F0Y2ggKF8pIHt9XG4gICAgICB9XG4gICAgICAvKiBVc2UgY3JlYXRlSFRNTERvY3VtZW50IGluIGNhc2UgRE9NUGFyc2VyIGlzIG5vdCBhdmFpbGFibGUgKi9cbiAgICAgIGlmICghZG9jIHx8ICFkb2MuZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgICAgIGRvYyA9IGltcGxlbWVudGF0aW9uLmNyZWF0ZURvY3VtZW50KE5BTUVTUEFDRSwgJ3RlbXBsYXRlJywgbnVsbCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZG9jLmRvY3VtZW50RWxlbWVudC5pbm5lckhUTUwgPSBJU19FTVBUWV9JTlBVVCA/IGVtcHR5SFRNTCA6IGRpcnR5UGF5bG9hZDtcbiAgICAgICAgfSBjYXRjaCAoXykge1xuICAgICAgICAgIC8vIFN5bnRheCBlcnJvciBpZiBkaXJ0eVBheWxvYWQgaXMgaW52YWxpZCB4bWxcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3QgYm9keSA9IGRvYy5ib2R5IHx8IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICBpZiAoZGlydHkgJiYgbGVhZGluZ1doaXRlc3BhY2UpIHtcbiAgICAgICAgYm9keS5pbnNlcnRCZWZvcmUoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobGVhZGluZ1doaXRlc3BhY2UpLCBib2R5LmNoaWxkTm9kZXNbMF0gfHwgbnVsbCk7XG4gICAgICB9XG4gICAgICAvKiBXb3JrIG9uIHdob2xlIGRvY3VtZW50IG9yIGp1c3QgaXRzIGJvZHkgKi9cbiAgICAgIGlmIChOQU1FU1BBQ0UgPT09IEhUTUxfTkFNRVNQQUNFKSB7XG4gICAgICAgIHJldHVybiBnZXRFbGVtZW50c0J5VGFnTmFtZS5jYWxsKGRvYywgV0hPTEVfRE9DVU1FTlQgPyAnaHRtbCcgOiAnYm9keScpWzBdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFdIT0xFX0RPQ1VNRU5UID8gZG9jLmRvY3VtZW50RWxlbWVudCA6IGJvZHk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgTm9kZUl0ZXJhdG9yIG9iamVjdCB0aGF0IHlvdSBjYW4gdXNlIHRvIHRyYXZlcnNlIGZpbHRlcmVkIGxpc3RzIG9mIG5vZGVzIG9yIGVsZW1lbnRzIGluIGEgZG9jdW1lbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcm9vdCBUaGUgcm9vdCBlbGVtZW50IG9yIG5vZGUgdG8gc3RhcnQgdHJhdmVyc2luZyBvbi5cbiAgICAgKiBAcmV0dXJuIFRoZSBjcmVhdGVkIE5vZGVJdGVyYXRvclxuICAgICAqL1xuICAgIGNvbnN0IF9jcmVhdGVOb2RlSXRlcmF0b3IgPSBmdW5jdGlvbiBfY3JlYXRlTm9kZUl0ZXJhdG9yKHJvb3QpIHtcbiAgICAgIHJldHVybiBjcmVhdGVOb2RlSXRlcmF0b3IuY2FsbChyb290Lm93bmVyRG9jdW1lbnQgfHwgcm9vdCwgcm9vdCxcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG4gICAgICBOb2RlRmlsdGVyLlNIT1dfRUxFTUVOVCB8IE5vZGVGaWx0ZXIuU0hPV19DT01NRU5UIHwgTm9kZUZpbHRlci5TSE9XX1RFWFQgfCBOb2RlRmlsdGVyLlNIT1dfUFJPQ0VTU0lOR19JTlNUUlVDVElPTiB8IE5vZGVGaWx0ZXIuU0hPV19DREFUQV9TRUNUSU9OLCBudWxsKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIF9pc0Nsb2JiZXJlZFxuICAgICAqXG4gICAgICogQHBhcmFtIGVsZW1lbnQgZWxlbWVudCB0byBjaGVjayBmb3IgY2xvYmJlcmluZyBhdHRhY2tzXG4gICAgICogQHJldHVybiB0cnVlIGlmIGNsb2JiZXJlZCwgZmFsc2UgaWYgc2FmZVxuICAgICAqL1xuICAgIGNvbnN0IF9pc0Nsb2JiZXJlZCA9IGZ1bmN0aW9uIF9pc0Nsb2JiZXJlZChlbGVtZW50KSB7XG4gICAgICByZXR1cm4gZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxGb3JtRWxlbWVudCAmJiAodHlwZW9mIGVsZW1lbnQubm9kZU5hbWUgIT09ICdzdHJpbmcnIHx8IHR5cGVvZiBlbGVtZW50LnRleHRDb250ZW50ICE9PSAnc3RyaW5nJyB8fCB0eXBlb2YgZWxlbWVudC5yZW1vdmVDaGlsZCAhPT0gJ2Z1bmN0aW9uJyB8fCAhKGVsZW1lbnQuYXR0cmlidXRlcyBpbnN0YW5jZW9mIE5hbWVkTm9kZU1hcCkgfHwgdHlwZW9mIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlICE9PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBlbGVtZW50LnNldEF0dHJpYnV0ZSAhPT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgZWxlbWVudC5uYW1lc3BhY2VVUkkgIT09ICdzdHJpbmcnIHx8IHR5cGVvZiBlbGVtZW50Lmluc2VydEJlZm9yZSAhPT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgZWxlbWVudC5oYXNDaGlsZE5vZGVzICE9PSAnZnVuY3Rpb24nKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiBvYmplY3QgaXMgYSBET00gbm9kZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB2YWx1ZSBvYmplY3QgdG8gY2hlY2sgd2hldGhlciBpdCdzIGEgRE9NIG5vZGVcbiAgICAgKiBAcmV0dXJuIHRydWUgaXMgb2JqZWN0IGlzIGEgRE9NIG5vZGVcbiAgICAgKi9cbiAgICBjb25zdCBfaXNOb2RlID0gZnVuY3Rpb24gX2lzTm9kZSh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHR5cGVvZiBOb2RlID09PSAnZnVuY3Rpb24nICYmIHZhbHVlIGluc3RhbmNlb2YgTm9kZTtcbiAgICB9O1xuICAgIGZ1bmN0aW9uIF9leGVjdXRlSG9va3MoaG9va3MsIGN1cnJlbnROb2RlLCBkYXRhKSB7XG4gICAgICBhcnJheUZvckVhY2goaG9va3MsIGhvb2sgPT4ge1xuICAgICAgICBob29rLmNhbGwoRE9NUHVyaWZ5LCBjdXJyZW50Tm9kZSwgZGF0YSwgQ09ORklHKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBfc2FuaXRpemVFbGVtZW50c1xuICAgICAqXG4gICAgICogQHByb3RlY3Qgbm9kZU5hbWVcbiAgICAgKiBAcHJvdGVjdCB0ZXh0Q29udGVudFxuICAgICAqIEBwcm90ZWN0IHJlbW92ZUNoaWxkXG4gICAgICogQHBhcmFtIGN1cnJlbnROb2RlIHRvIGNoZWNrIGZvciBwZXJtaXNzaW9uIHRvIGV4aXN0XG4gICAgICogQHJldHVybiB0cnVlIGlmIG5vZGUgd2FzIGtpbGxlZCwgZmFsc2UgaWYgbGVmdCBhbGl2ZVxuICAgICAqL1xuICAgIGNvbnN0IF9zYW5pdGl6ZUVsZW1lbnRzID0gZnVuY3Rpb24gX3Nhbml0aXplRWxlbWVudHMoY3VycmVudE5vZGUpIHtcbiAgICAgIGxldCBjb250ZW50ID0gbnVsbDtcbiAgICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cbiAgICAgIF9leGVjdXRlSG9va3MoaG9va3MuYmVmb3JlU2FuaXRpemVFbGVtZW50cywgY3VycmVudE5vZGUsIG51bGwpO1xuICAgICAgLyogQ2hlY2sgaWYgZWxlbWVudCBpcyBjbG9iYmVyZWQgb3IgY2FuIGNsb2JiZXIgKi9cbiAgICAgIGlmIChfaXNDbG9iYmVyZWQoY3VycmVudE5vZGUpKSB7XG4gICAgICAgIF9mb3JjZVJlbW92ZShjdXJyZW50Tm9kZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgLyogTm93IGxldCdzIGNoZWNrIHRoZSBlbGVtZW50J3MgdHlwZSBhbmQgbmFtZSAqL1xuICAgICAgY29uc3QgdGFnTmFtZSA9IHRyYW5zZm9ybUNhc2VGdW5jKGN1cnJlbnROb2RlLm5vZGVOYW1lKTtcbiAgICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cbiAgICAgIF9leGVjdXRlSG9va3MoaG9va3MudXBvblNhbml0aXplRWxlbWVudCwgY3VycmVudE5vZGUsIHtcbiAgICAgICAgdGFnTmFtZSxcbiAgICAgICAgYWxsb3dlZFRhZ3M6IEFMTE9XRURfVEFHU1xuICAgICAgfSk7XG4gICAgICAvKiBEZXRlY3QgbVhTUyBhdHRlbXB0cyBhYnVzaW5nIG5hbWVzcGFjZSBjb25mdXNpb24gKi9cbiAgICAgIGlmIChTQUZFX0ZPUl9YTUwgJiYgY3VycmVudE5vZGUuaGFzQ2hpbGROb2RlcygpICYmICFfaXNOb2RlKGN1cnJlbnROb2RlLmZpcnN0RWxlbWVudENoaWxkKSAmJiByZWdFeHBUZXN0KC88Wy9cXHchXS9nLCBjdXJyZW50Tm9kZS5pbm5lckhUTUwpICYmIHJlZ0V4cFRlc3QoLzxbL1xcdyFdL2csIGN1cnJlbnROb2RlLnRleHRDb250ZW50KSkge1xuICAgICAgICBfZm9yY2VSZW1vdmUoY3VycmVudE5vZGUpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIC8qIFJlbW92ZSBhbnkgb2NjdXJyZW5jZSBvZiBwcm9jZXNzaW5nIGluc3RydWN0aW9ucyAqL1xuICAgICAgaWYgKGN1cnJlbnROb2RlLm5vZGVUeXBlID09PSBOT0RFX1RZUEUucHJvZ3Jlc3NpbmdJbnN0cnVjdGlvbikge1xuICAgICAgICBfZm9yY2VSZW1vdmUoY3VycmVudE5vZGUpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIC8qIFJlbW92ZSBhbnkga2luZCBvZiBwb3NzaWJseSBoYXJtZnVsIGNvbW1lbnRzICovXG4gICAgICBpZiAoU0FGRV9GT1JfWE1MICYmIGN1cnJlbnROb2RlLm5vZGVUeXBlID09PSBOT0RFX1RZUEUuY29tbWVudCAmJiByZWdFeHBUZXN0KC88Wy9cXHddL2csIGN1cnJlbnROb2RlLmRhdGEpKSB7XG4gICAgICAgIF9mb3JjZVJlbW92ZShjdXJyZW50Tm9kZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgLyogUmVtb3ZlIGVsZW1lbnQgaWYgYW55dGhpbmcgZm9yYmlkcyBpdHMgcHJlc2VuY2UgKi9cbiAgICAgIGlmICghKEVYVFJBX0VMRU1FTlRfSEFORExJTkcudGFnQ2hlY2sgaW5zdGFuY2VvZiBGdW5jdGlvbiAmJiBFWFRSQV9FTEVNRU5UX0hBTkRMSU5HLnRhZ0NoZWNrKHRhZ05hbWUpKSAmJiAoIUFMTE9XRURfVEFHU1t0YWdOYW1lXSB8fCBGT1JCSURfVEFHU1t0YWdOYW1lXSkpIHtcbiAgICAgICAgLyogQ2hlY2sgaWYgd2UgaGF2ZSBhIGN1c3RvbSBlbGVtZW50IHRvIGhhbmRsZSAqL1xuICAgICAgICBpZiAoIUZPUkJJRF9UQUdTW3RhZ05hbWVdICYmIF9pc0Jhc2ljQ3VzdG9tRWxlbWVudCh0YWdOYW1lKSkge1xuICAgICAgICAgIGlmIChDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sgaW5zdGFuY2VvZiBSZWdFeHAgJiYgcmVnRXhwVGVzdChDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2ssIHRhZ05hbWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sgaW5zdGFuY2VvZiBGdW5jdGlvbiAmJiBDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sodGFnTmFtZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLyogS2VlcCBjb250ZW50IGV4Y2VwdCBmb3IgYmFkLWxpc3RlZCBlbGVtZW50cyAqL1xuICAgICAgICBpZiAoS0VFUF9DT05URU5UICYmICFGT1JCSURfQ09OVEVOVFNbdGFnTmFtZV0pIHtcbiAgICAgICAgICBjb25zdCBwYXJlbnROb2RlID0gZ2V0UGFyZW50Tm9kZShjdXJyZW50Tm9kZSkgfHwgY3VycmVudE5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgICBjb25zdCBjaGlsZE5vZGVzID0gZ2V0Q2hpbGROb2RlcyhjdXJyZW50Tm9kZSkgfHwgY3VycmVudE5vZGUuY2hpbGROb2RlcztcbiAgICAgICAgICBpZiAoY2hpbGROb2RlcyAmJiBwYXJlbnROb2RlKSB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZENvdW50ID0gY2hpbGROb2Rlcy5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gY2hpbGRDb3VudCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGNoaWxkQ2xvbmUgPSBjbG9uZU5vZGUoY2hpbGROb2Rlc1tpXSwgdHJ1ZSk7XG4gICAgICAgICAgICAgIGNoaWxkQ2xvbmUuX19yZW1vdmFsQ291bnQgPSAoY3VycmVudE5vZGUuX19yZW1vdmFsQ291bnQgfHwgMCkgKyAxO1xuICAgICAgICAgICAgICBwYXJlbnROb2RlLmluc2VydEJlZm9yZShjaGlsZENsb25lLCBnZXROZXh0U2libGluZyhjdXJyZW50Tm9kZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfZm9yY2VSZW1vdmUoY3VycmVudE5vZGUpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIC8qIENoZWNrIHdoZXRoZXIgZWxlbWVudCBoYXMgYSB2YWxpZCBuYW1lc3BhY2UgKi9cbiAgICAgIGlmIChjdXJyZW50Tm9kZSBpbnN0YW5jZW9mIEVsZW1lbnQgJiYgIV9jaGVja1ZhbGlkTmFtZXNwYWNlKGN1cnJlbnROb2RlKSkge1xuICAgICAgICBfZm9yY2VSZW1vdmUoY3VycmVudE5vZGUpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIC8qIE1ha2Ugc3VyZSB0aGF0IG9sZGVyIGJyb3dzZXJzIGRvbid0IGdldCBmYWxsYmFjay10YWcgbVhTUyAqL1xuICAgICAgaWYgKCh0YWdOYW1lID09PSAnbm9zY3JpcHQnIHx8IHRhZ05hbWUgPT09ICdub2VtYmVkJyB8fCB0YWdOYW1lID09PSAnbm9mcmFtZXMnKSAmJiByZWdFeHBUZXN0KC88XFwvbm8oc2NyaXB0fGVtYmVkfGZyYW1lcykvaSwgY3VycmVudE5vZGUuaW5uZXJIVE1MKSkge1xuICAgICAgICBfZm9yY2VSZW1vdmUoY3VycmVudE5vZGUpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIC8qIFNhbml0aXplIGVsZW1lbnQgY29udGVudCB0byBiZSB0ZW1wbGF0ZS1zYWZlICovXG4gICAgICBpZiAoU0FGRV9GT1JfVEVNUExBVEVTICYmIGN1cnJlbnROb2RlLm5vZGVUeXBlID09PSBOT0RFX1RZUEUudGV4dCkge1xuICAgICAgICAvKiBHZXQgdGhlIGVsZW1lbnQncyB0ZXh0IGNvbnRlbnQgKi9cbiAgICAgICAgY29udGVudCA9IGN1cnJlbnROb2RlLnRleHRDb250ZW50O1xuICAgICAgICBhcnJheUZvckVhY2goW01VU1RBQ0hFX0VYUFIsIEVSQl9FWFBSLCBUTVBMSVRfRVhQUl0sIGV4cHIgPT4ge1xuICAgICAgICAgIGNvbnRlbnQgPSBzdHJpbmdSZXBsYWNlKGNvbnRlbnQsIGV4cHIsICcgJyk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoY3VycmVudE5vZGUudGV4dENvbnRlbnQgIT09IGNvbnRlbnQpIHtcbiAgICAgICAgICBhcnJheVB1c2goRE9NUHVyaWZ5LnJlbW92ZWQsIHtcbiAgICAgICAgICAgIGVsZW1lbnQ6IGN1cnJlbnROb2RlLmNsb25lTm9kZSgpXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgY3VycmVudE5vZGUudGV4dENvbnRlbnQgPSBjb250ZW50O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICBfZXhlY3V0ZUhvb2tzKGhvb2tzLmFmdGVyU2FuaXRpemVFbGVtZW50cywgY3VycmVudE5vZGUsIG51bGwpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogX2lzVmFsaWRBdHRyaWJ1dGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSBsY1RhZyBMb3dlcmNhc2UgdGFnIG5hbWUgb2YgY29udGFpbmluZyBlbGVtZW50LlxuICAgICAqIEBwYXJhbSBsY05hbWUgTG93ZXJjYXNlIGF0dHJpYnV0ZSBuYW1lLlxuICAgICAqIEBwYXJhbSB2YWx1ZSBBdHRyaWJ1dGUgdmFsdWUuXG4gICAgICogQHJldHVybiBSZXR1cm5zIHRydWUgaWYgYHZhbHVlYCBpcyB2YWxpZCwgb3RoZXJ3aXNlIGZhbHNlLlxuICAgICAqL1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb21wbGV4aXR5XG4gICAgY29uc3QgX2lzVmFsaWRBdHRyaWJ1dGUgPSBmdW5jdGlvbiBfaXNWYWxpZEF0dHJpYnV0ZShsY1RhZywgbGNOYW1lLCB2YWx1ZSkge1xuICAgICAgLyogTWFrZSBzdXJlIGF0dHJpYnV0ZSBjYW5ub3QgY2xvYmJlciAqL1xuICAgICAgaWYgKFNBTklUSVpFX0RPTSAmJiAobGNOYW1lID09PSAnaWQnIHx8IGxjTmFtZSA9PT0gJ25hbWUnKSAmJiAodmFsdWUgaW4gZG9jdW1lbnQgfHwgdmFsdWUgaW4gZm9ybUVsZW1lbnQpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIC8qIEFsbG93IHZhbGlkIGRhdGEtKiBhdHRyaWJ1dGVzOiBBdCBsZWFzdCBvbmUgY2hhcmFjdGVyIGFmdGVyIFwiLVwiXG4gICAgICAgICAgKGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2RvbS5odG1sI2VtYmVkZGluZy1jdXN0b20tbm9uLXZpc2libGUtZGF0YS13aXRoLXRoZS1kYXRhLSotYXR0cmlidXRlcylcbiAgICAgICAgICBYTUwtY29tcGF0aWJsZSAoaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvaW5mcmFzdHJ1Y3R1cmUuaHRtbCN4bWwtY29tcGF0aWJsZSBhbmQgaHR0cDovL3d3dy53My5vcmcvVFIveG1sLyNkMGU4MDQpXG4gICAgICAgICAgV2UgZG9uJ3QgbmVlZCB0byBjaGVjayB0aGUgdmFsdWU7IGl0J3MgYWx3YXlzIFVSSSBzYWZlLiAqL1xuICAgICAgaWYgKEFMTE9XX0RBVEFfQVRUUiAmJiAhRk9SQklEX0FUVFJbbGNOYW1lXSAmJiByZWdFeHBUZXN0KERBVEFfQVRUUiwgbGNOYW1lKSkgOyBlbHNlIGlmIChBTExPV19BUklBX0FUVFIgJiYgcmVnRXhwVGVzdChBUklBX0FUVFIsIGxjTmFtZSkpIDsgZWxzZSBpZiAoRVhUUkFfRUxFTUVOVF9IQU5ETElORy5hdHRyaWJ1dGVDaGVjayBpbnN0YW5jZW9mIEZ1bmN0aW9uICYmIEVYVFJBX0VMRU1FTlRfSEFORExJTkcuYXR0cmlidXRlQ2hlY2sobGNOYW1lLCBsY1RhZykpIDsgZWxzZSBpZiAoIUFMTE9XRURfQVRUUltsY05hbWVdIHx8IEZPUkJJRF9BVFRSW2xjTmFtZV0pIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAvLyBGaXJzdCBjb25kaXRpb24gZG9lcyBhIHZlcnkgYmFzaWMgY2hlY2sgaWYgYSkgaXQncyBiYXNpY2FsbHkgYSB2YWxpZCBjdXN0b20gZWxlbWVudCB0YWduYW1lIEFORFxuICAgICAgICAvLyBiKSBpZiB0aGUgdGFnTmFtZSBwYXNzZXMgd2hhdGV2ZXIgdGhlIHVzZXIgaGFzIGNvbmZpZ3VyZWQgZm9yIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVja1xuICAgICAgICAvLyBhbmQgYykgaWYgdGhlIGF0dHJpYnV0ZSBuYW1lIHBhc3NlcyB3aGF0ZXZlciB0aGUgdXNlciBoYXMgY29uZmlndXJlZCBmb3IgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYXR0cmlidXRlTmFtZUNoZWNrXG4gICAgICAgIF9pc0Jhc2ljQ3VzdG9tRWxlbWVudChsY1RhZykgJiYgKENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayBpbnN0YW5jZW9mIFJlZ0V4cCAmJiByZWdFeHBUZXN0KENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjaywgbGNUYWcpIHx8IENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayBpbnN0YW5jZW9mIEZ1bmN0aW9uICYmIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayhsY1RhZykpICYmIChDVVNUT01fRUxFTUVOVF9IQU5ETElORy5hdHRyaWJ1dGVOYW1lQ2hlY2sgaW5zdGFuY2VvZiBSZWdFeHAgJiYgcmVnRXhwVGVzdChDVVNUT01fRUxFTUVOVF9IQU5ETElORy5hdHRyaWJ1dGVOYW1lQ2hlY2ssIGxjTmFtZSkgfHwgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYXR0cmlidXRlTmFtZUNoZWNrIGluc3RhbmNlb2YgRnVuY3Rpb24gJiYgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYXR0cmlidXRlTmFtZUNoZWNrKGxjTmFtZSwgbGNUYWcpKSB8fFxuICAgICAgICAvLyBBbHRlcm5hdGl2ZSwgc2Vjb25kIGNvbmRpdGlvbiBjaGVja3MgaWYgaXQncyBhbiBgaXNgLWF0dHJpYnV0ZSwgQU5EXG4gICAgICAgIC8vIHRoZSB2YWx1ZSBwYXNzZXMgd2hhdGV2ZXIgdGhlIHVzZXIgaGFzIGNvbmZpZ3VyZWQgZm9yIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVja1xuICAgICAgICBsY05hbWUgPT09ICdpcycgJiYgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYWxsb3dDdXN0b21pemVkQnVpbHRJbkVsZW1lbnRzICYmIChDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sgaW5zdGFuY2VvZiBSZWdFeHAgJiYgcmVnRXhwVGVzdChDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2ssIHZhbHVlKSB8fCBDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sgaW5zdGFuY2VvZiBGdW5jdGlvbiAmJiBDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sodmFsdWUpKSkgOyBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLyogQ2hlY2sgdmFsdWUgaXMgc2FmZS4gRmlyc3QsIGlzIGF0dHIgaW5lcnQ/IElmIHNvLCBpcyBzYWZlICovXG4gICAgICB9IGVsc2UgaWYgKFVSSV9TQUZFX0FUVFJJQlVURVNbbGNOYW1lXSkgOyBlbHNlIGlmIChyZWdFeHBUZXN0KElTX0FMTE9XRURfVVJJJDEsIHN0cmluZ1JlcGxhY2UodmFsdWUsIEFUVFJfV0hJVEVTUEFDRSwgJycpKSkgOyBlbHNlIGlmICgobGNOYW1lID09PSAnc3JjJyB8fCBsY05hbWUgPT09ICd4bGluazpocmVmJyB8fCBsY05hbWUgPT09ICdocmVmJykgJiYgbGNUYWcgIT09ICdzY3JpcHQnICYmIHN0cmluZ0luZGV4T2YodmFsdWUsICdkYXRhOicpID09PSAwICYmIERBVEFfVVJJX1RBR1NbbGNUYWddKSA7IGVsc2UgaWYgKEFMTE9XX1VOS05PV05fUFJPVE9DT0xTICYmICFyZWdFeHBUZXN0KElTX1NDUklQVF9PUl9EQVRBLCBzdHJpbmdSZXBsYWNlKHZhbHVlLCBBVFRSX1dISVRFU1BBQ0UsICcnKSkpIDsgZWxzZSBpZiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSBlbHNlIDtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogX2lzQmFzaWNDdXN0b21FbGVtZW50XG4gICAgICogY2hlY2tzIGlmIGF0IGxlYXN0IG9uZSBkYXNoIGlzIGluY2x1ZGVkIGluIHRhZ05hbWUsIGFuZCBpdCdzIG5vdCB0aGUgZmlyc3QgY2hhclxuICAgICAqIGZvciBtb3JlIHNvcGhpc3RpY2F0ZWQgY2hlY2tpbmcgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9zaW5kcmVzb3JodXMvdmFsaWRhdGUtZWxlbWVudC1uYW1lXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdGFnTmFtZSBuYW1lIG9mIHRoZSB0YWcgb2YgdGhlIG5vZGUgdG8gc2FuaXRpemVcbiAgICAgKiBAcmV0dXJucyBSZXR1cm5zIHRydWUgaWYgdGhlIHRhZyBuYW1lIG1lZXRzIHRoZSBiYXNpYyBjcml0ZXJpYSBmb3IgYSBjdXN0b20gZWxlbWVudCwgb3RoZXJ3aXNlIGZhbHNlLlxuICAgICAqL1xuICAgIGNvbnN0IF9pc0Jhc2ljQ3VzdG9tRWxlbWVudCA9IGZ1bmN0aW9uIF9pc0Jhc2ljQ3VzdG9tRWxlbWVudCh0YWdOYW1lKSB7XG4gICAgICByZXR1cm4gdGFnTmFtZSAhPT0gJ2Fubm90YXRpb24teG1sJyAmJiBzdHJpbmdNYXRjaCh0YWdOYW1lLCBDVVNUT01fRUxFTUVOVCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBfc2FuaXRpemVBdHRyaWJ1dGVzXG4gICAgICpcbiAgICAgKiBAcHJvdGVjdCBhdHRyaWJ1dGVzXG4gICAgICogQHByb3RlY3Qgbm9kZU5hbWVcbiAgICAgKiBAcHJvdGVjdCByZW1vdmVBdHRyaWJ1dGVcbiAgICAgKiBAcHJvdGVjdCBzZXRBdHRyaWJ1dGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSBjdXJyZW50Tm9kZSB0byBzYW5pdGl6ZVxuICAgICAqL1xuICAgIGNvbnN0IF9zYW5pdGl6ZUF0dHJpYnV0ZXMgPSBmdW5jdGlvbiBfc2FuaXRpemVBdHRyaWJ1dGVzKGN1cnJlbnROb2RlKSB7XG4gICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICBfZXhlY3V0ZUhvb2tzKGhvb2tzLmJlZm9yZVNhbml0aXplQXR0cmlidXRlcywgY3VycmVudE5vZGUsIG51bGwpO1xuICAgICAgY29uc3Qge1xuICAgICAgICBhdHRyaWJ1dGVzXG4gICAgICB9ID0gY3VycmVudE5vZGU7XG4gICAgICAvKiBDaGVjayBpZiB3ZSBoYXZlIGF0dHJpYnV0ZXM7IGlmIG5vdCB3ZSBtaWdodCBoYXZlIGEgdGV4dCBub2RlICovXG4gICAgICBpZiAoIWF0dHJpYnV0ZXMgfHwgX2lzQ2xvYmJlcmVkKGN1cnJlbnROb2RlKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBob29rRXZlbnQgPSB7XG4gICAgICAgIGF0dHJOYW1lOiAnJyxcbiAgICAgICAgYXR0clZhbHVlOiAnJyxcbiAgICAgICAga2VlcEF0dHI6IHRydWUsXG4gICAgICAgIGFsbG93ZWRBdHRyaWJ1dGVzOiBBTExPV0VEX0FUVFIsXG4gICAgICAgIGZvcmNlS2VlcEF0dHI6IHVuZGVmaW5lZFxuICAgICAgfTtcbiAgICAgIGxldCBsID0gYXR0cmlidXRlcy5sZW5ndGg7XG4gICAgICAvKiBHbyBiYWNrd2FyZHMgb3ZlciBhbGwgYXR0cmlidXRlczsgc2FmZWx5IHJlbW92ZSBiYWQgb25lcyAqL1xuICAgICAgd2hpbGUgKGwtLSkge1xuICAgICAgICBjb25zdCBhdHRyID0gYXR0cmlidXRlc1tsXTtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgbmFtZXNwYWNlVVJJLFxuICAgICAgICAgIHZhbHVlOiBhdHRyVmFsdWVcbiAgICAgICAgfSA9IGF0dHI7XG4gICAgICAgIGNvbnN0IGxjTmFtZSA9IHRyYW5zZm9ybUNhc2VGdW5jKG5hbWUpO1xuICAgICAgICBjb25zdCBpbml0VmFsdWUgPSBhdHRyVmFsdWU7XG4gICAgICAgIGxldCB2YWx1ZSA9IG5hbWUgPT09ICd2YWx1ZScgPyBpbml0VmFsdWUgOiBzdHJpbmdUcmltKGluaXRWYWx1ZSk7XG4gICAgICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cbiAgICAgICAgaG9va0V2ZW50LmF0dHJOYW1lID0gbGNOYW1lO1xuICAgICAgICBob29rRXZlbnQuYXR0clZhbHVlID0gdmFsdWU7XG4gICAgICAgIGhvb2tFdmVudC5rZWVwQXR0ciA9IHRydWU7XG4gICAgICAgIGhvb2tFdmVudC5mb3JjZUtlZXBBdHRyID0gdW5kZWZpbmVkOyAvLyBBbGxvd3MgZGV2ZWxvcGVycyB0byBzZWUgdGhpcyBpcyBhIHByb3BlcnR5IHRoZXkgY2FuIHNldFxuICAgICAgICBfZXhlY3V0ZUhvb2tzKGhvb2tzLnVwb25TYW5pdGl6ZUF0dHJpYnV0ZSwgY3VycmVudE5vZGUsIGhvb2tFdmVudCk7XG4gICAgICAgIHZhbHVlID0gaG9va0V2ZW50LmF0dHJWYWx1ZTtcbiAgICAgICAgLyogRnVsbCBET00gQ2xvYmJlcmluZyBwcm90ZWN0aW9uIHZpYSBuYW1lc3BhY2UgaXNvbGF0aW9uLFxuICAgICAgICAgKiBQcmVmaXggaWQgYW5kIG5hbWUgYXR0cmlidXRlcyB3aXRoIGB1c2VyLWNvbnRlbnQtYFxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKFNBTklUSVpFX05BTUVEX1BST1BTICYmIChsY05hbWUgPT09ICdpZCcgfHwgbGNOYW1lID09PSAnbmFtZScpKSB7XG4gICAgICAgICAgLy8gUmVtb3ZlIHRoZSBhdHRyaWJ1dGUgd2l0aCB0aGlzIHZhbHVlXG4gICAgICAgICAgX3JlbW92ZUF0dHJpYnV0ZShuYW1lLCBjdXJyZW50Tm9kZSk7XG4gICAgICAgICAgLy8gUHJlZml4IHRoZSB2YWx1ZSBhbmQgbGF0ZXIgcmUtY3JlYXRlIHRoZSBhdHRyaWJ1dGUgd2l0aCB0aGUgc2FuaXRpemVkIHZhbHVlXG4gICAgICAgICAgdmFsdWUgPSBTQU5JVElaRV9OQU1FRF9QUk9QU19QUkVGSVggKyB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICAvKiBXb3JrIGFyb3VuZCBhIHNlY3VyaXR5IGlzc3VlIHdpdGggY29tbWVudHMgaW5zaWRlIGF0dHJpYnV0ZXMgKi9cbiAgICAgICAgaWYgKFNBRkVfRk9SX1hNTCAmJiByZWdFeHBUZXN0KC8oKC0tIT98XSk+KXw8XFwvKHN0eWxlfHRpdGxlfHRleHRhcmVhKS9pLCB2YWx1ZSkpIHtcbiAgICAgICAgICBfcmVtb3ZlQXR0cmlidXRlKG5hbWUsIGN1cnJlbnROb2RlKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICAvKiBNYWtlIHN1cmUgd2UgY2Fubm90IGVhc2lseSB1c2UgYW5pbWF0ZWQgaHJlZnMsIGV2ZW4gaWYgYW5pbWF0aW9ucyBhcmUgYWxsb3dlZCAqL1xuICAgICAgICBpZiAobGNOYW1lID09PSAnYXR0cmlidXRlbmFtZScgJiYgc3RyaW5nTWF0Y2godmFsdWUsICdocmVmJykpIHtcbiAgICAgICAgICBfcmVtb3ZlQXR0cmlidXRlKG5hbWUsIGN1cnJlbnROb2RlKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICAvKiBEaWQgdGhlIGhvb2tzIGFwcHJvdmUgb2YgdGhlIGF0dHJpYnV0ZT8gKi9cbiAgICAgICAgaWYgKGhvb2tFdmVudC5mb3JjZUtlZXBBdHRyKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgLyogRGlkIHRoZSBob29rcyBhcHByb3ZlIG9mIHRoZSBhdHRyaWJ1dGU/ICovXG4gICAgICAgIGlmICghaG9va0V2ZW50LmtlZXBBdHRyKSB7XG4gICAgICAgICAgX3JlbW92ZUF0dHJpYnV0ZShuYW1lLCBjdXJyZW50Tm9kZSk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgLyogV29yayBhcm91bmQgYSBzZWN1cml0eSBpc3N1ZSBpbiBqUXVlcnkgMy4wICovXG4gICAgICAgIGlmICghQUxMT1dfU0VMRl9DTE9TRV9JTl9BVFRSICYmIHJlZ0V4cFRlc3QoL1xcLz4vaSwgdmFsdWUpKSB7XG4gICAgICAgICAgX3JlbW92ZUF0dHJpYnV0ZShuYW1lLCBjdXJyZW50Tm9kZSk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgLyogU2FuaXRpemUgYXR0cmlidXRlIGNvbnRlbnQgdG8gYmUgdGVtcGxhdGUtc2FmZSAqL1xuICAgICAgICBpZiAoU0FGRV9GT1JfVEVNUExBVEVTKSB7XG4gICAgICAgICAgYXJyYXlGb3JFYWNoKFtNVVNUQUNIRV9FWFBSLCBFUkJfRVhQUiwgVE1QTElUX0VYUFJdLCBleHByID0+IHtcbiAgICAgICAgICAgIHZhbHVlID0gc3RyaW5nUmVwbGFjZSh2YWx1ZSwgZXhwciwgJyAnKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvKiBJcyBgdmFsdWVgIHZhbGlkIGZvciB0aGlzIGF0dHJpYnV0ZT8gKi9cbiAgICAgICAgY29uc3QgbGNUYWcgPSB0cmFuc2Zvcm1DYXNlRnVuYyhjdXJyZW50Tm9kZS5ub2RlTmFtZSk7XG4gICAgICAgIGlmICghX2lzVmFsaWRBdHRyaWJ1dGUobGNUYWcsIGxjTmFtZSwgdmFsdWUpKSB7XG4gICAgICAgICAgX3JlbW92ZUF0dHJpYnV0ZShuYW1lLCBjdXJyZW50Tm9kZSk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgLyogSGFuZGxlIGF0dHJpYnV0ZXMgdGhhdCByZXF1aXJlIFRydXN0ZWQgVHlwZXMgKi9cbiAgICAgICAgaWYgKHRydXN0ZWRUeXBlc1BvbGljeSAmJiB0eXBlb2YgdHJ1c3RlZFR5cGVzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdHJ1c3RlZFR5cGVzLmdldEF0dHJpYnV0ZVR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBpZiAobmFtZXNwYWNlVVJJKSA7IGVsc2Uge1xuICAgICAgICAgICAgc3dpdGNoICh0cnVzdGVkVHlwZXMuZ2V0QXR0cmlidXRlVHlwZShsY1RhZywgbGNOYW1lKSkge1xuICAgICAgICAgICAgICBjYXNlICdUcnVzdGVkSFRNTCc6XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgdmFsdWUgPSB0cnVzdGVkVHlwZXNQb2xpY3kuY3JlYXRlSFRNTCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNhc2UgJ1RydXN0ZWRTY3JpcHRVUkwnOlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHZhbHVlID0gdHJ1c3RlZFR5cGVzUG9saWN5LmNyZWF0ZVNjcmlwdFVSTCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8qIEhhbmRsZSBpbnZhbGlkIGRhdGEtKiBhdHRyaWJ1dGUgc2V0IGJ5IHRyeS1jYXRjaGluZyBpdCAqL1xuICAgICAgICBpZiAodmFsdWUgIT09IGluaXRWYWx1ZSkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAobmFtZXNwYWNlVVJJKSB7XG4gICAgICAgICAgICAgIGN1cnJlbnROb2RlLnNldEF0dHJpYnV0ZU5TKG5hbWVzcGFjZVVSSSwgbmFtZSwgdmFsdWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLyogRmFsbGJhY2sgdG8gc2V0QXR0cmlidXRlKCkgZm9yIGJyb3dzZXItdW5yZWNvZ25pemVkIG5hbWVzcGFjZXMgZS5nLiBcIngtc2NoZW1hXCIuICovXG4gICAgICAgICAgICAgIGN1cnJlbnROb2RlLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoX2lzQ2xvYmJlcmVkKGN1cnJlbnROb2RlKSkge1xuICAgICAgICAgICAgICBfZm9yY2VSZW1vdmUoY3VycmVudE5vZGUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgYXJyYXlQb3AoRE9NUHVyaWZ5LnJlbW92ZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgICAgICAgIF9yZW1vdmVBdHRyaWJ1dGUobmFtZSwgY3VycmVudE5vZGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLyogRXhlY3V0ZSBhIGhvb2sgaWYgcHJlc2VudCAqL1xuICAgICAgX2V4ZWN1dGVIb29rcyhob29rcy5hZnRlclNhbml0aXplQXR0cmlidXRlcywgY3VycmVudE5vZGUsIG51bGwpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogX3Nhbml0aXplU2hhZG93RE9NXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZnJhZ21lbnQgdG8gaXRlcmF0ZSBvdmVyIHJlY3Vyc2l2ZWx5XG4gICAgICovXG4gICAgY29uc3QgX3Nhbml0aXplU2hhZG93RE9NID0gZnVuY3Rpb24gX3Nhbml0aXplU2hhZG93RE9NKGZyYWdtZW50KSB7XG4gICAgICBsZXQgc2hhZG93Tm9kZSA9IG51bGw7XG4gICAgICBjb25zdCBzaGFkb3dJdGVyYXRvciA9IF9jcmVhdGVOb2RlSXRlcmF0b3IoZnJhZ21lbnQpO1xuICAgICAgLyogRXhlY3V0ZSBhIGhvb2sgaWYgcHJlc2VudCAqL1xuICAgICAgX2V4ZWN1dGVIb29rcyhob29rcy5iZWZvcmVTYW5pdGl6ZVNoYWRvd0RPTSwgZnJhZ21lbnQsIG51bGwpO1xuICAgICAgd2hpbGUgKHNoYWRvd05vZGUgPSBzaGFkb3dJdGVyYXRvci5uZXh0Tm9kZSgpKSB7XG4gICAgICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cbiAgICAgICAgX2V4ZWN1dGVIb29rcyhob29rcy51cG9uU2FuaXRpemVTaGFkb3dOb2RlLCBzaGFkb3dOb2RlLCBudWxsKTtcbiAgICAgICAgLyogU2FuaXRpemUgdGFncyBhbmQgZWxlbWVudHMgKi9cbiAgICAgICAgX3Nhbml0aXplRWxlbWVudHMoc2hhZG93Tm9kZSk7XG4gICAgICAgIC8qIENoZWNrIGF0dHJpYnV0ZXMgbmV4dCAqL1xuICAgICAgICBfc2FuaXRpemVBdHRyaWJ1dGVzKHNoYWRvd05vZGUpO1xuICAgICAgICAvKiBEZWVwIHNoYWRvdyBET00gZGV0ZWN0ZWQgKi9cbiAgICAgICAgaWYgKHNoYWRvd05vZGUuY29udGVudCBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpIHtcbiAgICAgICAgICBfc2FuaXRpemVTaGFkb3dET00oc2hhZG93Tm9kZS5jb250ZW50KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLyogRXhlY3V0ZSBhIGhvb2sgaWYgcHJlc2VudCAqL1xuICAgICAgX2V4ZWN1dGVIb29rcyhob29rcy5hZnRlclNhbml0aXplU2hhZG93RE9NLCBmcmFnbWVudCwgbnVsbCk7XG4gICAgfTtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29tcGxleGl0eVxuICAgIERPTVB1cmlmeS5zYW5pdGl6ZSA9IGZ1bmN0aW9uIChkaXJ0eSkge1xuICAgICAgbGV0IGNmZyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG4gICAgICBsZXQgYm9keSA9IG51bGw7XG4gICAgICBsZXQgaW1wb3J0ZWROb2RlID0gbnVsbDtcbiAgICAgIGxldCBjdXJyZW50Tm9kZSA9IG51bGw7XG4gICAgICBsZXQgcmV0dXJuTm9kZSA9IG51bGw7XG4gICAgICAvKiBNYWtlIHN1cmUgd2UgaGF2ZSBhIHN0cmluZyB0byBzYW5pdGl6ZS5cbiAgICAgICAgRE8gTk9UIHJldHVybiBlYXJseSwgYXMgdGhpcyB3aWxsIHJldHVybiB0aGUgd3JvbmcgdHlwZSBpZlxuICAgICAgICB0aGUgdXNlciBoYXMgcmVxdWVzdGVkIGEgRE9NIG9iamVjdCByYXRoZXIgdGhhbiBhIHN0cmluZyAqL1xuICAgICAgSVNfRU1QVFlfSU5QVVQgPSAhZGlydHk7XG4gICAgICBpZiAoSVNfRU1QVFlfSU5QVVQpIHtcbiAgICAgICAgZGlydHkgPSAnPCEtLT4nO1xuICAgICAgfVxuICAgICAgLyogU3RyaW5naWZ5LCBpbiBjYXNlIGRpcnR5IGlzIGFuIG9iamVjdCAqL1xuICAgICAgaWYgKHR5cGVvZiBkaXJ0eSAhPT0gJ3N0cmluZycgJiYgIV9pc05vZGUoZGlydHkpKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZGlydHkudG9TdHJpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBkaXJ0eSA9IGRpcnR5LnRvU3RyaW5nKCk7XG4gICAgICAgICAgaWYgKHR5cGVvZiBkaXJ0eSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRocm93IHR5cGVFcnJvckNyZWF0ZSgnZGlydHkgaXMgbm90IGEgc3RyaW5nLCBhYm9ydGluZycpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyB0eXBlRXJyb3JDcmVhdGUoJ3RvU3RyaW5nIGlzIG5vdCBhIGZ1bmN0aW9uJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8qIFJldHVybiBkaXJ0eSBIVE1MIGlmIERPTVB1cmlmeSBjYW5ub3QgcnVuICovXG4gICAgICBpZiAoIURPTVB1cmlmeS5pc1N1cHBvcnRlZCkge1xuICAgICAgICByZXR1cm4gZGlydHk7XG4gICAgICB9XG4gICAgICAvKiBBc3NpZ24gY29uZmlnIHZhcnMgKi9cbiAgICAgIGlmICghU0VUX0NPTkZJRykge1xuICAgICAgICBfcGFyc2VDb25maWcoY2ZnKTtcbiAgICAgIH1cbiAgICAgIC8qIENsZWFuIHVwIHJlbW92ZWQgZWxlbWVudHMgKi9cbiAgICAgIERPTVB1cmlmeS5yZW1vdmVkID0gW107XG4gICAgICAvKiBDaGVjayBpZiBkaXJ0eSBpcyBjb3JyZWN0bHkgdHlwZWQgZm9yIElOX1BMQUNFICovXG4gICAgICBpZiAodHlwZW9mIGRpcnR5ID09PSAnc3RyaW5nJykge1xuICAgICAgICBJTl9QTEFDRSA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKElOX1BMQUNFKSB7XG4gICAgICAgIC8qIERvIHNvbWUgZWFybHkgcHJlLXNhbml0aXphdGlvbiB0byBhdm9pZCB1bnNhZmUgcm9vdCBub2RlcyAqL1xuICAgICAgICBpZiAoZGlydHkubm9kZU5hbWUpIHtcbiAgICAgICAgICBjb25zdCB0YWdOYW1lID0gdHJhbnNmb3JtQ2FzZUZ1bmMoZGlydHkubm9kZU5hbWUpO1xuICAgICAgICAgIGlmICghQUxMT1dFRF9UQUdTW3RhZ05hbWVdIHx8IEZPUkJJRF9UQUdTW3RhZ05hbWVdKSB7XG4gICAgICAgICAgICB0aHJvdyB0eXBlRXJyb3JDcmVhdGUoJ3Jvb3Qgbm9kZSBpcyBmb3JiaWRkZW4gYW5kIGNhbm5vdCBiZSBzYW5pdGl6ZWQgaW4tcGxhY2UnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZGlydHkgaW5zdGFuY2VvZiBOb2RlKSB7XG4gICAgICAgIC8qIElmIGRpcnR5IGlzIGEgRE9NIGVsZW1lbnQsIGFwcGVuZCB0byBhbiBlbXB0eSBkb2N1bWVudCB0byBhdm9pZFxuICAgICAgICAgICBlbGVtZW50cyBiZWluZyBzdHJpcHBlZCBieSB0aGUgcGFyc2VyICovXG4gICAgICAgIGJvZHkgPSBfaW5pdERvY3VtZW50KCc8IS0tLS0+Jyk7XG4gICAgICAgIGltcG9ydGVkTm9kZSA9IGJvZHkub3duZXJEb2N1bWVudC5pbXBvcnROb2RlKGRpcnR5LCB0cnVlKTtcbiAgICAgICAgaWYgKGltcG9ydGVkTm9kZS5ub2RlVHlwZSA9PT0gTk9ERV9UWVBFLmVsZW1lbnQgJiYgaW1wb3J0ZWROb2RlLm5vZGVOYW1lID09PSAnQk9EWScpIHtcbiAgICAgICAgICAvKiBOb2RlIGlzIGFscmVhZHkgYSBib2R5LCB1c2UgYXMgaXMgKi9cbiAgICAgICAgICBib2R5ID0gaW1wb3J0ZWROb2RlO1xuICAgICAgICB9IGVsc2UgaWYgKGltcG9ydGVkTm9kZS5ub2RlTmFtZSA9PT0gJ0hUTUwnKSB7XG4gICAgICAgICAgYm9keSA9IGltcG9ydGVkTm9kZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdW5pY29ybi9wcmVmZXItZG9tLW5vZGUtYXBwZW5kXG4gICAgICAgICAgYm9keS5hcHBlbmRDaGlsZChpbXBvcnRlZE5vZGUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvKiBFeGl0IGRpcmVjdGx5IGlmIHdlIGhhdmUgbm90aGluZyB0byBkbyAqL1xuICAgICAgICBpZiAoIVJFVFVSTl9ET00gJiYgIVNBRkVfRk9SX1RFTVBMQVRFUyAmJiAhV0hPTEVfRE9DVU1FTlQgJiZcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHVuaWNvcm4vcHJlZmVyLWluY2x1ZGVzXG4gICAgICAgIGRpcnR5LmluZGV4T2YoJzwnKSA9PT0gLTEpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1c3RlZFR5cGVzUG9saWN5ICYmIFJFVFVSTl9UUlVTVEVEX1RZUEUgPyB0cnVzdGVkVHlwZXNQb2xpY3kuY3JlYXRlSFRNTChkaXJ0eSkgOiBkaXJ0eTtcbiAgICAgICAgfVxuICAgICAgICAvKiBJbml0aWFsaXplIHRoZSBkb2N1bWVudCB0byB3b3JrIG9uICovXG4gICAgICAgIGJvZHkgPSBfaW5pdERvY3VtZW50KGRpcnR5KTtcbiAgICAgICAgLyogQ2hlY2sgd2UgaGF2ZSBhIERPTSBub2RlIGZyb20gdGhlIGRhdGEgKi9cbiAgICAgICAgaWYgKCFib2R5KSB7XG4gICAgICAgICAgcmV0dXJuIFJFVFVSTl9ET00gPyBudWxsIDogUkVUVVJOX1RSVVNURURfVFlQRSA/IGVtcHR5SFRNTCA6ICcnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvKiBSZW1vdmUgZmlyc3QgZWxlbWVudCBub2RlIChvdXJzKSBpZiBGT1JDRV9CT0RZIGlzIHNldCAqL1xuICAgICAgaWYgKGJvZHkgJiYgRk9SQ0VfQk9EWSkge1xuICAgICAgICBfZm9yY2VSZW1vdmUoYm9keS5maXJzdENoaWxkKTtcbiAgICAgIH1cbiAgICAgIC8qIEdldCBub2RlIGl0ZXJhdG9yICovXG4gICAgICBjb25zdCBub2RlSXRlcmF0b3IgPSBfY3JlYXRlTm9kZUl0ZXJhdG9yKElOX1BMQUNFID8gZGlydHkgOiBib2R5KTtcbiAgICAgIC8qIE5vdyBzdGFydCBpdGVyYXRpbmcgb3ZlciB0aGUgY3JlYXRlZCBkb2N1bWVudCAqL1xuICAgICAgd2hpbGUgKGN1cnJlbnROb2RlID0gbm9kZUl0ZXJhdG9yLm5leHROb2RlKCkpIHtcbiAgICAgICAgLyogU2FuaXRpemUgdGFncyBhbmQgZWxlbWVudHMgKi9cbiAgICAgICAgX3Nhbml0aXplRWxlbWVudHMoY3VycmVudE5vZGUpO1xuICAgICAgICAvKiBDaGVjayBhdHRyaWJ1dGVzIG5leHQgKi9cbiAgICAgICAgX3Nhbml0aXplQXR0cmlidXRlcyhjdXJyZW50Tm9kZSk7XG4gICAgICAgIC8qIFNoYWRvdyBET00gZGV0ZWN0ZWQsIHNhbml0aXplIGl0ICovXG4gICAgICAgIGlmIChjdXJyZW50Tm9kZS5jb250ZW50IGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudCkge1xuICAgICAgICAgIF9zYW5pdGl6ZVNoYWRvd0RPTShjdXJyZW50Tm9kZS5jb250ZW50KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLyogSWYgd2Ugc2FuaXRpemVkIGBkaXJ0eWAgaW4tcGxhY2UsIHJldHVybiBpdC4gKi9cbiAgICAgIGlmIChJTl9QTEFDRSkge1xuICAgICAgICByZXR1cm4gZGlydHk7XG4gICAgICB9XG4gICAgICAvKiBSZXR1cm4gc2FuaXRpemVkIHN0cmluZyBvciBET00gKi9cbiAgICAgIGlmIChSRVRVUk5fRE9NKSB7XG4gICAgICAgIGlmIChSRVRVUk5fRE9NX0ZSQUdNRU5UKSB7XG4gICAgICAgICAgcmV0dXJuTm9kZSA9IGNyZWF0ZURvY3VtZW50RnJhZ21lbnQuY2FsbChib2R5Lm93bmVyRG9jdW1lbnQpO1xuICAgICAgICAgIHdoaWxlIChib2R5LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB1bmljb3JuL3ByZWZlci1kb20tbm9kZS1hcHBlbmRcbiAgICAgICAgICAgIHJldHVybk5vZGUuYXBwZW5kQ2hpbGQoYm9keS5maXJzdENoaWxkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuTm9kZSA9IGJvZHk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKEFMTE9XRURfQVRUUi5zaGFkb3dyb290IHx8IEFMTE9XRURfQVRUUi5zaGFkb3dyb290bW9kZSkge1xuICAgICAgICAgIC8qXG4gICAgICAgICAgICBBZG9wdE5vZGUoKSBpcyBub3QgdXNlZCBiZWNhdXNlIGludGVybmFsIHN0YXRlIGlzIG5vdCByZXNldFxuICAgICAgICAgICAgKGUuZy4gdGhlIHBhc3QgbmFtZXMgbWFwIG9mIGEgSFRNTEZvcm1FbGVtZW50KSwgdGhpcyBpcyBzYWZlXG4gICAgICAgICAgICBpbiB0aGVvcnkgYnV0IHdlIHdvdWxkIHJhdGhlciBub3QgcmlzayBhbm90aGVyIGF0dGFjayB2ZWN0b3IuXG4gICAgICAgICAgICBUaGUgc3RhdGUgdGhhdCBpcyBjbG9uZWQgYnkgaW1wb3J0Tm9kZSgpIGlzIGV4cGxpY2l0bHkgZGVmaW5lZFxuICAgICAgICAgICAgYnkgdGhlIHNwZWNzLlxuICAgICAgICAgICovXG4gICAgICAgICAgcmV0dXJuTm9kZSA9IGltcG9ydE5vZGUuY2FsbChvcmlnaW5hbERvY3VtZW50LCByZXR1cm5Ob2RlLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0dXJuTm9kZTtcbiAgICAgIH1cbiAgICAgIGxldCBzZXJpYWxpemVkSFRNTCA9IFdIT0xFX0RPQ1VNRU5UID8gYm9keS5vdXRlckhUTUwgOiBib2R5LmlubmVySFRNTDtcbiAgICAgIC8qIFNlcmlhbGl6ZSBkb2N0eXBlIGlmIGFsbG93ZWQgKi9cbiAgICAgIGlmIChXSE9MRV9ET0NVTUVOVCAmJiBBTExPV0VEX1RBR1NbJyFkb2N0eXBlJ10gJiYgYm9keS5vd25lckRvY3VtZW50ICYmIGJvZHkub3duZXJEb2N1bWVudC5kb2N0eXBlICYmIGJvZHkub3duZXJEb2N1bWVudC5kb2N0eXBlLm5hbWUgJiYgcmVnRXhwVGVzdChET0NUWVBFX05BTUUsIGJvZHkub3duZXJEb2N1bWVudC5kb2N0eXBlLm5hbWUpKSB7XG4gICAgICAgIHNlcmlhbGl6ZWRIVE1MID0gJzwhRE9DVFlQRSAnICsgYm9keS5vd25lckRvY3VtZW50LmRvY3R5cGUubmFtZSArICc+XFxuJyArIHNlcmlhbGl6ZWRIVE1MO1xuICAgICAgfVxuICAgICAgLyogU2FuaXRpemUgZmluYWwgc3RyaW5nIHRlbXBsYXRlLXNhZmUgKi9cbiAgICAgIGlmIChTQUZFX0ZPUl9URU1QTEFURVMpIHtcbiAgICAgICAgYXJyYXlGb3JFYWNoKFtNVVNUQUNIRV9FWFBSLCBFUkJfRVhQUiwgVE1QTElUX0VYUFJdLCBleHByID0+IHtcbiAgICAgICAgICBzZXJpYWxpemVkSFRNTCA9IHN0cmluZ1JlcGxhY2Uoc2VyaWFsaXplZEhUTUwsIGV4cHIsICcgJyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydXN0ZWRUeXBlc1BvbGljeSAmJiBSRVRVUk5fVFJVU1RFRF9UWVBFID8gdHJ1c3RlZFR5cGVzUG9saWN5LmNyZWF0ZUhUTUwoc2VyaWFsaXplZEhUTUwpIDogc2VyaWFsaXplZEhUTUw7XG4gICAgfTtcbiAgICBET01QdXJpZnkuc2V0Q29uZmlnID0gZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IGNmZyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG4gICAgICBfcGFyc2VDb25maWcoY2ZnKTtcbiAgICAgIFNFVF9DT05GSUcgPSB0cnVlO1xuICAgIH07XG4gICAgRE9NUHVyaWZ5LmNsZWFyQ29uZmlnID0gZnVuY3Rpb24gKCkge1xuICAgICAgQ09ORklHID0gbnVsbDtcbiAgICAgIFNFVF9DT05GSUcgPSBmYWxzZTtcbiAgICB9O1xuICAgIERPTVB1cmlmeS5pc1ZhbGlkQXR0cmlidXRlID0gZnVuY3Rpb24gKHRhZywgYXR0ciwgdmFsdWUpIHtcbiAgICAgIC8qIEluaXRpYWxpemUgc2hhcmVkIGNvbmZpZyB2YXJzIGlmIG5lY2Vzc2FyeS4gKi9cbiAgICAgIGlmICghQ09ORklHKSB7XG4gICAgICAgIF9wYXJzZUNvbmZpZyh7fSk7XG4gICAgICB9XG4gICAgICBjb25zdCBsY1RhZyA9IHRyYW5zZm9ybUNhc2VGdW5jKHRhZyk7XG4gICAgICBjb25zdCBsY05hbWUgPSB0cmFuc2Zvcm1DYXNlRnVuYyhhdHRyKTtcbiAgICAgIHJldHVybiBfaXNWYWxpZEF0dHJpYnV0ZShsY1RhZywgbGNOYW1lLCB2YWx1ZSk7XG4gICAgfTtcbiAgICBET01QdXJpZnkuYWRkSG9vayA9IGZ1bmN0aW9uIChlbnRyeVBvaW50LCBob29rRnVuY3Rpb24pIHtcbiAgICAgIGlmICh0eXBlb2YgaG9va0Z1bmN0aW9uICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFycmF5UHVzaChob29rc1tlbnRyeVBvaW50XSwgaG9va0Z1bmN0aW9uKTtcbiAgICB9O1xuICAgIERPTVB1cmlmeS5yZW1vdmVIb29rID0gZnVuY3Rpb24gKGVudHJ5UG9pbnQsIGhvb2tGdW5jdGlvbikge1xuICAgICAgaWYgKGhvb2tGdW5jdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gYXJyYXlMYXN0SW5kZXhPZihob29rc1tlbnRyeVBvaW50XSwgaG9va0Z1bmN0aW9uKTtcbiAgICAgICAgcmV0dXJuIGluZGV4ID09PSAtMSA/IHVuZGVmaW5lZCA6IGFycmF5U3BsaWNlKGhvb2tzW2VudHJ5UG9pbnRdLCBpbmRleCwgMSlbMF07XG4gICAgICB9XG4gICAgICByZXR1cm4gYXJyYXlQb3AoaG9va3NbZW50cnlQb2ludF0pO1xuICAgIH07XG4gICAgRE9NUHVyaWZ5LnJlbW92ZUhvb2tzID0gZnVuY3Rpb24gKGVudHJ5UG9pbnQpIHtcbiAgICAgIGhvb2tzW2VudHJ5UG9pbnRdID0gW107XG4gICAgfTtcbiAgICBET01QdXJpZnkucmVtb3ZlQWxsSG9va3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBob29rcyA9IF9jcmVhdGVIb29rc01hcCgpO1xuICAgIH07XG4gICAgcmV0dXJuIERPTVB1cmlmeTtcbiAgfVxuICB2YXIgcHVyaWZ5ID0gY3JlYXRlRE9NUHVyaWZ5KCk7XG5cbiAgcmV0dXJuIHB1cmlmeTtcblxufSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cHVyaWZ5LmpzLm1hcFxuIiwiY29uc3Qge1xuICBlbnRyaWVzLFxuICBzZXRQcm90b3R5cGVPZixcbiAgaXNGcm96ZW4sXG4gIGdldFByb3RvdHlwZU9mLFxuICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IsXG59ID0gT2JqZWN0O1xuXG5sZXQgeyBmcmVlemUsIHNlYWwsIGNyZWF0ZSB9ID0gT2JqZWN0OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGltcG9ydC9uby1tdXRhYmxlLWV4cG9ydHNcbmxldCB7IGFwcGx5LCBjb25zdHJ1Y3QgfSA9IHR5cGVvZiBSZWZsZWN0ICE9PSAndW5kZWZpbmVkJyAmJiBSZWZsZWN0O1xuXG5pZiAoIWZyZWV6ZSkge1xuICBmcmVlemUgPSBmdW5jdGlvbiA8VD4oeDogVCk6IFQge1xuICAgIHJldHVybiB4O1xuICB9O1xufVxuXG5pZiAoIXNlYWwpIHtcbiAgc2VhbCA9IGZ1bmN0aW9uIDxUPih4OiBUKTogVCB7XG4gICAgcmV0dXJuIHg7XG4gIH07XG59XG5cbmlmICghYXBwbHkpIHtcbiAgYXBwbHkgPSBmdW5jdGlvbiA8VD4oXG4gICAgZnVuYzogKHRoaXNBcmc6IGFueSwgLi4uYXJnczogYW55W10pID0+IFQsXG4gICAgdGhpc0FyZzogYW55LFxuICAgIC4uLmFyZ3M6IGFueVtdXG4gICk6IFQge1xuICAgIHJldHVybiBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICB9O1xufVxuXG5pZiAoIWNvbnN0cnVjdCkge1xuICBjb25zdHJ1Y3QgPSBmdW5jdGlvbiA8VD4oRnVuYzogbmV3ICguLi5hcmdzOiBhbnlbXSkgPT4gVCwgLi4uYXJnczogYW55W10pOiBUIHtcbiAgICByZXR1cm4gbmV3IEZ1bmMoLi4uYXJncyk7XG4gIH07XG59XG5cbmNvbnN0IGFycmF5Rm9yRWFjaCA9IHVuYXBwbHkoQXJyYXkucHJvdG90eXBlLmZvckVhY2gpO1xuY29uc3QgYXJyYXlJbmRleE9mID0gdW5hcHBseShBcnJheS5wcm90b3R5cGUuaW5kZXhPZik7XG5jb25zdCBhcnJheUxhc3RJbmRleE9mID0gdW5hcHBseShBcnJheS5wcm90b3R5cGUubGFzdEluZGV4T2YpO1xuY29uc3QgYXJyYXlQb3AgPSB1bmFwcGx5KEFycmF5LnByb3RvdHlwZS5wb3ApO1xuY29uc3QgYXJyYXlQdXNoID0gdW5hcHBseShBcnJheS5wcm90b3R5cGUucHVzaCk7XG5jb25zdCBhcnJheVNsaWNlID0gdW5hcHBseShBcnJheS5wcm90b3R5cGUuc2xpY2UpO1xuY29uc3QgYXJyYXlTcGxpY2UgPSB1bmFwcGx5KEFycmF5LnByb3RvdHlwZS5zcGxpY2UpO1xuXG5jb25zdCBzdHJpbmdUb0xvd2VyQ2FzZSA9IHVuYXBwbHkoU3RyaW5nLnByb3RvdHlwZS50b0xvd2VyQ2FzZSk7XG5jb25zdCBzdHJpbmdUb1N0cmluZyA9IHVuYXBwbHkoU3RyaW5nLnByb3RvdHlwZS50b1N0cmluZyk7XG5jb25zdCBzdHJpbmdNYXRjaCA9IHVuYXBwbHkoU3RyaW5nLnByb3RvdHlwZS5tYXRjaCk7XG5jb25zdCBzdHJpbmdSZXBsYWNlID0gdW5hcHBseShTdHJpbmcucHJvdG90eXBlLnJlcGxhY2UpO1xuY29uc3Qgc3RyaW5nSW5kZXhPZiA9IHVuYXBwbHkoU3RyaW5nLnByb3RvdHlwZS5pbmRleE9mKTtcbmNvbnN0IHN0cmluZ1RyaW0gPSB1bmFwcGx5KFN0cmluZy5wcm90b3R5cGUudHJpbSk7XG5cbmNvbnN0IG9iamVjdEhhc093blByb3BlcnR5ID0gdW5hcHBseShPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5KTtcblxuY29uc3QgcmVnRXhwVGVzdCA9IHVuYXBwbHkoUmVnRXhwLnByb3RvdHlwZS50ZXN0KTtcblxuY29uc3QgdHlwZUVycm9yQ3JlYXRlID0gdW5jb25zdHJ1Y3QoVHlwZUVycm9yKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGZ1bmN0aW9uIHRoYXQgY2FsbHMgdGhlIGdpdmVuIGZ1bmN0aW9uIHdpdGggYSBzcGVjaWZpZWQgdGhpc0FyZyBhbmQgYXJndW1lbnRzLlxuICpcbiAqIEBwYXJhbSBmdW5jIC0gVGhlIGZ1bmN0aW9uIHRvIGJlIHdyYXBwZWQgYW5kIGNhbGxlZC5cbiAqIEByZXR1cm5zIEEgbmV3IGZ1bmN0aW9uIHRoYXQgY2FsbHMgdGhlIGdpdmVuIGZ1bmN0aW9uIHdpdGggYSBzcGVjaWZpZWQgdGhpc0FyZyBhbmQgYXJndW1lbnRzLlxuICovXG5mdW5jdGlvbiB1bmFwcGx5PFQ+KFxuICBmdW5jOiAodGhpc0FyZzogYW55LCAuLi5hcmdzOiBhbnlbXSkgPT4gVFxuKTogKHRoaXNBcmc6IGFueSwgLi4uYXJnczogYW55W10pID0+IFQge1xuICByZXR1cm4gKHRoaXNBcmc6IGFueSwgLi4uYXJnczogYW55W10pOiBUID0+IHtcbiAgICBpZiAodGhpc0FyZyBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgdGhpc0FyZy5sYXN0SW5kZXggPSAwO1xuICAgIH1cblxuICAgIHJldHVybiBhcHBseShmdW5jLCB0aGlzQXJnLCBhcmdzKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGZ1bmN0aW9uIHRoYXQgY29uc3RydWN0cyBhbiBpbnN0YW5jZSBvZiB0aGUgZ2l2ZW4gY29uc3RydWN0b3IgZnVuY3Rpb24gd2l0aCB0aGUgcHJvdmlkZWQgYXJndW1lbnRzLlxuICpcbiAqIEBwYXJhbSBmdW5jIC0gVGhlIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIHRvIGJlIHdyYXBwZWQgYW5kIGNhbGxlZC5cbiAqIEByZXR1cm5zIEEgbmV3IGZ1bmN0aW9uIHRoYXQgY29uc3RydWN0cyBhbiBpbnN0YW5jZSBvZiB0aGUgZ2l2ZW4gY29uc3RydWN0b3IgZnVuY3Rpb24gd2l0aCB0aGUgcHJvdmlkZWQgYXJndW1lbnRzLlxuICovXG5mdW5jdGlvbiB1bmNvbnN0cnVjdDxUPihcbiAgRnVuYzogbmV3ICguLi5hcmdzOiBhbnlbXSkgPT4gVFxuKTogKC4uLmFyZ3M6IGFueVtdKSA9PiBUIHtcbiAgcmV0dXJuICguLi5hcmdzOiBhbnlbXSk6IFQgPT4gY29uc3RydWN0KEZ1bmMsIGFyZ3MpO1xufVxuXG4vKipcbiAqIEFkZCBwcm9wZXJ0aWVzIHRvIGEgbG9va3VwIHRhYmxlXG4gKlxuICogQHBhcmFtIHNldCAtIFRoZSBzZXQgdG8gd2hpY2ggZWxlbWVudHMgd2lsbCBiZSBhZGRlZC5cbiAqIEBwYXJhbSBhcnJheSAtIFRoZSBhcnJheSBjb250YWluaW5nIGVsZW1lbnRzIHRvIGJlIGFkZGVkIHRvIHRoZSBzZXQuXG4gKiBAcGFyYW0gdHJhbnNmb3JtQ2FzZUZ1bmMgLSBBbiBvcHRpb25hbCBmdW5jdGlvbiB0byB0cmFuc2Zvcm0gdGhlIGNhc2Ugb2YgZWFjaCBlbGVtZW50IGJlZm9yZSBhZGRpbmcgdG8gdGhlIHNldC5cbiAqIEByZXR1cm5zIFRoZSBtb2RpZmllZCBzZXQgd2l0aCBhZGRlZCBlbGVtZW50cy5cbiAqL1xuZnVuY3Rpb24gYWRkVG9TZXQoXG4gIHNldDogUmVjb3JkPHN0cmluZywgYW55PixcbiAgYXJyYXk6IHJlYWRvbmx5IGFueVtdLFxuICB0cmFuc2Zvcm1DYXNlRnVuYzogUmV0dXJuVHlwZTx0eXBlb2YgdW5hcHBseTxzdHJpbmc+PiA9IHN0cmluZ1RvTG93ZXJDYXNlXG4pOiBSZWNvcmQ8c3RyaW5nLCBhbnk+IHtcbiAgaWYgKHNldFByb3RvdHlwZU9mKSB7XG4gICAgLy8gTWFrZSAnaW4nIGFuZCB0cnV0aHkgY2hlY2tzIGxpa2UgQm9vbGVhbihzZXQuY29uc3RydWN0b3IpXG4gICAgLy8gaW5kZXBlbmRlbnQgb2YgYW55IHByb3BlcnRpZXMgZGVmaW5lZCBvbiBPYmplY3QucHJvdG90eXBlLlxuICAgIC8vIFByZXZlbnQgcHJvdG90eXBlIHNldHRlcnMgZnJvbSBpbnRlcmNlcHRpbmcgc2V0IGFzIGEgdGhpcyB2YWx1ZS5cbiAgICBzZXRQcm90b3R5cGVPZihzZXQsIG51bGwpO1xuICB9XG5cbiAgbGV0IGwgPSBhcnJheS5sZW5ndGg7XG4gIHdoaWxlIChsLS0pIHtcbiAgICBsZXQgZWxlbWVudCA9IGFycmF5W2xdO1xuICAgIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnN0IGxjRWxlbWVudCA9IHRyYW5zZm9ybUNhc2VGdW5jKGVsZW1lbnQpO1xuICAgICAgaWYgKGxjRWxlbWVudCAhPT0gZWxlbWVudCkge1xuICAgICAgICAvLyBDb25maWcgcHJlc2V0cyAoZS5nLiB0YWdzLmpzLCBhdHRycy5qcykgYXJlIGltbXV0YWJsZS5cbiAgICAgICAgaWYgKCFpc0Zyb3plbihhcnJheSkpIHtcbiAgICAgICAgICAoYXJyYXkgYXMgYW55W10pW2xdID0gbGNFbGVtZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgZWxlbWVudCA9IGxjRWxlbWVudDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRbZWxlbWVudF0gPSB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIHNldDtcbn1cblxuLyoqXG4gKiBDbGVhbiB1cCBhbiBhcnJheSB0byBoYXJkZW4gYWdhaW5zdCBDU1BQXG4gKlxuICogQHBhcmFtIGFycmF5IC0gVGhlIGFycmF5IHRvIGJlIGNsZWFuZWQuXG4gKiBAcmV0dXJucyBUaGUgY2xlYW5lZCB2ZXJzaW9uIG9mIHRoZSBhcnJheVxuICovXG5mdW5jdGlvbiBjbGVhbkFycmF5PFQ+KGFycmF5OiBUW10pOiBBcnJheTxUIHwgbnVsbD4ge1xuICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgY29uc3QgaXNQcm9wZXJ0eUV4aXN0ID0gb2JqZWN0SGFzT3duUHJvcGVydHkoYXJyYXksIGluZGV4KTtcblxuICAgIGlmICghaXNQcm9wZXJ0eUV4aXN0KSB7XG4gICAgICBhcnJheVtpbmRleF0gPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhcnJheTtcbn1cblxuLyoqXG4gKiBTaGFsbG93IGNsb25lIGFuIG9iamVjdFxuICpcbiAqIEBwYXJhbSBvYmplY3QgLSBUaGUgb2JqZWN0IHRvIGJlIGNsb25lZC5cbiAqIEByZXR1cm5zIEEgbmV3IG9iamVjdCB0aGF0IGNvcGllcyB0aGUgb3JpZ2luYWwuXG4gKi9cbmZ1bmN0aW9uIGNsb25lPFQgZXh0ZW5kcyBSZWNvcmQ8c3RyaW5nLCBhbnk+PihvYmplY3Q6IFQpOiBUIHtcbiAgY29uc3QgbmV3T2JqZWN0ID0gY3JlYXRlKG51bGwpO1xuXG4gIGZvciAoY29uc3QgW3Byb3BlcnR5LCB2YWx1ZV0gb2YgZW50cmllcyhvYmplY3QpKSB7XG4gICAgY29uc3QgaXNQcm9wZXJ0eUV4aXN0ID0gb2JqZWN0SGFzT3duUHJvcGVydHkob2JqZWN0LCBwcm9wZXJ0eSk7XG5cbiAgICBpZiAoaXNQcm9wZXJ0eUV4aXN0KSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgbmV3T2JqZWN0W3Byb3BlcnR5XSA9IGNsZWFuQXJyYXkodmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgdmFsdWUgJiZcbiAgICAgICAgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJlxuICAgICAgICB2YWx1ZS5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0XG4gICAgICApIHtcbiAgICAgICAgbmV3T2JqZWN0W3Byb3BlcnR5XSA9IGNsb25lKHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5ld09iamVjdFtwcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3T2JqZWN0O1xufVxuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGF1dG9tYXRpY2FsbHkgY2hlY2tzIGlmIHRoZSBwcm9wIGlzIGZ1bmN0aW9uIG9yIGdldHRlciBhbmQgYmVoYXZlcyBhY2NvcmRpbmdseS5cbiAqXG4gKiBAcGFyYW0gb2JqZWN0IC0gVGhlIG9iamVjdCB0byBsb29rIHVwIHRoZSBnZXR0ZXIgZnVuY3Rpb24gaW4gaXRzIHByb3RvdHlwZSBjaGFpbi5cbiAqIEBwYXJhbSBwcm9wIC0gVGhlIHByb3BlcnR5IG5hbWUgZm9yIHdoaWNoIHRvIGZpbmQgdGhlIGdldHRlciBmdW5jdGlvbi5cbiAqIEByZXR1cm5zIFRoZSBnZXR0ZXIgZnVuY3Rpb24gZm91bmQgaW4gdGhlIHByb3RvdHlwZSBjaGFpbiBvciBhIGZhbGxiYWNrIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBsb29rdXBHZXR0ZXI8VCBleHRlbmRzIFJlY29yZDxzdHJpbmcsIGFueT4+KFxuICBvYmplY3Q6IFQsXG4gIHByb3A6IHN0cmluZ1xuKTogUmV0dXJuVHlwZTx0eXBlb2YgdW5hcHBseTxhbnk+PiB8ICgoKSA9PiBudWxsKSB7XG4gIHdoaWxlIChvYmplY3QgIT09IG51bGwpIHtcbiAgICBjb25zdCBkZXNjID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcCk7XG5cbiAgICBpZiAoZGVzYykge1xuICAgICAgaWYgKGRlc2MuZ2V0KSB7XG4gICAgICAgIHJldHVybiB1bmFwcGx5KGRlc2MuZ2V0KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBkZXNjLnZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiB1bmFwcGx5KGRlc2MudmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIG9iamVjdCA9IGdldFByb3RvdHlwZU9mKG9iamVjdCk7XG4gIH1cblxuICBmdW5jdGlvbiBmYWxsYmFja1ZhbHVlKCk6IG51bGwge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIGZhbGxiYWNrVmFsdWU7XG59XG5cbmV4cG9ydCB7XG4gIC8vIEFycmF5XG4gIGFycmF5Rm9yRWFjaCxcbiAgYXJyYXlJbmRleE9mLFxuICBhcnJheUxhc3RJbmRleE9mLFxuICBhcnJheVBvcCxcbiAgYXJyYXlQdXNoLFxuICBhcnJheVNsaWNlLFxuICBhcnJheVNwbGljZSxcbiAgLy8gT2JqZWN0XG4gIGVudHJpZXMsXG4gIGZyZWV6ZSxcbiAgZ2V0UHJvdG90eXBlT2YsXG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvcixcbiAgaXNGcm96ZW4sXG4gIHNldFByb3RvdHlwZU9mLFxuICBzZWFsLFxuICBjbG9uZSxcbiAgY3JlYXRlLFxuICBvYmplY3RIYXNPd25Qcm9wZXJ0eSxcbiAgLy8gUmVnRXhwXG4gIHJlZ0V4cFRlc3QsXG4gIC8vIFN0cmluZ1xuICBzdHJpbmdJbmRleE9mLFxuICBzdHJpbmdNYXRjaCxcbiAgc3RyaW5nUmVwbGFjZSxcbiAgc3RyaW5nVG9Mb3dlckNhc2UsXG4gIHN0cmluZ1RvU3RyaW5nLFxuICBzdHJpbmdUcmltLFxuICAvLyBFcnJvcnNcbiAgdHlwZUVycm9yQ3JlYXRlLFxuICAvLyBPdGhlclxuICBsb29rdXBHZXR0ZXIsXG4gIGFkZFRvU2V0LFxuICAvLyBSZWZsZWN0XG4gIHVuYXBwbHksXG4gIHVuY29uc3RydWN0LFxufTtcbiIsImltcG9ydCB7IGZyZWV6ZSB9IGZyb20gJy4vdXRpbHMuanMnO1xuXG5leHBvcnQgY29uc3QgaHRtbCA9IGZyZWV6ZShbXG4gICdhJyxcbiAgJ2FiYnInLFxuICAnYWNyb255bScsXG4gICdhZGRyZXNzJyxcbiAgJ2FyZWEnLFxuICAnYXJ0aWNsZScsXG4gICdhc2lkZScsXG4gICdhdWRpbycsXG4gICdiJyxcbiAgJ2JkaScsXG4gICdiZG8nLFxuICAnYmlnJyxcbiAgJ2JsaW5rJyxcbiAgJ2Jsb2NrcXVvdGUnLFxuICAnYm9keScsXG4gICdicicsXG4gICdidXR0b24nLFxuICAnY2FudmFzJyxcbiAgJ2NhcHRpb24nLFxuICAnY2VudGVyJyxcbiAgJ2NpdGUnLFxuICAnY29kZScsXG4gICdjb2wnLFxuICAnY29sZ3JvdXAnLFxuICAnY29udGVudCcsXG4gICdkYXRhJyxcbiAgJ2RhdGFsaXN0JyxcbiAgJ2RkJyxcbiAgJ2RlY29yYXRvcicsXG4gICdkZWwnLFxuICAnZGV0YWlscycsXG4gICdkZm4nLFxuICAnZGlhbG9nJyxcbiAgJ2RpcicsXG4gICdkaXYnLFxuICAnZGwnLFxuICAnZHQnLFxuICAnZWxlbWVudCcsXG4gICdlbScsXG4gICdmaWVsZHNldCcsXG4gICdmaWdjYXB0aW9uJyxcbiAgJ2ZpZ3VyZScsXG4gICdmb250JyxcbiAgJ2Zvb3RlcicsXG4gICdmb3JtJyxcbiAgJ2gxJyxcbiAgJ2gyJyxcbiAgJ2gzJyxcbiAgJ2g0JyxcbiAgJ2g1JyxcbiAgJ2g2JyxcbiAgJ2hlYWQnLFxuICAnaGVhZGVyJyxcbiAgJ2hncm91cCcsXG4gICdocicsXG4gICdodG1sJyxcbiAgJ2knLFxuICAnaW1nJyxcbiAgJ2lucHV0JyxcbiAgJ2lucycsXG4gICdrYmQnLFxuICAnbGFiZWwnLFxuICAnbGVnZW5kJyxcbiAgJ2xpJyxcbiAgJ21haW4nLFxuICAnbWFwJyxcbiAgJ21hcmsnLFxuICAnbWFycXVlZScsXG4gICdtZW51JyxcbiAgJ21lbnVpdGVtJyxcbiAgJ21ldGVyJyxcbiAgJ25hdicsXG4gICdub2JyJyxcbiAgJ29sJyxcbiAgJ29wdGdyb3VwJyxcbiAgJ29wdGlvbicsXG4gICdvdXRwdXQnLFxuICAncCcsXG4gICdwaWN0dXJlJyxcbiAgJ3ByZScsXG4gICdwcm9ncmVzcycsXG4gICdxJyxcbiAgJ3JwJyxcbiAgJ3J0JyxcbiAgJ3J1YnknLFxuICAncycsXG4gICdzYW1wJyxcbiAgJ3NlYXJjaCcsXG4gICdzZWN0aW9uJyxcbiAgJ3NlbGVjdCcsXG4gICdzaGFkb3cnLFxuICAnc2xvdCcsXG4gICdzbWFsbCcsXG4gICdzb3VyY2UnLFxuICAnc3BhY2VyJyxcbiAgJ3NwYW4nLFxuICAnc3RyaWtlJyxcbiAgJ3N0cm9uZycsXG4gICdzdHlsZScsXG4gICdzdWInLFxuICAnc3VtbWFyeScsXG4gICdzdXAnLFxuICAndGFibGUnLFxuICAndGJvZHknLFxuICAndGQnLFxuICAndGVtcGxhdGUnLFxuICAndGV4dGFyZWEnLFxuICAndGZvb3QnLFxuICAndGgnLFxuICAndGhlYWQnLFxuICAndGltZScsXG4gICd0cicsXG4gICd0cmFjaycsXG4gICd0dCcsXG4gICd1JyxcbiAgJ3VsJyxcbiAgJ3ZhcicsXG4gICd2aWRlbycsXG4gICd3YnInLFxuXSBhcyBjb25zdCk7XG5cbmV4cG9ydCBjb25zdCBzdmcgPSBmcmVlemUoW1xuICAnc3ZnJyxcbiAgJ2EnLFxuICAnYWx0Z2x5cGgnLFxuICAnYWx0Z2x5cGhkZWYnLFxuICAnYWx0Z2x5cGhpdGVtJyxcbiAgJ2FuaW1hdGVjb2xvcicsXG4gICdhbmltYXRlbW90aW9uJyxcbiAgJ2FuaW1hdGV0cmFuc2Zvcm0nLFxuICAnY2lyY2xlJyxcbiAgJ2NsaXBwYXRoJyxcbiAgJ2RlZnMnLFxuICAnZGVzYycsXG4gICdlbGxpcHNlJyxcbiAgJ2VudGVya2V5aGludCcsXG4gICdleHBvcnRwYXJ0cycsXG4gICdmaWx0ZXInLFxuICAnZm9udCcsXG4gICdnJyxcbiAgJ2dseXBoJyxcbiAgJ2dseXBocmVmJyxcbiAgJ2hrZXJuJyxcbiAgJ2ltYWdlJyxcbiAgJ2lucHV0bW9kZScsXG4gICdsaW5lJyxcbiAgJ2xpbmVhcmdyYWRpZW50JyxcbiAgJ21hcmtlcicsXG4gICdtYXNrJyxcbiAgJ21ldGFkYXRhJyxcbiAgJ21wYXRoJyxcbiAgJ3BhcnQnLFxuICAncGF0aCcsXG4gICdwYXR0ZXJuJyxcbiAgJ3BvbHlnb24nLFxuICAncG9seWxpbmUnLFxuICAncmFkaWFsZ3JhZGllbnQnLFxuICAncmVjdCcsXG4gICdzdG9wJyxcbiAgJ3N0eWxlJyxcbiAgJ3N3aXRjaCcsXG4gICdzeW1ib2wnLFxuICAndGV4dCcsXG4gICd0ZXh0cGF0aCcsXG4gICd0aXRsZScsXG4gICd0cmVmJyxcbiAgJ3RzcGFuJyxcbiAgJ3ZpZXcnLFxuICAndmtlcm4nLFxuXSBhcyBjb25zdCk7XG5cbmV4cG9ydCBjb25zdCBzdmdGaWx0ZXJzID0gZnJlZXplKFtcbiAgJ2ZlQmxlbmQnLFxuICAnZmVDb2xvck1hdHJpeCcsXG4gICdmZUNvbXBvbmVudFRyYW5zZmVyJyxcbiAgJ2ZlQ29tcG9zaXRlJyxcbiAgJ2ZlQ29udm9sdmVNYXRyaXgnLFxuICAnZmVEaWZmdXNlTGlnaHRpbmcnLFxuICAnZmVEaXNwbGFjZW1lbnRNYXAnLFxuICAnZmVEaXN0YW50TGlnaHQnLFxuICAnZmVEcm9wU2hhZG93JyxcbiAgJ2ZlRmxvb2QnLFxuICAnZmVGdW5jQScsXG4gICdmZUZ1bmNCJyxcbiAgJ2ZlRnVuY0cnLFxuICAnZmVGdW5jUicsXG4gICdmZUdhdXNzaWFuQmx1cicsXG4gICdmZUltYWdlJyxcbiAgJ2ZlTWVyZ2UnLFxuICAnZmVNZXJnZU5vZGUnLFxuICAnZmVNb3JwaG9sb2d5JyxcbiAgJ2ZlT2Zmc2V0JyxcbiAgJ2ZlUG9pbnRMaWdodCcsXG4gICdmZVNwZWN1bGFyTGlnaHRpbmcnLFxuICAnZmVTcG90TGlnaHQnLFxuICAnZmVUaWxlJyxcbiAgJ2ZlVHVyYnVsZW5jZScsXG5dIGFzIGNvbnN0KTtcblxuLy8gTGlzdCBvZiBTVkcgZWxlbWVudHMgdGhhdCBhcmUgZGlzYWxsb3dlZCBieSBkZWZhdWx0LlxuLy8gV2Ugc3RpbGwgbmVlZCB0byBrbm93IHRoZW0gc28gdGhhdCB3ZSBjYW4gZG8gbmFtZXNwYWNlXG4vLyBjaGVja3MgcHJvcGVybHkgaW4gY2FzZSBvbmUgd2FudHMgdG8gYWRkIHRoZW0gdG9cbi8vIGFsbG93LWxpc3QuXG5leHBvcnQgY29uc3Qgc3ZnRGlzYWxsb3dlZCA9IGZyZWV6ZShbXG4gICdhbmltYXRlJyxcbiAgJ2NvbG9yLXByb2ZpbGUnLFxuICAnY3Vyc29yJyxcbiAgJ2Rpc2NhcmQnLFxuICAnZm9udC1mYWNlJyxcbiAgJ2ZvbnQtZmFjZS1mb3JtYXQnLFxuICAnZm9udC1mYWNlLW5hbWUnLFxuICAnZm9udC1mYWNlLXNyYycsXG4gICdmb250LWZhY2UtdXJpJyxcbiAgJ2ZvcmVpZ25vYmplY3QnLFxuICAnaGF0Y2gnLFxuICAnaGF0Y2hwYXRoJyxcbiAgJ21lc2gnLFxuICAnbWVzaGdyYWRpZW50JyxcbiAgJ21lc2hwYXRjaCcsXG4gICdtZXNocm93JyxcbiAgJ21pc3NpbmctZ2x5cGgnLFxuICAnc2NyaXB0JyxcbiAgJ3NldCcsXG4gICdzb2xpZGNvbG9yJyxcbiAgJ3Vua25vd24nLFxuICAndXNlJyxcbl0gYXMgY29uc3QpO1xuXG5leHBvcnQgY29uc3QgbWF0aE1sID0gZnJlZXplKFtcbiAgJ21hdGgnLFxuICAnbWVuY2xvc2UnLFxuICAnbWVycm9yJyxcbiAgJ21mZW5jZWQnLFxuICAnbWZyYWMnLFxuICAnbWdseXBoJyxcbiAgJ21pJyxcbiAgJ21sYWJlbGVkdHInLFxuICAnbW11bHRpc2NyaXB0cycsXG4gICdtbicsXG4gICdtbycsXG4gICdtb3ZlcicsXG4gICdtcGFkZGVkJyxcbiAgJ21waGFudG9tJyxcbiAgJ21yb290JyxcbiAgJ21yb3cnLFxuICAnbXMnLFxuICAnbXNwYWNlJyxcbiAgJ21zcXJ0JyxcbiAgJ21zdHlsZScsXG4gICdtc3ViJyxcbiAgJ21zdXAnLFxuICAnbXN1YnN1cCcsXG4gICdtdGFibGUnLFxuICAnbXRkJyxcbiAgJ210ZXh0JyxcbiAgJ210cicsXG4gICdtdW5kZXInLFxuICAnbXVuZGVyb3ZlcicsXG4gICdtcHJlc2NyaXB0cycsXG5dIGFzIGNvbnN0KTtcblxuLy8gU2ltaWxhcmx5IHRvIFNWRywgd2Ugd2FudCB0byBrbm93IGFsbCBNYXRoTUwgZWxlbWVudHMsXG4vLyBldmVuIHRob3NlIHRoYXQgd2UgZGlzYWxsb3cgYnkgZGVmYXVsdC5cbmV4cG9ydCBjb25zdCBtYXRoTWxEaXNhbGxvd2VkID0gZnJlZXplKFtcbiAgJ21hY3Rpb24nLFxuICAnbWFsaWduZ3JvdXAnLFxuICAnbWFsaWdubWFyaycsXG4gICdtbG9uZ2RpdicsXG4gICdtc2NhcnJpZXMnLFxuICAnbXNjYXJyeScsXG4gICdtc2dyb3VwJyxcbiAgJ21zdGFjaycsXG4gICdtc2xpbmUnLFxuICAnbXNyb3cnLFxuICAnc2VtYW50aWNzJyxcbiAgJ2Fubm90YXRpb24nLFxuICAnYW5ub3RhdGlvbi14bWwnLFxuICAnbXByZXNjcmlwdHMnLFxuICAnbm9uZScsXG5dIGFzIGNvbnN0KTtcblxuZXhwb3J0IGNvbnN0IHRleHQgPSBmcmVlemUoWycjdGV4dCddIGFzIGNvbnN0KTtcbiIsImltcG9ydCB7IGZyZWV6ZSB9IGZyb20gJy4vdXRpbHMuanMnO1xuXG5leHBvcnQgY29uc3QgaHRtbCA9IGZyZWV6ZShbXG4gICdhY2NlcHQnLFxuICAnYWN0aW9uJyxcbiAgJ2FsaWduJyxcbiAgJ2FsdCcsXG4gICdhdXRvY2FwaXRhbGl6ZScsXG4gICdhdXRvY29tcGxldGUnLFxuICAnYXV0b3BpY3R1cmVpbnBpY3R1cmUnLFxuICAnYXV0b3BsYXknLFxuICAnYmFja2dyb3VuZCcsXG4gICdiZ2NvbG9yJyxcbiAgJ2JvcmRlcicsXG4gICdjYXB0dXJlJyxcbiAgJ2NlbGxwYWRkaW5nJyxcbiAgJ2NlbGxzcGFjaW5nJyxcbiAgJ2NoZWNrZWQnLFxuICAnY2l0ZScsXG4gICdjbGFzcycsXG4gICdjbGVhcicsXG4gICdjb2xvcicsXG4gICdjb2xzJyxcbiAgJ2NvbHNwYW4nLFxuICAnY29udHJvbHMnLFxuICAnY29udHJvbHNsaXN0JyxcbiAgJ2Nvb3JkcycsXG4gICdjcm9zc29yaWdpbicsXG4gICdkYXRldGltZScsXG4gICdkZWNvZGluZycsXG4gICdkZWZhdWx0JyxcbiAgJ2RpcicsXG4gICdkaXNhYmxlZCcsXG4gICdkaXNhYmxlcGljdHVyZWlucGljdHVyZScsXG4gICdkaXNhYmxlcmVtb3RlcGxheWJhY2snLFxuICAnZG93bmxvYWQnLFxuICAnZHJhZ2dhYmxlJyxcbiAgJ2VuY3R5cGUnLFxuICAnZW50ZXJrZXloaW50JyxcbiAgJ2V4cG9ydHBhcnRzJyxcbiAgJ2ZhY2UnLFxuICAnZm9yJyxcbiAgJ2hlYWRlcnMnLFxuICAnaGVpZ2h0JyxcbiAgJ2hpZGRlbicsXG4gICdoaWdoJyxcbiAgJ2hyZWYnLFxuICAnaHJlZmxhbmcnLFxuICAnaWQnLFxuICAnaW5lcnQnLFxuICAnaW5wdXRtb2RlJyxcbiAgJ2ludGVncml0eScsXG4gICdpc21hcCcsXG4gICdraW5kJyxcbiAgJ2xhYmVsJyxcbiAgJ2xhbmcnLFxuICAnbGlzdCcsXG4gICdsb2FkaW5nJyxcbiAgJ2xvb3AnLFxuICAnbG93JyxcbiAgJ21heCcsXG4gICdtYXhsZW5ndGgnLFxuICAnbWVkaWEnLFxuICAnbWV0aG9kJyxcbiAgJ21pbicsXG4gICdtaW5sZW5ndGgnLFxuICAnbXVsdGlwbGUnLFxuICAnbXV0ZWQnLFxuICAnbmFtZScsXG4gICdub25jZScsXG4gICdub3NoYWRlJyxcbiAgJ25vdmFsaWRhdGUnLFxuICAnbm93cmFwJyxcbiAgJ29wZW4nLFxuICAnb3B0aW11bScsXG4gICdwYXJ0JyxcbiAgJ3BhdHRlcm4nLFxuICAncGxhY2Vob2xkZXInLFxuICAncGxheXNpbmxpbmUnLFxuICAncG9wb3ZlcicsXG4gICdwb3BvdmVydGFyZ2V0JyxcbiAgJ3BvcG92ZXJ0YXJnZXRhY3Rpb24nLFxuICAncG9zdGVyJyxcbiAgJ3ByZWxvYWQnLFxuICAncHViZGF0ZScsXG4gICdyYWRpb2dyb3VwJyxcbiAgJ3JlYWRvbmx5JyxcbiAgJ3JlbCcsXG4gICdyZXF1aXJlZCcsXG4gICdyZXYnLFxuICAncmV2ZXJzZWQnLFxuICAncm9sZScsXG4gICdyb3dzJyxcbiAgJ3Jvd3NwYW4nLFxuICAnc3BlbGxjaGVjaycsXG4gICdzY29wZScsXG4gICdzZWxlY3RlZCcsXG4gICdzaGFwZScsXG4gICdzaXplJyxcbiAgJ3NpemVzJyxcbiAgJ3Nsb3QnLFxuICAnc3BhbicsXG4gICdzcmNsYW5nJyxcbiAgJ3N0YXJ0JyxcbiAgJ3NyYycsXG4gICdzcmNzZXQnLFxuICAnc3RlcCcsXG4gICdzdHlsZScsXG4gICdzdW1tYXJ5JyxcbiAgJ3RhYmluZGV4JyxcbiAgJ3RpdGxlJyxcbiAgJ3RyYW5zbGF0ZScsXG4gICd0eXBlJyxcbiAgJ3VzZW1hcCcsXG4gICd2YWxpZ24nLFxuICAndmFsdWUnLFxuICAnd2lkdGgnLFxuICAnd3JhcCcsXG4gICd4bWxucycsXG4gICdzbG90Jyxcbl0gYXMgY29uc3QpO1xuXG5leHBvcnQgY29uc3Qgc3ZnID0gZnJlZXplKFtcbiAgJ2FjY2VudC1oZWlnaHQnLFxuICAnYWNjdW11bGF0ZScsXG4gICdhZGRpdGl2ZScsXG4gICdhbGlnbm1lbnQtYmFzZWxpbmUnLFxuICAnYW1wbGl0dWRlJyxcbiAgJ2FzY2VudCcsXG4gICdhdHRyaWJ1dGVuYW1lJyxcbiAgJ2F0dHJpYnV0ZXR5cGUnLFxuICAnYXppbXV0aCcsXG4gICdiYXNlZnJlcXVlbmN5JyxcbiAgJ2Jhc2VsaW5lLXNoaWZ0JyxcbiAgJ2JlZ2luJyxcbiAgJ2JpYXMnLFxuICAnYnknLFxuICAnY2xhc3MnLFxuICAnY2xpcCcsXG4gICdjbGlwcGF0aHVuaXRzJyxcbiAgJ2NsaXAtcGF0aCcsXG4gICdjbGlwLXJ1bGUnLFxuICAnY29sb3InLFxuICAnY29sb3ItaW50ZXJwb2xhdGlvbicsXG4gICdjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnMnLFxuICAnY29sb3ItcHJvZmlsZScsXG4gICdjb2xvci1yZW5kZXJpbmcnLFxuICAnY3gnLFxuICAnY3knLFxuICAnZCcsXG4gICdkeCcsXG4gICdkeScsXG4gICdkaWZmdXNlY29uc3RhbnQnLFxuICAnZGlyZWN0aW9uJyxcbiAgJ2Rpc3BsYXknLFxuICAnZGl2aXNvcicsXG4gICdkdXInLFxuICAnZWRnZW1vZGUnLFxuICAnZWxldmF0aW9uJyxcbiAgJ2VuZCcsXG4gICdleHBvbmVudCcsXG4gICdmaWxsJyxcbiAgJ2ZpbGwtb3BhY2l0eScsXG4gICdmaWxsLXJ1bGUnLFxuICAnZmlsdGVyJyxcbiAgJ2ZpbHRlcnVuaXRzJyxcbiAgJ2Zsb29kLWNvbG9yJyxcbiAgJ2Zsb29kLW9wYWNpdHknLFxuICAnZm9udC1mYW1pbHknLFxuICAnZm9udC1zaXplJyxcbiAgJ2ZvbnQtc2l6ZS1hZGp1c3QnLFxuICAnZm9udC1zdHJldGNoJyxcbiAgJ2ZvbnQtc3R5bGUnLFxuICAnZm9udC12YXJpYW50JyxcbiAgJ2ZvbnQtd2VpZ2h0JyxcbiAgJ2Z4JyxcbiAgJ2Z5JyxcbiAgJ2cxJyxcbiAgJ2cyJyxcbiAgJ2dseXBoLW5hbWUnLFxuICAnZ2x5cGhyZWYnLFxuICAnZ3JhZGllbnR1bml0cycsXG4gICdncmFkaWVudHRyYW5zZm9ybScsXG4gICdoZWlnaHQnLFxuICAnaHJlZicsXG4gICdpZCcsXG4gICdpbWFnZS1yZW5kZXJpbmcnLFxuICAnaW4nLFxuICAnaW4yJyxcbiAgJ2ludGVyY2VwdCcsXG4gICdrJyxcbiAgJ2sxJyxcbiAgJ2syJyxcbiAgJ2szJyxcbiAgJ2s0JyxcbiAgJ2tlcm5pbmcnLFxuICAna2V5cG9pbnRzJyxcbiAgJ2tleXNwbGluZXMnLFxuICAna2V5dGltZXMnLFxuICAnbGFuZycsXG4gICdsZW5ndGhhZGp1c3QnLFxuICAnbGV0dGVyLXNwYWNpbmcnLFxuICAna2VybmVsbWF0cml4JyxcbiAgJ2tlcm5lbHVuaXRsZW5ndGgnLFxuICAnbGlnaHRpbmctY29sb3InLFxuICAnbG9jYWwnLFxuICAnbWFya2VyLWVuZCcsXG4gICdtYXJrZXItbWlkJyxcbiAgJ21hcmtlci1zdGFydCcsXG4gICdtYXJrZXJoZWlnaHQnLFxuICAnbWFya2VydW5pdHMnLFxuICAnbWFya2Vyd2lkdGgnLFxuICAnbWFza2NvbnRlbnR1bml0cycsXG4gICdtYXNrdW5pdHMnLFxuICAnbWF4JyxcbiAgJ21hc2snLFxuICAnbWFzay10eXBlJyxcbiAgJ21lZGlhJyxcbiAgJ21ldGhvZCcsXG4gICdtb2RlJyxcbiAgJ21pbicsXG4gICduYW1lJyxcbiAgJ251bW9jdGF2ZXMnLFxuICAnb2Zmc2V0JyxcbiAgJ29wZXJhdG9yJyxcbiAgJ29wYWNpdHknLFxuICAnb3JkZXInLFxuICAnb3JpZW50JyxcbiAgJ29yaWVudGF0aW9uJyxcbiAgJ29yaWdpbicsXG4gICdvdmVyZmxvdycsXG4gICdwYWludC1vcmRlcicsXG4gICdwYXRoJyxcbiAgJ3BhdGhsZW5ndGgnLFxuICAncGF0dGVybmNvbnRlbnR1bml0cycsXG4gICdwYXR0ZXJudHJhbnNmb3JtJyxcbiAgJ3BhdHRlcm51bml0cycsXG4gICdwb2ludHMnLFxuICAncHJlc2VydmVhbHBoYScsXG4gICdwcmVzZXJ2ZWFzcGVjdHJhdGlvJyxcbiAgJ3ByaW1pdGl2ZXVuaXRzJyxcbiAgJ3InLFxuICAncngnLFxuICAncnknLFxuICAncmFkaXVzJyxcbiAgJ3JlZngnLFxuICAncmVmeScsXG4gICdyZXBlYXRjb3VudCcsXG4gICdyZXBlYXRkdXInLFxuICAncmVzdGFydCcsXG4gICdyZXN1bHQnLFxuICAncm90YXRlJyxcbiAgJ3NjYWxlJyxcbiAgJ3NlZWQnLFxuICAnc2hhcGUtcmVuZGVyaW5nJyxcbiAgJ3Nsb3BlJyxcbiAgJ3NwZWN1bGFyY29uc3RhbnQnLFxuICAnc3BlY3VsYXJleHBvbmVudCcsXG4gICdzcHJlYWRtZXRob2QnLFxuICAnc3RhcnRvZmZzZXQnLFxuICAnc3RkZGV2aWF0aW9uJyxcbiAgJ3N0aXRjaHRpbGVzJyxcbiAgJ3N0b3AtY29sb3InLFxuICAnc3RvcC1vcGFjaXR5JyxcbiAgJ3N0cm9rZS1kYXNoYXJyYXknLFxuICAnc3Ryb2tlLWRhc2hvZmZzZXQnLFxuICAnc3Ryb2tlLWxpbmVjYXAnLFxuICAnc3Ryb2tlLWxpbmVqb2luJyxcbiAgJ3N0cm9rZS1taXRlcmxpbWl0JyxcbiAgJ3N0cm9rZS1vcGFjaXR5JyxcbiAgJ3N0cm9rZScsXG4gICdzdHJva2Utd2lkdGgnLFxuICAnc3R5bGUnLFxuICAnc3VyZmFjZXNjYWxlJyxcbiAgJ3N5c3RlbWxhbmd1YWdlJyxcbiAgJ3RhYmluZGV4JyxcbiAgJ3RhYmxldmFsdWVzJyxcbiAgJ3RhcmdldHgnLFxuICAndGFyZ2V0eScsXG4gICd0cmFuc2Zvcm0nLFxuICAndHJhbnNmb3JtLW9yaWdpbicsXG4gICd0ZXh0LWFuY2hvcicsXG4gICd0ZXh0LWRlY29yYXRpb24nLFxuICAndGV4dC1yZW5kZXJpbmcnLFxuICAndGV4dGxlbmd0aCcsXG4gICd0eXBlJyxcbiAgJ3UxJyxcbiAgJ3UyJyxcbiAgJ3VuaWNvZGUnLFxuICAndmFsdWVzJyxcbiAgJ3ZpZXdib3gnLFxuICAndmlzaWJpbGl0eScsXG4gICd2ZXJzaW9uJyxcbiAgJ3ZlcnQtYWR2LXknLFxuICAndmVydC1vcmlnaW4teCcsXG4gICd2ZXJ0LW9yaWdpbi15JyxcbiAgJ3dpZHRoJyxcbiAgJ3dvcmQtc3BhY2luZycsXG4gICd3cmFwJyxcbiAgJ3dyaXRpbmctbW9kZScsXG4gICd4Y2hhbm5lbHNlbGVjdG9yJyxcbiAgJ3ljaGFubmVsc2VsZWN0b3InLFxuICAneCcsXG4gICd4MScsXG4gICd4MicsXG4gICd4bWxucycsXG4gICd5JyxcbiAgJ3kxJyxcbiAgJ3kyJyxcbiAgJ3onLFxuICAnem9vbWFuZHBhbicsXG5dIGFzIGNvbnN0KTtcblxuZXhwb3J0IGNvbnN0IG1hdGhNbCA9IGZyZWV6ZShbXG4gICdhY2NlbnQnLFxuICAnYWNjZW50dW5kZXInLFxuICAnYWxpZ24nLFxuICAnYmV2ZWxsZWQnLFxuICAnY2xvc2UnLFxuICAnY29sdW1uc2FsaWduJyxcbiAgJ2NvbHVtbmxpbmVzJyxcbiAgJ2NvbHVtbnNwYW4nLFxuICAnZGVub21hbGlnbicsXG4gICdkZXB0aCcsXG4gICdkaXInLFxuICAnZGlzcGxheScsXG4gICdkaXNwbGF5c3R5bGUnLFxuICAnZW5jb2RpbmcnLFxuICAnZmVuY2UnLFxuICAnZnJhbWUnLFxuICAnaGVpZ2h0JyxcbiAgJ2hyZWYnLFxuICAnaWQnLFxuICAnbGFyZ2VvcCcsXG4gICdsZW5ndGgnLFxuICAnbGluZXRoaWNrbmVzcycsXG4gICdsc3BhY2UnLFxuICAnbHF1b3RlJyxcbiAgJ21hdGhiYWNrZ3JvdW5kJyxcbiAgJ21hdGhjb2xvcicsXG4gICdtYXRoc2l6ZScsXG4gICdtYXRodmFyaWFudCcsXG4gICdtYXhzaXplJyxcbiAgJ21pbnNpemUnLFxuICAnbW92YWJsZWxpbWl0cycsXG4gICdub3RhdGlvbicsXG4gICdudW1hbGlnbicsXG4gICdvcGVuJyxcbiAgJ3Jvd2FsaWduJyxcbiAgJ3Jvd2xpbmVzJyxcbiAgJ3Jvd3NwYWNpbmcnLFxuICAncm93c3BhbicsXG4gICdyc3BhY2UnLFxuICAncnF1b3RlJyxcbiAgJ3NjcmlwdGxldmVsJyxcbiAgJ3NjcmlwdG1pbnNpemUnLFxuICAnc2NyaXB0c2l6ZW11bHRpcGxpZXInLFxuICAnc2VsZWN0aW9uJyxcbiAgJ3NlcGFyYXRvcicsXG4gICdzZXBhcmF0b3JzJyxcbiAgJ3N0cmV0Y2h5JyxcbiAgJ3N1YnNjcmlwdHNoaWZ0JyxcbiAgJ3N1cHNjcmlwdHNoaWZ0JyxcbiAgJ3N5bW1ldHJpYycsXG4gICd2b2Zmc2V0JyxcbiAgJ3dpZHRoJyxcbiAgJ3htbG5zJyxcbl0pO1xuXG5leHBvcnQgY29uc3QgeG1sID0gZnJlZXplKFtcbiAgJ3hsaW5rOmhyZWYnLFxuICAneG1sOmlkJyxcbiAgJ3hsaW5rOnRpdGxlJyxcbiAgJ3htbDpzcGFjZScsXG4gICd4bWxuczp4bGluaycsXG5dIGFzIGNvbnN0KTtcbiIsImltcG9ydCB7IHNlYWwgfSBmcm9tICcuL3V0aWxzLmpzJztcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHVuaWNvcm4vYmV0dGVyLXJlZ2V4XG5leHBvcnQgY29uc3QgTVVTVEFDSEVfRVhQUiA9IHNlYWwoL1xce1xce1tcXHdcXFddKnxbXFx3XFxXXSpcXH1cXH0vZ20pOyAvLyBTcGVjaWZ5IHRlbXBsYXRlIGRldGVjdGlvbiByZWdleCBmb3IgU0FGRV9GT1JfVEVNUExBVEVTIG1vZGVcbmV4cG9ydCBjb25zdCBFUkJfRVhQUiA9IHNlYWwoLzwlW1xcd1xcV10qfFtcXHdcXFddKiU+L2dtKTtcbmV4cG9ydCBjb25zdCBUTVBMSVRfRVhQUiA9IHNlYWwoL1xcJFxce1tcXHdcXFddKi9nbSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgdW5pY29ybi9iZXR0ZXItcmVnZXhcbmV4cG9ydCBjb25zdCBEQVRBX0FUVFIgPSBzZWFsKC9eZGF0YS1bXFwtXFx3LlxcdTAwQjctXFx1RkZGRl0rJC8pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVzZWxlc3MtZXNjYXBlXG5leHBvcnQgY29uc3QgQVJJQV9BVFRSID0gc2VhbCgvXmFyaWEtW1xcLVxcd10rJC8pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVzZWxlc3MtZXNjYXBlXG5leHBvcnQgY29uc3QgSVNfQUxMT1dFRF9VUkkgPSBzZWFsKFxuICAvXig/Oig/Oig/OmZ8aHQpdHBzP3xtYWlsdG98dGVsfGNhbGx0b3xzbXN8Y2lkfHhtcHB8bWF0cml4KTp8W15hLXpdfFthLXorLlxcLV0rKD86W15hLXorLlxcLTpdfCQpKS9pIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdXNlbGVzcy1lc2NhcGVcbik7XG5leHBvcnQgY29uc3QgSVNfU0NSSVBUX09SX0RBVEEgPSBzZWFsKC9eKD86XFx3K3NjcmlwdHxkYXRhKTovaSk7XG5leHBvcnQgY29uc3QgQVRUUl9XSElURVNQQUNFID0gc2VhbChcbiAgL1tcXHUwMDAwLVxcdTAwMjBcXHUwMEEwXFx1MTY4MFxcdTE4MEVcXHUyMDAwLVxcdTIwMjlcXHUyMDVGXFx1MzAwMF0vZyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnRyb2wtcmVnZXhcbik7XG5leHBvcnQgY29uc3QgRE9DVFlQRV9OQU1FID0gc2VhbCgvXmh0bWwkL2kpO1xuZXhwb3J0IGNvbnN0IENVU1RPTV9FTEVNRU5UID0gc2VhbCgvXlthLXpdWy5cXHddKigtWy5cXHddKykrJC9pKTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9pbmRlbnQgKi9cblxuaW1wb3J0IHR5cGUgeyBUcnVzdGVkSFRNTCwgVHJ1c3RlZFR5cGVzV2luZG93IH0gZnJvbSAndHJ1c3RlZC10eXBlcy9saWInO1xuaW1wb3J0IHR5cGUgeyBDb25maWcsIFVzZVByb2ZpbGVzQ29uZmlnIH0gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0ICogYXMgVEFHUyBmcm9tICcuL3RhZ3MuanMnO1xuaW1wb3J0ICogYXMgQVRUUlMgZnJvbSAnLi9hdHRycy5qcyc7XG5pbXBvcnQgKiBhcyBFWFBSRVNTSU9OUyBmcm9tICcuL3JlZ2V4cC5qcyc7XG5pbXBvcnQge1xuICBhZGRUb1NldCxcbiAgY2xvbmUsXG4gIGVudHJpZXMsXG4gIGZyZWV6ZSxcbiAgYXJyYXlGb3JFYWNoLFxuICBhcnJheUxhc3RJbmRleE9mLFxuICBhcnJheVBvcCxcbiAgYXJyYXlQdXNoLFxuICBhcnJheVNwbGljZSxcbiAgc3RyaW5nTWF0Y2gsXG4gIHN0cmluZ1JlcGxhY2UsXG4gIHN0cmluZ1RvTG93ZXJDYXNlLFxuICBzdHJpbmdUb1N0cmluZyxcbiAgc3RyaW5nSW5kZXhPZixcbiAgc3RyaW5nVHJpbSxcbiAgcmVnRXhwVGVzdCxcbiAgdHlwZUVycm9yQ3JlYXRlLFxuICBsb29rdXBHZXR0ZXIsXG4gIGNyZWF0ZSxcbiAgb2JqZWN0SGFzT3duUHJvcGVydHksXG59IGZyb20gJy4vdXRpbHMuanMnO1xuXG5leHBvcnQgdHlwZSB7IENvbmZpZyB9IGZyb20gJy4vY29uZmlnJztcblxuZGVjbGFyZSBjb25zdCBWRVJTSU9OOiBzdHJpbmc7XG5cbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9Ob2RlL25vZGVUeXBlXG5jb25zdCBOT0RFX1RZUEUgPSB7XG4gIGVsZW1lbnQ6IDEsXG4gIGF0dHJpYnV0ZTogMixcbiAgdGV4dDogMyxcbiAgY2RhdGFTZWN0aW9uOiA0LFxuICBlbnRpdHlSZWZlcmVuY2U6IDUsIC8vIERlcHJlY2F0ZWRcbiAgZW50aXR5Tm9kZTogNiwgLy8gRGVwcmVjYXRlZFxuICBwcm9ncmVzc2luZ0luc3RydWN0aW9uOiA3LFxuICBjb21tZW50OiA4LFxuICBkb2N1bWVudDogOSxcbiAgZG9jdW1lbnRUeXBlOiAxMCxcbiAgZG9jdW1lbnRGcmFnbWVudDogMTEsXG4gIG5vdGF0aW9uOiAxMiwgLy8gRGVwcmVjYXRlZFxufTtcblxuY29uc3QgZ2V0R2xvYmFsID0gZnVuY3Rpb24gKCk6IFdpbmRvd0xpa2Uge1xuICByZXR1cm4gdHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgPyBudWxsIDogd2luZG93O1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbm8tb3AgcG9saWN5IGZvciBpbnRlcm5hbCB1c2Ugb25seS5cbiAqIERvbid0IGV4cG9ydCB0aGlzIGZ1bmN0aW9uIG91dHNpZGUgdGhpcyBtb2R1bGUhXG4gKiBAcGFyYW0gdHJ1c3RlZFR5cGVzIFRoZSBwb2xpY3kgZmFjdG9yeS5cbiAqIEBwYXJhbSBwdXJpZnlIb3N0RWxlbWVudCBUaGUgU2NyaXB0IGVsZW1lbnQgdXNlZCB0byBsb2FkIERPTVB1cmlmeSAodG8gZGV0ZXJtaW5lIHBvbGljeSBuYW1lIHN1ZmZpeCkuXG4gKiBAcmV0dXJuIFRoZSBwb2xpY3kgY3JlYXRlZCAob3IgbnVsbCwgaWYgVHJ1c3RlZCBUeXBlc1xuICogYXJlIG5vdCBzdXBwb3J0ZWQgb3IgY3JlYXRpbmcgdGhlIHBvbGljeSBmYWlsZWQpLlxuICovXG5jb25zdCBfY3JlYXRlVHJ1c3RlZFR5cGVzUG9saWN5ID0gZnVuY3Rpb24gKFxuICB0cnVzdGVkVHlwZXM6IFRydXN0ZWRUeXBlUG9saWN5RmFjdG9yeSxcbiAgcHVyaWZ5SG9zdEVsZW1lbnQ6IEhUTUxTY3JpcHRFbGVtZW50XG4pIHtcbiAgaWYgKFxuICAgIHR5cGVvZiB0cnVzdGVkVHlwZXMgIT09ICdvYmplY3QnIHx8XG4gICAgdHlwZW9mIHRydXN0ZWRUeXBlcy5jcmVhdGVQb2xpY3kgIT09ICdmdW5jdGlvbidcbiAgKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBBbGxvdyB0aGUgY2FsbGVycyB0byBjb250cm9sIHRoZSB1bmlxdWUgcG9saWN5IG5hbWVcbiAgLy8gYnkgYWRkaW5nIGEgZGF0YS10dC1wb2xpY3ktc3VmZml4IHRvIHRoZSBzY3JpcHQgZWxlbWVudCB3aXRoIHRoZSBET01QdXJpZnkuXG4gIC8vIFBvbGljeSBjcmVhdGlvbiB3aXRoIGR1cGxpY2F0ZSBuYW1lcyB0aHJvd3MgaW4gVHJ1c3RlZCBUeXBlcy5cbiAgbGV0IHN1ZmZpeCA9IG51bGw7XG4gIGNvbnN0IEFUVFJfTkFNRSA9ICdkYXRhLXR0LXBvbGljeS1zdWZmaXgnO1xuICBpZiAocHVyaWZ5SG9zdEVsZW1lbnQgJiYgcHVyaWZ5SG9zdEVsZW1lbnQuaGFzQXR0cmlidXRlKEFUVFJfTkFNRSkpIHtcbiAgICBzdWZmaXggPSBwdXJpZnlIb3N0RWxlbWVudC5nZXRBdHRyaWJ1dGUoQVRUUl9OQU1FKTtcbiAgfVxuXG4gIGNvbnN0IHBvbGljeU5hbWUgPSAnZG9tcHVyaWZ5JyArIChzdWZmaXggPyAnIycgKyBzdWZmaXggOiAnJyk7XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gdHJ1c3RlZFR5cGVzLmNyZWF0ZVBvbGljeShwb2xpY3lOYW1lLCB7XG4gICAgICBjcmVhdGVIVE1MKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIGh0bWw7XG4gICAgICB9LFxuICAgICAgY3JlYXRlU2NyaXB0VVJMKHNjcmlwdFVybCkge1xuICAgICAgICByZXR1cm4gc2NyaXB0VXJsO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfSBjYXRjaCAoXykge1xuICAgIC8vIFBvbGljeSBjcmVhdGlvbiBmYWlsZWQgKG1vc3QgbGlrZWx5IGFub3RoZXIgRE9NUHVyaWZ5IHNjcmlwdCBoYXNcbiAgICAvLyBhbHJlYWR5IHJ1bikuIFNraXAgY3JlYXRpbmcgdGhlIHBvbGljeSwgYXMgdGhpcyB3aWxsIG9ubHkgY2F1c2UgZXJyb3JzXG4gICAgLy8gaWYgVFQgYXJlIGVuZm9yY2VkLlxuICAgIGNvbnNvbGUud2FybihcbiAgICAgICdUcnVzdGVkVHlwZXMgcG9saWN5ICcgKyBwb2xpY3lOYW1lICsgJyBjb3VsZCBub3QgYmUgY3JlYXRlZC4nXG4gICAgKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuY29uc3QgX2NyZWF0ZUhvb2tzTWFwID0gZnVuY3Rpb24gKCk6IEhvb2tzTWFwIHtcbiAgcmV0dXJuIHtcbiAgICBhZnRlclNhbml0aXplQXR0cmlidXRlczogW10sXG4gICAgYWZ0ZXJTYW5pdGl6ZUVsZW1lbnRzOiBbXSxcbiAgICBhZnRlclNhbml0aXplU2hhZG93RE9NOiBbXSxcbiAgICBiZWZvcmVTYW5pdGl6ZUF0dHJpYnV0ZXM6IFtdLFxuICAgIGJlZm9yZVNhbml0aXplRWxlbWVudHM6IFtdLFxuICAgIGJlZm9yZVNhbml0aXplU2hhZG93RE9NOiBbXSxcbiAgICB1cG9uU2FuaXRpemVBdHRyaWJ1dGU6IFtdLFxuICAgIHVwb25TYW5pdGl6ZUVsZW1lbnQ6IFtdLFxuICAgIHVwb25TYW5pdGl6ZVNoYWRvd05vZGU6IFtdLFxuICB9O1xufTtcblxuZnVuY3Rpb24gY3JlYXRlRE9NUHVyaWZ5KHdpbmRvdzogV2luZG93TGlrZSA9IGdldEdsb2JhbCgpKTogRE9NUHVyaWZ5IHtcbiAgY29uc3QgRE9NUHVyaWZ5OiBET01QdXJpZnkgPSAocm9vdDogV2luZG93TGlrZSkgPT4gY3JlYXRlRE9NUHVyaWZ5KHJvb3QpO1xuXG4gIERPTVB1cmlmeS52ZXJzaW9uID0gVkVSU0lPTjtcblxuICBET01QdXJpZnkucmVtb3ZlZCA9IFtdO1xuXG4gIGlmIChcbiAgICAhd2luZG93IHx8XG4gICAgIXdpbmRvdy5kb2N1bWVudCB8fFxuICAgIHdpbmRvdy5kb2N1bWVudC5ub2RlVHlwZSAhPT0gTk9ERV9UWVBFLmRvY3VtZW50IHx8XG4gICAgIXdpbmRvdy5FbGVtZW50XG4gICkge1xuICAgIC8vIE5vdCBydW5uaW5nIGluIGEgYnJvd3NlciwgcHJvdmlkZSBhIGZhY3RvcnkgZnVuY3Rpb25cbiAgICAvLyBzbyB0aGF0IHlvdSBjYW4gcGFzcyB5b3VyIG93biBXaW5kb3dcbiAgICBET01QdXJpZnkuaXNTdXBwb3J0ZWQgPSBmYWxzZTtcblxuICAgIHJldHVybiBET01QdXJpZnk7XG4gIH1cblxuICBsZXQgeyBkb2N1bWVudCB9ID0gd2luZG93O1xuXG4gIGNvbnN0IG9yaWdpbmFsRG9jdW1lbnQgPSBkb2N1bWVudDtcbiAgY29uc3QgY3VycmVudFNjcmlwdDogSFRNTFNjcmlwdEVsZW1lbnQgPVxuICAgIG9yaWdpbmFsRG9jdW1lbnQuY3VycmVudFNjcmlwdCBhcyBIVE1MU2NyaXB0RWxlbWVudDtcbiAgY29uc3Qge1xuICAgIERvY3VtZW50RnJhZ21lbnQsXG4gICAgSFRNTFRlbXBsYXRlRWxlbWVudCxcbiAgICBOb2RlLFxuICAgIEVsZW1lbnQsXG4gICAgTm9kZUZpbHRlcixcbiAgICBOYW1lZE5vZGVNYXAgPSB3aW5kb3cuTmFtZWROb2RlTWFwIHx8ICh3aW5kb3cgYXMgYW55KS5Nb3pOYW1lZEF0dHJNYXAsXG4gICAgSFRNTEZvcm1FbGVtZW50LFxuICAgIERPTVBhcnNlcixcbiAgICB0cnVzdGVkVHlwZXMsXG4gIH0gPSB3aW5kb3c7XG5cbiAgY29uc3QgRWxlbWVudFByb3RvdHlwZSA9IEVsZW1lbnQucHJvdG90eXBlO1xuXG4gIGNvbnN0IGNsb25lTm9kZSA9IGxvb2t1cEdldHRlcihFbGVtZW50UHJvdG90eXBlLCAnY2xvbmVOb2RlJyk7XG4gIGNvbnN0IHJlbW92ZSA9IGxvb2t1cEdldHRlcihFbGVtZW50UHJvdG90eXBlLCAncmVtb3ZlJyk7XG4gIGNvbnN0IGdldE5leHRTaWJsaW5nID0gbG9va3VwR2V0dGVyKEVsZW1lbnRQcm90b3R5cGUsICduZXh0U2libGluZycpO1xuICBjb25zdCBnZXRDaGlsZE5vZGVzID0gbG9va3VwR2V0dGVyKEVsZW1lbnRQcm90b3R5cGUsICdjaGlsZE5vZGVzJyk7XG4gIGNvbnN0IGdldFBhcmVudE5vZGUgPSBsb29rdXBHZXR0ZXIoRWxlbWVudFByb3RvdHlwZSwgJ3BhcmVudE5vZGUnKTtcblxuICAvLyBBcyBwZXIgaXNzdWUgIzQ3LCB0aGUgd2ViLWNvbXBvbmVudHMgcmVnaXN0cnkgaXMgaW5oZXJpdGVkIGJ5IGFcbiAgLy8gbmV3IGRvY3VtZW50IGNyZWF0ZWQgdmlhIGNyZWF0ZUhUTUxEb2N1bWVudC4gQXMgcGVyIHRoZSBzcGVjXG4gIC8vIChodHRwOi8vdzNjLmdpdGh1Yi5pby93ZWJjb21wb25lbnRzL3NwZWMvY3VzdG9tLyNjcmVhdGluZy1hbmQtcGFzc2luZy1yZWdpc3RyaWVzKVxuICAvLyBhIG5ldyBlbXB0eSByZWdpc3RyeSBpcyB1c2VkIHdoZW4gY3JlYXRpbmcgYSB0ZW1wbGF0ZSBjb250ZW50cyBvd25lclxuICAvLyBkb2N1bWVudCwgc28gd2UgdXNlIHRoYXQgYXMgb3VyIHBhcmVudCBkb2N1bWVudCB0byBlbnN1cmUgbm90aGluZ1xuICAvLyBpcyBpbmhlcml0ZWQuXG4gIGlmICh0eXBlb2YgSFRNTFRlbXBsYXRlRWxlbWVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbiAgICBpZiAodGVtcGxhdGUuY29udGVudCAmJiB0ZW1wbGF0ZS5jb250ZW50Lm93bmVyRG9jdW1lbnQpIHtcbiAgICAgIGRvY3VtZW50ID0gdGVtcGxhdGUuY29udGVudC5vd25lckRvY3VtZW50O1xuICAgIH1cbiAgfVxuXG4gIGxldCB0cnVzdGVkVHlwZXNQb2xpY3k7XG4gIGxldCBlbXB0eUhUTUwgPSAnJztcblxuICBjb25zdCB7XG4gICAgaW1wbGVtZW50YXRpb24sXG4gICAgY3JlYXRlTm9kZUl0ZXJhdG9yLFxuICAgIGNyZWF0ZURvY3VtZW50RnJhZ21lbnQsXG4gICAgZ2V0RWxlbWVudHNCeVRhZ05hbWUsXG4gIH0gPSBkb2N1bWVudDtcbiAgY29uc3QgeyBpbXBvcnROb2RlIH0gPSBvcmlnaW5hbERvY3VtZW50O1xuXG4gIGxldCBob29rcyA9IF9jcmVhdGVIb29rc01hcCgpO1xuXG4gIC8qKlxuICAgKiBFeHBvc2Ugd2hldGhlciB0aGlzIGJyb3dzZXIgc3VwcG9ydHMgcnVubmluZyB0aGUgZnVsbCBET01QdXJpZnkuXG4gICAqL1xuICBET01QdXJpZnkuaXNTdXBwb3J0ZWQgPVxuICAgIHR5cGVvZiBlbnRyaWVzID09PSAnZnVuY3Rpb24nICYmXG4gICAgdHlwZW9mIGdldFBhcmVudE5vZGUgPT09ICdmdW5jdGlvbicgJiZcbiAgICBpbXBsZW1lbnRhdGlvbiAmJlxuICAgIGltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudCAhPT0gdW5kZWZpbmVkO1xuXG4gIGNvbnN0IHtcbiAgICBNVVNUQUNIRV9FWFBSLFxuICAgIEVSQl9FWFBSLFxuICAgIFRNUExJVF9FWFBSLFxuICAgIERBVEFfQVRUUixcbiAgICBBUklBX0FUVFIsXG4gICAgSVNfU0NSSVBUX09SX0RBVEEsXG4gICAgQVRUUl9XSElURVNQQUNFLFxuICAgIENVU1RPTV9FTEVNRU5ULFxuICB9ID0gRVhQUkVTU0lPTlM7XG5cbiAgbGV0IHsgSVNfQUxMT1dFRF9VUkkgfSA9IEVYUFJFU1NJT05TO1xuXG4gIC8qKlxuICAgKiBXZSBjb25zaWRlciB0aGUgZWxlbWVudHMgYW5kIGF0dHJpYnV0ZXMgYmVsb3cgdG8gYmUgc2FmZS4gSWRlYWxseVxuICAgKiBkb24ndCBhZGQgYW55IG5ldyBvbmVzIGJ1dCBmZWVsIGZyZWUgdG8gcmVtb3ZlIHVud2FudGVkIG9uZXMuXG4gICAqL1xuXG4gIC8qIGFsbG93ZWQgZWxlbWVudCBuYW1lcyAqL1xuICBsZXQgQUxMT1dFRF9UQUdTID0gbnVsbDtcbiAgY29uc3QgREVGQVVMVF9BTExPV0VEX1RBR1MgPSBhZGRUb1NldCh7fSwgW1xuICAgIC4uLlRBR1MuaHRtbCxcbiAgICAuLi5UQUdTLnN2ZyxcbiAgICAuLi5UQUdTLnN2Z0ZpbHRlcnMsXG4gICAgLi4uVEFHUy5tYXRoTWwsXG4gICAgLi4uVEFHUy50ZXh0LFxuICBdKTtcblxuICAvKiBBbGxvd2VkIGF0dHJpYnV0ZSBuYW1lcyAqL1xuICBsZXQgQUxMT1dFRF9BVFRSID0gbnVsbDtcbiAgY29uc3QgREVGQVVMVF9BTExPV0VEX0FUVFIgPSBhZGRUb1NldCh7fSwgW1xuICAgIC4uLkFUVFJTLmh0bWwsXG4gICAgLi4uQVRUUlMuc3ZnLFxuICAgIC4uLkFUVFJTLm1hdGhNbCxcbiAgICAuLi5BVFRSUy54bWwsXG4gIF0pO1xuXG4gIC8qXG4gICAqIENvbmZpZ3VyZSBob3cgRE9NUHVyaWZ5IHNob3VsZCBoYW5kbGUgY3VzdG9tIGVsZW1lbnRzIGFuZCB0aGVpciBhdHRyaWJ1dGVzIGFzIHdlbGwgYXMgY3VzdG9taXplZCBidWlsdC1pbiBlbGVtZW50cy5cbiAgICogQHByb3BlcnR5IHtSZWdFeHB8RnVuY3Rpb258bnVsbH0gdGFnTmFtZUNoZWNrIG9uZSBvZiBbbnVsbCwgcmVnZXhQYXR0ZXJuLCBwcmVkaWNhdGVdLiBEZWZhdWx0OiBgbnVsbGAgKGRpc2FsbG93IGFueSBjdXN0b20gZWxlbWVudHMpXG4gICAqIEBwcm9wZXJ0eSB7UmVnRXhwfEZ1bmN0aW9ufG51bGx9IGF0dHJpYnV0ZU5hbWVDaGVjayBvbmUgb2YgW251bGwsIHJlZ2V4UGF0dGVybiwgcHJlZGljYXRlXS4gRGVmYXVsdDogYG51bGxgIChkaXNhbGxvdyBhbnkgYXR0cmlidXRlcyBub3Qgb24gdGhlIGFsbG93IGxpc3QpXG4gICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gYWxsb3dDdXN0b21pemVkQnVpbHRJbkVsZW1lbnRzIGFsbG93IGN1c3RvbSBlbGVtZW50cyBkZXJpdmVkIGZyb20gYnVpbHQtaW5zIGlmIHRoZXkgcGFzcyBDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2suIERlZmF1bHQ6IGBmYWxzZWAuXG4gICAqL1xuICBsZXQgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcgPSBPYmplY3Quc2VhbChcbiAgICBjcmVhdGUobnVsbCwge1xuICAgICAgdGFnTmFtZUNoZWNrOiB7XG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogbnVsbCxcbiAgICAgIH0sXG4gICAgICBhdHRyaWJ1dGVOYW1lQ2hlY2s6IHtcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiBudWxsLFxuICAgICAgfSxcbiAgICAgIGFsbG93Q3VzdG9taXplZEJ1aWx0SW5FbGVtZW50czoge1xuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IGZhbHNlLFxuICAgICAgfSxcbiAgICB9KVxuICApO1xuXG4gIC8qIEV4cGxpY2l0bHkgZm9yYmlkZGVuIHRhZ3MgKG92ZXJyaWRlcyBBTExPV0VEX1RBR1MvQUREX1RBR1MpICovXG4gIGxldCBGT1JCSURfVEFHUyA9IG51bGw7XG5cbiAgLyogRXhwbGljaXRseSBmb3JiaWRkZW4gYXR0cmlidXRlcyAob3ZlcnJpZGVzIEFMTE9XRURfQVRUUi9BRERfQVRUUikgKi9cbiAgbGV0IEZPUkJJRF9BVFRSID0gbnVsbDtcblxuICAvKiBDb25maWcgb2JqZWN0IHRvIHN0b3JlIEFERF9UQUdTL0FERF9BVFRSIGZ1bmN0aW9ucyAod2hlbiB1c2VkIGFzIGZ1bmN0aW9ucykgKi9cbiAgY29uc3QgRVhUUkFfRUxFTUVOVF9IQU5ETElORyA9IE9iamVjdC5zZWFsKFxuICAgIGNyZWF0ZShudWxsLCB7XG4gICAgICB0YWdDaGVjazoge1xuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IG51bGwsXG4gICAgICB9LFxuICAgICAgYXR0cmlidXRlQ2hlY2s6IHtcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiBudWxsLFxuICAgICAgfSxcbiAgICB9KVxuICApO1xuXG4gIC8qIERlY2lkZSBpZiBBUklBIGF0dHJpYnV0ZXMgYXJlIG9rYXkgKi9cbiAgbGV0IEFMTE9XX0FSSUFfQVRUUiA9IHRydWU7XG5cbiAgLyogRGVjaWRlIGlmIGN1c3RvbSBkYXRhIGF0dHJpYnV0ZXMgYXJlIG9rYXkgKi9cbiAgbGV0IEFMTE9XX0RBVEFfQVRUUiA9IHRydWU7XG5cbiAgLyogRGVjaWRlIGlmIHVua25vd24gcHJvdG9jb2xzIGFyZSBva2F5ICovXG4gIGxldCBBTExPV19VTktOT1dOX1BST1RPQ09MUyA9IGZhbHNlO1xuXG4gIC8qIERlY2lkZSBpZiBzZWxmLWNsb3NpbmcgdGFncyBpbiBhdHRyaWJ1dGVzIGFyZSBhbGxvd2VkLlxuICAgKiBVc3VhbGx5IHJlbW92ZWQgZHVlIHRvIGEgbVhTUyBpc3N1ZSBpbiBqUXVlcnkgMy4wICovXG4gIGxldCBBTExPV19TRUxGX0NMT1NFX0lOX0FUVFIgPSB0cnVlO1xuXG4gIC8qIE91dHB1dCBzaG91bGQgYmUgc2FmZSBmb3IgY29tbW9uIHRlbXBsYXRlIGVuZ2luZXMuXG4gICAqIFRoaXMgbWVhbnMsIERPTVB1cmlmeSByZW1vdmVzIGRhdGEgYXR0cmlidXRlcywgbXVzdGFjaGVzIGFuZCBFUkJcbiAgICovXG4gIGxldCBTQUZFX0ZPUl9URU1QTEFURVMgPSBmYWxzZTtcblxuICAvKiBPdXRwdXQgc2hvdWxkIGJlIHNhZmUgZXZlbiBmb3IgWE1MIHVzZWQgd2l0aGluIEhUTUwgYW5kIGFsaWtlLlxuICAgKiBUaGlzIG1lYW5zLCBET01QdXJpZnkgcmVtb3ZlcyBjb21tZW50cyB3aGVuIGNvbnRhaW5pbmcgcmlza3kgY29udGVudC5cbiAgICovXG4gIGxldCBTQUZFX0ZPUl9YTUwgPSB0cnVlO1xuXG4gIC8qIERlY2lkZSBpZiBkb2N1bWVudCB3aXRoIDxodG1sPi4uLiBzaG91bGQgYmUgcmV0dXJuZWQgKi9cbiAgbGV0IFdIT0xFX0RPQ1VNRU5UID0gZmFsc2U7XG5cbiAgLyogVHJhY2sgd2hldGhlciBjb25maWcgaXMgYWxyZWFkeSBzZXQgb24gdGhpcyBpbnN0YW5jZSBvZiBET01QdXJpZnkuICovXG4gIGxldCBTRVRfQ09ORklHID0gZmFsc2U7XG5cbiAgLyogRGVjaWRlIGlmIGFsbCBlbGVtZW50cyAoZS5nLiBzdHlsZSwgc2NyaXB0KSBtdXN0IGJlIGNoaWxkcmVuIG9mXG4gICAqIGRvY3VtZW50LmJvZHkuIEJ5IGRlZmF1bHQsIGJyb3dzZXJzIG1pZ2h0IG1vdmUgdGhlbSB0byBkb2N1bWVudC5oZWFkICovXG4gIGxldCBGT1JDRV9CT0RZID0gZmFsc2U7XG5cbiAgLyogRGVjaWRlIGlmIGEgRE9NIGBIVE1MQm9keUVsZW1lbnRgIHNob3VsZCBiZSByZXR1cm5lZCwgaW5zdGVhZCBvZiBhIGh0bWxcbiAgICogc3RyaW5nIChvciBhIFRydXN0ZWRIVE1MIG9iamVjdCBpZiBUcnVzdGVkIFR5cGVzIGFyZSBzdXBwb3J0ZWQpLlxuICAgKiBJZiBgV0hPTEVfRE9DVU1FTlRgIGlzIGVuYWJsZWQgYSBgSFRNTEh0bWxFbGVtZW50YCB3aWxsIGJlIHJldHVybmVkIGluc3RlYWRcbiAgICovXG4gIGxldCBSRVRVUk5fRE9NID0gZmFsc2U7XG5cbiAgLyogRGVjaWRlIGlmIGEgRE9NIGBEb2N1bWVudEZyYWdtZW50YCBzaG91bGQgYmUgcmV0dXJuZWQsIGluc3RlYWQgb2YgYSBodG1sXG4gICAqIHN0cmluZyAgKG9yIGEgVHJ1c3RlZEhUTUwgb2JqZWN0IGlmIFRydXN0ZWQgVHlwZXMgYXJlIHN1cHBvcnRlZCkgKi9cbiAgbGV0IFJFVFVSTl9ET01fRlJBR01FTlQgPSBmYWxzZTtcblxuICAvKiBUcnkgdG8gcmV0dXJuIGEgVHJ1c3RlZCBUeXBlIG9iamVjdCBpbnN0ZWFkIG9mIGEgc3RyaW5nLCByZXR1cm4gYSBzdHJpbmcgaW5cbiAgICogY2FzZSBUcnVzdGVkIFR5cGVzIGFyZSBub3Qgc3VwcG9ydGVkICAqL1xuICBsZXQgUkVUVVJOX1RSVVNURURfVFlQRSA9IGZhbHNlO1xuXG4gIC8qIE91dHB1dCBzaG91bGQgYmUgZnJlZSBmcm9tIERPTSBjbG9iYmVyaW5nIGF0dGFja3M/XG4gICAqIFRoaXMgc2FuaXRpemVzIG1hcmt1cHMgbmFtZWQgd2l0aCBjb2xsaWRpbmcsIGNsb2JiZXJhYmxlIGJ1aWx0LWluIERPTSBBUElzLlxuICAgKi9cbiAgbGV0IFNBTklUSVpFX0RPTSA9IHRydWU7XG5cbiAgLyogQWNoaWV2ZSBmdWxsIERPTSBDbG9iYmVyaW5nIHByb3RlY3Rpb24gYnkgaXNvbGF0aW5nIHRoZSBuYW1lc3BhY2Ugb2YgbmFtZWRcbiAgICogcHJvcGVydGllcyBhbmQgSlMgdmFyaWFibGVzLCBtaXRpZ2F0aW5nIGF0dGFja3MgdGhhdCBhYnVzZSB0aGUgSFRNTC9ET00gc3BlYyBydWxlcy5cbiAgICpcbiAgICogSFRNTC9ET00gc3BlYyBydWxlcyB0aGF0IGVuYWJsZSBET00gQ2xvYmJlcmluZzpcbiAgICogICAtIE5hbWVkIEFjY2VzcyBvbiBXaW5kb3cgKMKnNy4zLjMpXG4gICAqICAgLSBET00gVHJlZSBBY2Nlc3NvcnMgKMKnMy4xLjUpXG4gICAqICAgLSBGb3JtIEVsZW1lbnQgUGFyZW50LUNoaWxkIFJlbGF0aW9ucyAowqc0LjEwLjMpXG4gICAqICAgLSBJZnJhbWUgc3JjZG9jIC8gTmVzdGVkIFdpbmRvd1Byb3hpZXMgKMKnNC44LjUpXG4gICAqICAgLSBIVE1MQ29sbGVjdGlvbiAowqc0LjIuMTAuMilcbiAgICpcbiAgICogTmFtZXNwYWNlIGlzb2xhdGlvbiBpcyBpbXBsZW1lbnRlZCBieSBwcmVmaXhpbmcgYGlkYCBhbmQgYG5hbWVgIGF0dHJpYnV0ZXNcbiAgICogd2l0aCBhIGNvbnN0YW50IHN0cmluZywgaS5lLiwgYHVzZXItY29udGVudC1gXG4gICAqL1xuICBsZXQgU0FOSVRJWkVfTkFNRURfUFJPUFMgPSBmYWxzZTtcbiAgY29uc3QgU0FOSVRJWkVfTkFNRURfUFJPUFNfUFJFRklYID0gJ3VzZXItY29udGVudC0nO1xuXG4gIC8qIEtlZXAgZWxlbWVudCBjb250ZW50IHdoZW4gcmVtb3ZpbmcgZWxlbWVudD8gKi9cbiAgbGV0IEtFRVBfQ09OVEVOVCA9IHRydWU7XG5cbiAgLyogSWYgYSBgTm9kZWAgaXMgcGFzc2VkIHRvIHNhbml0aXplKCksIHRoZW4gcGVyZm9ybXMgc2FuaXRpemF0aW9uIGluLXBsYWNlIGluc3RlYWRcbiAgICogb2YgaW1wb3J0aW5nIGl0IGludG8gYSBuZXcgRG9jdW1lbnQgYW5kIHJldHVybmluZyBhIHNhbml0aXplZCBjb3B5ICovXG4gIGxldCBJTl9QTEFDRSA9IGZhbHNlO1xuXG4gIC8qIEFsbG93IHVzYWdlIG9mIHByb2ZpbGVzIGxpa2UgaHRtbCwgc3ZnIGFuZCBtYXRoTWwgKi9cbiAgbGV0IFVTRV9QUk9GSUxFUzogVXNlUHJvZmlsZXNDb25maWcgfCBmYWxzZSA9IHt9O1xuXG4gIC8qIFRhZ3MgdG8gaWdub3JlIGNvbnRlbnQgb2Ygd2hlbiBLRUVQX0NPTlRFTlQgaXMgdHJ1ZSAqL1xuICBsZXQgRk9SQklEX0NPTlRFTlRTID0gbnVsbDtcbiAgY29uc3QgREVGQVVMVF9GT1JCSURfQ09OVEVOVFMgPSBhZGRUb1NldCh7fSwgW1xuICAgICdhbm5vdGF0aW9uLXhtbCcsXG4gICAgJ2F1ZGlvJyxcbiAgICAnY29sZ3JvdXAnLFxuICAgICdkZXNjJyxcbiAgICAnZm9yZWlnbm9iamVjdCcsXG4gICAgJ2hlYWQnLFxuICAgICdpZnJhbWUnLFxuICAgICdtYXRoJyxcbiAgICAnbWknLFxuICAgICdtbicsXG4gICAgJ21vJyxcbiAgICAnbXMnLFxuICAgICdtdGV4dCcsXG4gICAgJ25vZW1iZWQnLFxuICAgICdub2ZyYW1lcycsXG4gICAgJ25vc2NyaXB0JyxcbiAgICAncGxhaW50ZXh0JyxcbiAgICAnc2NyaXB0JyxcbiAgICAnc3R5bGUnLFxuICAgICdzdmcnLFxuICAgICd0ZW1wbGF0ZScsXG4gICAgJ3RoZWFkJyxcbiAgICAndGl0bGUnLFxuICAgICd2aWRlbycsXG4gICAgJ3htcCcsXG4gIF0pO1xuXG4gIC8qIFRhZ3MgdGhhdCBhcmUgc2FmZSBmb3IgZGF0YTogVVJJcyAqL1xuICBsZXQgREFUQV9VUklfVEFHUyA9IG51bGw7XG4gIGNvbnN0IERFRkFVTFRfREFUQV9VUklfVEFHUyA9IGFkZFRvU2V0KHt9LCBbXG4gICAgJ2F1ZGlvJyxcbiAgICAndmlkZW8nLFxuICAgICdpbWcnLFxuICAgICdzb3VyY2UnLFxuICAgICdpbWFnZScsXG4gICAgJ3RyYWNrJyxcbiAgXSk7XG5cbiAgLyogQXR0cmlidXRlcyBzYWZlIGZvciB2YWx1ZXMgbGlrZSBcImphdmFzY3JpcHQ6XCIgKi9cbiAgbGV0IFVSSV9TQUZFX0FUVFJJQlVURVMgPSBudWxsO1xuICBjb25zdCBERUZBVUxUX1VSSV9TQUZFX0FUVFJJQlVURVMgPSBhZGRUb1NldCh7fSwgW1xuICAgICdhbHQnLFxuICAgICdjbGFzcycsXG4gICAgJ2ZvcicsXG4gICAgJ2lkJyxcbiAgICAnbGFiZWwnLFxuICAgICduYW1lJyxcbiAgICAncGF0dGVybicsXG4gICAgJ3BsYWNlaG9sZGVyJyxcbiAgICAncm9sZScsXG4gICAgJ3N1bW1hcnknLFxuICAgICd0aXRsZScsXG4gICAgJ3ZhbHVlJyxcbiAgICAnc3R5bGUnLFxuICAgICd4bWxucycsXG4gIF0pO1xuXG4gIGNvbnN0IE1BVEhNTF9OQU1FU1BBQ0UgPSAnaHR0cDovL3d3dy53My5vcmcvMTk5OC9NYXRoL01hdGhNTCc7XG4gIGNvbnN0IFNWR19OQU1FU1BBQ0UgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnO1xuICBjb25zdCBIVE1MX05BTUVTUEFDRSA9ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sJztcbiAgLyogRG9jdW1lbnQgbmFtZXNwYWNlICovXG4gIGxldCBOQU1FU1BBQ0UgPSBIVE1MX05BTUVTUEFDRTtcbiAgbGV0IElTX0VNUFRZX0lOUFVUID0gZmFsc2U7XG5cbiAgLyogQWxsb3dlZCBYSFRNTCtYTUwgbmFtZXNwYWNlcyAqL1xuICBsZXQgQUxMT1dFRF9OQU1FU1BBQ0VTID0gbnVsbDtcbiAgY29uc3QgREVGQVVMVF9BTExPV0VEX05BTUVTUEFDRVMgPSBhZGRUb1NldChcbiAgICB7fSxcbiAgICBbTUFUSE1MX05BTUVTUEFDRSwgU1ZHX05BTUVTUEFDRSwgSFRNTF9OQU1FU1BBQ0VdLFxuICAgIHN0cmluZ1RvU3RyaW5nXG4gICk7XG5cbiAgbGV0IE1BVEhNTF9URVhUX0lOVEVHUkFUSU9OX1BPSU5UUyA9IGFkZFRvU2V0KHt9LCBbXG4gICAgJ21pJyxcbiAgICAnbW8nLFxuICAgICdtbicsXG4gICAgJ21zJyxcbiAgICAnbXRleHQnLFxuICBdKTtcblxuICBsZXQgSFRNTF9JTlRFR1JBVElPTl9QT0lOVFMgPSBhZGRUb1NldCh7fSwgWydhbm5vdGF0aW9uLXhtbCddKTtcblxuICAvLyBDZXJ0YWluIGVsZW1lbnRzIGFyZSBhbGxvd2VkIGluIGJvdGggU1ZHIGFuZCBIVE1MXG4gIC8vIG5hbWVzcGFjZS4gV2UgbmVlZCB0byBzcGVjaWZ5IHRoZW0gZXhwbGljaXRseVxuICAvLyBzbyB0aGF0IHRoZXkgZG9uJ3QgZ2V0IGVycm9uZW91c2x5IGRlbGV0ZWQgZnJvbVxuICAvLyBIVE1MIG5hbWVzcGFjZS5cbiAgY29uc3QgQ09NTU9OX1NWR19BTkRfSFRNTF9FTEVNRU5UUyA9IGFkZFRvU2V0KHt9LCBbXG4gICAgJ3RpdGxlJyxcbiAgICAnc3R5bGUnLFxuICAgICdmb250JyxcbiAgICAnYScsXG4gICAgJ3NjcmlwdCcsXG4gIF0pO1xuXG4gIC8qIFBhcnNpbmcgb2Ygc3RyaWN0IFhIVE1MIGRvY3VtZW50cyAqL1xuICBsZXQgUEFSU0VSX01FRElBX1RZUEU6IG51bGwgfCBET01QYXJzZXJTdXBwb3J0ZWRUeXBlID0gbnVsbDtcbiAgY29uc3QgU1VQUE9SVEVEX1BBUlNFUl9NRURJQV9UWVBFUyA9IFsnYXBwbGljYXRpb24veGh0bWwreG1sJywgJ3RleHQvaHRtbCddO1xuICBjb25zdCBERUZBVUxUX1BBUlNFUl9NRURJQV9UWVBFID0gJ3RleHQvaHRtbCc7XG4gIGxldCB0cmFuc2Zvcm1DYXNlRnVuYzogbnVsbCB8IFBhcmFtZXRlcnM8dHlwZW9mIGFkZFRvU2V0PlsyXSA9IG51bGw7XG5cbiAgLyogS2VlcCBhIHJlZmVyZW5jZSB0byBjb25maWcgdG8gcGFzcyB0byBob29rcyAqL1xuICBsZXQgQ09ORklHOiBDb25maWcgfCBudWxsID0gbnVsbDtcblxuICAvKiBJZGVhbGx5LCBkbyBub3QgdG91Y2ggYW55dGhpbmcgYmVsb3cgdGhpcyBsaW5lICovXG4gIC8qIF9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX18gKi9cblxuICBjb25zdCBmb3JtRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcblxuICBjb25zdCBpc1JlZ2V4T3JGdW5jdGlvbiA9IGZ1bmN0aW9uIChcbiAgICB0ZXN0VmFsdWU6IHVua25vd25cbiAgKTogdGVzdFZhbHVlIGlzIEZ1bmN0aW9uIHwgUmVnRXhwIHtcbiAgICByZXR1cm4gdGVzdFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwIHx8IHRlc3RWYWx1ZSBpbnN0YW5jZW9mIEZ1bmN0aW9uO1xuICB9O1xuXG4gIC8qKlxuICAgKiBfcGFyc2VDb25maWdcbiAgICpcbiAgICogQHBhcmFtIGNmZyBvcHRpb25hbCBjb25maWcgbGl0ZXJhbFxuICAgKi9cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbXBsZXhpdHlcbiAgY29uc3QgX3BhcnNlQ29uZmlnID0gZnVuY3Rpb24gKGNmZzogQ29uZmlnID0ge30pOiB2b2lkIHtcbiAgICBpZiAoQ09ORklHICYmIENPTkZJRyA9PT0gY2ZnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLyogU2hpZWxkIGNvbmZpZ3VyYXRpb24gb2JqZWN0IGZyb20gdGFtcGVyaW5nICovXG4gICAgaWYgKCFjZmcgfHwgdHlwZW9mIGNmZyAhPT0gJ29iamVjdCcpIHtcbiAgICAgIGNmZyA9IHt9O1xuICAgIH1cblxuICAgIC8qIFNoaWVsZCBjb25maWd1cmF0aW9uIG9iamVjdCBmcm9tIHByb3RvdHlwZSBwb2xsdXRpb24gKi9cbiAgICBjZmcgPSBjbG9uZShjZmcpO1xuXG4gICAgUEFSU0VSX01FRElBX1RZUEUgPVxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHVuaWNvcm4vcHJlZmVyLWluY2x1ZGVzXG4gICAgICBTVVBQT1JURURfUEFSU0VSX01FRElBX1RZUEVTLmluZGV4T2YoY2ZnLlBBUlNFUl9NRURJQV9UWVBFKSA9PT0gLTFcbiAgICAgICAgPyBERUZBVUxUX1BBUlNFUl9NRURJQV9UWVBFXG4gICAgICAgIDogY2ZnLlBBUlNFUl9NRURJQV9UWVBFO1xuXG4gICAgLy8gSFRNTCB0YWdzIGFuZCBhdHRyaWJ1dGVzIGFyZSBub3QgY2FzZS1zZW5zaXRpdmUsIGNvbnZlcnRpbmcgdG8gbG93ZXJjYXNlLiBLZWVwaW5nIFhIVE1MIGFzIGlzLlxuICAgIHRyYW5zZm9ybUNhc2VGdW5jID1cbiAgICAgIFBBUlNFUl9NRURJQV9UWVBFID09PSAnYXBwbGljYXRpb24veGh0bWwreG1sJ1xuICAgICAgICA/IHN0cmluZ1RvU3RyaW5nXG4gICAgICAgIDogc3RyaW5nVG9Mb3dlckNhc2U7XG5cbiAgICAvKiBTZXQgY29uZmlndXJhdGlvbiBwYXJhbWV0ZXJzICovXG4gICAgQUxMT1dFRF9UQUdTID0gb2JqZWN0SGFzT3duUHJvcGVydHkoY2ZnLCAnQUxMT1dFRF9UQUdTJylcbiAgICAgID8gYWRkVG9TZXQoe30sIGNmZy5BTExPV0VEX1RBR1MsIHRyYW5zZm9ybUNhc2VGdW5jKVxuICAgICAgOiBERUZBVUxUX0FMTE9XRURfVEFHUztcbiAgICBBTExPV0VEX0FUVFIgPSBvYmplY3RIYXNPd25Qcm9wZXJ0eShjZmcsICdBTExPV0VEX0FUVFInKVxuICAgICAgPyBhZGRUb1NldCh7fSwgY2ZnLkFMTE9XRURfQVRUUiwgdHJhbnNmb3JtQ2FzZUZ1bmMpXG4gICAgICA6IERFRkFVTFRfQUxMT1dFRF9BVFRSO1xuICAgIEFMTE9XRURfTkFNRVNQQUNFUyA9IG9iamVjdEhhc093blByb3BlcnR5KGNmZywgJ0FMTE9XRURfTkFNRVNQQUNFUycpXG4gICAgICA/IGFkZFRvU2V0KHt9LCBjZmcuQUxMT1dFRF9OQU1FU1BBQ0VTLCBzdHJpbmdUb1N0cmluZylcbiAgICAgIDogREVGQVVMVF9BTExPV0VEX05BTUVTUEFDRVM7XG4gICAgVVJJX1NBRkVfQVRUUklCVVRFUyA9IG9iamVjdEhhc093blByb3BlcnR5KGNmZywgJ0FERF9VUklfU0FGRV9BVFRSJylcbiAgICAgID8gYWRkVG9TZXQoXG4gICAgICAgICAgY2xvbmUoREVGQVVMVF9VUklfU0FGRV9BVFRSSUJVVEVTKSxcbiAgICAgICAgICBjZmcuQUREX1VSSV9TQUZFX0FUVFIsXG4gICAgICAgICAgdHJhbnNmb3JtQ2FzZUZ1bmNcbiAgICAgICAgKVxuICAgICAgOiBERUZBVUxUX1VSSV9TQUZFX0FUVFJJQlVURVM7XG4gICAgREFUQV9VUklfVEFHUyA9IG9iamVjdEhhc093blByb3BlcnR5KGNmZywgJ0FERF9EQVRBX1VSSV9UQUdTJylcbiAgICAgID8gYWRkVG9TZXQoXG4gICAgICAgICAgY2xvbmUoREVGQVVMVF9EQVRBX1VSSV9UQUdTKSxcbiAgICAgICAgICBjZmcuQUREX0RBVEFfVVJJX1RBR1MsXG4gICAgICAgICAgdHJhbnNmb3JtQ2FzZUZ1bmNcbiAgICAgICAgKVxuICAgICAgOiBERUZBVUxUX0RBVEFfVVJJX1RBR1M7XG4gICAgRk9SQklEX0NPTlRFTlRTID0gb2JqZWN0SGFzT3duUHJvcGVydHkoY2ZnLCAnRk9SQklEX0NPTlRFTlRTJylcbiAgICAgID8gYWRkVG9TZXQoe30sIGNmZy5GT1JCSURfQ09OVEVOVFMsIHRyYW5zZm9ybUNhc2VGdW5jKVxuICAgICAgOiBERUZBVUxUX0ZPUkJJRF9DT05URU5UUztcbiAgICBGT1JCSURfVEFHUyA9IG9iamVjdEhhc093blByb3BlcnR5KGNmZywgJ0ZPUkJJRF9UQUdTJylcbiAgICAgID8gYWRkVG9TZXQoe30sIGNmZy5GT1JCSURfVEFHUywgdHJhbnNmb3JtQ2FzZUZ1bmMpXG4gICAgICA6IGNsb25lKHt9KTtcbiAgICBGT1JCSURfQVRUUiA9IG9iamVjdEhhc093blByb3BlcnR5KGNmZywgJ0ZPUkJJRF9BVFRSJylcbiAgICAgID8gYWRkVG9TZXQoe30sIGNmZy5GT1JCSURfQVRUUiwgdHJhbnNmb3JtQ2FzZUZ1bmMpXG4gICAgICA6IGNsb25lKHt9KTtcbiAgICBVU0VfUFJPRklMRVMgPSBvYmplY3RIYXNPd25Qcm9wZXJ0eShjZmcsICdVU0VfUFJPRklMRVMnKVxuICAgICAgPyBjZmcuVVNFX1BST0ZJTEVTXG4gICAgICA6IGZhbHNlO1xuICAgIEFMTE9XX0FSSUFfQVRUUiA9IGNmZy5BTExPV19BUklBX0FUVFIgIT09IGZhbHNlOyAvLyBEZWZhdWx0IHRydWVcbiAgICBBTExPV19EQVRBX0FUVFIgPSBjZmcuQUxMT1dfREFUQV9BVFRSICE9PSBmYWxzZTsgLy8gRGVmYXVsdCB0cnVlXG4gICAgQUxMT1dfVU5LTk9XTl9QUk9UT0NPTFMgPSBjZmcuQUxMT1dfVU5LTk9XTl9QUk9UT0NPTFMgfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcbiAgICBBTExPV19TRUxGX0NMT1NFX0lOX0FUVFIgPSBjZmcuQUxMT1dfU0VMRl9DTE9TRV9JTl9BVFRSICE9PSBmYWxzZTsgLy8gRGVmYXVsdCB0cnVlXG4gICAgU0FGRV9GT1JfVEVNUExBVEVTID0gY2ZnLlNBRkVfRk9SX1RFTVBMQVRFUyB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuICAgIFNBRkVfRk9SX1hNTCA9IGNmZy5TQUZFX0ZPUl9YTUwgIT09IGZhbHNlOyAvLyBEZWZhdWx0IHRydWVcbiAgICBXSE9MRV9ET0NVTUVOVCA9IGNmZy5XSE9MRV9ET0NVTUVOVCB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuICAgIFJFVFVSTl9ET00gPSBjZmcuUkVUVVJOX0RPTSB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuICAgIFJFVFVSTl9ET01fRlJBR01FTlQgPSBjZmcuUkVUVVJOX0RPTV9GUkFHTUVOVCB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuICAgIFJFVFVSTl9UUlVTVEVEX1RZUEUgPSBjZmcuUkVUVVJOX1RSVVNURURfVFlQRSB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuICAgIEZPUkNFX0JPRFkgPSBjZmcuRk9SQ0VfQk9EWSB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuICAgIFNBTklUSVpFX0RPTSA9IGNmZy5TQU5JVElaRV9ET00gIT09IGZhbHNlOyAvLyBEZWZhdWx0IHRydWVcbiAgICBTQU5JVElaRV9OQU1FRF9QUk9QUyA9IGNmZy5TQU5JVElaRV9OQU1FRF9QUk9QUyB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuICAgIEtFRVBfQ09OVEVOVCA9IGNmZy5LRUVQX0NPTlRFTlQgIT09IGZhbHNlOyAvLyBEZWZhdWx0IHRydWVcbiAgICBJTl9QTEFDRSA9IGNmZy5JTl9QTEFDRSB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuICAgIElTX0FMTE9XRURfVVJJID0gY2ZnLkFMTE9XRURfVVJJX1JFR0VYUCB8fCBFWFBSRVNTSU9OUy5JU19BTExPV0VEX1VSSTtcbiAgICBOQU1FU1BBQ0UgPSBjZmcuTkFNRVNQQUNFIHx8IEhUTUxfTkFNRVNQQUNFO1xuICAgIE1BVEhNTF9URVhUX0lOVEVHUkFUSU9OX1BPSU5UUyA9XG4gICAgICBjZmcuTUFUSE1MX1RFWFRfSU5URUdSQVRJT05fUE9JTlRTIHx8IE1BVEhNTF9URVhUX0lOVEVHUkFUSU9OX1BPSU5UUztcbiAgICBIVE1MX0lOVEVHUkFUSU9OX1BPSU5UUyA9XG4gICAgICBjZmcuSFRNTF9JTlRFR1JBVElPTl9QT0lOVFMgfHwgSFRNTF9JTlRFR1JBVElPTl9QT0lOVFM7XG5cbiAgICBDVVNUT01fRUxFTUVOVF9IQU5ETElORyA9IGNmZy5DVVNUT01fRUxFTUVOVF9IQU5ETElORyB8fCB7fTtcbiAgICBpZiAoXG4gICAgICBjZmcuQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcgJiZcbiAgICAgIGlzUmVnZXhPckZ1bmN0aW9uKGNmZy5DVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2spXG4gICAgKSB7XG4gICAgICBDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sgPVxuICAgICAgICBjZmcuQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIGNmZy5DVVNUT01fRUxFTUVOVF9IQU5ETElORyAmJlxuICAgICAgaXNSZWdleE9yRnVuY3Rpb24oY2ZnLkNVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLmF0dHJpYnV0ZU5hbWVDaGVjaylcbiAgICApIHtcbiAgICAgIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLmF0dHJpYnV0ZU5hbWVDaGVjayA9XG4gICAgICAgIGNmZy5DVVNUT01fRUxFTUVOVF9IQU5ETElORy5hdHRyaWJ1dGVOYW1lQ2hlY2s7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgY2ZnLkNVU1RPTV9FTEVNRU5UX0hBTkRMSU5HICYmXG4gICAgICB0eXBlb2YgY2ZnLkNVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLmFsbG93Q3VzdG9taXplZEJ1aWx0SW5FbGVtZW50cyA9PT1cbiAgICAgICAgJ2Jvb2xlYW4nXG4gICAgKSB7XG4gICAgICBDVVNUT01fRUxFTUVOVF9IQU5ETElORy5hbGxvd0N1c3RvbWl6ZWRCdWlsdEluRWxlbWVudHMgPVxuICAgICAgICBjZmcuQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYWxsb3dDdXN0b21pemVkQnVpbHRJbkVsZW1lbnRzO1xuICAgIH1cblxuICAgIGlmIChTQUZFX0ZPUl9URU1QTEFURVMpIHtcbiAgICAgIEFMTE9XX0RBVEFfQVRUUiA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChSRVRVUk5fRE9NX0ZSQUdNRU5UKSB7XG4gICAgICBSRVRVUk5fRE9NID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKiBQYXJzZSBwcm9maWxlIGluZm8gKi9cbiAgICBpZiAoVVNFX1BST0ZJTEVTKSB7XG4gICAgICBBTExPV0VEX1RBR1MgPSBhZGRUb1NldCh7fSwgVEFHUy50ZXh0KTtcbiAgICAgIEFMTE9XRURfQVRUUiA9IFtdO1xuICAgICAgaWYgKFVTRV9QUk9GSUxFUy5odG1sID09PSB0cnVlKSB7XG4gICAgICAgIGFkZFRvU2V0KEFMTE9XRURfVEFHUywgVEFHUy5odG1sKTtcbiAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9BVFRSLCBBVFRSUy5odG1sKTtcbiAgICAgIH1cblxuICAgICAgaWYgKFVTRV9QUk9GSUxFUy5zdmcgPT09IHRydWUpIHtcbiAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9UQUdTLCBUQUdTLnN2Zyk7XG4gICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgQVRUUlMuc3ZnKTtcbiAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9BVFRSLCBBVFRSUy54bWwpO1xuICAgICAgfVxuXG4gICAgICBpZiAoVVNFX1BST0ZJTEVTLnN2Z0ZpbHRlcnMgPT09IHRydWUpIHtcbiAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9UQUdTLCBUQUdTLnN2Z0ZpbHRlcnMpO1xuICAgICAgICBhZGRUb1NldChBTExPV0VEX0FUVFIsIEFUVFJTLnN2Zyk7XG4gICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgQVRUUlMueG1sKTtcbiAgICAgIH1cblxuICAgICAgaWYgKFVTRV9QUk9GSUxFUy5tYXRoTWwgPT09IHRydWUpIHtcbiAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9UQUdTLCBUQUdTLm1hdGhNbCk7XG4gICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgQVRUUlMubWF0aE1sKTtcbiAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9BVFRSLCBBVFRSUy54bWwpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qIE1lcmdlIGNvbmZpZ3VyYXRpb24gcGFyYW1ldGVycyAqL1xuICAgIGlmIChjZmcuQUREX1RBR1MpIHtcbiAgICAgIGlmICh0eXBlb2YgY2ZnLkFERF9UQUdTID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIEVYVFJBX0VMRU1FTlRfSEFORExJTkcudGFnQ2hlY2sgPSBjZmcuQUREX1RBR1M7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoQUxMT1dFRF9UQUdTID09PSBERUZBVUxUX0FMTE9XRURfVEFHUykge1xuICAgICAgICAgIEFMTE9XRURfVEFHUyA9IGNsb25lKEFMTE9XRURfVEFHUyk7XG4gICAgICAgIH1cblxuICAgICAgICBhZGRUb1NldChBTExPV0VEX1RBR1MsIGNmZy5BRERfVEFHUywgdHJhbnNmb3JtQ2FzZUZ1bmMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjZmcuQUREX0FUVFIpIHtcbiAgICAgIGlmICh0eXBlb2YgY2ZnLkFERF9BVFRSID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIEVYVFJBX0VMRU1FTlRfSEFORExJTkcuYXR0cmlidXRlQ2hlY2sgPSBjZmcuQUREX0FUVFI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoQUxMT1dFRF9BVFRSID09PSBERUZBVUxUX0FMTE9XRURfQVRUUikge1xuICAgICAgICAgIEFMTE9XRURfQVRUUiA9IGNsb25lKEFMTE9XRURfQVRUUik7XG4gICAgICAgIH1cblxuICAgICAgICBhZGRUb1NldChBTExPV0VEX0FUVFIsIGNmZy5BRERfQVRUUiwgdHJhbnNmb3JtQ2FzZUZ1bmMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjZmcuQUREX1VSSV9TQUZFX0FUVFIpIHtcbiAgICAgIGFkZFRvU2V0KFVSSV9TQUZFX0FUVFJJQlVURVMsIGNmZy5BRERfVVJJX1NBRkVfQVRUUiwgdHJhbnNmb3JtQ2FzZUZ1bmMpO1xuICAgIH1cblxuICAgIGlmIChjZmcuRk9SQklEX0NPTlRFTlRTKSB7XG4gICAgICBpZiAoRk9SQklEX0NPTlRFTlRTID09PSBERUZBVUxUX0ZPUkJJRF9DT05URU5UUykge1xuICAgICAgICBGT1JCSURfQ09OVEVOVFMgPSBjbG9uZShGT1JCSURfQ09OVEVOVFMpO1xuICAgICAgfVxuXG4gICAgICBhZGRUb1NldChGT1JCSURfQ09OVEVOVFMsIGNmZy5GT1JCSURfQ09OVEVOVFMsIHRyYW5zZm9ybUNhc2VGdW5jKTtcbiAgICB9XG5cbiAgICAvKiBBZGQgI3RleHQgaW4gY2FzZSBLRUVQX0NPTlRFTlQgaXMgc2V0IHRvIHRydWUgKi9cbiAgICBpZiAoS0VFUF9DT05URU5UKSB7XG4gICAgICBBTExPV0VEX1RBR1NbJyN0ZXh0J10gPSB0cnVlO1xuICAgIH1cblxuICAgIC8qIEFkZCBodG1sLCBoZWFkIGFuZCBib2R5IHRvIEFMTE9XRURfVEFHUyBpbiBjYXNlIFdIT0xFX0RPQ1VNRU5UIGlzIHRydWUgKi9cbiAgICBpZiAoV0hPTEVfRE9DVU1FTlQpIHtcbiAgICAgIGFkZFRvU2V0KEFMTE9XRURfVEFHUywgWydodG1sJywgJ2hlYWQnLCAnYm9keSddKTtcbiAgICB9XG5cbiAgICAvKiBBZGQgdGJvZHkgdG8gQUxMT1dFRF9UQUdTIGluIGNhc2UgdGFibGVzIGFyZSBwZXJtaXR0ZWQsIHNlZSAjMjg2LCAjMzY1ICovXG4gICAgaWYgKEFMTE9XRURfVEFHUy50YWJsZSkge1xuICAgICAgYWRkVG9TZXQoQUxMT1dFRF9UQUdTLCBbJ3Rib2R5J10pO1xuICAgICAgZGVsZXRlIEZPUkJJRF9UQUdTLnRib2R5O1xuICAgIH1cblxuICAgIGlmIChjZmcuVFJVU1RFRF9UWVBFU19QT0xJQ1kpIHtcbiAgICAgIGlmICh0eXBlb2YgY2ZnLlRSVVNURURfVFlQRVNfUE9MSUNZLmNyZWF0ZUhUTUwgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgdHlwZUVycm9yQ3JlYXRlKFxuICAgICAgICAgICdUUlVTVEVEX1RZUEVTX1BPTElDWSBjb25maWd1cmF0aW9uIG9wdGlvbiBtdXN0IHByb3ZpZGUgYSBcImNyZWF0ZUhUTUxcIiBob29rLidcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBjZmcuVFJVU1RFRF9UWVBFU19QT0xJQ1kuY3JlYXRlU2NyaXB0VVJMICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IHR5cGVFcnJvckNyZWF0ZShcbiAgICAgICAgICAnVFJVU1RFRF9UWVBFU19QT0xJQ1kgY29uZmlndXJhdGlvbiBvcHRpb24gbXVzdCBwcm92aWRlIGEgXCJjcmVhdGVTY3JpcHRVUkxcIiBob29rLidcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgLy8gT3ZlcndyaXRlIGV4aXN0aW5nIFRydXN0ZWRUeXBlcyBwb2xpY3kuXG4gICAgICB0cnVzdGVkVHlwZXNQb2xpY3kgPSBjZmcuVFJVU1RFRF9UWVBFU19QT0xJQ1k7XG5cbiAgICAgIC8vIFNpZ24gbG9jYWwgdmFyaWFibGVzIHJlcXVpcmVkIGJ5IGBzYW5pdGl6ZWAuXG4gICAgICBlbXB0eUhUTUwgPSB0cnVzdGVkVHlwZXNQb2xpY3kuY3JlYXRlSFRNTCgnJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFVuaW5pdGlhbGl6ZWQgcG9saWN5LCBhdHRlbXB0IHRvIGluaXRpYWxpemUgdGhlIGludGVybmFsIGRvbXB1cmlmeSBwb2xpY3kuXG4gICAgICBpZiAodHJ1c3RlZFR5cGVzUG9saWN5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdHJ1c3RlZFR5cGVzUG9saWN5ID0gX2NyZWF0ZVRydXN0ZWRUeXBlc1BvbGljeShcbiAgICAgICAgICB0cnVzdGVkVHlwZXMsXG4gICAgICAgICAgY3VycmVudFNjcmlwdFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICAvLyBJZiBjcmVhdGluZyB0aGUgaW50ZXJuYWwgcG9saWN5IHN1Y2NlZWRlZCBzaWduIGludGVybmFsIHZhcmlhYmxlcy5cbiAgICAgIGlmICh0cnVzdGVkVHlwZXNQb2xpY3kgIT09IG51bGwgJiYgdHlwZW9mIGVtcHR5SFRNTCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgZW1wdHlIVE1MID0gdHJ1c3RlZFR5cGVzUG9saWN5LmNyZWF0ZUhUTUwoJycpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFByZXZlbnQgZnVydGhlciBtYW5pcHVsYXRpb24gb2YgY29uZmlndXJhdGlvbi5cbiAgICAvLyBOb3QgYXZhaWxhYmxlIGluIElFOCwgU2FmYXJpIDUsIGV0Yy5cbiAgICBpZiAoZnJlZXplKSB7XG4gICAgICBmcmVlemUoY2ZnKTtcbiAgICB9XG5cbiAgICBDT05GSUcgPSBjZmc7XG4gIH07XG5cbiAgLyogS2VlcCB0cmFjayBvZiBhbGwgcG9zc2libGUgU1ZHIGFuZCBNYXRoTUwgdGFnc1xuICAgKiBzbyB0aGF0IHdlIGNhbiBwZXJmb3JtIHRoZSBuYW1lc3BhY2UgY2hlY2tzXG4gICAqIGNvcnJlY3RseS4gKi9cbiAgY29uc3QgQUxMX1NWR19UQUdTID0gYWRkVG9TZXQoe30sIFtcbiAgICAuLi5UQUdTLnN2ZyxcbiAgICAuLi5UQUdTLnN2Z0ZpbHRlcnMsXG4gICAgLi4uVEFHUy5zdmdEaXNhbGxvd2VkLFxuICBdKTtcbiAgY29uc3QgQUxMX01BVEhNTF9UQUdTID0gYWRkVG9TZXQoe30sIFtcbiAgICAuLi5UQUdTLm1hdGhNbCxcbiAgICAuLi5UQUdTLm1hdGhNbERpc2FsbG93ZWQsXG4gIF0pO1xuXG4gIC8qKlxuICAgKiBAcGFyYW0gZWxlbWVudCBhIERPTSBlbGVtZW50IHdob3NlIG5hbWVzcGFjZSBpcyBiZWluZyBjaGVja2VkXG4gICAqIEByZXR1cm5zIFJldHVybiBmYWxzZSBpZiB0aGUgZWxlbWVudCBoYXMgYVxuICAgKiAgbmFtZXNwYWNlIHRoYXQgYSBzcGVjLWNvbXBsaWFudCBwYXJzZXIgd291bGQgbmV2ZXJcbiAgICogIHJldHVybi4gUmV0dXJuIHRydWUgb3RoZXJ3aXNlLlxuICAgKi9cbiAgY29uc3QgX2NoZWNrVmFsaWROYW1lc3BhY2UgPSBmdW5jdGlvbiAoZWxlbWVudDogRWxlbWVudCk6IGJvb2xlYW4ge1xuICAgIGxldCBwYXJlbnQgPSBnZXRQYXJlbnROb2RlKGVsZW1lbnQpO1xuXG4gICAgLy8gSW4gSlNET00sIGlmIHdlJ3JlIGluc2lkZSBzaGFkb3cgRE9NLCB0aGVuIHBhcmVudE5vZGVcbiAgICAvLyBjYW4gYmUgbnVsbC4gV2UganVzdCBzaW11bGF0ZSBwYXJlbnQgaW4gdGhpcyBjYXNlLlxuICAgIGlmICghcGFyZW50IHx8ICFwYXJlbnQudGFnTmFtZSkge1xuICAgICAgcGFyZW50ID0ge1xuICAgICAgICBuYW1lc3BhY2VVUkk6IE5BTUVTUEFDRSxcbiAgICAgICAgdGFnTmFtZTogJ3RlbXBsYXRlJyxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgY29uc3QgdGFnTmFtZSA9IHN0cmluZ1RvTG93ZXJDYXNlKGVsZW1lbnQudGFnTmFtZSk7XG4gICAgY29uc3QgcGFyZW50VGFnTmFtZSA9IHN0cmluZ1RvTG93ZXJDYXNlKHBhcmVudC50YWdOYW1lKTtcblxuICAgIGlmICghQUxMT1dFRF9OQU1FU1BBQ0VTW2VsZW1lbnQubmFtZXNwYWNlVVJJXSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChlbGVtZW50Lm5hbWVzcGFjZVVSSSA9PT0gU1ZHX05BTUVTUEFDRSkge1xuICAgICAgLy8gVGhlIG9ubHkgd2F5IHRvIHN3aXRjaCBmcm9tIEhUTUwgbmFtZXNwYWNlIHRvIFNWR1xuICAgICAgLy8gaXMgdmlhIDxzdmc+LiBJZiBpdCBoYXBwZW5zIHZpYSBhbnkgb3RoZXIgdGFnLCB0aGVuXG4gICAgICAvLyBpdCBzaG91bGQgYmUga2lsbGVkLlxuICAgICAgaWYgKHBhcmVudC5uYW1lc3BhY2VVUkkgPT09IEhUTUxfTkFNRVNQQUNFKSB7XG4gICAgICAgIHJldHVybiB0YWdOYW1lID09PSAnc3ZnJztcbiAgICAgIH1cblxuICAgICAgLy8gVGhlIG9ubHkgd2F5IHRvIHN3aXRjaCBmcm9tIE1hdGhNTCB0byBTVkcgaXMgdmlhYFxuICAgICAgLy8gc3ZnIGlmIHBhcmVudCBpcyBlaXRoZXIgPGFubm90YXRpb24teG1sPiBvciBNYXRoTUxcbiAgICAgIC8vIHRleHQgaW50ZWdyYXRpb24gcG9pbnRzLlxuICAgICAgaWYgKHBhcmVudC5uYW1lc3BhY2VVUkkgPT09IE1BVEhNTF9OQU1FU1BBQ0UpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICB0YWdOYW1lID09PSAnc3ZnJyAmJlxuICAgICAgICAgIChwYXJlbnRUYWdOYW1lID09PSAnYW5ub3RhdGlvbi14bWwnIHx8XG4gICAgICAgICAgICBNQVRITUxfVEVYVF9JTlRFR1JBVElPTl9QT0lOVFNbcGFyZW50VGFnTmFtZV0pXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIC8vIFdlIG9ubHkgYWxsb3cgZWxlbWVudHMgdGhhdCBhcmUgZGVmaW5lZCBpbiBTVkdcbiAgICAgIC8vIHNwZWMuIEFsbCBvdGhlcnMgYXJlIGRpc2FsbG93ZWQgaW4gU1ZHIG5hbWVzcGFjZS5cbiAgICAgIHJldHVybiBCb29sZWFuKEFMTF9TVkdfVEFHU1t0YWdOYW1lXSk7XG4gICAgfVxuXG4gICAgaWYgKGVsZW1lbnQubmFtZXNwYWNlVVJJID09PSBNQVRITUxfTkFNRVNQQUNFKSB7XG4gICAgICAvLyBUaGUgb25seSB3YXkgdG8gc3dpdGNoIGZyb20gSFRNTCBuYW1lc3BhY2UgdG8gTWF0aE1MXG4gICAgICAvLyBpcyB2aWEgPG1hdGg+LiBJZiBpdCBoYXBwZW5zIHZpYSBhbnkgb3RoZXIgdGFnLCB0aGVuXG4gICAgICAvLyBpdCBzaG91bGQgYmUga2lsbGVkLlxuICAgICAgaWYgKHBhcmVudC5uYW1lc3BhY2VVUkkgPT09IEhUTUxfTkFNRVNQQUNFKSB7XG4gICAgICAgIHJldHVybiB0YWdOYW1lID09PSAnbWF0aCc7XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBvbmx5IHdheSB0byBzd2l0Y2ggZnJvbSBTVkcgdG8gTWF0aE1MIGlzIHZpYVxuICAgICAgLy8gPG1hdGg+IGFuZCBIVE1MIGludGVncmF0aW9uIHBvaW50c1xuICAgICAgaWYgKHBhcmVudC5uYW1lc3BhY2VVUkkgPT09IFNWR19OQU1FU1BBQ0UpIHtcbiAgICAgICAgcmV0dXJuIHRhZ05hbWUgPT09ICdtYXRoJyAmJiBIVE1MX0lOVEVHUkFUSU9OX1BPSU5UU1twYXJlbnRUYWdOYW1lXTtcbiAgICAgIH1cblxuICAgICAgLy8gV2Ugb25seSBhbGxvdyBlbGVtZW50cyB0aGF0IGFyZSBkZWZpbmVkIGluIE1hdGhNTFxuICAgICAgLy8gc3BlYy4gQWxsIG90aGVycyBhcmUgZGlzYWxsb3dlZCBpbiBNYXRoTUwgbmFtZXNwYWNlLlxuICAgICAgcmV0dXJuIEJvb2xlYW4oQUxMX01BVEhNTF9UQUdTW3RhZ05hbWVdKTtcbiAgICB9XG5cbiAgICBpZiAoZWxlbWVudC5uYW1lc3BhY2VVUkkgPT09IEhUTUxfTkFNRVNQQUNFKSB7XG4gICAgICAvLyBUaGUgb25seSB3YXkgdG8gc3dpdGNoIGZyb20gU1ZHIHRvIEhUTUwgaXMgdmlhXG4gICAgICAvLyBIVE1MIGludGVncmF0aW9uIHBvaW50cywgYW5kIGZyb20gTWF0aE1MIHRvIEhUTUxcbiAgICAgIC8vIGlzIHZpYSBNYXRoTUwgdGV4dCBpbnRlZ3JhdGlvbiBwb2ludHNcbiAgICAgIGlmIChcbiAgICAgICAgcGFyZW50Lm5hbWVzcGFjZVVSSSA9PT0gU1ZHX05BTUVTUEFDRSAmJlxuICAgICAgICAhSFRNTF9JTlRFR1JBVElPTl9QT0lOVFNbcGFyZW50VGFnTmFtZV1cbiAgICAgICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgcGFyZW50Lm5hbWVzcGFjZVVSSSA9PT0gTUFUSE1MX05BTUVTUEFDRSAmJlxuICAgICAgICAhTUFUSE1MX1RFWFRfSU5URUdSQVRJT05fUE9JTlRTW3BhcmVudFRhZ05hbWVdXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICAvLyBXZSBkaXNhbGxvdyB0YWdzIHRoYXQgYXJlIHNwZWNpZmljIGZvciBNYXRoTUxcbiAgICAgIC8vIG9yIFNWRyBhbmQgc2hvdWxkIG5ldmVyIGFwcGVhciBpbiBIVE1MIG5hbWVzcGFjZVxuICAgICAgcmV0dXJuIChcbiAgICAgICAgIUFMTF9NQVRITUxfVEFHU1t0YWdOYW1lXSAmJlxuICAgICAgICAoQ09NTU9OX1NWR19BTkRfSFRNTF9FTEVNRU5UU1t0YWdOYW1lXSB8fCAhQUxMX1NWR19UQUdTW3RhZ05hbWVdKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBGb3IgWEhUTUwgYW5kIFhNTCBkb2N1bWVudHMgdGhhdCBzdXBwb3J0IGN1c3RvbSBuYW1lc3BhY2VzXG4gICAgaWYgKFxuICAgICAgUEFSU0VSX01FRElBX1RZUEUgPT09ICdhcHBsaWNhdGlvbi94aHRtbCt4bWwnICYmXG4gICAgICBBTExPV0VEX05BTUVTUEFDRVNbZWxlbWVudC5uYW1lc3BhY2VVUkldXG4gICAgKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBUaGUgY29kZSBzaG91bGQgbmV2ZXIgcmVhY2ggdGhpcyBwbGFjZSAodGhpcyBtZWFuc1xuICAgIC8vIHRoYXQgdGhlIGVsZW1lbnQgc29tZWhvdyBnb3QgbmFtZXNwYWNlIHRoYXQgaXMgbm90XG4gICAgLy8gSFRNTCwgU1ZHLCBNYXRoTUwgb3IgYWxsb3dlZCB2aWEgQUxMT1dFRF9OQU1FU1BBQ0VTKS5cbiAgICAvLyBSZXR1cm4gZmFsc2UganVzdCBpbiBjYXNlLlxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICAvKipcbiAgICogX2ZvcmNlUmVtb3ZlXG4gICAqXG4gICAqIEBwYXJhbSBub2RlIGEgRE9NIG5vZGVcbiAgICovXG4gIGNvbnN0IF9mb3JjZVJlbW92ZSA9IGZ1bmN0aW9uIChub2RlOiBOb2RlKTogdm9pZCB7XG4gICAgYXJyYXlQdXNoKERPTVB1cmlmeS5yZW1vdmVkLCB7IGVsZW1lbnQ6IG5vZGUgfSk7XG5cbiAgICB0cnkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHVuaWNvcm4vcHJlZmVyLWRvbS1ub2RlLXJlbW92ZVxuICAgICAgZ2V0UGFyZW50Tm9kZShub2RlKS5yZW1vdmVDaGlsZChub2RlKTtcbiAgICB9IGNhdGNoIChfKSB7XG4gICAgICByZW1vdmUobm9kZSk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBfcmVtb3ZlQXR0cmlidXRlXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIGFuIEF0dHJpYnV0ZSBuYW1lXG4gICAqIEBwYXJhbSBlbGVtZW50IGEgRE9NIG5vZGVcbiAgICovXG4gIGNvbnN0IF9yZW1vdmVBdHRyaWJ1dGUgPSBmdW5jdGlvbiAobmFtZTogc3RyaW5nLCBlbGVtZW50OiBFbGVtZW50KTogdm9pZCB7XG4gICAgdHJ5IHtcbiAgICAgIGFycmF5UHVzaChET01QdXJpZnkucmVtb3ZlZCwge1xuICAgICAgICBhdHRyaWJ1dGU6IGVsZW1lbnQuZ2V0QXR0cmlidXRlTm9kZShuYW1lKSxcbiAgICAgICAgZnJvbTogZWxlbWVudCxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgIGFycmF5UHVzaChET01QdXJpZnkucmVtb3ZlZCwge1xuICAgICAgICBhdHRyaWJ1dGU6IG51bGwsXG4gICAgICAgIGZyb206IGVsZW1lbnQsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcblxuICAgIC8vIFdlIHZvaWQgYXR0cmlidXRlIHZhbHVlcyBmb3IgdW5yZW1vdmFibGUgXCJpc1wiIGF0dHJpYnV0ZXNcbiAgICBpZiAobmFtZSA9PT0gJ2lzJykge1xuICAgICAgaWYgKFJFVFVSTl9ET00gfHwgUkVUVVJOX0RPTV9GUkFHTUVOVCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIF9mb3JjZVJlbW92ZShlbGVtZW50KTtcbiAgICAgICAgfSBjYXRjaCAoXykge31cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUobmFtZSwgJycpO1xuICAgICAgICB9IGNhdGNoIChfKSB7fVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogX2luaXREb2N1bWVudFxuICAgKlxuICAgKiBAcGFyYW0gZGlydHkgLSBhIHN0cmluZyBvZiBkaXJ0eSBtYXJrdXBcbiAgICogQHJldHVybiBhIERPTSwgZmlsbGVkIHdpdGggdGhlIGRpcnR5IG1hcmt1cFxuICAgKi9cbiAgY29uc3QgX2luaXREb2N1bWVudCA9IGZ1bmN0aW9uIChkaXJ0eTogc3RyaW5nKTogRG9jdW1lbnQge1xuICAgIC8qIENyZWF0ZSBhIEhUTUwgZG9jdW1lbnQgKi9cbiAgICBsZXQgZG9jID0gbnVsbDtcbiAgICBsZXQgbGVhZGluZ1doaXRlc3BhY2UgPSBudWxsO1xuXG4gICAgaWYgKEZPUkNFX0JPRFkpIHtcbiAgICAgIGRpcnR5ID0gJzxyZW1vdmU+PC9yZW1vdmU+JyArIGRpcnR5O1xuICAgIH0gZWxzZSB7XG4gICAgICAvKiBJZiBGT1JDRV9CT0RZIGlzbid0IHVzZWQsIGxlYWRpbmcgd2hpdGVzcGFjZSBuZWVkcyB0byBiZSBwcmVzZXJ2ZWQgbWFudWFsbHkgKi9cbiAgICAgIGNvbnN0IG1hdGNoZXMgPSBzdHJpbmdNYXRjaChkaXJ0eSwgL15bXFxyXFxuXFx0IF0rLyk7XG4gICAgICBsZWFkaW5nV2hpdGVzcGFjZSA9IG1hdGNoZXMgJiYgbWF0Y2hlc1swXTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBQQVJTRVJfTUVESUFfVFlQRSA9PT0gJ2FwcGxpY2F0aW9uL3hodG1sK3htbCcgJiZcbiAgICAgIE5BTUVTUEFDRSA9PT0gSFRNTF9OQU1FU1BBQ0VcbiAgICApIHtcbiAgICAgIC8vIFJvb3Qgb2YgWEhUTUwgZG9jIG11c3QgY29udGFpbiB4bWxucyBkZWNsYXJhdGlvbiAoc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi94aHRtbDEvbm9ybWF0aXZlLmh0bWwjc3RyaWN0KVxuICAgICAgZGlydHkgPVxuICAgICAgICAnPGh0bWwgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sXCI+PGhlYWQ+PC9oZWFkPjxib2R5PicgK1xuICAgICAgICBkaXJ0eSArXG4gICAgICAgICc8L2JvZHk+PC9odG1sPic7XG4gICAgfVxuXG4gICAgY29uc3QgZGlydHlQYXlsb2FkID0gdHJ1c3RlZFR5cGVzUG9saWN5XG4gICAgICA/IHRydXN0ZWRUeXBlc1BvbGljeS5jcmVhdGVIVE1MKGRpcnR5KVxuICAgICAgOiBkaXJ0eTtcbiAgICAvKlxuICAgICAqIFVzZSB0aGUgRE9NUGFyc2VyIEFQSSBieSBkZWZhdWx0LCBmYWxsYmFjayBsYXRlciBpZiBuZWVkcyBiZVxuICAgICAqIERPTVBhcnNlciBub3Qgd29yayBmb3Igc3ZnIHdoZW4gaGFzIG11bHRpcGxlIHJvb3QgZWxlbWVudC5cbiAgICAgKi9cbiAgICBpZiAoTkFNRVNQQUNFID09PSBIVE1MX05BTUVTUEFDRSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZG9jID0gbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyhkaXJ0eVBheWxvYWQsIFBBUlNFUl9NRURJQV9UWVBFKTtcbiAgICAgIH0gY2F0Y2ggKF8pIHt9XG4gICAgfVxuXG4gICAgLyogVXNlIGNyZWF0ZUhUTUxEb2N1bWVudCBpbiBjYXNlIERPTVBhcnNlciBpcyBub3QgYXZhaWxhYmxlICovXG4gICAgaWYgKCFkb2MgfHwgIWRvYy5kb2N1bWVudEVsZW1lbnQpIHtcbiAgICAgIGRvYyA9IGltcGxlbWVudGF0aW9uLmNyZWF0ZURvY3VtZW50KE5BTUVTUEFDRSwgJ3RlbXBsYXRlJywgbnVsbCk7XG4gICAgICB0cnkge1xuICAgICAgICBkb2MuZG9jdW1lbnRFbGVtZW50LmlubmVySFRNTCA9IElTX0VNUFRZX0lOUFVUXG4gICAgICAgICAgPyBlbXB0eUhUTUxcbiAgICAgICAgICA6IGRpcnR5UGF5bG9hZDtcbiAgICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgICAgLy8gU3ludGF4IGVycm9yIGlmIGRpcnR5UGF5bG9hZCBpcyBpbnZhbGlkIHhtbFxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGJvZHkgPSBkb2MuYm9keSB8fCBkb2MuZG9jdW1lbnRFbGVtZW50O1xuXG4gICAgaWYgKGRpcnR5ICYmIGxlYWRpbmdXaGl0ZXNwYWNlKSB7XG4gICAgICBib2R5Lmluc2VydEJlZm9yZShcbiAgICAgICAgZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobGVhZGluZ1doaXRlc3BhY2UpLFxuICAgICAgICBib2R5LmNoaWxkTm9kZXNbMF0gfHwgbnVsbFxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvKiBXb3JrIG9uIHdob2xlIGRvY3VtZW50IG9yIGp1c3QgaXRzIGJvZHkgKi9cbiAgICBpZiAoTkFNRVNQQUNFID09PSBIVE1MX05BTUVTUEFDRSkge1xuICAgICAgcmV0dXJuIGdldEVsZW1lbnRzQnlUYWdOYW1lLmNhbGwoXG4gICAgICAgIGRvYyxcbiAgICAgICAgV0hPTEVfRE9DVU1FTlQgPyAnaHRtbCcgOiAnYm9keSdcbiAgICAgIClbMF07XG4gICAgfVxuXG4gICAgcmV0dXJuIFdIT0xFX0RPQ1VNRU5UID8gZG9jLmRvY3VtZW50RWxlbWVudCA6IGJvZHk7XG4gIH07XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBOb2RlSXRlcmF0b3Igb2JqZWN0IHRoYXQgeW91IGNhbiB1c2UgdG8gdHJhdmVyc2UgZmlsdGVyZWQgbGlzdHMgb2Ygbm9kZXMgb3IgZWxlbWVudHMgaW4gYSBkb2N1bWVudC5cbiAgICpcbiAgICogQHBhcmFtIHJvb3QgVGhlIHJvb3QgZWxlbWVudCBvciBub2RlIHRvIHN0YXJ0IHRyYXZlcnNpbmcgb24uXG4gICAqIEByZXR1cm4gVGhlIGNyZWF0ZWQgTm9kZUl0ZXJhdG9yXG4gICAqL1xuICBjb25zdCBfY3JlYXRlTm9kZUl0ZXJhdG9yID0gZnVuY3Rpb24gKHJvb3Q6IE5vZGUpOiBOb2RlSXRlcmF0b3Ige1xuICAgIHJldHVybiBjcmVhdGVOb2RlSXRlcmF0b3IuY2FsbChcbiAgICAgIHJvb3Qub3duZXJEb2N1bWVudCB8fCByb290LFxuICAgICAgcm9vdCxcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG4gICAgICBOb2RlRmlsdGVyLlNIT1dfRUxFTUVOVCB8XG4gICAgICAgIE5vZGVGaWx0ZXIuU0hPV19DT01NRU5UIHxcbiAgICAgICAgTm9kZUZpbHRlci5TSE9XX1RFWFQgfFxuICAgICAgICBOb2RlRmlsdGVyLlNIT1dfUFJPQ0VTU0lOR19JTlNUUlVDVElPTiB8XG4gICAgICAgIE5vZGVGaWx0ZXIuU0hPV19DREFUQV9TRUNUSU9OLFxuICAgICAgbnVsbFxuICAgICk7XG4gIH07XG5cbiAgLyoqXG4gICAqIF9pc0Nsb2JiZXJlZFxuICAgKlxuICAgKiBAcGFyYW0gZWxlbWVudCBlbGVtZW50IHRvIGNoZWNrIGZvciBjbG9iYmVyaW5nIGF0dGFja3NcbiAgICogQHJldHVybiB0cnVlIGlmIGNsb2JiZXJlZCwgZmFsc2UgaWYgc2FmZVxuICAgKi9cbiAgY29uc3QgX2lzQ2xvYmJlcmVkID0gZnVuY3Rpb24gKGVsZW1lbnQ6IEVsZW1lbnQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxGb3JtRWxlbWVudCAmJlxuICAgICAgKHR5cGVvZiBlbGVtZW50Lm5vZGVOYW1lICE9PSAnc3RyaW5nJyB8fFxuICAgICAgICB0eXBlb2YgZWxlbWVudC50ZXh0Q29udGVudCAhPT0gJ3N0cmluZycgfHxcbiAgICAgICAgdHlwZW9mIGVsZW1lbnQucmVtb3ZlQ2hpbGQgIT09ICdmdW5jdGlvbicgfHxcbiAgICAgICAgIShlbGVtZW50LmF0dHJpYnV0ZXMgaW5zdGFuY2VvZiBOYW1lZE5vZGVNYXApIHx8XG4gICAgICAgIHR5cGVvZiBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSAhPT0gJ2Z1bmN0aW9uJyB8fFxuICAgICAgICB0eXBlb2YgZWxlbWVudC5zZXRBdHRyaWJ1dGUgIT09ICdmdW5jdGlvbicgfHxcbiAgICAgICAgdHlwZW9mIGVsZW1lbnQubmFtZXNwYWNlVVJJICE9PSAnc3RyaW5nJyB8fFxuICAgICAgICB0eXBlb2YgZWxlbWVudC5pbnNlcnRCZWZvcmUgIT09ICdmdW5jdGlvbicgfHxcbiAgICAgICAgdHlwZW9mIGVsZW1lbnQuaGFzQ2hpbGROb2RlcyAhPT0gJ2Z1bmN0aW9uJylcbiAgICApO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gb2JqZWN0IGlzIGEgRE9NIG5vZGUuXG4gICAqXG4gICAqIEBwYXJhbSB2YWx1ZSBvYmplY3QgdG8gY2hlY2sgd2hldGhlciBpdCdzIGEgRE9NIG5vZGVcbiAgICogQHJldHVybiB0cnVlIGlzIG9iamVjdCBpcyBhIERPTSBub2RlXG4gICAqL1xuICBjb25zdCBfaXNOb2RlID0gZnVuY3Rpb24gKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgTm9kZSB7XG4gICAgcmV0dXJuIHR5cGVvZiBOb2RlID09PSAnZnVuY3Rpb24nICYmIHZhbHVlIGluc3RhbmNlb2YgTm9kZTtcbiAgfTtcblxuICBmdW5jdGlvbiBfZXhlY3V0ZUhvb2tzPFQgZXh0ZW5kcyBIb29rRnVuY3Rpb24+KFxuICAgIGhvb2tzOiBIb29rRnVuY3Rpb25bXSxcbiAgICBjdXJyZW50Tm9kZTogUGFyYW1ldGVyczxUPlswXSxcbiAgICBkYXRhOiBQYXJhbWV0ZXJzPFQ+WzFdXG4gICk6IHZvaWQge1xuICAgIGFycmF5Rm9yRWFjaChob29rcywgKGhvb2s6IFQpID0+IHtcbiAgICAgIGhvb2suY2FsbChET01QdXJpZnksIGN1cnJlbnROb2RlLCBkYXRhLCBDT05GSUcpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIF9zYW5pdGl6ZUVsZW1lbnRzXG4gICAqXG4gICAqIEBwcm90ZWN0IG5vZGVOYW1lXG4gICAqIEBwcm90ZWN0IHRleHRDb250ZW50XG4gICAqIEBwcm90ZWN0IHJlbW92ZUNoaWxkXG4gICAqIEBwYXJhbSBjdXJyZW50Tm9kZSB0byBjaGVjayBmb3IgcGVybWlzc2lvbiB0byBleGlzdFxuICAgKiBAcmV0dXJuIHRydWUgaWYgbm9kZSB3YXMga2lsbGVkLCBmYWxzZSBpZiBsZWZ0IGFsaXZlXG4gICAqL1xuICBjb25zdCBfc2FuaXRpemVFbGVtZW50cyA9IGZ1bmN0aW9uIChjdXJyZW50Tm9kZTogYW55KTogYm9vbGVhbiB7XG4gICAgbGV0IGNvbnRlbnQgPSBudWxsO1xuXG4gICAgLyogRXhlY3V0ZSBhIGhvb2sgaWYgcHJlc2VudCAqL1xuICAgIF9leGVjdXRlSG9va3MoaG9va3MuYmVmb3JlU2FuaXRpemVFbGVtZW50cywgY3VycmVudE5vZGUsIG51bGwpO1xuXG4gICAgLyogQ2hlY2sgaWYgZWxlbWVudCBpcyBjbG9iYmVyZWQgb3IgY2FuIGNsb2JiZXIgKi9cbiAgICBpZiAoX2lzQ2xvYmJlcmVkKGN1cnJlbnROb2RlKSkge1xuICAgICAgX2ZvcmNlUmVtb3ZlKGN1cnJlbnROb2RlKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8qIE5vdyBsZXQncyBjaGVjayB0aGUgZWxlbWVudCdzIHR5cGUgYW5kIG5hbWUgKi9cbiAgICBjb25zdCB0YWdOYW1lID0gdHJhbnNmb3JtQ2FzZUZ1bmMoY3VycmVudE5vZGUubm9kZU5hbWUpO1xuXG4gICAgLyogRXhlY3V0ZSBhIGhvb2sgaWYgcHJlc2VudCAqL1xuICAgIF9leGVjdXRlSG9va3MoaG9va3MudXBvblNhbml0aXplRWxlbWVudCwgY3VycmVudE5vZGUsIHtcbiAgICAgIHRhZ05hbWUsXG4gICAgICBhbGxvd2VkVGFnczogQUxMT1dFRF9UQUdTLFxuICAgIH0pO1xuXG4gICAgLyogRGV0ZWN0IG1YU1MgYXR0ZW1wdHMgYWJ1c2luZyBuYW1lc3BhY2UgY29uZnVzaW9uICovXG4gICAgaWYgKFxuICAgICAgU0FGRV9GT1JfWE1MICYmXG4gICAgICBjdXJyZW50Tm9kZS5oYXNDaGlsZE5vZGVzKCkgJiZcbiAgICAgICFfaXNOb2RlKGN1cnJlbnROb2RlLmZpcnN0RWxlbWVudENoaWxkKSAmJlxuICAgICAgcmVnRXhwVGVzdCgvPFsvXFx3IV0vZywgY3VycmVudE5vZGUuaW5uZXJIVE1MKSAmJlxuICAgICAgcmVnRXhwVGVzdCgvPFsvXFx3IV0vZywgY3VycmVudE5vZGUudGV4dENvbnRlbnQpXG4gICAgKSB7XG4gICAgICBfZm9yY2VSZW1vdmUoY3VycmVudE5vZGUpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyogUmVtb3ZlIGFueSBvY2N1cnJlbmNlIG9mIHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb25zICovXG4gICAgaWYgKGN1cnJlbnROb2RlLm5vZGVUeXBlID09PSBOT0RFX1RZUEUucHJvZ3Jlc3NpbmdJbnN0cnVjdGlvbikge1xuICAgICAgX2ZvcmNlUmVtb3ZlKGN1cnJlbnROb2RlKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8qIFJlbW92ZSBhbnkga2luZCBvZiBwb3NzaWJseSBoYXJtZnVsIGNvbW1lbnRzICovXG4gICAgaWYgKFxuICAgICAgU0FGRV9GT1JfWE1MICYmXG4gICAgICBjdXJyZW50Tm9kZS5ub2RlVHlwZSA9PT0gTk9ERV9UWVBFLmNvbW1lbnQgJiZcbiAgICAgIHJlZ0V4cFRlc3QoLzxbL1xcd10vZywgY3VycmVudE5vZGUuZGF0YSlcbiAgICApIHtcbiAgICAgIF9mb3JjZVJlbW92ZShjdXJyZW50Tm9kZSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKiBSZW1vdmUgZWxlbWVudCBpZiBhbnl0aGluZyBmb3JiaWRzIGl0cyBwcmVzZW5jZSAqL1xuICAgIGlmIChcbiAgICAgICEoXG4gICAgICAgIEVYVFJBX0VMRU1FTlRfSEFORExJTkcudGFnQ2hlY2sgaW5zdGFuY2VvZiBGdW5jdGlvbiAmJlxuICAgICAgICBFWFRSQV9FTEVNRU5UX0hBTkRMSU5HLnRhZ0NoZWNrKHRhZ05hbWUpXG4gICAgICApICYmXG4gICAgICAoIUFMTE9XRURfVEFHU1t0YWdOYW1lXSB8fCBGT1JCSURfVEFHU1t0YWdOYW1lXSlcbiAgICApIHtcbiAgICAgIC8qIENoZWNrIGlmIHdlIGhhdmUgYSBjdXN0b20gZWxlbWVudCB0byBoYW5kbGUgKi9cbiAgICAgIGlmICghRk9SQklEX1RBR1NbdGFnTmFtZV0gJiYgX2lzQmFzaWNDdXN0b21FbGVtZW50KHRhZ05hbWUpKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sgaW5zdGFuY2VvZiBSZWdFeHAgJiZcbiAgICAgICAgICByZWdFeHBUZXN0KENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjaywgdGFnTmFtZSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayBpbnN0YW5jZW9mIEZ1bmN0aW9uICYmXG4gICAgICAgICAgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrKHRhZ05hbWUpXG4gICAgICAgICkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvKiBLZWVwIGNvbnRlbnQgZXhjZXB0IGZvciBiYWQtbGlzdGVkIGVsZW1lbnRzICovXG4gICAgICBpZiAoS0VFUF9DT05URU5UICYmICFGT1JCSURfQ09OVEVOVFNbdGFnTmFtZV0pIHtcbiAgICAgICAgY29uc3QgcGFyZW50Tm9kZSA9IGdldFBhcmVudE5vZGUoY3VycmVudE5vZGUpIHx8IGN1cnJlbnROb2RlLnBhcmVudE5vZGU7XG4gICAgICAgIGNvbnN0IGNoaWxkTm9kZXMgPSBnZXRDaGlsZE5vZGVzKGN1cnJlbnROb2RlKSB8fCBjdXJyZW50Tm9kZS5jaGlsZE5vZGVzO1xuXG4gICAgICAgIGlmIChjaGlsZE5vZGVzICYmIHBhcmVudE5vZGUpIHtcbiAgICAgICAgICBjb25zdCBjaGlsZENvdW50ID0gY2hpbGROb2Rlcy5sZW5ndGg7XG5cbiAgICAgICAgICBmb3IgKGxldCBpID0gY2hpbGRDb3VudCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZENsb25lID0gY2xvbmVOb2RlKGNoaWxkTm9kZXNbaV0sIHRydWUpO1xuICAgICAgICAgICAgY2hpbGRDbG9uZS5fX3JlbW92YWxDb3VudCA9IChjdXJyZW50Tm9kZS5fX3JlbW92YWxDb3VudCB8fCAwKSArIDE7XG4gICAgICAgICAgICBwYXJlbnROb2RlLmluc2VydEJlZm9yZShjaGlsZENsb25lLCBnZXROZXh0U2libGluZyhjdXJyZW50Tm9kZSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBfZm9yY2VSZW1vdmUoY3VycmVudE5vZGUpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyogQ2hlY2sgd2hldGhlciBlbGVtZW50IGhhcyBhIHZhbGlkIG5hbWVzcGFjZSAqL1xuICAgIGlmIChjdXJyZW50Tm9kZSBpbnN0YW5jZW9mIEVsZW1lbnQgJiYgIV9jaGVja1ZhbGlkTmFtZXNwYWNlKGN1cnJlbnROb2RlKSkge1xuICAgICAgX2ZvcmNlUmVtb3ZlKGN1cnJlbnROb2RlKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8qIE1ha2Ugc3VyZSB0aGF0IG9sZGVyIGJyb3dzZXJzIGRvbid0IGdldCBmYWxsYmFjay10YWcgbVhTUyAqL1xuICAgIGlmIChcbiAgICAgICh0YWdOYW1lID09PSAnbm9zY3JpcHQnIHx8XG4gICAgICAgIHRhZ05hbWUgPT09ICdub2VtYmVkJyB8fFxuICAgICAgICB0YWdOYW1lID09PSAnbm9mcmFtZXMnKSAmJlxuICAgICAgcmVnRXhwVGVzdCgvPFxcL25vKHNjcmlwdHxlbWJlZHxmcmFtZXMpL2ksIGN1cnJlbnROb2RlLmlubmVySFRNTClcbiAgICApIHtcbiAgICAgIF9mb3JjZVJlbW92ZShjdXJyZW50Tm9kZSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKiBTYW5pdGl6ZSBlbGVtZW50IGNvbnRlbnQgdG8gYmUgdGVtcGxhdGUtc2FmZSAqL1xuICAgIGlmIChTQUZFX0ZPUl9URU1QTEFURVMgJiYgY3VycmVudE5vZGUubm9kZVR5cGUgPT09IE5PREVfVFlQRS50ZXh0KSB7XG4gICAgICAvKiBHZXQgdGhlIGVsZW1lbnQncyB0ZXh0IGNvbnRlbnQgKi9cbiAgICAgIGNvbnRlbnQgPSBjdXJyZW50Tm9kZS50ZXh0Q29udGVudDtcblxuICAgICAgYXJyYXlGb3JFYWNoKFtNVVNUQUNIRV9FWFBSLCBFUkJfRVhQUiwgVE1QTElUX0VYUFJdLCAoZXhwcjogUmVnRXhwKSA9PiB7XG4gICAgICAgIGNvbnRlbnQgPSBzdHJpbmdSZXBsYWNlKGNvbnRlbnQsIGV4cHIsICcgJyk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKGN1cnJlbnROb2RlLnRleHRDb250ZW50ICE9PSBjb250ZW50KSB7XG4gICAgICAgIGFycmF5UHVzaChET01QdXJpZnkucmVtb3ZlZCwgeyBlbGVtZW50OiBjdXJyZW50Tm9kZS5jbG9uZU5vZGUoKSB9KTtcbiAgICAgICAgY3VycmVudE5vZGUudGV4dENvbnRlbnQgPSBjb250ZW50O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cbiAgICBfZXhlY3V0ZUhvb2tzKGhvb2tzLmFmdGVyU2FuaXRpemVFbGVtZW50cywgY3VycmVudE5vZGUsIG51bGwpO1xuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBfaXNWYWxpZEF0dHJpYnV0ZVxuICAgKlxuICAgKiBAcGFyYW0gbGNUYWcgTG93ZXJjYXNlIHRhZyBuYW1lIG9mIGNvbnRhaW5pbmcgZWxlbWVudC5cbiAgICogQHBhcmFtIGxjTmFtZSBMb3dlcmNhc2UgYXR0cmlidXRlIG5hbWUuXG4gICAqIEBwYXJhbSB2YWx1ZSBBdHRyaWJ1dGUgdmFsdWUuXG4gICAqIEByZXR1cm4gUmV0dXJucyB0cnVlIGlmIGB2YWx1ZWAgaXMgdmFsaWQsIG90aGVyd2lzZSBmYWxzZS5cbiAgICovXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb21wbGV4aXR5XG4gIGNvbnN0IF9pc1ZhbGlkQXR0cmlidXRlID0gZnVuY3Rpb24gKFxuICAgIGxjVGFnOiBzdHJpbmcsXG4gICAgbGNOYW1lOiBzdHJpbmcsXG4gICAgdmFsdWU6IHN0cmluZ1xuICApOiBib29sZWFuIHtcbiAgICAvKiBNYWtlIHN1cmUgYXR0cmlidXRlIGNhbm5vdCBjbG9iYmVyICovXG4gICAgaWYgKFxuICAgICAgU0FOSVRJWkVfRE9NICYmXG4gICAgICAobGNOYW1lID09PSAnaWQnIHx8IGxjTmFtZSA9PT0gJ25hbWUnKSAmJlxuICAgICAgKHZhbHVlIGluIGRvY3VtZW50IHx8IHZhbHVlIGluIGZvcm1FbGVtZW50KVxuICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qIEFsbG93IHZhbGlkIGRhdGEtKiBhdHRyaWJ1dGVzOiBBdCBsZWFzdCBvbmUgY2hhcmFjdGVyIGFmdGVyIFwiLVwiXG4gICAgICAgIChodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9kb20uaHRtbCNlbWJlZGRpbmctY3VzdG9tLW5vbi12aXNpYmxlLWRhdGEtd2l0aC10aGUtZGF0YS0qLWF0dHJpYnV0ZXMpXG4gICAgICAgIFhNTC1jb21wYXRpYmxlIChodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9pbmZyYXN0cnVjdHVyZS5odG1sI3htbC1jb21wYXRpYmxlIGFuZCBodHRwOi8vd3d3LnczLm9yZy9UUi94bWwvI2QwZTgwNClcbiAgICAgICAgV2UgZG9uJ3QgbmVlZCB0byBjaGVjayB0aGUgdmFsdWU7IGl0J3MgYWx3YXlzIFVSSSBzYWZlLiAqL1xuICAgIGlmIChcbiAgICAgIEFMTE9XX0RBVEFfQVRUUiAmJlxuICAgICAgIUZPUkJJRF9BVFRSW2xjTmFtZV0gJiZcbiAgICAgIHJlZ0V4cFRlc3QoREFUQV9BVFRSLCBsY05hbWUpXG4gICAgKSB7XG4gICAgICAvLyBUaGlzIGF0dHJpYnV0ZSBpcyBzYWZlXG4gICAgfSBlbHNlIGlmIChBTExPV19BUklBX0FUVFIgJiYgcmVnRXhwVGVzdChBUklBX0FUVFIsIGxjTmFtZSkpIHtcbiAgICAgIC8vIFRoaXMgYXR0cmlidXRlIGlzIHNhZmVcbiAgICAgIC8qIENoZWNrIGlmIEFERF9BVFRSIGZ1bmN0aW9uIGFsbG93cyB0aGlzIGF0dHJpYnV0ZSAqL1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICBFWFRSQV9FTEVNRU5UX0hBTkRMSU5HLmF0dHJpYnV0ZUNoZWNrIGluc3RhbmNlb2YgRnVuY3Rpb24gJiZcbiAgICAgIEVYVFJBX0VMRU1FTlRfSEFORExJTkcuYXR0cmlidXRlQ2hlY2sobGNOYW1lLCBsY1RhZylcbiAgICApIHtcbiAgICAgIC8vIFRoaXMgYXR0cmlidXRlIGlzIHNhZmVcbiAgICAgIC8qIE90aGVyd2lzZSwgY2hlY2sgdGhlIG5hbWUgaXMgcGVybWl0dGVkICovXG4gICAgfSBlbHNlIGlmICghQUxMT1dFRF9BVFRSW2xjTmFtZV0gfHwgRk9SQklEX0FUVFJbbGNOYW1lXSkge1xuICAgICAgaWYgKFxuICAgICAgICAvLyBGaXJzdCBjb25kaXRpb24gZG9lcyBhIHZlcnkgYmFzaWMgY2hlY2sgaWYgYSkgaXQncyBiYXNpY2FsbHkgYSB2YWxpZCBjdXN0b20gZWxlbWVudCB0YWduYW1lIEFORFxuICAgICAgICAvLyBiKSBpZiB0aGUgdGFnTmFtZSBwYXNzZXMgd2hhdGV2ZXIgdGhlIHVzZXIgaGFzIGNvbmZpZ3VyZWQgZm9yIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVja1xuICAgICAgICAvLyBhbmQgYykgaWYgdGhlIGF0dHJpYnV0ZSBuYW1lIHBhc3NlcyB3aGF0ZXZlciB0aGUgdXNlciBoYXMgY29uZmlndXJlZCBmb3IgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYXR0cmlidXRlTmFtZUNoZWNrXG4gICAgICAgIChfaXNCYXNpY0N1c3RvbUVsZW1lbnQobGNUYWcpICYmXG4gICAgICAgICAgKChDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sgaW5zdGFuY2VvZiBSZWdFeHAgJiZcbiAgICAgICAgICAgIHJlZ0V4cFRlc3QoQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrLCBsY1RhZykpIHx8XG4gICAgICAgICAgICAoQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrIGluc3RhbmNlb2YgRnVuY3Rpb24gJiZcbiAgICAgICAgICAgICAgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrKGxjVGFnKSkpICYmXG4gICAgICAgICAgKChDVVNUT01fRUxFTUVOVF9IQU5ETElORy5hdHRyaWJ1dGVOYW1lQ2hlY2sgaW5zdGFuY2VvZiBSZWdFeHAgJiZcbiAgICAgICAgICAgIHJlZ0V4cFRlc3QoQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYXR0cmlidXRlTmFtZUNoZWNrLCBsY05hbWUpKSB8fFxuICAgICAgICAgICAgKENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLmF0dHJpYnV0ZU5hbWVDaGVjayBpbnN0YW5jZW9mIEZ1bmN0aW9uICYmXG4gICAgICAgICAgICAgIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLmF0dHJpYnV0ZU5hbWVDaGVjayhsY05hbWUsIGxjVGFnKSkpKSB8fFxuICAgICAgICAvLyBBbHRlcm5hdGl2ZSwgc2Vjb25kIGNvbmRpdGlvbiBjaGVja3MgaWYgaXQncyBhbiBgaXNgLWF0dHJpYnV0ZSwgQU5EXG4gICAgICAgIC8vIHRoZSB2YWx1ZSBwYXNzZXMgd2hhdGV2ZXIgdGhlIHVzZXIgaGFzIGNvbmZpZ3VyZWQgZm9yIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVja1xuICAgICAgICAobGNOYW1lID09PSAnaXMnICYmXG4gICAgICAgICAgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYWxsb3dDdXN0b21pemVkQnVpbHRJbkVsZW1lbnRzICYmXG4gICAgICAgICAgKChDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sgaW5zdGFuY2VvZiBSZWdFeHAgJiZcbiAgICAgICAgICAgIHJlZ0V4cFRlc3QoQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrLCB2YWx1ZSkpIHx8XG4gICAgICAgICAgICAoQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrIGluc3RhbmNlb2YgRnVuY3Rpb24gJiZcbiAgICAgICAgICAgICAgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrKHZhbHVlKSkpKVxuICAgICAgKSB7XG4gICAgICAgIC8vIElmIHVzZXIgaGFzIHN1cHBsaWVkIGEgcmVnZXhwIG9yIGZ1bmN0aW9uIGluIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjaywgd2UgbmVlZCB0byBhbHNvIGFsbG93IGRlcml2ZWQgY3VzdG9tIGVsZW1lbnRzIHVzaW5nIHRoZSBzYW1lIHRhZ05hbWUgdGVzdC5cbiAgICAgICAgLy8gQWRkaXRpb25hbGx5LCB3ZSBuZWVkIHRvIGFsbG93IGF0dHJpYnV0ZXMgcGFzc2luZyB0aGUgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYXR0cmlidXRlTmFtZUNoZWNrIHVzZXIgaGFzIGNvbmZpZ3VyZWQsIGFzIGN1c3RvbSBlbGVtZW50cyBjYW4gZGVmaW5lIHRoZXNlIGF0IHRoZWlyIG93biBkaXNjcmV0aW9uLlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgLyogQ2hlY2sgdmFsdWUgaXMgc2FmZS4gRmlyc3QsIGlzIGF0dHIgaW5lcnQ/IElmIHNvLCBpcyBzYWZlICovXG4gICAgfSBlbHNlIGlmIChVUklfU0FGRV9BVFRSSUJVVEVTW2xjTmFtZV0pIHtcbiAgICAgIC8vIFRoaXMgYXR0cmlidXRlIGlzIHNhZmVcbiAgICAgIC8qIENoZWNrIG5vIHNjcmlwdCwgZGF0YSBvciB1bmtub3duIHBvc3NpYmx5IHVuc2FmZSBVUklcbiAgICAgICAgdW5sZXNzIHdlIGtub3cgVVJJIHZhbHVlcyBhcmUgc2FmZSBmb3IgdGhhdCBhdHRyaWJ1dGUgKi9cbiAgICB9IGVsc2UgaWYgKFxuICAgICAgcmVnRXhwVGVzdChJU19BTExPV0VEX1VSSSwgc3RyaW5nUmVwbGFjZSh2YWx1ZSwgQVRUUl9XSElURVNQQUNFLCAnJykpXG4gICAgKSB7XG4gICAgICAvLyBUaGlzIGF0dHJpYnV0ZSBpcyBzYWZlXG4gICAgICAvKiBLZWVwIGltYWdlIGRhdGEgVVJJcyBhbGl2ZSBpZiBzcmMveGxpbms6aHJlZiBpcyBhbGxvd2VkICovXG4gICAgICAvKiBGdXJ0aGVyIHByZXZlbnQgZ2FkZ2V0IFhTUyBmb3IgZHluYW1pY2FsbHkgYnVpbHQgc2NyaXB0IHRhZ3MgKi9cbiAgICB9IGVsc2UgaWYgKFxuICAgICAgKGxjTmFtZSA9PT0gJ3NyYycgfHwgbGNOYW1lID09PSAneGxpbms6aHJlZicgfHwgbGNOYW1lID09PSAnaHJlZicpICYmXG4gICAgICBsY1RhZyAhPT0gJ3NjcmlwdCcgJiZcbiAgICAgIHN0cmluZ0luZGV4T2YodmFsdWUsICdkYXRhOicpID09PSAwICYmXG4gICAgICBEQVRBX1VSSV9UQUdTW2xjVGFnXVxuICAgICkge1xuICAgICAgLy8gVGhpcyBhdHRyaWJ1dGUgaXMgc2FmZVxuICAgICAgLyogQWxsb3cgdW5rbm93biBwcm90b2NvbHM6IFRoaXMgcHJvdmlkZXMgc3VwcG9ydCBmb3IgbGlua3MgdGhhdFxuICAgICAgICBhcmUgaGFuZGxlZCBieSBwcm90b2NvbCBoYW5kbGVycyB3aGljaCBtYXkgYmUgdW5rbm93biBhaGVhZCBvZlxuICAgICAgICB0aW1lLCBlLmcuIGZiOiwgc3BvdGlmeTogKi9cbiAgICB9IGVsc2UgaWYgKFxuICAgICAgQUxMT1dfVU5LTk9XTl9QUk9UT0NPTFMgJiZcbiAgICAgICFyZWdFeHBUZXN0KElTX1NDUklQVF9PUl9EQVRBLCBzdHJpbmdSZXBsYWNlKHZhbHVlLCBBVFRSX1dISVRFU1BBQ0UsICcnKSlcbiAgICApIHtcbiAgICAgIC8vIFRoaXMgYXR0cmlidXRlIGlzIHNhZmVcbiAgICAgIC8qIENoZWNrIGZvciBiaW5hcnkgYXR0cmlidXRlcyAqL1xuICAgIH0gZWxzZSBpZiAodmFsdWUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQmluYXJ5IGF0dHJpYnV0ZXMgYXJlIHNhZmUgYXQgdGhpcyBwb2ludFxuICAgICAgLyogQW55dGhpbmcgZWxzZSwgcHJlc3VtZSB1bnNhZmUsIGRvIG5vdCBhZGQgaXQgYmFjayAqL1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBfaXNCYXNpY0N1c3RvbUVsZW1lbnRcbiAgICogY2hlY2tzIGlmIGF0IGxlYXN0IG9uZSBkYXNoIGlzIGluY2x1ZGVkIGluIHRhZ05hbWUsIGFuZCBpdCdzIG5vdCB0aGUgZmlyc3QgY2hhclxuICAgKiBmb3IgbW9yZSBzb3BoaXN0aWNhdGVkIGNoZWNraW5nIHNlZSBodHRwczovL2dpdGh1Yi5jb20vc2luZHJlc29yaHVzL3ZhbGlkYXRlLWVsZW1lbnQtbmFtZVxuICAgKlxuICAgKiBAcGFyYW0gdGFnTmFtZSBuYW1lIG9mIHRoZSB0YWcgb2YgdGhlIG5vZGUgdG8gc2FuaXRpemVcbiAgICogQHJldHVybnMgUmV0dXJucyB0cnVlIGlmIHRoZSB0YWcgbmFtZSBtZWV0cyB0aGUgYmFzaWMgY3JpdGVyaWEgZm9yIGEgY3VzdG9tIGVsZW1lbnQsIG90aGVyd2lzZSBmYWxzZS5cbiAgICovXG4gIGNvbnN0IF9pc0Jhc2ljQ3VzdG9tRWxlbWVudCA9IGZ1bmN0aW9uICh0YWdOYW1lOiBzdHJpbmcpOiBSZWdFeHBNYXRjaEFycmF5IHtcbiAgICByZXR1cm4gdGFnTmFtZSAhPT0gJ2Fubm90YXRpb24teG1sJyAmJiBzdHJpbmdNYXRjaCh0YWdOYW1lLCBDVVNUT01fRUxFTUVOVCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIF9zYW5pdGl6ZUF0dHJpYnV0ZXNcbiAgICpcbiAgICogQHByb3RlY3QgYXR0cmlidXRlc1xuICAgKiBAcHJvdGVjdCBub2RlTmFtZVxuICAgKiBAcHJvdGVjdCByZW1vdmVBdHRyaWJ1dGVcbiAgICogQHByb3RlY3Qgc2V0QXR0cmlidXRlXG4gICAqXG4gICAqIEBwYXJhbSBjdXJyZW50Tm9kZSB0byBzYW5pdGl6ZVxuICAgKi9cbiAgY29uc3QgX3Nhbml0aXplQXR0cmlidXRlcyA9IGZ1bmN0aW9uIChjdXJyZW50Tm9kZTogRWxlbWVudCk6IHZvaWQge1xuICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cbiAgICBfZXhlY3V0ZUhvb2tzKGhvb2tzLmJlZm9yZVNhbml0aXplQXR0cmlidXRlcywgY3VycmVudE5vZGUsIG51bGwpO1xuXG4gICAgY29uc3QgeyBhdHRyaWJ1dGVzIH0gPSBjdXJyZW50Tm9kZTtcblxuICAgIC8qIENoZWNrIGlmIHdlIGhhdmUgYXR0cmlidXRlczsgaWYgbm90IHdlIG1pZ2h0IGhhdmUgYSB0ZXh0IG5vZGUgKi9cbiAgICBpZiAoIWF0dHJpYnV0ZXMgfHwgX2lzQ2xvYmJlcmVkKGN1cnJlbnROb2RlKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGhvb2tFdmVudCA9IHtcbiAgICAgIGF0dHJOYW1lOiAnJyxcbiAgICAgIGF0dHJWYWx1ZTogJycsXG4gICAgICBrZWVwQXR0cjogdHJ1ZSxcbiAgICAgIGFsbG93ZWRBdHRyaWJ1dGVzOiBBTExPV0VEX0FUVFIsXG4gICAgICBmb3JjZUtlZXBBdHRyOiB1bmRlZmluZWQsXG4gICAgfTtcbiAgICBsZXQgbCA9IGF0dHJpYnV0ZXMubGVuZ3RoO1xuXG4gICAgLyogR28gYmFja3dhcmRzIG92ZXIgYWxsIGF0dHJpYnV0ZXM7IHNhZmVseSByZW1vdmUgYmFkIG9uZXMgKi9cbiAgICB3aGlsZSAobC0tKSB7XG4gICAgICBjb25zdCBhdHRyID0gYXR0cmlidXRlc1tsXTtcbiAgICAgIGNvbnN0IHsgbmFtZSwgbmFtZXNwYWNlVVJJLCB2YWx1ZTogYXR0clZhbHVlIH0gPSBhdHRyO1xuICAgICAgY29uc3QgbGNOYW1lID0gdHJhbnNmb3JtQ2FzZUZ1bmMobmFtZSk7XG5cbiAgICAgIGNvbnN0IGluaXRWYWx1ZSA9IGF0dHJWYWx1ZTtcbiAgICAgIGxldCB2YWx1ZSA9IG5hbWUgPT09ICd2YWx1ZScgPyBpbml0VmFsdWUgOiBzdHJpbmdUcmltKGluaXRWYWx1ZSk7XG5cbiAgICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cbiAgICAgIGhvb2tFdmVudC5hdHRyTmFtZSA9IGxjTmFtZTtcbiAgICAgIGhvb2tFdmVudC5hdHRyVmFsdWUgPSB2YWx1ZTtcbiAgICAgIGhvb2tFdmVudC5rZWVwQXR0ciA9IHRydWU7XG4gICAgICBob29rRXZlbnQuZm9yY2VLZWVwQXR0ciA9IHVuZGVmaW5lZDsgLy8gQWxsb3dzIGRldmVsb3BlcnMgdG8gc2VlIHRoaXMgaXMgYSBwcm9wZXJ0eSB0aGV5IGNhbiBzZXRcbiAgICAgIF9leGVjdXRlSG9va3MoaG9va3MudXBvblNhbml0aXplQXR0cmlidXRlLCBjdXJyZW50Tm9kZSwgaG9va0V2ZW50KTtcbiAgICAgIHZhbHVlID0gaG9va0V2ZW50LmF0dHJWYWx1ZTtcblxuICAgICAgLyogRnVsbCBET00gQ2xvYmJlcmluZyBwcm90ZWN0aW9uIHZpYSBuYW1lc3BhY2UgaXNvbGF0aW9uLFxuICAgICAgICogUHJlZml4IGlkIGFuZCBuYW1lIGF0dHJpYnV0ZXMgd2l0aCBgdXNlci1jb250ZW50LWBcbiAgICAgICAqL1xuICAgICAgaWYgKFNBTklUSVpFX05BTUVEX1BST1BTICYmIChsY05hbWUgPT09ICdpZCcgfHwgbGNOYW1lID09PSAnbmFtZScpKSB7XG4gICAgICAgIC8vIFJlbW92ZSB0aGUgYXR0cmlidXRlIHdpdGggdGhpcyB2YWx1ZVxuICAgICAgICBfcmVtb3ZlQXR0cmlidXRlKG5hbWUsIGN1cnJlbnROb2RlKTtcblxuICAgICAgICAvLyBQcmVmaXggdGhlIHZhbHVlIGFuZCBsYXRlciByZS1jcmVhdGUgdGhlIGF0dHJpYnV0ZSB3aXRoIHRoZSBzYW5pdGl6ZWQgdmFsdWVcbiAgICAgICAgdmFsdWUgPSBTQU5JVElaRV9OQU1FRF9QUk9QU19QUkVGSVggKyB2YWx1ZTtcbiAgICAgIH1cblxuICAgICAgLyogV29yayBhcm91bmQgYSBzZWN1cml0eSBpc3N1ZSB3aXRoIGNvbW1lbnRzIGluc2lkZSBhdHRyaWJ1dGVzICovXG4gICAgICBpZiAoXG4gICAgICAgIFNBRkVfRk9SX1hNTCAmJlxuICAgICAgICByZWdFeHBUZXN0KC8oKC0tIT98XSk+KXw8XFwvKHN0eWxlfHRpdGxlfHRleHRhcmVhKS9pLCB2YWx1ZSlcbiAgICAgICkge1xuICAgICAgICBfcmVtb3ZlQXR0cmlidXRlKG5hbWUsIGN1cnJlbnROb2RlKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8qIE1ha2Ugc3VyZSB3ZSBjYW5ub3QgZWFzaWx5IHVzZSBhbmltYXRlZCBocmVmcywgZXZlbiBpZiBhbmltYXRpb25zIGFyZSBhbGxvd2VkICovXG4gICAgICBpZiAobGNOYW1lID09PSAnYXR0cmlidXRlbmFtZScgJiYgc3RyaW5nTWF0Y2godmFsdWUsICdocmVmJykpIHtcbiAgICAgICAgX3JlbW92ZUF0dHJpYnV0ZShuYW1lLCBjdXJyZW50Tm9kZSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvKiBEaWQgdGhlIGhvb2tzIGFwcHJvdmUgb2YgdGhlIGF0dHJpYnV0ZT8gKi9cbiAgICAgIGlmIChob29rRXZlbnQuZm9yY2VLZWVwQXR0cikge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLyogRGlkIHRoZSBob29rcyBhcHByb3ZlIG9mIHRoZSBhdHRyaWJ1dGU/ICovXG4gICAgICBpZiAoIWhvb2tFdmVudC5rZWVwQXR0cikge1xuICAgICAgICBfcmVtb3ZlQXR0cmlidXRlKG5hbWUsIGN1cnJlbnROb2RlKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8qIFdvcmsgYXJvdW5kIGEgc2VjdXJpdHkgaXNzdWUgaW4galF1ZXJ5IDMuMCAqL1xuICAgICAgaWYgKCFBTExPV19TRUxGX0NMT1NFX0lOX0FUVFIgJiYgcmVnRXhwVGVzdCgvXFwvPi9pLCB2YWx1ZSkpIHtcbiAgICAgICAgX3JlbW92ZUF0dHJpYnV0ZShuYW1lLCBjdXJyZW50Tm9kZSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvKiBTYW5pdGl6ZSBhdHRyaWJ1dGUgY29udGVudCB0byBiZSB0ZW1wbGF0ZS1zYWZlICovXG4gICAgICBpZiAoU0FGRV9GT1JfVEVNUExBVEVTKSB7XG4gICAgICAgIGFycmF5Rm9yRWFjaChbTVVTVEFDSEVfRVhQUiwgRVJCX0VYUFIsIFRNUExJVF9FWFBSXSwgKGV4cHI6IFJlZ0V4cCkgPT4ge1xuICAgICAgICAgIHZhbHVlID0gc3RyaW5nUmVwbGFjZSh2YWx1ZSwgZXhwciwgJyAnKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8qIElzIGB2YWx1ZWAgdmFsaWQgZm9yIHRoaXMgYXR0cmlidXRlPyAqL1xuICAgICAgY29uc3QgbGNUYWcgPSB0cmFuc2Zvcm1DYXNlRnVuYyhjdXJyZW50Tm9kZS5ub2RlTmFtZSk7XG4gICAgICBpZiAoIV9pc1ZhbGlkQXR0cmlidXRlKGxjVGFnLCBsY05hbWUsIHZhbHVlKSkge1xuICAgICAgICBfcmVtb3ZlQXR0cmlidXRlKG5hbWUsIGN1cnJlbnROb2RlKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8qIEhhbmRsZSBhdHRyaWJ1dGVzIHRoYXQgcmVxdWlyZSBUcnVzdGVkIFR5cGVzICovXG4gICAgICBpZiAoXG4gICAgICAgIHRydXN0ZWRUeXBlc1BvbGljeSAmJlxuICAgICAgICB0eXBlb2YgdHJ1c3RlZFR5cGVzID09PSAnb2JqZWN0JyAmJlxuICAgICAgICB0eXBlb2YgdHJ1c3RlZFR5cGVzLmdldEF0dHJpYnV0ZVR5cGUgPT09ICdmdW5jdGlvbidcbiAgICAgICkge1xuICAgICAgICBpZiAobmFtZXNwYWNlVVJJKSB7XG4gICAgICAgICAgLyogTmFtZXNwYWNlcyBhcmUgbm90IHlldCBzdXBwb3J0ZWQsIHNlZSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD0xMzA1MjkzICovXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3dpdGNoICh0cnVzdGVkVHlwZXMuZ2V0QXR0cmlidXRlVHlwZShsY1RhZywgbGNOYW1lKSkge1xuICAgICAgICAgICAgY2FzZSAnVHJ1c3RlZEhUTUwnOiB7XG4gICAgICAgICAgICAgIHZhbHVlID0gdHJ1c3RlZFR5cGVzUG9saWN5LmNyZWF0ZUhUTUwodmFsdWUpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FzZSAnVHJ1c3RlZFNjcmlwdFVSTCc6IHtcbiAgICAgICAgICAgICAgdmFsdWUgPSB0cnVzdGVkVHlwZXNQb2xpY3kuY3JlYXRlU2NyaXB0VVJMKHZhbHVlKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8qIEhhbmRsZSBpbnZhbGlkIGRhdGEtKiBhdHRyaWJ1dGUgc2V0IGJ5IHRyeS1jYXRjaGluZyBpdCAqL1xuICAgICAgaWYgKHZhbHVlICE9PSBpbml0VmFsdWUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAobmFtZXNwYWNlVVJJKSB7XG4gICAgICAgICAgICBjdXJyZW50Tm9kZS5zZXRBdHRyaWJ1dGVOUyhuYW1lc3BhY2VVUkksIG5hbWUsIHZhbHVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLyogRmFsbGJhY2sgdG8gc2V0QXR0cmlidXRlKCkgZm9yIGJyb3dzZXItdW5yZWNvZ25pemVkIG5hbWVzcGFjZXMgZS5nLiBcIngtc2NoZW1hXCIuICovXG4gICAgICAgICAgICBjdXJyZW50Tm9kZS5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChfaXNDbG9iYmVyZWQoY3VycmVudE5vZGUpKSB7XG4gICAgICAgICAgICBfZm9yY2VSZW1vdmUoY3VycmVudE5vZGUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhcnJheVBvcChET01QdXJpZnkucmVtb3ZlZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChfKSB7XG4gICAgICAgICAgX3JlbW92ZUF0dHJpYnV0ZShuYW1lLCBjdXJyZW50Tm9kZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgX2V4ZWN1dGVIb29rcyhob29rcy5hZnRlclNhbml0aXplQXR0cmlidXRlcywgY3VycmVudE5vZGUsIG51bGwpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBfc2FuaXRpemVTaGFkb3dET01cbiAgICpcbiAgICogQHBhcmFtIGZyYWdtZW50IHRvIGl0ZXJhdGUgb3ZlciByZWN1cnNpdmVseVxuICAgKi9cbiAgY29uc3QgX3Nhbml0aXplU2hhZG93RE9NID0gZnVuY3Rpb24gKGZyYWdtZW50OiBEb2N1bWVudEZyYWdtZW50KTogdm9pZCB7XG4gICAgbGV0IHNoYWRvd05vZGUgPSBudWxsO1xuICAgIGNvbnN0IHNoYWRvd0l0ZXJhdG9yID0gX2NyZWF0ZU5vZGVJdGVyYXRvcihmcmFnbWVudCk7XG5cbiAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgX2V4ZWN1dGVIb29rcyhob29rcy5iZWZvcmVTYW5pdGl6ZVNoYWRvd0RPTSwgZnJhZ21lbnQsIG51bGwpO1xuXG4gICAgd2hpbGUgKChzaGFkb3dOb2RlID0gc2hhZG93SXRlcmF0b3IubmV4dE5vZGUoKSkpIHtcbiAgICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cbiAgICAgIF9leGVjdXRlSG9va3MoaG9va3MudXBvblNhbml0aXplU2hhZG93Tm9kZSwgc2hhZG93Tm9kZSwgbnVsbCk7XG5cbiAgICAgIC8qIFNhbml0aXplIHRhZ3MgYW5kIGVsZW1lbnRzICovXG4gICAgICBfc2FuaXRpemVFbGVtZW50cyhzaGFkb3dOb2RlKTtcblxuICAgICAgLyogQ2hlY2sgYXR0cmlidXRlcyBuZXh0ICovXG4gICAgICBfc2FuaXRpemVBdHRyaWJ1dGVzKHNoYWRvd05vZGUpO1xuXG4gICAgICAvKiBEZWVwIHNoYWRvdyBET00gZGV0ZWN0ZWQgKi9cbiAgICAgIGlmIChzaGFkb3dOb2RlLmNvbnRlbnQgaW5zdGFuY2VvZiBEb2N1bWVudEZyYWdtZW50KSB7XG4gICAgICAgIF9zYW5pdGl6ZVNoYWRvd0RPTShzaGFkb3dOb2RlLmNvbnRlbnQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cbiAgICBfZXhlY3V0ZUhvb2tzKGhvb2tzLmFmdGVyU2FuaXRpemVTaGFkb3dET00sIGZyYWdtZW50LCBudWxsKTtcbiAgfTtcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29tcGxleGl0eVxuICBET01QdXJpZnkuc2FuaXRpemUgPSBmdW5jdGlvbiAoZGlydHksIGNmZyA9IHt9KSB7XG4gICAgbGV0IGJvZHkgPSBudWxsO1xuICAgIGxldCBpbXBvcnRlZE5vZGUgPSBudWxsO1xuICAgIGxldCBjdXJyZW50Tm9kZSA9IG51bGw7XG4gICAgbGV0IHJldHVybk5vZGUgPSBudWxsO1xuICAgIC8qIE1ha2Ugc3VyZSB3ZSBoYXZlIGEgc3RyaW5nIHRvIHNhbml0aXplLlxuICAgICAgRE8gTk9UIHJldHVybiBlYXJseSwgYXMgdGhpcyB3aWxsIHJldHVybiB0aGUgd3JvbmcgdHlwZSBpZlxuICAgICAgdGhlIHVzZXIgaGFzIHJlcXVlc3RlZCBhIERPTSBvYmplY3QgcmF0aGVyIHRoYW4gYSBzdHJpbmcgKi9cbiAgICBJU19FTVBUWV9JTlBVVCA9ICFkaXJ0eTtcbiAgICBpZiAoSVNfRU1QVFlfSU5QVVQpIHtcbiAgICAgIGRpcnR5ID0gJzwhLS0+JztcbiAgICB9XG5cbiAgICAvKiBTdHJpbmdpZnksIGluIGNhc2UgZGlydHkgaXMgYW4gb2JqZWN0ICovXG4gICAgaWYgKHR5cGVvZiBkaXJ0eSAhPT0gJ3N0cmluZycgJiYgIV9pc05vZGUoZGlydHkpKSB7XG4gICAgICBpZiAodHlwZW9mIGRpcnR5LnRvU3RyaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGRpcnR5ID0gZGlydHkudG9TdHJpbmcoKTtcbiAgICAgICAgaWYgKHR5cGVvZiBkaXJ0eSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICB0aHJvdyB0eXBlRXJyb3JDcmVhdGUoJ2RpcnR5IGlzIG5vdCBhIHN0cmluZywgYWJvcnRpbmcnKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgdHlwZUVycm9yQ3JlYXRlKCd0b1N0cmluZyBpcyBub3QgYSBmdW5jdGlvbicpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qIFJldHVybiBkaXJ0eSBIVE1MIGlmIERPTVB1cmlmeSBjYW5ub3QgcnVuICovXG4gICAgaWYgKCFET01QdXJpZnkuaXNTdXBwb3J0ZWQpIHtcbiAgICAgIHJldHVybiBkaXJ0eTtcbiAgICB9XG5cbiAgICAvKiBBc3NpZ24gY29uZmlnIHZhcnMgKi9cbiAgICBpZiAoIVNFVF9DT05GSUcpIHtcbiAgICAgIF9wYXJzZUNvbmZpZyhjZmcpO1xuICAgIH1cblxuICAgIC8qIENsZWFuIHVwIHJlbW92ZWQgZWxlbWVudHMgKi9cbiAgICBET01QdXJpZnkucmVtb3ZlZCA9IFtdO1xuXG4gICAgLyogQ2hlY2sgaWYgZGlydHkgaXMgY29ycmVjdGx5IHR5cGVkIGZvciBJTl9QTEFDRSAqL1xuICAgIGlmICh0eXBlb2YgZGlydHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICBJTl9QTEFDRSA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChJTl9QTEFDRSkge1xuICAgICAgLyogRG8gc29tZSBlYXJseSBwcmUtc2FuaXRpemF0aW9uIHRvIGF2b2lkIHVuc2FmZSByb290IG5vZGVzICovXG4gICAgICBpZiAoKGRpcnR5IGFzIE5vZGUpLm5vZGVOYW1lKSB7XG4gICAgICAgIGNvbnN0IHRhZ05hbWUgPSB0cmFuc2Zvcm1DYXNlRnVuYygoZGlydHkgYXMgTm9kZSkubm9kZU5hbWUpO1xuICAgICAgICBpZiAoIUFMTE9XRURfVEFHU1t0YWdOYW1lXSB8fCBGT1JCSURfVEFHU1t0YWdOYW1lXSkge1xuICAgICAgICAgIHRocm93IHR5cGVFcnJvckNyZWF0ZShcbiAgICAgICAgICAgICdyb290IG5vZGUgaXMgZm9yYmlkZGVuIGFuZCBjYW5ub3QgYmUgc2FuaXRpemVkIGluLXBsYWNlJ1xuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGRpcnR5IGluc3RhbmNlb2YgTm9kZSkge1xuICAgICAgLyogSWYgZGlydHkgaXMgYSBET00gZWxlbWVudCwgYXBwZW5kIHRvIGFuIGVtcHR5IGRvY3VtZW50IHRvIGF2b2lkXG4gICAgICAgICBlbGVtZW50cyBiZWluZyBzdHJpcHBlZCBieSB0aGUgcGFyc2VyICovXG4gICAgICBib2R5ID0gX2luaXREb2N1bWVudCgnPCEtLS0tPicpO1xuICAgICAgaW1wb3J0ZWROb2RlID0gYm9keS5vd25lckRvY3VtZW50LmltcG9ydE5vZGUoZGlydHksIHRydWUpO1xuICAgICAgaWYgKFxuICAgICAgICBpbXBvcnRlZE5vZGUubm9kZVR5cGUgPT09IE5PREVfVFlQRS5lbGVtZW50ICYmXG4gICAgICAgIGltcG9ydGVkTm9kZS5ub2RlTmFtZSA9PT0gJ0JPRFknXG4gICAgICApIHtcbiAgICAgICAgLyogTm9kZSBpcyBhbHJlYWR5IGEgYm9keSwgdXNlIGFzIGlzICovXG4gICAgICAgIGJvZHkgPSBpbXBvcnRlZE5vZGU7XG4gICAgICB9IGVsc2UgaWYgKGltcG9ydGVkTm9kZS5ub2RlTmFtZSA9PT0gJ0hUTUwnKSB7XG4gICAgICAgIGJvZHkgPSBpbXBvcnRlZE5vZGU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdW5pY29ybi9wcmVmZXItZG9tLW5vZGUtYXBwZW5kXG4gICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQoaW1wb3J0ZWROb2RlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLyogRXhpdCBkaXJlY3RseSBpZiB3ZSBoYXZlIG5vdGhpbmcgdG8gZG8gKi9cbiAgICAgIGlmIChcbiAgICAgICAgIVJFVFVSTl9ET00gJiZcbiAgICAgICAgIVNBRkVfRk9SX1RFTVBMQVRFUyAmJlxuICAgICAgICAhV0hPTEVfRE9DVU1FTlQgJiZcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHVuaWNvcm4vcHJlZmVyLWluY2x1ZGVzXG4gICAgICAgIGRpcnR5LmluZGV4T2YoJzwnKSA9PT0gLTFcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gdHJ1c3RlZFR5cGVzUG9saWN5ICYmIFJFVFVSTl9UUlVTVEVEX1RZUEVcbiAgICAgICAgICA/IHRydXN0ZWRUeXBlc1BvbGljeS5jcmVhdGVIVE1MKGRpcnR5KVxuICAgICAgICAgIDogZGlydHk7XG4gICAgICB9XG5cbiAgICAgIC8qIEluaXRpYWxpemUgdGhlIGRvY3VtZW50IHRvIHdvcmsgb24gKi9cbiAgICAgIGJvZHkgPSBfaW5pdERvY3VtZW50KGRpcnR5KTtcblxuICAgICAgLyogQ2hlY2sgd2UgaGF2ZSBhIERPTSBub2RlIGZyb20gdGhlIGRhdGEgKi9cbiAgICAgIGlmICghYm9keSkge1xuICAgICAgICByZXR1cm4gUkVUVVJOX0RPTSA/IG51bGwgOiBSRVRVUk5fVFJVU1RFRF9UWVBFID8gZW1wdHlIVE1MIDogJyc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyogUmVtb3ZlIGZpcnN0IGVsZW1lbnQgbm9kZSAob3VycykgaWYgRk9SQ0VfQk9EWSBpcyBzZXQgKi9cbiAgICBpZiAoYm9keSAmJiBGT1JDRV9CT0RZKSB7XG4gICAgICBfZm9yY2VSZW1vdmUoYm9keS5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICAvKiBHZXQgbm9kZSBpdGVyYXRvciAqL1xuICAgIGNvbnN0IG5vZGVJdGVyYXRvciA9IF9jcmVhdGVOb2RlSXRlcmF0b3IoSU5fUExBQ0UgPyBkaXJ0eSA6IGJvZHkpO1xuXG4gICAgLyogTm93IHN0YXJ0IGl0ZXJhdGluZyBvdmVyIHRoZSBjcmVhdGVkIGRvY3VtZW50ICovXG4gICAgd2hpbGUgKChjdXJyZW50Tm9kZSA9IG5vZGVJdGVyYXRvci5uZXh0Tm9kZSgpKSkge1xuICAgICAgLyogU2FuaXRpemUgdGFncyBhbmQgZWxlbWVudHMgKi9cbiAgICAgIF9zYW5pdGl6ZUVsZW1lbnRzKGN1cnJlbnROb2RlKTtcblxuICAgICAgLyogQ2hlY2sgYXR0cmlidXRlcyBuZXh0ICovXG4gICAgICBfc2FuaXRpemVBdHRyaWJ1dGVzKGN1cnJlbnROb2RlKTtcblxuICAgICAgLyogU2hhZG93IERPTSBkZXRlY3RlZCwgc2FuaXRpemUgaXQgKi9cbiAgICAgIGlmIChjdXJyZW50Tm9kZS5jb250ZW50IGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudCkge1xuICAgICAgICBfc2FuaXRpemVTaGFkb3dET00oY3VycmVudE5vZGUuY29udGVudCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyogSWYgd2Ugc2FuaXRpemVkIGBkaXJ0eWAgaW4tcGxhY2UsIHJldHVybiBpdC4gKi9cbiAgICBpZiAoSU5fUExBQ0UpIHtcbiAgICAgIHJldHVybiBkaXJ0eTtcbiAgICB9XG5cbiAgICAvKiBSZXR1cm4gc2FuaXRpemVkIHN0cmluZyBvciBET00gKi9cbiAgICBpZiAoUkVUVVJOX0RPTSkge1xuICAgICAgaWYgKFJFVFVSTl9ET01fRlJBR01FTlQpIHtcbiAgICAgICAgcmV0dXJuTm9kZSA9IGNyZWF0ZURvY3VtZW50RnJhZ21lbnQuY2FsbChib2R5Lm93bmVyRG9jdW1lbnQpO1xuXG4gICAgICAgIHdoaWxlIChib2R5LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdW5pY29ybi9wcmVmZXItZG9tLW5vZGUtYXBwZW5kXG4gICAgICAgICAgcmV0dXJuTm9kZS5hcHBlbmRDaGlsZChib2R5LmZpcnN0Q2hpbGQpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm5Ob2RlID0gYm9keTtcbiAgICAgIH1cblxuICAgICAgaWYgKEFMTE9XRURfQVRUUi5zaGFkb3dyb290IHx8IEFMTE9XRURfQVRUUi5zaGFkb3dyb290bW9kZSkge1xuICAgICAgICAvKlxuICAgICAgICAgIEFkb3B0Tm9kZSgpIGlzIG5vdCB1c2VkIGJlY2F1c2UgaW50ZXJuYWwgc3RhdGUgaXMgbm90IHJlc2V0XG4gICAgICAgICAgKGUuZy4gdGhlIHBhc3QgbmFtZXMgbWFwIG9mIGEgSFRNTEZvcm1FbGVtZW50KSwgdGhpcyBpcyBzYWZlXG4gICAgICAgICAgaW4gdGhlb3J5IGJ1dCB3ZSB3b3VsZCByYXRoZXIgbm90IHJpc2sgYW5vdGhlciBhdHRhY2sgdmVjdG9yLlxuICAgICAgICAgIFRoZSBzdGF0ZSB0aGF0IGlzIGNsb25lZCBieSBpbXBvcnROb2RlKCkgaXMgZXhwbGljaXRseSBkZWZpbmVkXG4gICAgICAgICAgYnkgdGhlIHNwZWNzLlxuICAgICAgICAqL1xuICAgICAgICByZXR1cm5Ob2RlID0gaW1wb3J0Tm9kZS5jYWxsKG9yaWdpbmFsRG9jdW1lbnQsIHJldHVybk5vZGUsIHRydWUpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmV0dXJuTm9kZTtcbiAgICB9XG5cbiAgICBsZXQgc2VyaWFsaXplZEhUTUwgPSBXSE9MRV9ET0NVTUVOVCA/IGJvZHkub3V0ZXJIVE1MIDogYm9keS5pbm5lckhUTUw7XG5cbiAgICAvKiBTZXJpYWxpemUgZG9jdHlwZSBpZiBhbGxvd2VkICovXG4gICAgaWYgKFxuICAgICAgV0hPTEVfRE9DVU1FTlQgJiZcbiAgICAgIEFMTE9XRURfVEFHU1snIWRvY3R5cGUnXSAmJlxuICAgICAgYm9keS5vd25lckRvY3VtZW50ICYmXG4gICAgICBib2R5Lm93bmVyRG9jdW1lbnQuZG9jdHlwZSAmJlxuICAgICAgYm9keS5vd25lckRvY3VtZW50LmRvY3R5cGUubmFtZSAmJlxuICAgICAgcmVnRXhwVGVzdChFWFBSRVNTSU9OUy5ET0NUWVBFX05BTUUsIGJvZHkub3duZXJEb2N1bWVudC5kb2N0eXBlLm5hbWUpXG4gICAgKSB7XG4gICAgICBzZXJpYWxpemVkSFRNTCA9XG4gICAgICAgICc8IURPQ1RZUEUgJyArIGJvZHkub3duZXJEb2N1bWVudC5kb2N0eXBlLm5hbWUgKyAnPlxcbicgKyBzZXJpYWxpemVkSFRNTDtcbiAgICB9XG5cbiAgICAvKiBTYW5pdGl6ZSBmaW5hbCBzdHJpbmcgdGVtcGxhdGUtc2FmZSAqL1xuICAgIGlmIChTQUZFX0ZPUl9URU1QTEFURVMpIHtcbiAgICAgIGFycmF5Rm9yRWFjaChbTVVTVEFDSEVfRVhQUiwgRVJCX0VYUFIsIFRNUExJVF9FWFBSXSwgKGV4cHI6IFJlZ0V4cCkgPT4ge1xuICAgICAgICBzZXJpYWxpemVkSFRNTCA9IHN0cmluZ1JlcGxhY2Uoc2VyaWFsaXplZEhUTUwsIGV4cHIsICcgJyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1c3RlZFR5cGVzUG9saWN5ICYmIFJFVFVSTl9UUlVTVEVEX1RZUEVcbiAgICAgID8gdHJ1c3RlZFR5cGVzUG9saWN5LmNyZWF0ZUhUTUwoc2VyaWFsaXplZEhUTUwpXG4gICAgICA6IHNlcmlhbGl6ZWRIVE1MO1xuICB9O1xuXG4gIERPTVB1cmlmeS5zZXRDb25maWcgPSBmdW5jdGlvbiAoY2ZnID0ge30pIHtcbiAgICBfcGFyc2VDb25maWcoY2ZnKTtcbiAgICBTRVRfQ09ORklHID0gdHJ1ZTtcbiAgfTtcblxuICBET01QdXJpZnkuY2xlYXJDb25maWcgPSBmdW5jdGlvbiAoKSB7XG4gICAgQ09ORklHID0gbnVsbDtcbiAgICBTRVRfQ09ORklHID0gZmFsc2U7XG4gIH07XG5cbiAgRE9NUHVyaWZ5LmlzVmFsaWRBdHRyaWJ1dGUgPSBmdW5jdGlvbiAodGFnLCBhdHRyLCB2YWx1ZSkge1xuICAgIC8qIEluaXRpYWxpemUgc2hhcmVkIGNvbmZpZyB2YXJzIGlmIG5lY2Vzc2FyeS4gKi9cbiAgICBpZiAoIUNPTkZJRykge1xuICAgICAgX3BhcnNlQ29uZmlnKHt9KTtcbiAgICB9XG5cbiAgICBjb25zdCBsY1RhZyA9IHRyYW5zZm9ybUNhc2VGdW5jKHRhZyk7XG4gICAgY29uc3QgbGNOYW1lID0gdHJhbnNmb3JtQ2FzZUZ1bmMoYXR0cik7XG4gICAgcmV0dXJuIF9pc1ZhbGlkQXR0cmlidXRlKGxjVGFnLCBsY05hbWUsIHZhbHVlKTtcbiAgfTtcblxuICBET01QdXJpZnkuYWRkSG9vayA9IGZ1bmN0aW9uIChcbiAgICBlbnRyeVBvaW50OiBrZXlvZiBIb29rc01hcCxcbiAgICBob29rRnVuY3Rpb246IEhvb2tGdW5jdGlvblxuICApIHtcbiAgICBpZiAodHlwZW9mIGhvb2tGdW5jdGlvbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGFycmF5UHVzaChob29rc1tlbnRyeVBvaW50XSwgaG9va0Z1bmN0aW9uKTtcbiAgfTtcblxuICBET01QdXJpZnkucmVtb3ZlSG9vayA9IGZ1bmN0aW9uIChcbiAgICBlbnRyeVBvaW50OiBrZXlvZiBIb29rc01hcCxcbiAgICBob29rRnVuY3Rpb246IEhvb2tGdW5jdGlvblxuICApIHtcbiAgICBpZiAoaG9va0Z1bmN0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gYXJyYXlMYXN0SW5kZXhPZihob29rc1tlbnRyeVBvaW50XSwgaG9va0Z1bmN0aW9uKTtcblxuICAgICAgcmV0dXJuIGluZGV4ID09PSAtMVxuICAgICAgICA/IHVuZGVmaW5lZFxuICAgICAgICA6IGFycmF5U3BsaWNlKGhvb2tzW2VudHJ5UG9pbnRdLCBpbmRleCwgMSlbMF07XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycmF5UG9wKGhvb2tzW2VudHJ5UG9pbnRdKTtcbiAgfTtcblxuICBET01QdXJpZnkucmVtb3ZlSG9va3MgPSBmdW5jdGlvbiAoZW50cnlQb2ludDoga2V5b2YgSG9va3NNYXApIHtcbiAgICBob29rc1tlbnRyeVBvaW50XSA9IFtdO1xuICB9O1xuXG4gIERPTVB1cmlmeS5yZW1vdmVBbGxIb29rcyA9IGZ1bmN0aW9uICgpIHtcbiAgICBob29rcyA9IF9jcmVhdGVIb29rc01hcCgpO1xuICB9O1xuXG4gIHJldHVybiBET01QdXJpZnk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZURPTVB1cmlmeSgpO1xuXG5leHBvcnQgaW50ZXJmYWNlIERPTVB1cmlmeSB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgRE9NUHVyaWZ5IGluc3RhbmNlIHVzaW5nIHRoZSBnaXZlbiB3aW5kb3ctbGlrZSBvYmplY3QuIERlZmF1bHRzIHRvIGB3aW5kb3dgLlxuICAgKi9cbiAgKHJvb3Q/OiBXaW5kb3dMaWtlKTogRE9NUHVyaWZ5O1xuXG4gIC8qKlxuICAgKiBWZXJzaW9uIGxhYmVsLCBleHBvc2VkIGZvciBlYXNpZXIgY2hlY2tzXG4gICAqIGlmIERPTVB1cmlmeSBpcyB1cCB0byBkYXRlIG9yIG5vdFxuICAgKi9cbiAgdmVyc2lvbjogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBcnJheSBvZiBlbGVtZW50cyB0aGF0IERPTVB1cmlmeSByZW1vdmVkIGR1cmluZyBzYW5pdGF0aW9uLlxuICAgKiBFbXB0eSBpZiBub3RoaW5nIHdhcyByZW1vdmVkLlxuICAgKi9cbiAgcmVtb3ZlZDogQXJyYXk8UmVtb3ZlZEVsZW1lbnQgfCBSZW1vdmVkQXR0cmlidXRlPjtcblxuICAvKipcbiAgICogRXhwb3NlIHdoZXRoZXIgdGhpcyBicm93c2VyIHN1cHBvcnRzIHJ1bm5pbmcgdGhlIGZ1bGwgRE9NUHVyaWZ5LlxuICAgKi9cbiAgaXNTdXBwb3J0ZWQ6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgY29uZmlndXJhdGlvbiBvbmNlLlxuICAgKlxuICAgKiBAcGFyYW0gY2ZnIGNvbmZpZ3VyYXRpb24gb2JqZWN0XG4gICAqL1xuICBzZXRDb25maWcoY2ZnPzogQ29uZmlnKTogdm9pZDtcblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgY29uZmlndXJhdGlvbi5cbiAgICovXG4gIGNsZWFyQ29uZmlnKCk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIFByb3ZpZGVzIGNvcmUgc2FuaXRhdGlvbiBmdW5jdGlvbmFsaXR5LlxuICAgKlxuICAgKiBAcGFyYW0gZGlydHkgc3RyaW5nIG9yIERPTSBub2RlXG4gICAqIEBwYXJhbSBjZmcgb2JqZWN0XG4gICAqIEByZXR1cm5zIFNhbml0aXplZCBUcnVzdGVkSFRNTC5cbiAgICovXG4gIHNhbml0aXplKFxuICAgIGRpcnR5OiBzdHJpbmcgfCBOb2RlLFxuICAgIGNmZzogQ29uZmlnICYgeyBSRVRVUk5fVFJVU1RFRF9UWVBFOiB0cnVlIH1cbiAgKTogVHJ1c3RlZEhUTUw7XG5cbiAgLyoqXG4gICAqIFByb3ZpZGVzIGNvcmUgc2FuaXRhdGlvbiBmdW5jdGlvbmFsaXR5LlxuICAgKlxuICAgKiBAcGFyYW0gZGlydHkgRE9NIG5vZGVcbiAgICogQHBhcmFtIGNmZyBvYmplY3RcbiAgICogQHJldHVybnMgU2FuaXRpemVkIERPTSBub2RlLlxuICAgKi9cbiAgc2FuaXRpemUoZGlydHk6IE5vZGUsIGNmZzogQ29uZmlnICYgeyBJTl9QTEFDRTogdHJ1ZSB9KTogTm9kZTtcblxuICAvKipcbiAgICogUHJvdmlkZXMgY29yZSBzYW5pdGF0aW9uIGZ1bmN0aW9uYWxpdHkuXG4gICAqXG4gICAqIEBwYXJhbSBkaXJ0eSBzdHJpbmcgb3IgRE9NIG5vZGVcbiAgICogQHBhcmFtIGNmZyBvYmplY3RcbiAgICogQHJldHVybnMgU2FuaXRpemVkIERPTSBub2RlLlxuICAgKi9cbiAgc2FuaXRpemUoZGlydHk6IHN0cmluZyB8IE5vZGUsIGNmZzogQ29uZmlnICYgeyBSRVRVUk5fRE9NOiB0cnVlIH0pOiBOb2RlO1xuXG4gIC8qKlxuICAgKiBQcm92aWRlcyBjb3JlIHNhbml0YXRpb24gZnVuY3Rpb25hbGl0eS5cbiAgICpcbiAgICogQHBhcmFtIGRpcnR5IHN0cmluZyBvciBET00gbm9kZVxuICAgKiBAcGFyYW0gY2ZnIG9iamVjdFxuICAgKiBAcmV0dXJucyBTYW5pdGl6ZWQgZG9jdW1lbnQgZnJhZ21lbnQuXG4gICAqL1xuICBzYW5pdGl6ZShcbiAgICBkaXJ0eTogc3RyaW5nIHwgTm9kZSxcbiAgICBjZmc6IENvbmZpZyAmIHsgUkVUVVJOX0RPTV9GUkFHTUVOVDogdHJ1ZSB9XG4gICk6IERvY3VtZW50RnJhZ21lbnQ7XG5cbiAgLyoqXG4gICAqIFByb3ZpZGVzIGNvcmUgc2FuaXRhdGlvbiBmdW5jdGlvbmFsaXR5LlxuICAgKlxuICAgKiBAcGFyYW0gZGlydHkgc3RyaW5nIG9yIERPTSBub2RlXG4gICAqIEBwYXJhbSBjZmcgb2JqZWN0XG4gICAqIEByZXR1cm5zIFNhbml0aXplZCBzdHJpbmcuXG4gICAqL1xuICBzYW5pdGl6ZShkaXJ0eTogc3RyaW5nIHwgTm9kZSwgY2ZnPzogQ29uZmlnKTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYW4gYXR0cmlidXRlIHZhbHVlIGlzIHZhbGlkLlxuICAgKiBVc2VzIGxhc3Qgc2V0IGNvbmZpZywgaWYgYW55LiBPdGhlcndpc2UsIHVzZXMgY29uZmlnIGRlZmF1bHRzLlxuICAgKlxuICAgKiBAcGFyYW0gdGFnIFRhZyBuYW1lIG9mIGNvbnRhaW5pbmcgZWxlbWVudC5cbiAgICogQHBhcmFtIGF0dHIgQXR0cmlidXRlIG5hbWUuXG4gICAqIEBwYXJhbSB2YWx1ZSBBdHRyaWJ1dGUgdmFsdWUuXG4gICAqIEByZXR1cm5zIFJldHVybnMgdHJ1ZSBpZiBgdmFsdWVgIGlzIHZhbGlkLiBPdGhlcndpc2UsIHJldHVybnMgZmFsc2UuXG4gICAqL1xuICBpc1ZhbGlkQXR0cmlidXRlKHRhZzogc3RyaW5nLCBhdHRyOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBBZGRzIGEgRE9NUHVyaWZ5IGhvb2suXG4gICAqXG4gICAqIEBwYXJhbSBlbnRyeVBvaW50IGVudHJ5IHBvaW50IGZvciB0aGUgaG9vayB0byBhZGRcbiAgICogQHBhcmFtIGhvb2tGdW5jdGlvbiBmdW5jdGlvbiB0byBleGVjdXRlXG4gICAqL1xuICBhZGRIb29rKGVudHJ5UG9pbnQ6IEJhc2ljSG9va05hbWUsIGhvb2tGdW5jdGlvbjogTm9kZUhvb2spOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBBZGRzIGEgRE9NUHVyaWZ5IGhvb2suXG4gICAqXG4gICAqIEBwYXJhbSBlbnRyeVBvaW50IGVudHJ5IHBvaW50IGZvciB0aGUgaG9vayB0byBhZGRcbiAgICogQHBhcmFtIGhvb2tGdW5jdGlvbiBmdW5jdGlvbiB0byBleGVjdXRlXG4gICAqL1xuICBhZGRIb29rKGVudHJ5UG9pbnQ6IEVsZW1lbnRIb29rTmFtZSwgaG9va0Z1bmN0aW9uOiBFbGVtZW50SG9vayk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBET01QdXJpZnkgaG9vay5cbiAgICpcbiAgICogQHBhcmFtIGVudHJ5UG9pbnQgZW50cnkgcG9pbnQgZm9yIHRoZSBob29rIHRvIGFkZFxuICAgKiBAcGFyYW0gaG9va0Z1bmN0aW9uIGZ1bmN0aW9uIHRvIGV4ZWN1dGVcbiAgICovXG4gIGFkZEhvb2soXG4gICAgZW50cnlQb2ludDogRG9jdW1lbnRGcmFnbWVudEhvb2tOYW1lLFxuICAgIGhvb2tGdW5jdGlvbjogRG9jdW1lbnRGcmFnbWVudEhvb2tcbiAgKTogdm9pZDtcblxuICAvKipcbiAgICogQWRkcyBhIERPTVB1cmlmeSBob29rLlxuICAgKlxuICAgKiBAcGFyYW0gZW50cnlQb2ludCBlbnRyeSBwb2ludCBmb3IgdGhlIGhvb2sgdG8gYWRkXG4gICAqIEBwYXJhbSBob29rRnVuY3Rpb24gZnVuY3Rpb24gdG8gZXhlY3V0ZVxuICAgKi9cbiAgYWRkSG9vayhcbiAgICBlbnRyeVBvaW50OiAndXBvblNhbml0aXplRWxlbWVudCcsXG4gICAgaG9va0Z1bmN0aW9uOiBVcG9uU2FuaXRpemVFbGVtZW50SG9va1xuICApOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBBZGRzIGEgRE9NUHVyaWZ5IGhvb2suXG4gICAqXG4gICAqIEBwYXJhbSBlbnRyeVBvaW50IGVudHJ5IHBvaW50IGZvciB0aGUgaG9vayB0byBhZGRcbiAgICogQHBhcmFtIGhvb2tGdW5jdGlvbiBmdW5jdGlvbiB0byBleGVjdXRlXG4gICAqL1xuICBhZGRIb29rKFxuICAgIGVudHJ5UG9pbnQ6ICd1cG9uU2FuaXRpemVBdHRyaWJ1dGUnLFxuICAgIGhvb2tGdW5jdGlvbjogVXBvblNhbml0aXplQXR0cmlidXRlSG9va1xuICApOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBSZW1vdmUgYSBET01QdXJpZnkgaG9vayBhdCBhIGdpdmVuIGVudHJ5UG9pbnRcbiAgICogKHBvcHMgaXQgZnJvbSB0aGUgc3RhY2sgb2YgaG9va3MgaWYgaG9vayBub3Qgc3BlY2lmaWVkKVxuICAgKlxuICAgKiBAcGFyYW0gZW50cnlQb2ludCBlbnRyeSBwb2ludCBmb3IgdGhlIGhvb2sgdG8gcmVtb3ZlXG4gICAqIEBwYXJhbSBob29rRnVuY3Rpb24gb3B0aW9uYWwgc3BlY2lmaWMgaG9vayB0byByZW1vdmVcbiAgICogQHJldHVybnMgcmVtb3ZlZCBob29rXG4gICAqL1xuICByZW1vdmVIb29rKFxuICAgIGVudHJ5UG9pbnQ6IEJhc2ljSG9va05hbWUsXG4gICAgaG9va0Z1bmN0aW9uPzogTm9kZUhvb2tcbiAgKTogTm9kZUhvb2sgfCB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhIERPTVB1cmlmeSBob29rIGF0IGEgZ2l2ZW4gZW50cnlQb2ludFxuICAgKiAocG9wcyBpdCBmcm9tIHRoZSBzdGFjayBvZiBob29rcyBpZiBob29rIG5vdCBzcGVjaWZpZWQpXG4gICAqXG4gICAqIEBwYXJhbSBlbnRyeVBvaW50IGVudHJ5IHBvaW50IGZvciB0aGUgaG9vayB0byByZW1vdmVcbiAgICogQHBhcmFtIGhvb2tGdW5jdGlvbiBvcHRpb25hbCBzcGVjaWZpYyBob29rIHRvIHJlbW92ZVxuICAgKiBAcmV0dXJucyByZW1vdmVkIGhvb2tcbiAgICovXG4gIHJlbW92ZUhvb2soXG4gICAgZW50cnlQb2ludDogRWxlbWVudEhvb2tOYW1lLFxuICAgIGhvb2tGdW5jdGlvbj86IEVsZW1lbnRIb29rXG4gICk6IEVsZW1lbnRIb29rIHwgdW5kZWZpbmVkO1xuXG4gIC8qKlxuICAgKiBSZW1vdmUgYSBET01QdXJpZnkgaG9vayBhdCBhIGdpdmVuIGVudHJ5UG9pbnRcbiAgICogKHBvcHMgaXQgZnJvbSB0aGUgc3RhY2sgb2YgaG9va3MgaWYgaG9vayBub3Qgc3BlY2lmaWVkKVxuICAgKlxuICAgKiBAcGFyYW0gZW50cnlQb2ludCBlbnRyeSBwb2ludCBmb3IgdGhlIGhvb2sgdG8gcmVtb3ZlXG4gICAqIEBwYXJhbSBob29rRnVuY3Rpb24gb3B0aW9uYWwgc3BlY2lmaWMgaG9vayB0byByZW1vdmVcbiAgICogQHJldHVybnMgcmVtb3ZlZCBob29rXG4gICAqL1xuICByZW1vdmVIb29rKFxuICAgIGVudHJ5UG9pbnQ6IERvY3VtZW50RnJhZ21lbnRIb29rTmFtZSxcbiAgICBob29rRnVuY3Rpb24/OiBEb2N1bWVudEZyYWdtZW50SG9va1xuICApOiBEb2N1bWVudEZyYWdtZW50SG9vayB8IHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogUmVtb3ZlIGEgRE9NUHVyaWZ5IGhvb2sgYXQgYSBnaXZlbiBlbnRyeVBvaW50XG4gICAqIChwb3BzIGl0IGZyb20gdGhlIHN0YWNrIG9mIGhvb2tzIGlmIGhvb2sgbm90IHNwZWNpZmllZClcbiAgICpcbiAgICogQHBhcmFtIGVudHJ5UG9pbnQgZW50cnkgcG9pbnQgZm9yIHRoZSBob29rIHRvIHJlbW92ZVxuICAgKiBAcGFyYW0gaG9va0Z1bmN0aW9uIG9wdGlvbmFsIHNwZWNpZmljIGhvb2sgdG8gcmVtb3ZlXG4gICAqIEByZXR1cm5zIHJlbW92ZWQgaG9va1xuICAgKi9cbiAgcmVtb3ZlSG9vayhcbiAgICBlbnRyeVBvaW50OiAndXBvblNhbml0aXplRWxlbWVudCcsXG4gICAgaG9va0Z1bmN0aW9uPzogVXBvblNhbml0aXplRWxlbWVudEhvb2tcbiAgKTogVXBvblNhbml0aXplRWxlbWVudEhvb2sgfCB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhIERPTVB1cmlmeSBob29rIGF0IGEgZ2l2ZW4gZW50cnlQb2ludFxuICAgKiAocG9wcyBpdCBmcm9tIHRoZSBzdGFjayBvZiBob29rcyBpZiBob29rIG5vdCBzcGVjaWZpZWQpXG4gICAqXG4gICAqIEBwYXJhbSBlbnRyeVBvaW50IGVudHJ5IHBvaW50IGZvciB0aGUgaG9vayB0byByZW1vdmVcbiAgICogQHBhcmFtIGhvb2tGdW5jdGlvbiBvcHRpb25hbCBzcGVjaWZpYyBob29rIHRvIHJlbW92ZVxuICAgKiBAcmV0dXJucyByZW1vdmVkIGhvb2tcbiAgICovXG4gIHJlbW92ZUhvb2soXG4gICAgZW50cnlQb2ludDogJ3Vwb25TYW5pdGl6ZUF0dHJpYnV0ZScsXG4gICAgaG9va0Z1bmN0aW9uPzogVXBvblNhbml0aXplQXR0cmlidXRlSG9va1xuICApOiBVcG9uU2FuaXRpemVBdHRyaWJ1dGVIb29rIHwgdW5kZWZpbmVkO1xuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCBET01QdXJpZnkgaG9va3MgYXQgYSBnaXZlbiBlbnRyeVBvaW50XG4gICAqXG4gICAqIEBwYXJhbSBlbnRyeVBvaW50IGVudHJ5IHBvaW50IGZvciB0aGUgaG9va3MgdG8gcmVtb3ZlXG4gICAqL1xuICByZW1vdmVIb29rcyhlbnRyeVBvaW50OiBIb29rTmFtZSk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIERPTVB1cmlmeSBob29rcy5cbiAgICovXG4gIHJlbW92ZUFsbEhvb2tzKCk6IHZvaWQ7XG59XG5cbi8qKlxuICogQW4gZWxlbWVudCByZW1vdmVkIGJ5IERPTVB1cmlmeS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSZW1vdmVkRWxlbWVudCB7XG4gIC8qKlxuICAgKiBUaGUgZWxlbWVudCB0aGF0IHdhcyByZW1vdmVkLlxuICAgKi9cbiAgZWxlbWVudDogTm9kZTtcbn1cblxuLyoqXG4gKiBBbiBlbGVtZW50IHJlbW92ZWQgYnkgRE9NUHVyaWZ5LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFJlbW92ZWRBdHRyaWJ1dGUge1xuICAvKipcbiAgICogVGhlIGF0dHJpYnV0ZSB0aGF0IHdhcyByZW1vdmVkLlxuICAgKi9cbiAgYXR0cmlidXRlOiBBdHRyIHwgbnVsbDtcblxuICAvKipcbiAgICogVGhlIGVsZW1lbnQgdGhhdCB0aGUgYXR0cmlidXRlIHdhcyByZW1vdmVkLlxuICAgKi9cbiAgZnJvbTogTm9kZTtcbn1cblxudHlwZSBCYXNpY0hvb2tOYW1lID1cbiAgfCAnYmVmb3JlU2FuaXRpemVFbGVtZW50cydcbiAgfCAnYWZ0ZXJTYW5pdGl6ZUVsZW1lbnRzJ1xuICB8ICd1cG9uU2FuaXRpemVTaGFkb3dOb2RlJztcbnR5cGUgRWxlbWVudEhvb2tOYW1lID0gJ2JlZm9yZVNhbml0aXplQXR0cmlidXRlcycgfCAnYWZ0ZXJTYW5pdGl6ZUF0dHJpYnV0ZXMnO1xudHlwZSBEb2N1bWVudEZyYWdtZW50SG9va05hbWUgPVxuICB8ICdiZWZvcmVTYW5pdGl6ZVNoYWRvd0RPTSdcbiAgfCAnYWZ0ZXJTYW5pdGl6ZVNoYWRvd0RPTSc7XG50eXBlIFVwb25TYW5pdGl6ZUVsZW1lbnRIb29rTmFtZSA9ICd1cG9uU2FuaXRpemVFbGVtZW50JztcbnR5cGUgVXBvblNhbml0aXplQXR0cmlidXRlSG9va05hbWUgPSAndXBvblNhbml0aXplQXR0cmlidXRlJztcblxuaW50ZXJmYWNlIEhvb2tzTWFwIHtcbiAgYmVmb3JlU2FuaXRpemVFbGVtZW50czogTm9kZUhvb2tbXTtcbiAgYWZ0ZXJTYW5pdGl6ZUVsZW1lbnRzOiBOb2RlSG9va1tdO1xuICBiZWZvcmVTYW5pdGl6ZVNoYWRvd0RPTTogRG9jdW1lbnRGcmFnbWVudEhvb2tbXTtcbiAgdXBvblNhbml0aXplU2hhZG93Tm9kZTogTm9kZUhvb2tbXTtcbiAgYWZ0ZXJTYW5pdGl6ZVNoYWRvd0RPTTogRG9jdW1lbnRGcmFnbWVudEhvb2tbXTtcbiAgYmVmb3JlU2FuaXRpemVBdHRyaWJ1dGVzOiBFbGVtZW50SG9va1tdO1xuICBhZnRlclNhbml0aXplQXR0cmlidXRlczogRWxlbWVudEhvb2tbXTtcbiAgdXBvblNhbml0aXplRWxlbWVudDogVXBvblNhbml0aXplRWxlbWVudEhvb2tbXTtcbiAgdXBvblNhbml0aXplQXR0cmlidXRlOiBVcG9uU2FuaXRpemVBdHRyaWJ1dGVIb29rW107XG59XG5cbnR5cGUgQXJyYXlFbGVtZW50PFQ+ID0gVCBleHRlbmRzIEFycmF5PGluZmVyIFU+ID8gVSA6IG5ldmVyO1xuXG50eXBlIEhvb2tGdW5jdGlvbiA9IEFycmF5RWxlbWVudDxIb29rc01hcFtrZXlvZiBIb29rc01hcF0+O1xuXG5leHBvcnQgdHlwZSBIb29rTmFtZSA9XG4gIHwgQmFzaWNIb29rTmFtZVxuICB8IEVsZW1lbnRIb29rTmFtZVxuICB8IERvY3VtZW50RnJhZ21lbnRIb29rTmFtZVxuICB8IFVwb25TYW5pdGl6ZUVsZW1lbnRIb29rTmFtZVxuICB8IFVwb25TYW5pdGl6ZUF0dHJpYnV0ZUhvb2tOYW1lO1xuXG5leHBvcnQgdHlwZSBOb2RlSG9vayA9IChcbiAgdGhpczogRE9NUHVyaWZ5LFxuICBjdXJyZW50Tm9kZTogTm9kZSxcbiAgaG9va0V2ZW50OiBudWxsLFxuICBjb25maWc6IENvbmZpZ1xuKSA9PiB2b2lkO1xuXG5leHBvcnQgdHlwZSBFbGVtZW50SG9vayA9IChcbiAgdGhpczogRE9NUHVyaWZ5LFxuICBjdXJyZW50Tm9kZTogRWxlbWVudCxcbiAgaG9va0V2ZW50OiBudWxsLFxuICBjb25maWc6IENvbmZpZ1xuKSA9PiB2b2lkO1xuXG5leHBvcnQgdHlwZSBEb2N1bWVudEZyYWdtZW50SG9vayA9IChcbiAgdGhpczogRE9NUHVyaWZ5LFxuICBjdXJyZW50Tm9kZTogRG9jdW1lbnRGcmFnbWVudCxcbiAgaG9va0V2ZW50OiBudWxsLFxuICBjb25maWc6IENvbmZpZ1xuKSA9PiB2b2lkO1xuXG5leHBvcnQgdHlwZSBVcG9uU2FuaXRpemVFbGVtZW50SG9vayA9IChcbiAgdGhpczogRE9NUHVyaWZ5LFxuICBjdXJyZW50Tm9kZTogTm9kZSxcbiAgaG9va0V2ZW50OiBVcG9uU2FuaXRpemVFbGVtZW50SG9va0V2ZW50LFxuICBjb25maWc6IENvbmZpZ1xuKSA9PiB2b2lkO1xuXG5leHBvcnQgdHlwZSBVcG9uU2FuaXRpemVBdHRyaWJ1dGVIb29rID0gKFxuICB0aGlzOiBET01QdXJpZnksXG4gIGN1cnJlbnROb2RlOiBFbGVtZW50LFxuICBob29rRXZlbnQ6IFVwb25TYW5pdGl6ZUF0dHJpYnV0ZUhvb2tFdmVudCxcbiAgY29uZmlnOiBDb25maWdcbikgPT4gdm9pZDtcblxuZXhwb3J0IGludGVyZmFjZSBVcG9uU2FuaXRpemVFbGVtZW50SG9va0V2ZW50IHtcbiAgdGFnTmFtZTogc3RyaW5nO1xuICBhbGxvd2VkVGFnczogUmVjb3JkPHN0cmluZywgYm9vbGVhbj47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXBvblNhbml0aXplQXR0cmlidXRlSG9va0V2ZW50IHtcbiAgYXR0ck5hbWU6IHN0cmluZztcbiAgYXR0clZhbHVlOiBzdHJpbmc7XG4gIGtlZXBBdHRyOiBib29sZWFuO1xuICBhbGxvd2VkQXR0cmlidXRlczogUmVjb3JkPHN0cmluZywgYm9vbGVhbj47XG4gIGZvcmNlS2VlcEF0dHI6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogQSBgV2luZG93YC1saWtlIG9iamVjdCBjb250YWluaW5nIHRoZSBwcm9wZXJ0aWVzIGFuZCB0eXBlcyB0aGF0IERPTVB1cmlmeSByZXF1aXJlcy5cbiAqL1xuZXhwb3J0IHR5cGUgV2luZG93TGlrZSA9IFBpY2s8XG4gIHR5cGVvZiBnbG9iYWxUaGlzLFxuICB8ICdEb2N1bWVudEZyYWdtZW50J1xuICB8ICdIVE1MVGVtcGxhdGVFbGVtZW50J1xuICB8ICdOb2RlJ1xuICB8ICdFbGVtZW50J1xuICB8ICdOb2RlRmlsdGVyJ1xuICB8ICdOYW1lZE5vZGVNYXAnXG4gIHwgJ0hUTUxGb3JtRWxlbWVudCdcbiAgfCAnRE9NUGFyc2VyJ1xuPiAmIHtcbiAgZG9jdW1lbnQ/OiBEb2N1bWVudDtcbiAgTW96TmFtZWRBdHRyTWFwPzogdHlwZW9mIHdpbmRvdy5OYW1lZE5vZGVNYXA7XG59ICYgUGljazxUcnVzdGVkVHlwZXNXaW5kb3csICd0cnVzdGVkVHlwZXMnPjtcbiJdLCJuYW1lcyI6WyJlbnRyaWVzIiwic2V0UHJvdG90eXBlT2YiLCJpc0Zyb3plbiIsImdldFByb3RvdHlwZU9mIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiT2JqZWN0IiwiZnJlZXplIiwic2VhbCIsImNyZWF0ZSIsImFwcGx5IiwiY29uc3RydWN0IiwiUmVmbGVjdCIsIngiLCJmdW5jIiwidGhpc0FyZyIsIl9sZW4iLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJhcmdzIiwiQXJyYXkiLCJfa2V5IiwiRnVuYyIsIl9sZW4yIiwiX2tleTIiLCJhcnJheUZvckVhY2giLCJ1bmFwcGx5IiwicHJvdG90eXBlIiwiZm9yRWFjaCIsImFycmF5TGFzdEluZGV4T2YiLCJsYXN0SW5kZXhPZiIsImFycmF5UG9wIiwicG9wIiwiYXJyYXlQdXNoIiwicHVzaCIsImFycmF5U3BsaWNlIiwic3BsaWNlIiwic3RyaW5nVG9Mb3dlckNhc2UiLCJTdHJpbmciLCJ0b0xvd2VyQ2FzZSIsInN0cmluZ1RvU3RyaW5nIiwidG9TdHJpbmciLCJzdHJpbmdNYXRjaCIsIm1hdGNoIiwic3RyaW5nUmVwbGFjZSIsInJlcGxhY2UiLCJzdHJpbmdJbmRleE9mIiwiaW5kZXhPZiIsInN0cmluZ1RyaW0iLCJ0cmltIiwib2JqZWN0SGFzT3duUHJvcGVydHkiLCJoYXNPd25Qcm9wZXJ0eSIsInJlZ0V4cFRlc3QiLCJSZWdFeHAiLCJ0ZXN0IiwidHlwZUVycm9yQ3JlYXRlIiwidW5jb25zdHJ1Y3QiLCJUeXBlRXJyb3IiLCJsYXN0SW5kZXgiLCJfbGVuMyIsIl9rZXkzIiwiX2xlbjQiLCJfa2V5NCIsImFkZFRvU2V0Iiwic2V0IiwiYXJyYXkiLCJ0cmFuc2Zvcm1DYXNlRnVuYyIsImwiLCJlbGVtZW50IiwibGNFbGVtZW50IiwiY2xlYW5BcnJheSIsImluZGV4IiwiaXNQcm9wZXJ0eUV4aXN0IiwiY2xvbmUiLCJvYmplY3QiLCJuZXdPYmplY3QiLCJwcm9wZXJ0eSIsInZhbHVlIiwiaXNBcnJheSIsImNvbnN0cnVjdG9yIiwibG9va3VwR2V0dGVyIiwicHJvcCIsImRlc2MiLCJnZXQiLCJmYWxsYmFja1ZhbHVlIiwiaHRtbCIsInN2ZyIsInN2Z0ZpbHRlcnMiLCJzdmdEaXNhbGxvd2VkIiwibWF0aE1sIiwibWF0aE1sRGlzYWxsb3dlZCIsInRleHQiLCJ4bWwiLCJNVVNUQUNIRV9FWFBSIiwiRVJCX0VYUFIiLCJUTVBMSVRfRVhQUiIsIkRBVEFfQVRUUiIsIkFSSUFfQVRUUiIsIklTX0FMTE9XRURfVVJJIiwiSVNfU0NSSVBUX09SX0RBVEEiLCJBVFRSX1dISVRFU1BBQ0UiLCJET0NUWVBFX05BTUUiLCJDVVNUT01fRUxFTUVOVCIsIk5PREVfVFlQRSIsImF0dHJpYnV0ZSIsImNkYXRhU2VjdGlvbiIsImVudGl0eVJlZmVyZW5jZSIsImVudGl0eU5vZGUiLCJwcm9ncmVzc2luZ0luc3RydWN0aW9uIiwiY29tbWVudCIsImRvY3VtZW50IiwiZG9jdW1lbnRUeXBlIiwiZG9jdW1lbnRGcmFnbWVudCIsIm5vdGF0aW9uIiwiZ2V0R2xvYmFsIiwid2luZG93IiwiX2NyZWF0ZVRydXN0ZWRUeXBlc1BvbGljeSIsInRydXN0ZWRUeXBlcyIsInB1cmlmeUhvc3RFbGVtZW50IiwiY3JlYXRlUG9saWN5Iiwic3VmZml4IiwiQVRUUl9OQU1FIiwiaGFzQXR0cmlidXRlIiwiZ2V0QXR0cmlidXRlIiwicG9saWN5TmFtZSIsImNyZWF0ZUhUTUwiLCJjcmVhdGVTY3JpcHRVUkwiLCJzY3JpcHRVcmwiLCJfIiwiY29uc29sZSIsIndhcm4iLCJfY3JlYXRlSG9va3NNYXAiLCJhZnRlclNhbml0aXplQXR0cmlidXRlcyIsImFmdGVyU2FuaXRpemVFbGVtZW50cyIsImFmdGVyU2FuaXRpemVTaGFkb3dET00iLCJiZWZvcmVTYW5pdGl6ZUF0dHJpYnV0ZXMiLCJiZWZvcmVTYW5pdGl6ZUVsZW1lbnRzIiwiYmVmb3JlU2FuaXRpemVTaGFkb3dET00iLCJ1cG9uU2FuaXRpemVBdHRyaWJ1dGUiLCJ1cG9uU2FuaXRpemVFbGVtZW50IiwidXBvblNhbml0aXplU2hhZG93Tm9kZSIsImNyZWF0ZURPTVB1cmlmeSIsInVuZGVmaW5lZCIsIkRPTVB1cmlmeSIsInJvb3QiLCJ2ZXJzaW9uIiwiVkVSU0lPTiIsInJlbW92ZWQiLCJub2RlVHlwZSIsIkVsZW1lbnQiLCJpc1N1cHBvcnRlZCIsIm9yaWdpbmFsRG9jdW1lbnQiLCJjdXJyZW50U2NyaXB0IiwiRG9jdW1lbnRGcmFnbWVudCIsIkhUTUxUZW1wbGF0ZUVsZW1lbnQiLCJOb2RlIiwiTm9kZUZpbHRlciIsIk5hbWVkTm9kZU1hcCIsIk1vek5hbWVkQXR0ck1hcCIsIkhUTUxGb3JtRWxlbWVudCIsIkRPTVBhcnNlciIsIkVsZW1lbnRQcm90b3R5cGUiLCJjbG9uZU5vZGUiLCJyZW1vdmUiLCJnZXROZXh0U2libGluZyIsImdldENoaWxkTm9kZXMiLCJnZXRQYXJlbnROb2RlIiwidGVtcGxhdGUiLCJjcmVhdGVFbGVtZW50IiwiY29udGVudCIsIm93bmVyRG9jdW1lbnQiLCJ0cnVzdGVkVHlwZXNQb2xpY3kiLCJlbXB0eUhUTUwiLCJpbXBsZW1lbnRhdGlvbiIsImNyZWF0ZU5vZGVJdGVyYXRvciIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImltcG9ydE5vZGUiLCJob29rcyIsImNyZWF0ZUhUTUxEb2N1bWVudCIsIkVYUFJFU1NJT05TIiwiQUxMT1dFRF9UQUdTIiwiREVGQVVMVF9BTExPV0VEX1RBR1MiLCJUQUdTIiwiQUxMT1dFRF9BVFRSIiwiREVGQVVMVF9BTExPV0VEX0FUVFIiLCJBVFRSUyIsIkNVU1RPTV9FTEVNRU5UX0hBTkRMSU5HIiwidGFnTmFtZUNoZWNrIiwid3JpdGFibGUiLCJjb25maWd1cmFibGUiLCJlbnVtZXJhYmxlIiwiYXR0cmlidXRlTmFtZUNoZWNrIiwiYWxsb3dDdXN0b21pemVkQnVpbHRJbkVsZW1lbnRzIiwiRk9SQklEX1RBR1MiLCJGT1JCSURfQVRUUiIsIkVYVFJBX0VMRU1FTlRfSEFORExJTkciLCJ0YWdDaGVjayIsImF0dHJpYnV0ZUNoZWNrIiwiQUxMT1dfQVJJQV9BVFRSIiwiQUxMT1dfREFUQV9BVFRSIiwiQUxMT1dfVU5LTk9XTl9QUk9UT0NPTFMiLCJBTExPV19TRUxGX0NMT1NFX0lOX0FUVFIiLCJTQUZFX0ZPUl9URU1QTEFURVMiLCJTQUZFX0ZPUl9YTUwiLCJXSE9MRV9ET0NVTUVOVCIsIlNFVF9DT05GSUciLCJGT1JDRV9CT0RZIiwiUkVUVVJOX0RPTSIsIlJFVFVSTl9ET01fRlJBR01FTlQiLCJSRVRVUk5fVFJVU1RFRF9UWVBFIiwiU0FOSVRJWkVfRE9NIiwiU0FOSVRJWkVfTkFNRURfUFJPUFMiLCJTQU5JVElaRV9OQU1FRF9QUk9QU19QUkVGSVgiLCJLRUVQX0NPTlRFTlQiLCJJTl9QTEFDRSIsIlVTRV9QUk9GSUxFUyIsIkZPUkJJRF9DT05URU5UUyIsIkRFRkFVTFRfRk9SQklEX0NPTlRFTlRTIiwiREFUQV9VUklfVEFHUyIsIkRFRkFVTFRfREFUQV9VUklfVEFHUyIsIlVSSV9TQUZFX0FUVFJJQlVURVMiLCJERUZBVUxUX1VSSV9TQUZFX0FUVFJJQlVURVMiLCJNQVRITUxfTkFNRVNQQUNFIiwiU1ZHX05BTUVTUEFDRSIsIkhUTUxfTkFNRVNQQUNFIiwiTkFNRVNQQUNFIiwiSVNfRU1QVFlfSU5QVVQiLCJBTExPV0VEX05BTUVTUEFDRVMiLCJERUZBVUxUX0FMTE9XRURfTkFNRVNQQUNFUyIsIk1BVEhNTF9URVhUX0lOVEVHUkFUSU9OX1BPSU5UUyIsIkhUTUxfSU5URUdSQVRJT05fUE9JTlRTIiwiQ09NTU9OX1NWR19BTkRfSFRNTF9FTEVNRU5UUyIsIlBBUlNFUl9NRURJQV9UWVBFIiwiU1VQUE9SVEVEX1BBUlNFUl9NRURJQV9UWVBFUyIsIkRFRkFVTFRfUEFSU0VSX01FRElBX1RZUEUiLCJDT05GSUciLCJmb3JtRWxlbWVudCIsImlzUmVnZXhPckZ1bmN0aW9uIiwidGVzdFZhbHVlIiwiRnVuY3Rpb24iLCJfcGFyc2VDb25maWciLCJjZmciLCJBRERfVVJJX1NBRkVfQVRUUiIsIkFERF9EQVRBX1VSSV9UQUdTIiwiQUxMT1dFRF9VUklfUkVHRVhQIiwiQUREX1RBR1MiLCJBRERfQVRUUiIsInRhYmxlIiwidGJvZHkiLCJUUlVTVEVEX1RZUEVTX1BPTElDWSIsIkFMTF9TVkdfVEFHUyIsIkFMTF9NQVRITUxfVEFHUyIsIl9jaGVja1ZhbGlkTmFtZXNwYWNlIiwicGFyZW50IiwidGFnTmFtZSIsIm5hbWVzcGFjZVVSSSIsInBhcmVudFRhZ05hbWUiLCJCb29sZWFuIiwiX2ZvcmNlUmVtb3ZlIiwibm9kZSIsInJlbW92ZUNoaWxkIiwiX3JlbW92ZUF0dHJpYnV0ZSIsIm5hbWUiLCJnZXRBdHRyaWJ1dGVOb2RlIiwiZnJvbSIsInJlbW92ZUF0dHJpYnV0ZSIsInNldEF0dHJpYnV0ZSIsIl9pbml0RG9jdW1lbnQiLCJkaXJ0eSIsImRvYyIsImxlYWRpbmdXaGl0ZXNwYWNlIiwibWF0Y2hlcyIsImRpcnR5UGF5bG9hZCIsInBhcnNlRnJvbVN0cmluZyIsImRvY3VtZW50RWxlbWVudCIsImNyZWF0ZURvY3VtZW50IiwiaW5uZXJIVE1MIiwiYm9keSIsImluc2VydEJlZm9yZSIsImNyZWF0ZVRleHROb2RlIiwiY2hpbGROb2RlcyIsImNhbGwiLCJfY3JlYXRlTm9kZUl0ZXJhdG9yIiwiU0hPV19FTEVNRU5UIiwiU0hPV19DT01NRU5UIiwiU0hPV19URVhUIiwiU0hPV19QUk9DRVNTSU5HX0lOU1RSVUNUSU9OIiwiU0hPV19DREFUQV9TRUNUSU9OIiwiX2lzQ2xvYmJlcmVkIiwibm9kZU5hbWUiLCJ0ZXh0Q29udGVudCIsImF0dHJpYnV0ZXMiLCJoYXNDaGlsZE5vZGVzIiwiX2lzTm9kZSIsIl9leGVjdXRlSG9va3MiLCJjdXJyZW50Tm9kZSIsImRhdGEiLCJob29rIiwiX3Nhbml0aXplRWxlbWVudHMiLCJhbGxvd2VkVGFncyIsImZpcnN0RWxlbWVudENoaWxkIiwiX2lzQmFzaWNDdXN0b21FbGVtZW50IiwicGFyZW50Tm9kZSIsImNoaWxkQ291bnQiLCJpIiwiY2hpbGRDbG9uZSIsIl9fcmVtb3ZhbENvdW50IiwiZXhwciIsIl9pc1ZhbGlkQXR0cmlidXRlIiwibGNUYWciLCJsY05hbWUiLCJfc2FuaXRpemVBdHRyaWJ1dGVzIiwiaG9va0V2ZW50IiwiYXR0ck5hbWUiLCJhdHRyVmFsdWUiLCJrZWVwQXR0ciIsImFsbG93ZWRBdHRyaWJ1dGVzIiwiZm9yY2VLZWVwQXR0ciIsImF0dHIiLCJpbml0VmFsdWUiLCJnZXRBdHRyaWJ1dGVUeXBlIiwic2V0QXR0cmlidXRlTlMiLCJfc2FuaXRpemVTaGFkb3dET00iLCJmcmFnbWVudCIsInNoYWRvd05vZGUiLCJzaGFkb3dJdGVyYXRvciIsIm5leHROb2RlIiwic2FuaXRpemUiLCJpbXBvcnRlZE5vZGUiLCJyZXR1cm5Ob2RlIiwiYXBwZW5kQ2hpbGQiLCJmaXJzdENoaWxkIiwibm9kZUl0ZXJhdG9yIiwic2hhZG93cm9vdCIsInNoYWRvd3Jvb3Rtb2RlIiwic2VyaWFsaXplZEhUTUwiLCJvdXRlckhUTUwiLCJkb2N0eXBlIiwic2V0Q29uZmlnIiwiY2xlYXJDb25maWciLCJpc1ZhbGlkQXR0cmlidXRlIiwidGFnIiwiYWRkSG9vayIsImVudHJ5UG9pbnQiLCJob29rRnVuY3Rpb24iLCJyZW1vdmVIb29rIiwicmVtb3ZlSG9va3MiLCJyZW1vdmVBbGxIb29rcyJdLCJ2ZXJzaW9uIjozLCJmaWxlIjoicHVyaWZ5LkhBU0hfUkVGXzRkZGFjOWEwNzZjZTVhNzMuanMubWFwIn0=
