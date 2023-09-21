const salleIdSelect = document.getElementById("salleId");
const capacityDisplay = document.getElementById("capacity");
const nbrPeopleInput = document.getElementById("nbrPeople");

// Function to update the capacity display and input field max value
function updateCapacityDisplay() {
  const selectedOption = salleIdSelect.options[salleIdSelect.selectedIndex];
  const selectedCapacity = selectedOption.getAttribute("data-capacity");
  capacityDisplay.textContent = `Capacity: ${selectedCapacity}`;
  
  // Set the maximum value of the input field based on the selected capacity
  nbrPeopleInput.max = selectedCapacity;
}

// Add an event listener to update the capacity display on change
salleIdSelect.addEventListener("change", updateCapacityDisplay);

// Initialize the capacity display and input field max value
updateCapacityDisplay();
