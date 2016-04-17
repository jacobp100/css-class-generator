const validFirstCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_';
const validSecondCharacters = `${validFirstCharacters}0123456789-`;

const iterator = typeof Symbol === 'symbol' ? Symbol.iterator : null;

export default function cssNameGenerator(prefix = '') {
  const currentValue = [validFirstCharacters[0]];

  const incrementIndex = index => {
    if (index >= currentValue.length) {
      currentValue.push(validSecondCharacters[0]);
      return;
    }

    const value = currentValue[index];

    const validCharacters = index === 0
      ? validFirstCharacters
      : validSecondCharacters;
    const currentIndex = validCharacters.indexOf(value);

    if (currentIndex + 1 >= validCharacters.length) {
      currentValue[index] = validCharacters[0];
      incrementIndex(index + 1);
    } else {
      currentValue[index] = validCharacters[currentIndex + 1];
    }
  };

  const next = () => {
    const value = prefix + currentValue.join('');
    incrementIndex(0);
    return { value, done: false };
  };

  const protocol = { next };
  protocol[iterator] = protocol;

  return protocol;
}
