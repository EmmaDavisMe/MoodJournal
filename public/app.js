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
    saveButton.addEventListener('click', async function() {
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
        
        try {
            const response = await fetch('/api/mood/entries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(entry)
            });
            
            if (response.ok) {
                // clear form
                moodButtons.forEach(btn => btn.classList.remove('selected'));
                notesTextarea.value = '';
                selectedMood = null;
                
                // reload entries and stats
                loadEntries();
                loadStats();
                alert('Mood saved successfully!');
            } else {
                alert('Failed to save mood entry');
            }
        } catch (error) {
            console.error('Error saving mood:', error);
            alert('Error saving mood entry');
        }
    });
    
    // load existing entries and stats
    loadEntries();
    loadStats();
});

function saveEntryLocally(entry) {
    let entries = JSON.parse(localStorage.getItem('moodEntries') || '[]');
    entries.unshift(entry);
    localStorage.setItem('moodEntries', JSON.stringify(entries));
}

async function loadEntries() {
    const entriesList = document.getElementById('entries-list');
    
    try {
        const response = await fetch('/api/mood/entries');
        const data = await response.json();
        
        if (data.entries && data.entries.length > 0) {
            entriesList.innerHTML = '';
            data.entries.forEach(entry => displayEntry(entry));
        } else {
            entriesList.innerHTML = '<p>No entries yet. Start tracking your mood!</p>';
        }
    } catch (error) {
        console.error('Error loading entries:', error);
        entriesList.innerHTML = '<p>Error loading entries. Please try again.</p>';
    }
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

async function loadStats() {
    const statsContainer = document.getElementById('stats-container');
    
    try {
        const response = await fetch('/api/mood/stats');
        const stats = await response.json();
        
        if (stats.total > 0) {
            let statsHTML = `<div class="stats-summary">
                <p><strong>Total Entries:</strong> ${stats.total}</p>
                <div class="mood-breakdown">`;
            
            Object.entries(stats.moods).forEach(([mood, count]) => {
                const percentage = ((count / stats.total) * 100).toFixed(1);
                statsHTML += `
                    <div class="mood-stat">
                        ${getMoodEmoji(mood)} ${mood}: ${count} (${percentage}%)
                    </div>`;
            });
            
            statsHTML += '</div></div>';
            statsContainer.innerHTML = statsHTML;
        } else {
            statsContainer.innerHTML = '<p>No statistics yet. Add some mood entries!</p>';
        }
    } catch (error) {
        console.error('Error loading stats:', error);
        statsContainer.innerHTML = '<p>Error loading statistics.</p>';
    }
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