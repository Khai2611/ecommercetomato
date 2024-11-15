// Check if the user is logged in by looking for session data in localStorage
export const isUserLoggedIn = (): boolean => {
    return localStorage.getItem('userSession') !== null; // Return true if session exists
};

// Retrieve user data from localStorage
export const getUserData = (): {userID: string; token: string} | null => {
    const sessionData = localStorage.getItem('userSession');
    return sessionData ? JSON.parse(sessionData) : null; // Parse and return session data or null
};

// Store user session data in localStorage
export const loginUser = (userData: {userID: string; token: string}) => {
    localStorage.setItem('userSession', JSON.stringify(userData)); // Save user data as a JSON string
};

// Clear the user session from localStorage (logout)
export const logoutUser = () => {
    localStorage.removeItem('userSession'); // Remove the session data from localStorage
};
