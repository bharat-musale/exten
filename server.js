// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/whatsapp_extension', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const contactSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
    notes: String
});

const Contact = mongoose.model('Contact', contactSchema);


app.post('/api/contacts', async (req, res) => {
    try {
        const { name, phoneNumber } = req.body;
        const contact = new Contact({ name, phoneNumber });
        await contact.save();
        res.status(201).json({ message: 'Contact created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/contacts/:id/notes', async (req, res) => {
    try {
        const { id } = req.params;
        const { notes } = req.body;
        const contact = await Contact.findById(id);
        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        contact.notes = notes;
        await contact.save();
        res.status(200).json({ message: 'Note saved successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
