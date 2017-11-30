class View {
  static get defaultConfig() {
    return {
      base: 0,
      xxs: 375,
      xs: 480,
      sm: 768,
      md: 990,
      lg: 1200
    }
  }

  constructor(config) {
    this.eventHandler = [];
    this.viewports = config || View.defaultConfig;

    this.viewCodes = Object.keys(this.viewports).reverse();

    // attach media query listener
    this.viewCodes.forEach((code, index) => {
      let minWidth = this.viewports[code];
      let nextViewCode = this.viewCodes[index - 1];
      let mqExpression = '';

      if (minWidth > 0) {
        mqExpression = '(min-width: ' + minWidth + 'px)';
      }

      if (typeof nextViewCode !== 'undefined') {
        if (mqExpression) {
          mqExpression += ' and ';
        }

        mqExpression += '(max-width: ' + (this.viewports[nextViewCode] - 1) + 'px)';
      }

      let mq = window.matchMedia(mqExpression);
      mq.addListener(() => {
        if (mq.matches) {
          this.eventHandler.forEach(handler => {
            if (typeof handler === 'function') {
              handler.call(code);
            }
          });
        }
      });
    });
  }

  /**
   * @param {String} mq
   * @returns {boolean}
   */
  static mq(mq) {
    return window.matchMedia && window.matchMedia(mq).matches;
  }

  /**
   * @returns {String}
   */
  currentCode() {
    let viewCode = this.viewCodes[this.viewCodes.length - 1];

    this.viewCodes.every(code => {
      let minWidth = this.viewports[code];

      if (View.mq('(min-width: ' + minWidth + 'px)')) {
        viewCode = code;
        return false;
      }
      else {
        return true;
      }
    });

    return viewCode;
  };

  /**
   * Check if given view code is matching the current
   * @param {String} viewCode
   * @returns {boolean}
   */
  is(viewCode) {
    return viewCode === this.currentCode();
  };

  /**
   * @returns {boolean}
   */
  static isHighRes() {
    return ((window.matchMedia && (window.matchMedia('only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx), only screen and (min-resolution: 75.6dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min--moz-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2)').matches)) || (window.devicePixelRatio && window.devicePixelRatio >= 2));
  };

  /**
   * Check if view is smaller than given
   * @param {String} viewCode
   * @returns {boolean}
   */
  lt(viewCode) {
    let test = '(max-width: ' + (this.viewports[viewCode] - 1) + 'px)';
    return window.matchMedia(test).matches;
  };

  /**
   * Check if view is greater than given
   * @param {String} viewCode
   * @returns {boolean}
   */
  gt(viewCode) {
    let test = '(min-width: ' + this.viewports[viewCode] + 'px)';
    return View.mq(test);
  };

  /**
   * Check if view is in between given
   * @param {String} viewCodeMin
   * @param {String} viewCodeMax
   * @returns {boolean}
   */
  isBetween(viewCodeMin, viewCodeMax) {
    let test = '(min-width: ' + this.viewports[viewCodeMin] + 'px) and (max-width: ' + (this.viewports[viewCodeMax] - 1) + 'px)';
    return View.mq(test);
  };

  /**
   * @param {Function} handler
   * @returns {Number}
   */
  onChange(handler) {
    this.eventHandler.push(handler);
    return this.eventHandler.indexOf(handler);
  };

  /**
   * @param {Number|Function} indexOrHandler
   */
  offChange(indexOrHandler) {
    if (typeof indexOrHandler === 'number') {
      this.eventHandler.splice(indexOrHandler, 1);
    } else {
      this.eventHandler.splice(this.eventHandler.indexOf(indexOrHandler), 1);
    }
  };
}

module.exports = View;
