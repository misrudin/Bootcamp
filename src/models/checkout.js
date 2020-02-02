const conn = require('../configs/db');

module.exports = {
    checkoutAll: (id_user) => {
        const pesan = [];
        return new Promise((reslove, reject) => {
            conn.query("SELECT * FROM cart where id_user= ?", id_user, (err, result) => {
                if (!err) {
                    if (result.length > 0) {
                        result.forEach((e) => {
                            conn.query("SELECT price,stok,name FROM product_name WHERE id=?", e.id_product, (err, resultp) => {
                                if (resultp.length > 0) {
                                    resultp.forEach((i) => {
                                        if (i.stok > 0) {
                                            const total = e.qty * i.price
                                            const date_pay = new Date();
                                            const data = {
                                                date_pay: date_pay,
                                                id_user: id_user,
                                                id_product: e.id_product,
                                                qty: e.qty,
                                                total: total
                                            }
                                            conn.query("INSERT INTO payment SET ?", data)
                                            conn.query("DELETE FROM cart WHERE id_user=?", id_user)
                                            conn.query("UPDATE product_name SET stok=stok - ? WHERE id=?", [e.qty, e.id_product])
                                            pesan.push(`Sucess Checkout: ${i.name}`)
                                        } else {
                                            pesan.push(`Stok: ${i.name} Empty!`)
                                        }
                                        pesan.forEach((psn) => {
                                            reslove('Succes Ceheckout!')
                                            console.log(psn)
                                        })
                                    })
                                }
                            })
                        })
                    } else {
                        reslove("Cart is Empty!")
                    }
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    checkoutById: (id_cart, id_user) => {
        const pesan = [];
        return new Promise((reslove, reject) => {
            conn.query("SELECT * FROM cart where id= ?", id_cart, (err, result) => {
                if (!err) {
                    if (result.length > 0) {
                        result.forEach((e) => {
                            conn.query("SELECT price,stok,name FROM product_name WHERE id=?", e.id_product, (err, resultp) => {
                                if (resultp.length > 0) {
                                    resultp.forEach((i) => {
                                        if (i.stok > 0) {
                                            const total = e.qty * i.price
                                            const date_pay = new Date();
                                            const data = {
                                                date_pay: date_pay,
                                                id_user: id_user,
                                                id_product: e.id_product,
                                                qty: e.qty,
                                                total: total
                                            }
                                            conn.query("INSERT INTO payment SET ?", data)
                                            conn.query("DELETE FROM cart WHERE id=?", id_cart)
                                            conn.query("UPDATE product_name SET stok=stok - ? WHERE id=?", [e.qty, e.id_product])
                                            pesan.push(`Sucess Checkout: ${i.name}`)
                                        } else {
                                            pesan.push(`Stok: ${i.name} Empty!`)
                                        }
                                        pesan.forEach((psn) => {
                                            reslove('Ceheckout!')
                                            console.log(psn)
                                        })
                                    })
                                }
                            })
                        })
                    } else {
                        reslove("Cart Not found")
                    }
                } else {
                    reject(new Error(err))
                }
            })
        })
    }


}