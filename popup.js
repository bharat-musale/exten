document.addEventListener('DOMContentLoaded', function() {
    function filterChats(option) {
        console.log('Filtering chats:', option);
    }

    function createCustomFilter(filterName) {
        console.log('Creating custom filter:', filterName);
       
    }

    function openContact() {
        console.log('Opening contact');
    
    }

    function saveNote() {
        console.log('Saving note');
        const note = prompt('Enter your note:');
        if (note !== null && note !== '') {
        
            fetch('http://localhost:3000/api/contacts/:id/notes', {
                method: 'POST',
                body: JSON.stringify({ note }),
                headers: { 'Content-Type': 'application/json' }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to save note');
                }
                return response.json();
            })
            .then(data => {
                console.log('Note saved successfully:', data);
            })
            .catch(error => {
                console.error('Error saving note:', error);
            });
        }
    }

    document.getElementById('filterAllBtn').addEventListener('click', function() {
        filterChats('all');
    });

    document.getElementById('filterUnreadBtn').addEventListener('click', function() {
        filterChats('unread');
    });

    document.getElementById('filterAwaitingReplyBtn').addEventListener('click', function() {
        filterChats('awaitingReply');
    });

    document.getElementById('filterNeedsReplyBtn').addEventListener('click', function() {
        filterChats('needsReply');
    });

    document.getElementById('createCustomFilterBtn').addEventListener('click', function() {
        const filterName = document.getElementById('customFilterInput').value;
        createCustomFilter(filterName);
    });

    document.getElementById('openContactBtn').addEventListener('click', function() {
        openContact();
    });

    document.getElementById('saveNoteBtn').addEventListener('click', function() {
        saveNote();
    });
});
