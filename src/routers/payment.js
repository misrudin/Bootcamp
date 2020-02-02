const express = require('express');
const auth = require('../helpers/auth');

const router = express.Router();
const paymentController = require('../controllers/payment');

router
    .get('/:id_user', auth.verify, paymentController.allPayment)


module.exports = router;