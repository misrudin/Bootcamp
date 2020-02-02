const express = require('express');
const multer = require('multer');
const auth = require('../helpers/auth')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname)
    }
})
const upload = multer({
    storage
})

const Router = express.Router();
const productController = require('../controllers/product');




Router

    .post('/fillter', auth.verify, productController.fillterProduct) //filter by name
    .get('/', auth.verify, productController.getProduct) //get all prod (sort by name)
    .get('/:id_product', productController.productDetail) // get by id
    .post('/', upload.single('image'), auth.verify, productController.insertProduct) //insert product + upload image
    .patch('/:id_product', upload.single('image'), auth.verify, productController.updateProduct) // update product + image
    .delete('/:id_product', auth.verify, productController.deleteProduct) //delete by id
    .get('/halaman/:nomor', auth.verify, productController.pagination) //pagination(sort by name)
    .get('/category/:nama_category', auth.verify, productController.sortByCategory) //sort by category
    // .get('/halo', auth.verify, productController.sortNewDate) //berdasarkan tanggal dibuat
    // .get('/update', auth.verify, productController.sort) //berdasarkan tanggal update
    .post('/addtocart', productController.addToCart)



module.exports = Router;