# MoodJournal

A personal mood tracking application to monitor daily emotional states and identify patterns over time.

## Features

- **Mood Tracking**: Select from 5 mood levels with emoji indicators
- **Personal Notes**: Add detailed notes about your day
- **Statistics Dashboard**: View mood breakdown with percentages
- **Entry Management**: View recent entries and delete if needed
- **Clean Interface**: Modern, responsive design with gradient backgrounds

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. Open your browser to `http://localhost:3000`

## Tech Stack

- **Backend**: Node.js + Express + SQLite
- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Database**: SQLite with mood_entries table
- **Styling**: CSS Grid and Flexbox with modern gradients

## Project Structure

```
├── server.js          # Main server file
├── database.js        # SQLite database setup
├── routes/
│   └── mood.js        # API endpoints for mood entries
└── public/
    ├── index.html     # Main frontend page
    ├── styles.css     # Styling and layout
    └── app.js         # Frontend JavaScript
```

This personal project helps track daily emotional wellbeing with a focus on simplicity and usability.