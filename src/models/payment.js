const conn = require('../configs/db');

module.exports = {
    allPayment: (id_user) => {
        return new Promise((resolve, reject) => {
            conn.query("SELECT * FROM payment WHERE id_user=?", id_user, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    }
}