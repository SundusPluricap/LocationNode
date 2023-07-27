// Inside scripts.js
function showTabContent(batimentName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.content');
    tabContents.forEach((content) => {
      content.style.display = 'none';
    });
  
    // Show the selected tab content
    const selectedContent = document.getElementById(`content-${batimentName}`);
    if (selectedContent) {
      selectedContent.style.display = 'block';
    }
  }
  