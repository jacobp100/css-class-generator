# css-class-generator

Maps a given index to a unique valid CSS. Uses the smallest class names possible, with lower indices having smaller class names.

```bash
npm install --save css-class-generator
```

# API

`cssClassGenerator(index, prefix = '')` -> string

Class names are not random - a given index will always return the same class name.

Class names are generated without a leading `.`.

The prefix option gives more optimal class names than `prefix + cssClassGenerator(index)`. It never returns the prefix alone - it's always appended with something. In development, it will `console.warn` if prefix is not a valid class name (unless the prefix is `-`).

Be careful for high values (`2 ** 30` and above), as JavaScript integer vs float quirks can happen.

# Example

```js
const cssClassGenerator = require("css-class-generator");

cssClassGenerator(0); // 'a'
cssClassGenerator(1); // 'b'
cssClassGenerator(52); // '_'
cssClassGenerator(53); // '-a'
cssClassGenerator(10000); // K3c
cssClassGenerator(1e9); // CVJ2gb

cssClassGenerator(0, "hello"); // 'helloa'
cssClassGenerator(1, "hello"); // 'hellob'
```
