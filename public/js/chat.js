document.addEventListener('DOMContentLoaded', async () => {
    // --- App State ---
    let currentUser = null;
    let currentCommunity = null;
    const userSelection = { state: null, city: null, crop: null };
    
    // --- Fetch initial data from the server ---
    let farmData, appData;
    try {
        const response = await fetch('/api/data');
        const data = await response.json();
        farmData = data.farmData;
        appData = data.appData;
    } catch (error) {
        console.error("Failed to load initial data:", error);
        // Display an error message to the user
        document.body.innerHTML = '<div class="text-center p-8 text-red-500">Could not load application data. Please try again later.</div>';
        return;
    }

    // --- DOM Elements ---
    const screens = { state: document.getElementById('state-selection-screen'), /* ... (all other DOM element selections) ... */ };
    // ... (Paste ALL your other variable declarations for DOM elements here)
    const emojiPicker = document.getElementById('emoji-picker');

    /* =====================================================================
        PASTE ALL YOUR ORIGINAL JAVASCRIPT FUNCTIONS HERE (from navigateToOnboarding to startSimulation)
        No changes are needed inside these functions.
       ===================================================================== */
    
    // Example (only paste the functions, not the event listeners yet):
    const navigateToOnboarding = (screenName) => { /* ... function code ... */ };
    const showMainView = (viewName) => { /* ... function code ... */ };
    // ... all other functions down to startSimulation ...

    // --- Event Listeners ---
    // (Paste ALL your original event listeners here)
    loginForm.addEventListener('submit', handleLogin);
    // ... all other event listeners ...
    document.addEventListener('click', (e) => {
        if (!emojiPicker.contains(e.target) && e.target !== emojiButton) {
            emojiPicker.classList.add('hidden');
        }
    });

    // --- Initial Render ---
    renderStates();
});