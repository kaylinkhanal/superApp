import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import axios from "axios";
import OrdersCard from "../../components/cards/ordersCard";
const OrderList = () => {
    const { id, userRole } = useSelector(state => state.user)
    const [orderList, setOrderList] = useState([])
    const fetchOrders = async () => {
        const res = await axios.get(`http://localhost:5000/orders/${userRole=='rider'? '' : id }`)
        setOrderList(res.data?.ordersList)
    }
    useEffect(() => {
        //we fetch list of orders in the initial load
        fetchOrders()
    }, [])

    return (
        <div>
            {orderList.length> 0 && orderList.map((item, id) => {
                return <OrdersCard item={item} />
            })}
        </div>
    )
}

export default OrderList