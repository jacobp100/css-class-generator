# css-class-generator

Generates a sequential, valid CSS class, generating the next smallest class names possible.

```bash
npm install --save css-class-generator
```

# API

`cssNameGenerator(prefix = '')` -> iterator

Will throw if prefix is not a valid class name (unless the prefix is `-`). The exception will be thrown when the first value is being yielded.

Class names are generated without a leading `.`.

It uses generators, so you'll have to be using a version of node that supports this.

# Example

```js
const cssNameGenerator = require('css-class-generator');
for (let value of cssNameGenerator()) {
  // 'A', 'B', ...
}
for (let value of cssNameGenerator('-')) {
  // '-A', '-B', ...
}
for (let value of cssNameGenerator('custom-namespace-')) {
  // You get the idea...
}
```
