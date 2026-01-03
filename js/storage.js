// LocalStorage wrapper for event persistence

const STORAGE_KEY = 'calendar_events';

// Generate unique ID for events
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Get all events from LocalStorage
function getEvents() {
    try {
        const eventsJSON = localStorage.getItem(STORAGE_KEY);
        return eventsJSON ? JSON.parse(eventsJSON) : [];
    } catch (error) {
        console.error('Error reading events from storage:', error);
        return [];
    }
}

// Save events to LocalStorage
function saveEvents(events) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
        return true;
    } catch (error) {
        if (error.name === 'QuotaExceededError') {
            console.error('Storage quota exceeded');
            alert('Storage quota exceeded. Please delete some events.');
        } else {
            console.error('Error saving events to storage:', error);
        }
        return false;
    }
}

// Get event by ID
function getEventById(id) {
    const events = getEvents();
    return events.find(event => event.id === id);
}

// Get events for a specific date
function getEventsByDate(dateString) {
    const events = getEvents();
    return events.filter(event => event.date === dateString);
}
