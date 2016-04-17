import test from 'ava';
import cssNameGenerator from '../src';

// http://www.w3.org/TR/CSS21/grammar.html
const validIdent = /^-?[_a-z][_a-z0-9-]*$/i;
const numToTest = 1E3;

test('generate name', t => {
  const generator = cssNameGenerator();
  for (let i = 0; i < numToTest; i += 1) {
    const { value } = generator.next();
    const isValid = validIdent.test(value);
    t.true(isValid, `Expected ${value} to be a valid css selector`);
  }
});

test('prefix', t => {
  const generator = cssNameGenerator('test-');
  t.is(generator.next().value, 'test-A');
});
