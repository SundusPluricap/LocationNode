document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const sidebar = document.getElementById('sidebar');
    const closeIcon = document.getElementById('closeIcon');

    // Function to toggle the sidebar
    function toggleSidebar() {
        sidebar.classList.toggle('active');
    }

    // Event listeners for toggling the sidebar
    hamburgerMenu.addEventListener('click', toggleSidebar);
    closeIcon.addEventListener('click', toggleSidebar);

    // Close the sidebar when clicking outside of it on smaller screens
    window.addEventListener('click', (event) => {
        if (window.innerWidth <= 768) {
            const isHamburgerMenuClicked = hamburgerMenu.contains(event.target);
            const isSidebarClicked = sidebar.contains(event.target);
            const isCloseIconClicked = closeIcon.contains(event.target);

            if (!isHamburgerMenuClicked && !isSidebarClicked && !isCloseIconClicked && sidebar.classList.contains('active')) {
                toggleSidebar();
            }
        }
    });

    // Close the sidebar when clicking on a link inside it (for mobile responsiveness)
    const sidebarLinks = document.querySelectorAll('.sidebar-links a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                toggleSidebar();
            }
        });
    });
});
