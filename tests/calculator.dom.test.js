/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");

describe("calculator DOM", () => {
  beforeEach(() => {
    // Minimal DOM (NO scripts, NO index.html)
    document.body.innerHTML = `
      <input id="display" value="0" />
      <button data-key="1">1</button>
      <button data-key="9">9</button>
    `;

    // Attach calculator logic to window (browser-style)
    const { createCalculator } = require("../src/calculator");
    window.createCalculator = createCalculator;

    // Load app.js AFTER window + document exist
    const { setup } = require("../src/app");

    // Explicitly initialize DOM bindings
    setup();
  });

  test("button clicks update display", () => {
    document.querySelector('[data-key="1"]').click();
    document.querySelector('[data-key="9"]').click();

    const display = document.getElementById("display");
    expect(display.value).toBe("19");
  });
});