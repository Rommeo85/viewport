import View from '../index';

const viewConfig = {
  small: 0,
  large: 1200
};

let view = new View(viewConfig);

QUnit.test("Config test", assert => {
  assert.ok(view.viewCodes.length === Object.keys(viewConfig).length);

  let viewDefault = new View();
  assert.ok(viewDefault.viewCodes.length === Object.keys(View.defaultConfig).length);
});

QUnit.test("Viewport size detection", assert => {
  viewport.set('screen');
  assert.ok(view.is('large'), 'Large screen detected');

  viewport.set('mobile');
  assert.ok(view.is('small'), 'Small screen detected');
});

QUnit.test("Resize event handler", assert => {
  viewport.set('screen');
  let viewportChangedA = false;
  let viewportChangedB = false;
  let handlerA = () => viewportChangedA = true;
  let handlerB = () => viewportChangedB = true;

  let handlerAIndex = view.onChange(handlerA);
  view.onChange(handlerB);

  viewport.set('mobile');
  assert.ok(viewportChangedA && viewportChangedB, 'Events attached');

  view.offChange(handlerAIndex);
  view.offChange(handlerB);
  viewportChangedA = viewportChangedB = false;

  viewport.set('screen');
  assert.ok(!viewportChangedA && !viewportChangedB, 'Event detached');
});