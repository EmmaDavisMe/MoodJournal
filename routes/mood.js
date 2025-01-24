const express = require('express');
const router = express.Router();
const db = require('../database');

// get mood entries
router.get('/entries', (req, res) => {
    db.all(`SELECT * FROM mood_entries ORDER BY created_at DESC LIMIT 50`, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ entries: rows });
    });
});

// add mood entry
router.post('/entries', (req, res) => {
    const { mood, notes, date } = req.body;
    
    if (!mood || !date) {
        res.status(400).json({ error: 'Mood and date are required' });
        return;
    }
    
    db.run(`INSERT INTO mood_entries (mood, notes, date) VALUES (?, ?, ?)`,
        [mood, notes || '', date], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ 
            id: this.lastID,
            message: 'Mood entry saved successfully' 
        });
    });
});

// get mood statistics
router.get('/stats', (req, res) => {
    db.all(`SELECT mood, COUNT(*) as count FROM mood_entries GROUP BY mood`, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        
        const stats = {
            total: 0,
            moods: {}
        };
        
        rows.forEach(row => {
            stats.moods[row.mood] = row.count;
            stats.total += row.count;
        });
        
        res.json(stats);
    });
});

module.exports = router;