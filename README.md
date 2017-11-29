# Viewport

Helper for browser's viewport properties/resize events.

## Examples
##### Initialize
```javascript
let view = new View({ 
  xs: 0, // means 'xs' view goes from 0 to 767px
  sm: 768, // 'sm' is from 768px to 989px etc.
  md: 990, 
  lg: 1200 
})
```
##### Attach events and check viewport size
```javascript
let changeHandler = () => view.lt('sm') ? alert('Mobile') : alert('Desktop');
let eventIndex = view.onChange(changeHandler);

// detach by index
view.offChange(eventIndex);
// or handler
view.offChange(changeHandler);
```
