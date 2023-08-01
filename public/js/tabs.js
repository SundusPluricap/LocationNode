// // Inside scripts.js
// function showTabContent(batimentName) {
//   // Hide all tab contents
//   const tabContents = document.querySelectorAll('.content');
//   tabContents.forEach((content) => {
//     content.style.display = 'none';
//   });

//   // Show the selected tab content
//   const selectedContent = document.getElementById(`content-${batimentName}`);
//   if (selectedContent) {
//     selectedContent.style.display = 'block';
//   }
// }
function showTabContent(batimentName) {
  // Hide all tab contents
  const tabContents = document.querySelectorAll('.content');
  tabContents.forEach((content) => {
    content.style.display = 'none';
  });

  const tabLabels = document.querySelectorAll('.tab-label');
  tabLabels.forEach((tabLabel) => {
    tabLabel.classList.remove('active');
  });

  // Show the selected tab content
  const selectedContent = document.getElementById(`${batimentName}`);
  if (selectedContent) {
    selectedContent.style.display = 'block';
    const selectedTabLabel = document.querySelector(`[onclick="showTabContent('${batimentName}')"]`);
    selectedTabLabel.classList.add('active');
  }
}

// Function to get the anchor value from the URL
function getAnchorFromURL() {
  const url = window.location.href;
  const anchorIndex = url.indexOf('#');
  const anchor = anchorIndex !== -1 ? url.substring(anchorIndex + 1) : null;
  return anchor;
}

// Function to remove the anchor from the URL
function removeAnchorFromURL() {
  history.replaceState(null, null, window.location.pathname);
}

// Function to handle tab selection based on anchor value
function handleTabSelection() {
  const anchor = getAnchorFromURL();
  if (anchor) {
    // Scroll to the top to make sure the selected tab is visible
    window.scrollTo(0, 0);

  //   // Show the corresponding tab
  //   const tabContents = document.querySelectorAll('.content');
  //   tabContents.forEach((content) => {
  //     content.style.display = 'none';
  //   });
  //   const selectedContent = document.getElementById(`${anchor}`);

  //   if (selectedContent) {
  //     selectedContent.style.display = 'block';
  //   }
  showTabContent(anchor);

  removeAnchorFromURL();
  }
  
}









// Attach the handleTabSelection function to the window's load event
document.addEventListener('DOMContentLoaded', handleTabSelection);