import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import axios from "axios";
import OrdersCard from "../../components/cards/ordersCard";
import Pagination from '@mui/material/Pagination';
import { Scrollbars } from 'react-custom-scrollbars-2';

const OrderList = () => {
    const { id, userRole } = useSelector(state => state.user)
    const [orderList, setOrderList] = useState([])
    const [totalOrders, setTotalOrders] = useState(0)

    const fetchOrders = async (page, size) => {
        const res = await axios.get(`http://localhost:5000/orders/${userRole == 'rider' ? '' : id}?size=${size || 4}&page=${page || 1}`)
        setOrderList(res.data?.ordersList)
        setTotalOrders(res?.data?.totalOrders)
    }
    useEffect(() => {
        //we fetch list of orders in the initial load
        fetchOrders()
    }, [])

    return (
        <div>
            <Scrollbars style={{ height: 300, borderRadius: '10px' }} >
                {orderList.length > 0 && orderList.map((item, id) => {
                    return <OrdersCard item={item} fetchOrders={fetchOrders} />
                })}
            </Scrollbars>

            <Pagination count={totalOrders} onChange={(event) => fetchOrders(event.target.textContent)} />
        </div>
    )
}

export default OrderList