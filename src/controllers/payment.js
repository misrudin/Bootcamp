const paymentModel = require('../models/payment');
const miscHelper = require('../helpers/helpers');

module.exports = {
    allPayment: (req, res) => {
        const id_user = req.params.id_user;
        paymentModel.allPayment(id_user)
            .then((result) => {
                miscHelper.response(res, result, 200)
            })
            .catch(err => console.log(err))
    }
}