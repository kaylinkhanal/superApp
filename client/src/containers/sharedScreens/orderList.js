import { useState, useEffect } from "react"
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useSelector } from "react-redux"
import axios from "axios";
import OrdersCard from "../../components/cards/ordersCard";
import { Scrollbars } from 'react-custom-scrollbars-2';

const OrderList = () => {
    const { id, userRole } = useSelector(state => state.user)
    const [orderList, setOrderList] = useState([])
    const [totalItem, setTotalItem] = useState(0)

    const fetchOrders = async (page) => {
        let res
        if(userRole== 'rider'){
            res = await axios.get(`http://localhost:5000/orders?page=${page}&size=5`)
        }else{
            res = await axios.get(`http://localhost:5000/orders/${id}?page=${page}&size=5`)
        }
        setOrderList(res.data?.ordersList)
        setTotalItem(res.data?.totalItem)
    }
    useEffect(() => {
        //we fetch list of orders in the initial load
       fetchOrders('1')
    }, [])

    return (
        <div>
            <Scrollbars style={{ height: 300, borderRadius: '10px' }} >
            {orderList.length> 0 && orderList.map((item, id) => {
                return <OrdersCard item={item} fetchOrders={fetchOrders} />
            })}
        </Scrollbars>
             <Stack spacing={2}>
                <Pagination count={totalItem} onChange={(e)=>fetchOrders(e.target.textContent)} size="small" />
           </Stack>
        </div>
    )
}

export default OrderList