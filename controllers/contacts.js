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

// CREATE CONTACT (POST)
const createContact = async (req, res) => {
    try {
        const db = mongodb.getDatabase();
        const newContact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };

        const result = await db.collection('Contacts').insertOne(newContact);

        res.status(201).json({ id: result.insertedId });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// UPDATE CONTACT (PUT)
const updateContact = async (req, res) => {
    try {
        const contactId = new ObjectId(req.params.id);
        const db = mongodb.getDatabase();

        const updatedContact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };

        const result = await db
            .collection('Contacts')
            .replaceOne({ _id: contactId }, updatedContact);

        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE CONTACT
const deleteContact = async (req, res) => {
    try {
        const contactId = new ObjectId(req.params.id);
        const db = mongodb.getDatabase();

        const result = await db.collection('Contacts').deleteOne({ _id: contactId });

        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};