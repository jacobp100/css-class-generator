const chars =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_0123456789-";
const numChars = 64; // chars.length
const validFirstChars = 53; // chars.indexOf("_") + 1
const twoCharPermutations = validFirstChars + validFirstChars * numChars;

module.exports = (index, prefix) => {
  if (process.env.NODE_ENV !== "production") {
    const validIdent = /^-?[_a-z][_a-z0-9-]*$/i;
    if (prefix != null && prefix !== "-" && !validIdent.test(prefix)) {
      // eslint-disable-next-line
      console.warn(`Expected prefix (${prefix}) to be a valid css class name`);
    }
  }

  let i;
  let current;
  if (prefix == null || prefix === "") {
    if (index < validFirstChars) return chars[index];

    const _index = index - validFirstChars;
    const c = _index % twoCharPermutations;
    if (c < validFirstChars) {
      current = "-" + chars[c];
    } else {
      const _c = c - validFirstChars;
      const c0 = _c % validFirstChars;
      const c1 = (_c / validFirstChars) | 0;
      current = chars[c0] + chars[c1];
    }
    i = (_index / twoCharPermutations) | 0;
  } else if (prefix === "-") {
    const c = index % validFirstChars;
    current = "-" + chars[c];
    i = (index / validFirstChars) | 0;
  } else {
    if (index === 0) return prefix + chars[0];

    current = prefix;
    i = index;
  }

  let base = numChars;
  while (i > 0) {
    const c = i % numChars;
    current += chars[c];
    i = (i / numChars) | 0;
    base = base * numChars;
  }

  return current;
};
