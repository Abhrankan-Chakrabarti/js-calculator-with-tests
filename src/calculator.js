function createCalculator() {
  let display = "0";
  let current = "";
  let operator = null;
  let previous = null;
  let error = false;

  function compute() {
    if (operator === "/" && current === "0") {
      display = "Error";
      error = true;
      return;
    }

    const a = Number(previous);
    const b = Number(current);

    let result;
    if (operator === "+") result = a + b;
    if (operator === "-") result = a - b;
    if (operator === "*") result = a * b;
    if (operator === "/") result = a / b;

    display = String(result);
    current = display;
    operator = null;
    previous = null;
  }

  return {
    input(key) {
      if (error && key !== "C") return;

      if (key === "C") {
        display = "0";
        current = "";
        operator = null;
        previous = null;
        error = false;
        return;
      }

      if (key === "CE") {
        current = "";
        display = "0";
        return;
      }

      if (key === "DEL") {
        current = current.slice(0, -1);
        display = current || "0";
        return;
      }

      if ("+-*/".includes(key)) {
        if (current === "") return;
        previous = current;
        operator = key;
        current = "";
        return;
      }

      if (key === "=") {
        if (previous && operator && current) compute();
        return;
      }

      if (key === "." && current.includes(".")) return;

      current += key;
      display = current;
    },

    getDisplay() {
      return display;
    }
  };
}

/* ✅ CommonJS export for Jest */
if (typeof module !== "undefined") {
  module.exports = { createCalculator };
}

/* ✅ Browser global */
if (typeof window !== "undefined") {
  window.createCalculator = createCalculator;
}
