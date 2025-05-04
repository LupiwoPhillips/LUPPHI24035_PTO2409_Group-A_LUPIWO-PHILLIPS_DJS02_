const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  try {
    const entries = new FormData(event.target);
    const { dividend, divider } = Object.fromEntries(entries);

    // Validation when inputs are missing
    if (!dividend || !divider) {
      result.innerText = "Division not performed. Both values are required in inputs. Try again";
      return;
    }

    // Explicitly convert to numbers
    const dividendNum = Number(dividend);
    const dividerNum = Number(divider);

    // Detect invalid numbers (isNaN catches 'YOLO' and '+++')
    if (isNaN(dividendNum) || isNaN(dividerNum)) {
      throw new Error("Invalid number input detected.");
    }

    // Division by zero
    if (dividerNum === 0) {
      console.error(new Error("Cannot divide by zero."));
      result.innerText = "Division not performed. Invalid number provided. Try again";
      return;
    }

    // Whole number division (floor to remove decimals)
    const quotient = Math.floor(dividendNum / dividerNum);

    result.innerText = quotient;

  } catch (error) {
    // Log real call stack
    console.error(error);

    // Replace entire body with crash message
    document.body.innerHTML = `<h1>Something critical went wrong. Please reload the page</h1>`;
  }
});