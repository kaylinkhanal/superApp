const Users = require('../models/userSchema')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const checkFieldType = require('../utils/checkFieldType')
const saltRounds = 10;

const generateToken = async (key, value) => {
    console.log(key, value)
    const token = jwt.sign({ [key]: value }, process.env.SECRET_KEY)
    return token
}

const loginUser = async (req, res) => {
    try {
        const fieldKey = checkFieldType(req.body.fieldKey)
        const token = generateToken(fieldKey, req.body.fieldKey)

        //first we need check if the req.body.loginKey exist in the db
        const data = await Users.findOne({ [fieldKey]: req.body.fieldKey })
        //if data is there, it means we found a document in db with that particular phoneNumber
        // console.log(data)

        if (data) {
            //we now compare the password(bcrypt lib decypts and compares itself) in db with the one we typed in UI
            bcrypt.compare(req.body.password, data.password, function (err, result) {
                if (result) {
                    res.json({
                        userDetails: data,
                        message: "Login Success!!",
                        // token
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
    } catch (err) {
        console.log(err)
    }
}

exports.loginUser = loginUser