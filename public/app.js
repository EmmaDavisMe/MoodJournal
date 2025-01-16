let selectedMood = null;

document.addEventListener('DOMContentLoaded', function() {
    const moodButtons = document.querySelectorAll('.mood-btn');
    const saveButton = document.getElementById('save-mood');
    const notesTextarea = document.getElementById('notes');
    
    // mood button selection
    moodButtons.forEach(button => {
        button.addEventListener('click', function() {
            // remove previous selection
            moodButtons.forEach(btn => btn.classList.remove('selected'));
            
            // select current button
            this.classList.add('selected');
            selectedMood = this.getAttribute('data-mood');
        });
    });
    
    // save mood entry
    saveButton.addEventListener('click', function() {
        if (!selectedMood) {
            alert('Please select a mood first!');
            return;
        }
        
        const notes = notesTextarea.value.trim();
        const entry = {
            mood: selectedMood,
            notes: notes,
            date: new Date().toLocaleDateString()
        };
        
        // for now just store locally and display
        saveEntryLocally(entry);
        displayEntry(entry);
        
        // clear form
        moodButtons.forEach(btn => btn.classList.remove('selected'));
        notesTextarea.value = '';
        selectedMood = null;
        
        alert('Mood saved! (locally for now)');
    });
    
    // load existing entries
    loadEntries();
});

function saveEntryLocally(entry) {
    let entries = JSON.parse(localStorage.getItem('moodEntries') || '[]');
    entries.unshift(entry);
    localStorage.setItem('moodEntries', JSON.stringify(entries));
}

function loadEntries() {
    const entries = JSON.parse(localStorage.getItem('moodEntries') || '[]');
    const entriesList = document.getElementById('entries-list');
    
    if (entries.length === 0) {
        entriesList.innerHTML = '<p>No entries yet. Start tracking your mood!</p>';
        return;
    }
    
    entriesList.innerHTML = '';
    entries.forEach(entry => displayEntry(entry));
}

function displayEntry(entry) {
    const entriesList = document.getElementById('entries-list');
    const entryDiv = document.createElement('div');
    entryDiv.className = 'mood-entry';
    entryDiv.innerHTML = `
        <strong>${entry.date}</strong> - ${getMoodEmoji(entry.mood)} ${entry.mood}
        ${entry.notes ? `<br><em>"${entry.notes}"</em>` : ''}
    `;
    entriesList.insertBefore(entryDiv, entriesList.firstChild);
}

function getMoodEmoji(mood) {
    const emojiMap = {
        'great': '😊',
        'good': '🙂', 
        'okay': '😐',
        'bad': '😞',
        'awful': '😢'
    };
    return emojiMap[mood] || '😐';
}