function setup() {
  const display = document.getElementById("display");
  if (!display) return;

  const calc = window.createCalculator();

  function render() {
    display.value = calc.getDisplay();
  }

  document.querySelectorAll("button[data-key]").forEach((btn) => {
    btn.addEventListener("click", () => {
      calc.input(btn.getAttribute("data-key"));
      render();
    });
  });

  render();
}

/* 🌍 Browser global */
if (typeof window !== "undefined") {
  window.setup = setup;
}

/* 🧪 Jest export */
if (typeof module !== "undefined") {
  module.exports = { setup };
}