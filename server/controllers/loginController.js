const Users = require('../models/userSchema')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const checkFieldType = require('../utils/checkFieldType')
const saltRounds = 10;

const loginUser = async (req, res) => {
    const token = jwt.sign({ name: req.body.userName }, process.env.SECRET_KEY)
    const loginKey = checkFieldType(req.body.loginKey)

    //first we need check if the req.body.loginKey exist in the db
    const data = await Users.findOne({ [loginKey]: req.body.loginKey })
    //if data is there, it means we found a document in db with that particular phoneNumber
    console.log(data)

    if (data) {
        //we now compare the password(bcrypt lib decypts and compares itself) in db with the one we typed in UI
        bcrypt.compare(req.body.password, data.password, function (err, result) {
            if (result) {
                res.json({
                    userDetails: data,
                    message: "Login Success!!",
                    token: token
                })
            } else {
                res.json({
                    message: "Invalid Password!"
                })
            }
        });
    } else {
        res.json({
            message: "user doesn't exist"
        })
    }
}

exports.loginUser = loginUser