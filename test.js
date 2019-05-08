const assert = require("assert");
const generate = require(".");

const runTests = ({ num = 1e4, prefix } = {}) => {
  const validIdent = /^-?[_a-z][_a-z0-9-]*$/i;
  let last = "";
  const seen = new Set();
  const changes = [];

  for (let i = 0; i < num; i += 1) {
    const next = generate(i, prefix);

    assert(
      prefix == null || next.startsWith(prefix),
      `Expected ${next} to start with ${prefix}`
    );

    assert(validIdent.test(next), `Got invalid identifier for ${next} (${i})`);
    assert(!next.includes("undefined"), `Got undefined for ${i}`);

    const nextLength = next.length;
    const lastLength = last.length;
    assert(
      nextLength >= lastLength,
      `Invalid ordering for ${last} vs ${next} (${i})`
    );

    const hasSeen = seen.has(next);
    const seenIndex = hasSeen ? Array.from(seen).indexOf(next) : -1;
    assert(!hasSeen, `Already seen ${next} (${seenIndex} vs. ${i})`);

    last = next;
    if (i !== 0 && nextLength > lastLength) {
      changes.push(i);
    }
    seen.add(next);
  }

  return [
    `Passed tests with ${prefix ? `prefix "${prefix}"` : "no prefix"}`,
    `    Tested ${num} iterations`,
    `    Length transitions at: ${changes.join(", ")}`
  ].join("\n");
};

assert.equal(generate(0), "a");
assert.equal(generate(1), "b");

assert.equal(generate(0, "-"), "-a");
assert.equal(generate(1, "-"), "-b");

assert.equal(generate(0, "test"), "testa");
assert.equal(generate(1, "test"), "testb");

runTests({ num: 1e6 });
runTests({ num: 1e6, prefix: "-" });
runTests({ num: 1e6, prefix: "hello" });
