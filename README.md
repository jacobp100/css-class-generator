# css-class-generator

Generates a sequential valid css class.

```bash
npm install --save css-class-generator
```

# API

`cssNameGenerator(prefix = '')` -> iterator

Supports a legacy iteration mode (just an object with a function `next`).

Use `.` as a prefix if you want real css class names.

# Example

ES5:

```js
const cssNameGenerator = require('css-class-generator');
var generator = cssNameGenerator('prefix-');
generator.next() // { value: 'prefix-A', done: false }
generator.next() // { value: 'prefix-B', done: false }
```

ES6:

```js
const cssNameGenerator = require('css-class-generator');
for (let value of cssNameGenerator()) {
  // 'A', 'B', ...
}
```
