const Users = require('../models/userSchema')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const registerUser = async (req, res) => {
    try {
        //we generate hash(encrpyted password) using bcrypt 
        // check https://github.com/kelektiv/node.bcrypt.js#:~:text=(myPlaintextPassword%2C-,saltRounds,-).then
        bcrypt.hash(req.body.password, saltRounds).then(async function (hash) {
            //we set passowrd as new hashed password and save it into db using Save or create
            req.body.password = hash
            const data = await Users.create(req.body)
            if (data) {
                res.json({
                    message: "Registration successful!!"
                })
            } else {
                res.send('Regsitration failed')
            }
        });
    } catch (err) {
        console.log("err" + err)
    }
}

exports.registerUser = registerUser