// const modelLogin = require('../models/login');
const jwt = require('jsonwebtoken');
const conn = require('../configs/db');

module.exports = {
    loginUser: (req, res) => {
        const name = req.body.name;
        const password = req.body.password;
        conn.query("SELECT * FROM `user` WHERE name=? AND password= ?", [name, password], (err, result) => {
            if (!err) {
                if (result.length > 0) {
                    const token = jwt.sign({ result }, process.env.PRIVATE_KEY, { expiresIn: 60 * 60 })
                    res.json({
                        token: token
                    })
                } else {
                    res.send('Someting Wrong!')
                }
            } else {
                console.log(err);
            }
        })
    },

    logout: (req, res) => {
        delete req.headers['my-token'];
        res.send('logout')
    }

}