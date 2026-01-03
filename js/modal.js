// Modal UI handling and form validation

// Open modal
function openModal() {
    const modal = document.getElementById('eventModal');
    modal.classList.add('active');
    clearValidationErrors();

    // Focus on title field
    setTimeout(() => {
        document.getElementById('eventTitle').focus();
    }, 100);
}

// Close modal
function closeModal() {
    const modal = document.getElementById('eventModal');
    modal.classList.remove('active');
    document.getElementById('eventForm').reset();
    clearValidationErrors();
    currentEditingEventId = null;
}

// Clear all validation error messages
function clearValidationErrors() {
    document.getElementById('titleError').textContent = '';
    document.getElementById('dateError').textContent = '';
}

// Validate form fields
function validateForm(formData) {
    let isValid = true;

    // Validate title (required)
    if (!formData.title || formData.title.trim() === '') {
        document.getElementById('titleError').textContent = 'Title is required';
        isValid = false;
    } else {
        document.getElementById('titleError').textContent = '';
    }

    // Validate date (required)
    if (!formData.date) {
        document.getElementById('dateError').textContent = 'Date is required';
        isValid = false;
    } else {
        document.getElementById('dateError').textContent = '';
    }

    return isValid;
}

// Initialize modal event listeners
function initializeModal() {
    const modal = document.getElementById('eventModal');
    const overlay = modal.querySelector('.modal-overlay');
    const closeBtn = modal.querySelector('.modal-close');
    const cancelBtn = document.getElementById('cancelBtn');
    const form = document.getElementById('eventForm');
    const deleteBtn = document.getElementById('deleteEventBtn');
    const createEventBtn = document.getElementById('createEventBtn');

    // Close modal on overlay click
    overlay.addEventListener('click', closeModal);

    // Close modal on close button click
    closeBtn.addEventListener('click', closeModal);

    // Close modal on cancel button click
    cancelBtn.addEventListener('click', closeModal);

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
            title: document.getElementById('eventTitle').value,
            date: document.getElementById('eventDate').value,
            time: document.getElementById('eventTime').value,
            description: document.getElementById('eventDescription').value
        };

        // Validate form
        if (validateForm(formData)) {
            handleEventSubmit(formData);
        }
    });

    // Handle delete button click
    deleteBtn.addEventListener('click', handleEventDelete);

    // Create event button
    if (createEventBtn) {
        createEventBtn.addEventListener('click', () => {
            openAddEventModal();
        });
    }

    // Clear validation errors on input
    document.getElementById('eventTitle').addEventListener('input', () => {
        document.getElementById('titleError').textContent = '';
    });

    document.getElementById('eventDate').addEventListener('input', () => {
        document.getElementById('dateError').textContent = '';
    });
}
