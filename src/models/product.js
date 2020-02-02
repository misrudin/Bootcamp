const connection = require('../configs/db');

module.exports = {
    getProduct: () => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM product_name ORDER BY name ASC", (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            })
        })
    },


    productDetail: (id_product) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT product_name.*,category.nama_category FROM product_name INNER JOIN category ON product_name.id_category=category.id WHERE product_name.id = ?", id_product, (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            })
        })
    },
    insertProduct: (data) => {
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO product_name SET ?", data, (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            })
        })
    },
    updateProduct: (data, id_product) => {
        return new Promise((resolve, reject) => {
            connection.query("UPDATE product_name SET ? WHERE id = ?", [data, id_product], (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            })
        })
    },
    deleteProduct: (id_product) => {
        return new Promise((resolve, reject) => {
            connection.query("DELETE FROM product_name WHERE id = ?", id_product, (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            })
        })
    },

    fillterProduct: (kata) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT product_name.*, category.nama_category FROM product_name INNER JOIN category ON product_name.id_category=category.id WHERE product_name.name LIKE ?", '%' + kata + '%', (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            })
        })
    },

    pagination: (nomor) => {

        const dataPerHalaman = 2;// jumlah data per halaman
        const jumlahData = connection.query("SELECT COUNT(*) as total FROM product_name", (err, result) => {
            return result[0].total;
        }) //jumlah seluruh data

        const jumlahHalaman = jumlahData / dataPerHalaman; // mengitung jumlah halaman

        const awalData = (dataPerHalaman * nomor) - dataPerHalaman; // menentukan awal data tiap halaman


        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM product_name ORDER BY name ASC LIMIT ?, ?", [awalData, dataPerHalaman], (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            })
        })
    },

    sortByCategory: (nama_category) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT category.nama_category, product_name.* FROM category INNER JOIN product_name ON category.id=product_name.id_category WHERE category.nama_category LIKE ?", '%' + nama_category + '%', (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            })
        })
    },

    addToCart: (data) => {
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO cart SET ?", data, (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            })
        })
    }



}  