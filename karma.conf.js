module.exports = function (config) {
  const testFiles = 'test/*.js';

  config.set({
    basePath: './',
    frameworks: ['browserify', 'qunit', 'viewport'],
    browsers: ['PhantomJS'],
    preprocessors: {
      [testFiles]: ['browserify']
    },
    browserify: {
      transform: [
        [
          'babelify', {presets: ['env']}
        ]
      ]
    },
    files: [testFiles],
    viewport: {
      breakpoints: [
        {
          name: "mobile",
          size: {
            width: 320,
            height: 480
          }
        },
        {
          name: "screen",
          size: {
            width: 1440,
            height: 900
          }
        }
      ]
    }
  });
};