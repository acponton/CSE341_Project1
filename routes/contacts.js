const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts')

// GET all contacts
// #swagger.tags = ['Contacts']
// #swagger.description = 'Get all contacts'

router.get('/', contactsController.getAll);

// GET one contact
// #swagger.tags = ['Contacts']
// #swagger.description = 'Get a single contact by ID'

router.get('/:id', contactsController.getSingle);

// CREATE contact
// #swagger.tags = ['Contacts']
// #swagger.description = 'Create a new contact'

router.post('/', contactsController.createContact);

// UPDATE contact
// #swagger.tags = ['Contacts']
// #swagger.description = 'Update a contact by ID'

router.put('/:id', contactsController.updateContact);

// DELETE contact
// #swagger.tags = ['Contacts']
// #swagger.description = 'Delete a contact by ID'

router.delete('/:id', contactsController.deleteContact);

module.exports = router;