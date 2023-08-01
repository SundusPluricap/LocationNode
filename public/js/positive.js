const priceInput = document.getElementById('price');

// Function to update the price when the value changes
function updatePrice() {
  const currentValue = parseFloat(priceInput.value);
  if (!isNaN(currentValue)) {
    const newValue = Math.max(currentValue, 0); // Ensure the value doesn't go below $0
    priceInput.value = newValue.toFixed(2);
  }
}

// Add the event listener to detect when the value changes (via spinner or manual input)
priceInput.addEventListener('input', updatePrice);