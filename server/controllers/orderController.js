const Orders = require('../models/orderSchema')

const orders = async (req, res) => {
    try {
        const data = await Orders.create(req.body)
        console.log(data)
        if (data) {
            res.json({
                orderData: data
            })
        }
    } catch (err) {
        console.log(err)
    }
}

exports.orders = orders