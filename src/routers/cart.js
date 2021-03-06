const express = require('express');
const auth = require('../helpers/auth');

const router = express.Router();
const cartController = require('../controllers/cart');
const checkoutControler = require('../controllers/checkout');

router
    .get('/:id_user', auth.verify, cartController.getAllCart)
    .patch('/:id_cart', auth.verify, cartController.editQty)
    .delete('/:id_cart', auth.verify, cartController.deleteCart)

    //checkout
    .get('/checkout/all/:id_user', auth.verify, checkoutControler.checkoutAll)
    .get('/checkout/:id_cart/:id_user', auth.verify, checkoutControler.checkoutById)


module.exports = router;