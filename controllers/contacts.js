const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// GET ALL CONTACTS
const getAll = async (req, res) => {
    try {
        const db = mongodb.getDatabase();
        const result = await db.collection('Contacts').find().toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET ONE CONTACT BY ID
const getSingle = async (req, res) => {
    try {
        const contactId = new ObjectId(req.params.id);
        const db = mongodb.getDatabase();
        const result = await db.collection('Contacts').findOne({ _id: contactId });

        if (!result) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    }   catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAll,
    getSingle
};