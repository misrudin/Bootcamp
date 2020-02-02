const cartModel = require('../models/cart');
const miscHelper = require('../helpers/helpers');

module.exports = {
    getAllCart: (req, res) => {
        const id_user = req.params.id_user
        cartModel.getAllCart(id_user)
            .then((result) => {
                miscHelper.response(res, result, 200)
            })
            .catch(err => console.log(err))
    },
    editQty: (req, res) => {
        const id_cart = req.params.id_cart
        const { qty } = req.body;
        const data = {
            qty
        }
        cartModel.editQty(data, id_cart)
            .then((result) => {
                miscHelper.response(res, result, 200)
            })
            .catch(err => console.log(err));
    },

    deleteCart: (req, res) => {
        const id_cart = req.params.id_cart

        cartModel.deleteCart(id_cart)
            .then((result) => {
                miscHelper.response(res, result, 200)
            })
            .catch(err => console.log(err));
    }





}