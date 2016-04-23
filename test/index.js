const { test } = require('ava');
const cssNameGenerator = require('../src');

// http://www.w3.org/TR/CSS21/grammar.html
const validIdent = /^-?[_a-z][_a-z0-9-]*$/i;
const numToTest = 1E6;

test('generate name', t => {
  const generator = cssNameGenerator();
  for (let i = 0; i < numToTest; i += 1) {
    const { value } = generator.next();
    const isValid = validIdent.test(value);
    t.true(isValid, `Expected ${value} to be a valid css selector`);
  }
});

test('generate name with hyphen prefix', t => {
  const generator = cssNameGenerator('-');
  for (let i = 0; i < numToTest; i += 1) {
    const { value } = generator.next();
    const isValid = validIdent.test(value);
    t.true(isValid, `Expected ${value} to be a valid css selector`);
  }
});

test('generate name with other prefix', t => {
  const generator = cssNameGenerator('test');
  for (let i = 0; i < numToTest; i += 1) {
    const { value } = generator.next();
    const isValid = validIdent.test(value);
    t.true(isValid, `Expected ${value} to be a valid css selector`);
  }
});

test('allows hyphen for class name', t => {
  t.notThrows(() => { cssNameGenerator('-').next(); });
});

test('throws for invalid class name', t => {
  t.throws(() => { cssNameGenerator('--').next(); });
  t.throws(() => { cssNameGenerator('0').next(); });
});
