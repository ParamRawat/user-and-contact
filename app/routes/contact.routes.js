module.exports = app => {
    const contactController = require('../controllers/contact.controller')

    app.route('/contact')
        .post(contactController.create)
        .get(contactController.read)

    app.route('/contact/:id')
        .put(contactController.update)
        .delete(contactController.delete)
        .get(contactController.readById)
}