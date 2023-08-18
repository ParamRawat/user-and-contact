const db = require("../models");
const Contact = db.contact;
const Op = db.Sequelize.Op;

// Create contact
const ContactController = {
add_contact : async (req, res) => {
    try {
        const { fullname, address, contactno, zip, email, created_by } = req.body;
        const contact = await Contact.create({
            fullname,
            address,
            contactno,
            zip,
            email,
            created_by,
            created: new Date(),
            updated: new Date(),
        });
        res.status(201).json({ message: 'Contact added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
};

// Contact details with user details
app.get('/contact_details/:contactId', async (req, res) => {
    try {
        const contactId = req.params.contactId;
        const contact = await Contact.findByPk(contactId, { include: User });
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json({
            contact: {
                fullname: contact.fullname,
                address: contact.address,
                contactno: contact.contactno,
                zip: contact.zip,
                email: contact.email,
            },
            created_by: contact.user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// User details with all contacts
app.get('/user_details/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findByPk(userId, { include: Contact });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const contacts = user.contacts.map(contact => ({
            fullname: contact.fullname,
            address: contact.address,
            contactno: contact.contactno,
            zip: contact.zip,
            email: contact.email,
        }));
        res.json({ user: user.username, contacts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = ContactController;


