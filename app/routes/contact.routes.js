const express = require('express');
const ContactController = require('../controllers/contact.controller');
const router = express.Router();

router.post('/addContact', ContactController.addContact);
router.get('/contactDetails/:contactId', ContactController.contactDetails);
router.get('/userDetails/:userId', ContactController.userDetails);


module.exports = router;
