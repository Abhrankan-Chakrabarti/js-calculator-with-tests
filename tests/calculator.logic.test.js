const { createCalculator } = require("../src/calculator");

function press(calc, keys) {
  for (const k of keys.split("")) calc.input(k);
}

test("starts with display 0", () => {
  const calc = createCalculator();
  expect(calc.getDisplay()).toBe("0");
});

test("typing digits builds number", () => {
  const calc = createCalculator();
  press(calc, "123");
  expect(calc.getDisplay()).toBe("123");
});

test("prevents multiple decimals", () => {
  const calc = createCalculator();
  press(calc, "1.2.3");
  expect(calc.getDisplay()).toBe("1.23");
});

test("addition works", () => {
  const calc = createCalculator();
  press(calc, "12+7=");
  expect(calc.getDisplay()).toBe("19");
});

test("division by zero gives Error", () => {
  const calc = createCalculator();
  press(calc, "7/0=");
  expect(calc.getDisplay()).toBe("Error");
});
