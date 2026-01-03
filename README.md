# Calendar App

A simple, responsive calendar application built with vanilla JavaScript, HTML, and CSS. Features include monthly view, event management (add/edit/delete), and LocalStorage persistence.

## Features

- **Monthly Calendar View**: Clean grid layout showing the current month
- **Event Management**: Create, read, update, and delete events
- **Data Persistence**: Events stored in browser LocalStorage
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Form Validation**: Required field validation with error messages
- **Keyboard Accessible**: Full keyboard navigation support

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- No build tools or dependencies required!

### Installation

1. Clone this repository or download the files
2. Open `index.html` in your web browser
3. That's it! The app is ready to use

### Usage

**Viewing the Calendar**
- The current month is displayed by default
- Use `<` and `>` buttons to navigate between months
- The current day is highlighted with a blue border

**Adding Events**
1. Click the "+ Add Event" button or click on any date
2. Fill in the event details:
   - Title (required)
   - Date (required)
   - Time (optional)
   - Description (optional)
3. Click "Save" to add the event

**Editing Events**
1. Click on any event on the calendar
2. Modify the event details in the modal
3. Click "Save" to update

**Deleting Events**
1. Click on the event you want to delete
2. Click the "Delete" button in the modal
3. Confirm the deletion

## Project Structure

```
calender-app-demo-claude/
├── index.html              # Main HTML file
├── css/
│   └── styles.css         # All styling and responsive design
├── js/
│   ├── app.js            # Application initialization
│   ├── calendar.js       # Calendar rendering and navigation
│   ├── events.js         # Event CRUD operations
│   ├── modal.js          # Modal UI and form validation
│   └── storage.js        # LocalStorage wrapper
├── tasks/
│   └── todo.md           # Implementation task checklist
└── README.md             # This file
```

## Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Flexbox/Grid layout, custom properties
- **JavaScript (ES6+)**: Vanilla JS, no frameworks
- **LocalStorage**: Client-side data persistence

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## Known Limitations

- Events are stored locally in browser (not synced across devices)
- LocalStorage has ~5-10MB limit
- No recurring events
- No event categories or color coding
- No import/export functionality

## Future Enhancements

- Event categories with color coding
- Recurring events
- Search and filter
- Export to iCal/CSV
- Week/day view
- Dark mode

## License

Free to use and modify.

## Author

Built with Claude Code
