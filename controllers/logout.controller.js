export const logout = (req, res) => {
    try {
        // Clear user-related information from the session
        delete req.session.user;
        // delete req.session.role;
        // delete req.session.firstName;
        // delete req.session.lastName;

        // Redirect the user to the login page after successful logout
        res.redirect('/login');
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).send('Error during logout. Please try again.');
    }
};
