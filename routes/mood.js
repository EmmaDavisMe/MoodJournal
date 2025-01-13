const express = require('express');
const router = express.Router();

// placeholder routes for mood entries
router.get('/entries', (req, res) => {
    res.json({ message: 'Get mood entries - not implemented yet' });
});

router.post('/entries', (req, res) => {
    res.json({ message: 'Add mood entry - not implemented yet' });
});

module.exports = router;