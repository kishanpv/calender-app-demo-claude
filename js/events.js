// Event CRUD operations

let currentEditingEventId = null;

// Create a new event
function createEvent(eventData) {
    const events = getEvents();

    const newEvent = {
        id: generateId(),
        title: eventData.title.trim(),
        date: eventData.date,
        time: eventData.time || '',
        description: eventData.description?.trim() || ''
    };

    events.push(newEvent);

    if (saveEvents(events)) {
        return newEvent;
    }
    return null;
}

// Update an existing event
function updateEvent(eventId, eventData) {
    const events = getEvents();
    const eventIndex = events.findIndex(event => event.id === eventId);

    if (eventIndex === -1) {
        console.error('Event not found');
        return false;
    }

    events[eventIndex] = {
        id: eventId,
        title: eventData.title.trim(),
        date: eventData.date,
        time: eventData.time || '',
        description: eventData.description?.trim() || ''
    };

    return saveEvents(events);
}

// Delete an event
function deleteEvent(eventId) {
    const events = getEvents();
    const filteredEvents = events.filter(event => event.id !== eventId);

    if (filteredEvents.length === events.length) {
        console.error('Event not found');
        return false;
    }

    return saveEvents(filteredEvents);
}

// Handle event form submission
function handleEventSubmit(formData) {
    if (currentEditingEventId) {
        // Update existing event
        if (updateEvent(currentEditingEventId, formData)) {
            currentEditingEventId = null;
            closeModal();
            renderCalendar(currentMonth, currentYear);
            return true;
        }
    } else {
        // Create new event
        if (createEvent(formData)) {
            closeModal();
            renderCalendar(currentMonth, currentYear);
            return true;
        }
    }
    return false;
}

// Handle event deletion
function handleEventDelete() {
    if (!currentEditingEventId) return;

    if (confirm('Are you sure you want to delete this event?')) {
        if (deleteEvent(currentEditingEventId)) {
            currentEditingEventId = null;
            closeModal();
            renderCalendar(currentMonth, currentYear);
        }
    }
}

// Open modal to add new event for a specific date
function openAddEventModal(dateString = null) {
    currentEditingEventId = null;

    const form = document.getElementById('eventForm');
    const modalTitle = document.getElementById('modalTitle');
    const deleteBtn = document.getElementById('deleteEventBtn');

    form.reset();
    modalTitle.textContent = 'Add Event';
    deleteBtn.style.display = 'none';

    // Pre-fill date if provided
    if (dateString) {
        document.getElementById('eventDate').value = dateString;
    } else {
        // Default to today
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('eventDate').value = today;
    }

    openModal();
}

// Open modal to edit an existing event
function openEditEventModal(eventId) {
    const event = getEventById(eventId);
    if (!event) {
        console.error('Event not found');
        return;
    }

    currentEditingEventId = eventId;

    const modalTitle = document.getElementById('modalTitle');
    const deleteBtn = document.getElementById('deleteEventBtn');

    modalTitle.textContent = 'Edit Event';
    deleteBtn.style.display = 'block';

    // Pre-fill form with event data
    document.getElementById('eventTitle').value = event.title;
    document.getElementById('eventDate').value = event.date;
    document.getElementById('eventTime').value = event.time;
    document.getElementById('eventDescription').value = event.description;

    openModal();
}
