document.addEventListener('DOMContentLoaded', () => {
    const activityGrid = document.getElementById('activity-grid');
    const activityForm = document.getElementById('activity-form');
    const activityTypeInput = document.getElementById('activityTypeInput');
    const materialFields = document.getElementById('material-fields');
    const financialFields = document.getElementById('financial-fields');
    const receiptImageInput = document.getElementById('receiptImage');
    const fileNameDisplay = document.getElementById('fileName');
    const imagePreview = document.getElementById('imagePreview');
    const icons = activityGrid.querySelectorAll('.activity-icon');

    // Function to update field visibility based on activity type
    function updateFormFields(activityType) {
        if (['FERTILIZER', 'PESTICIDE', 'SOWING', 'HARVEST'].includes(activityType)) {
            materialFields.classList.remove('hidden');
        } else {
            materialFields.classList.add('hidden');
        }
        if (['FERTILIZER', 'PESTICIDE', 'SOWING', 'EXPENSE'].includes(activityType)) {
            financialFields.classList.remove('hidden');
        } else {
            financialFields.classList.add('hidden');
        }
    }

    // --- NEW: Handle edit mode on page load ---
    // If the form is pre-filled (i.e., we are in edit mode), run the visibility check immediately.
    if (activityTypeInput.value) {
        updateFormFields(activityTypeInput.value);
    }
    // --- END OF NEW LOGIC ---

    receiptImageInput.addEventListener('change', () => {
        const file = receiptImageInput.files[0];
        if (file) {
            fileNameDisplay.textContent = file.name;
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview.src = e.target.result;
                imagePreview.classList.remove('hidden');
            };
            reader.readAsDataURL(file);
        } else {
            fileNameDisplay.textContent = 'No file chosen';
            imagePreview.classList.add('hidden');
        }
    });

    activityGrid.addEventListener('click', (event) => {
        const clickedIcon = event.target.closest('.activity-icon');
        if (clickedIcon) {
            icons.forEach(icon => icon.classList.remove('selected'));
            clickedIcon.classList.add('selected');
            const activityType = clickedIcon.dataset.type;
            activityTypeInput.value = activityType;
            updateFormFields(activityType); // Call the update function
            activityForm.classList.remove('hidden');
            activityForm.scrollIntoView({ behavior: 'smooth' });
        }
    });
});