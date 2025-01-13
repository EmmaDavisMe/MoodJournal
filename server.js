const express = require('express');
const cors = require('cors');
const path = require('path');

const moodRoutes = require('./routes/mood');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// routes
app.get('/', (req, res) => {
    res.send('MoodJournal API is running');
});

app.use('/api/mood', moodRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});