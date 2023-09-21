
function createTimePicker(inputId, optionsId) {
    const timeInput = document.getElementById(inputId);
    const timeOptions = document.getElementById(optionsId);
  
    timeInput.addEventListener('click', generateOptions);
    timeOptions.addEventListener('click', selectTime);
  
    document.addEventListener('click', closeDropdown);
  
    function generateOptions() {
      timeOptions.innerHTML = ''; // Clear existing options
  
      const currentTime = new Date();
      currentTime.setMinutes(Math.ceil(currentTime.getMinutes() / 30) * 30); // Round to nearest 30 minutes
  
      for (let i = 0; i < 24 * 2; i++) { // 24 hours * 2 (30-minute intervals)
        const optionTime = new Date(currentTime.getTime() + i * 30 * 60 * 1000);
        const optionText = optionTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }); // Use 24-hour format
  
        const optionElement = document.createElement('div');
        optionElement.classList.add('time-option');
        optionElement.textContent = optionText;
        optionElement.dataset.value = optionText;
  
        timeOptions.appendChild(optionElement);
      }
  
      timeOptions.style.display = 'block';
    }
  
    function selectTime(event) {
      if (event.target.classList.contains('time-option')) {
        const selectedTime = event.target.getAttribute('data-value');
        timeInput.value = selectedTime;
        timeOptions.style.display = 'none';
        console.log(`Selected time: ${selectedTime}`);
      }
    }
  
    function closeDropdown(event) {
      if (!event.target.closest('.time-picker')) {
        timeOptions.style.display = 'none';
      }
    }
  }
  
  createTimePicker('startTime', 'time-options1');
  createTimePicker('endTime', 'time-options2');