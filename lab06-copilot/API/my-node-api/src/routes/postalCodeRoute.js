const express = require('express');
const PostalCodeController = require('../controllers/postalCodeController');

const router = express.Router();
const postalCodeController = new PostalCodeController();

const setupPostalCodeRoute = (app) => {
    router.get('/postal-code/:code', postalCodeController.getAddressByPostalCode.bind(postalCodeController));
    app.use('/api', router);
};

module.exports = setupPostalCodeRoute;