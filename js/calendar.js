// Calendar rendering and navigation

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

// Render the calendar for a given month and year
function renderCalendar(month, year) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const firstDayIndex = firstDay.getDay();
    const lastDate = lastDay.getDate();
    const prevLastDate = prevLastDay.getDate();

    // Update month/year header
    document.getElementById('monthYear').textContent = `${monthNames[month]} ${year}`;

    const calendarGrid = document.getElementById('calendarGrid');
    calendarGrid.innerHTML = '';

    // Get all events
    const allEvents = getEvents();

    // Add previous month's trailing days
    for (let i = firstDayIndex; i > 0; i--) {
        const day = prevLastDate - i + 1;
        const prevMonth = month === 0 ? 11 : month - 1;
        const prevYear = month === 0 ? year - 1 : year;
        const dateString = formatDate(prevYear, prevMonth, day);

        const dayCell = createDayCell(day, dateString, true);
        calendarGrid.appendChild(dayCell);
    }

    // Add current month's days
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];

    for (let day = 1; day <= lastDate; day++) {
        const dateString = formatDate(year, month, day);
        const isToday = dateString === todayString;
        const dayCell = createDayCell(day, dateString, false, isToday);

        // Add events for this day
        const dayEvents = allEvents.filter(event => event.date === dateString);
        if (dayEvents.length > 0) {
            const eventsContainer = document.createElement('div');
            eventsContainer.className = 'day-events';

            // Show up to 3 events, then "+X more"
            const eventsToShow = dayEvents.slice(0, 3);
            eventsToShow.forEach(event => {
                const eventItem = document.createElement('div');
                eventItem.className = 'event-item';
                eventItem.setAttribute('tabindex', '0');
                eventItem.setAttribute('role', 'button');
                const eventLabel = event.time ? `${event.title} at ${event.time}` : event.title;
                eventItem.setAttribute('aria-label', `Edit event: ${eventLabel} on ${dateString}`);
                eventItem.textContent = event.time ? `${event.time} ${event.title}` : event.title;

                const editEvent = (e) => {
                    e.stopPropagation();
                    openEditEventModal(event.id);
                };

                eventItem.onclick = editEvent;

                eventItem.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        editEvent(e);
                    }
                });

                eventsContainer.appendChild(eventItem);
            });

            // Show "+X more" if there are more than 3 events
            if (dayEvents.length > 3) {
                const moreText = document.createElement('div');
                moreText.className = 'event-more';
                moreText.textContent = `+${dayEvents.length - 3} more`;
                eventsContainer.appendChild(moreText);
            }

            dayCell.appendChild(eventsContainer);
        }

        calendarGrid.appendChild(dayCell);
    }

    // Add next month's leading days to fill the grid
    const totalCells = calendarGrid.children.length;
    const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);

    for (let day = 1; day <= remainingCells; day++) {
        const nextMonth = month === 11 ? 0 : month + 1;
        const nextYear = month === 11 ? year + 1 : year;
        const dateString = formatDate(nextYear, nextMonth, day);

        const dayCell = createDayCell(day, dateString, true);
        calendarGrid.appendChild(dayCell);
    }
}

// Create a day cell element
function createDayCell(day, dateString, isOtherMonth = false, isToday = false) {
    const dayCell = document.createElement('div');
    dayCell.className = 'calendar-day';
    dayCell.setAttribute('role', 'gridcell');
    dayCell.setAttribute('tabindex', '0');
    dayCell.setAttribute('aria-label', `${dateString}, ${isToday ? 'today' : ''}`);

    if (isOtherMonth) {
        dayCell.classList.add('other-month');
    }

    if (isToday) {
        dayCell.classList.add('today');
    }

    const dayNumber = document.createElement('div');
    dayNumber.className = 'day-number';
    dayNumber.textContent = day;
    dayCell.appendChild(dayNumber);

    // Add click and keyboard handler to open add event modal for this date
    const openEvent = () => {
        if (!isOtherMonth) {
            openAddEventModal(dateString);
        }
    };

    dayCell.addEventListener('click', openEvent);

    dayCell.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openEvent();
        }
    });

    return dayCell;
}

// Format date as YYYY-MM-DD
function formatDate(year, month, day) {
    const paddedMonth = String(month + 1).padStart(2, '0');
    const paddedDay = String(day).padStart(2, '0');
    return `${year}-${paddedMonth}-${paddedDay}`;
}

// Navigate to previous month
function prevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
}

// Navigate to next month
function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
}

// Navigate to today
function goToToday() {
    const today = new Date();
    currentMonth = today.getMonth();
    currentYear = today.getFullYear();
    renderCalendar(currentMonth, currentYear);
    renderMiniCalendar(currentMonth, currentYear);
}

// Render mini calendar in sidebar
function renderMiniCalendar(month, year) {
    const miniGrid = document.getElementById('miniCalendarGrid');
    if (!miniGrid) return;

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayIndex = firstDay.getDay();
    const lastDate = lastDay.getDate();
    const prevLastDay = new Date(year, month, 0);
    const prevLastDate = prevLastDay.getDate();

    // Update mini month header
    document.getElementById('miniMonthYear').textContent = `${monthNames[month]} ${year}`;

    miniGrid.innerHTML = '';

    // Add weekday headers
    const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    weekdays.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'mini-weekday';
        dayHeader.textContent = day;
        miniGrid.appendChild(dayHeader);
    });

    // Add previous month's trailing days
    for (let i = firstDayIndex; i > 0; i--) {
        const day = prevLastDate - i + 1;
        const miniDay = document.createElement('div');
        miniDay.className = 'mini-day other-month';
        miniDay.textContent = day;
        miniGrid.appendChild(miniDay);
    }

    // Add current month's days
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];

    for (let day = 1; day <= lastDate; day++) {
        const dateString = formatDate(year, month, day);
        const isToday = dateString === todayString;

        const miniDay = document.createElement('div');
        miniDay.className = 'mini-day';
        miniDay.setAttribute('tabindex', '0');
        miniDay.setAttribute('role', 'button');
        miniDay.setAttribute('aria-label', `${monthNames[month]} ${day}, ${year}`);
        if (isToday) {
            miniDay.classList.add('today');
            miniDay.setAttribute('aria-current', 'date');
        }
        miniDay.textContent = day;

        const selectDate = () => {
            currentMonth = month;
            currentYear = year;
            renderCalendar(month, year);
            openAddEventModal(dateString);
        };

        miniDay.addEventListener('click', selectDate);

        miniDay.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                selectDate();
            }
        });

        miniGrid.appendChild(miniDay);
    }

    // Fill remaining cells
    const totalCells = miniGrid.children.length - 7; // Subtract weekday headers
    const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    for (let day = 1; day <= remainingCells; day++) {
        const miniDay = document.createElement('div');
        miniDay.className = 'mini-day other-month';
        miniDay.textContent = day;
        miniGrid.appendChild(miniDay);
    }
}

// Initialize calendar navigation
function initializeCalendar() {
    document.getElementById('prevMonth').addEventListener('click', () => {
        prevMonth();
        renderMiniCalendar(currentMonth, currentYear);
    });

    document.getElementById('nextMonth').addEventListener('click', () => {
        nextMonth();
        renderMiniCalendar(currentMonth, currentYear);
    });

    // Today button
    const todayBtn = document.getElementById('todayBtn');
    if (todayBtn) {
        todayBtn.addEventListener('click', goToToday);
    }

    // Mini calendar navigation
    const miniPrev = document.getElementById('miniPrevMonth');
    const miniNext = document.getElementById('miniNextMonth');

    if (miniPrev) {
        miniPrev.addEventListener('click', () => {
            prevMonth();
            renderMiniCalendar(currentMonth, currentYear);
        });
    }

    if (miniNext) {
        miniNext.addEventListener('click', () => {
            nextMonth();
            renderMiniCalendar(currentMonth, currentYear);
        });
    }

    // Render initial calendars
    renderCalendar(currentMonth, currentYear);
    renderMiniCalendar(currentMonth, currentYear);
}
