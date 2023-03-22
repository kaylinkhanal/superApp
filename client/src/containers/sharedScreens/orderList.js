import { useState, useEffect } from "react"
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useSelector } from "react-redux"
import axios from "axios";
import OrdersCard from "../../components/cards/ordersCard";
import { Scrollbars } from 'react-custom-scrollbars-2';
import Search from "../../components/search";
import { io } from 'socket.io-client';
const socket = io(process.env.REACT_APP_BASE_URL);
const OrderList = (props) => {
    console.log(props.shouldFetchOrder,"@@@")
    const { id, userRole } = useSelector(state => state.user)
    const [orderList, setOrderList] = useState([])
    const [totalItem, setTotalItem] = useState(0)

    const fetchOrders = async (page, key) => {
        let res
        if (key) {
            res = await axios.get(`${process.env.REACT_APP_BASE_URL}/orders?search=${key}&page=${page}&size=5`)
        } else if (userRole == 'rider') {
            res = await axios.get(`${process.env.REACT_APP_BASE_URL}/orders?page=${page}&size=5`)
        } else {
            res = await axios.get(`${process.env.REACT_APP_BASE_URL}/orders/${id}?page=${page}&size=5`)
        }
        setOrderList(res?.data?.ordersList)
        setTotalItem(res?.data?.totalItem)
    }

  
    useEffect(() => {
        //we fetch list of orders in the initial load
        fetchOrders('1')
        props.shouldResetFetchOrder("hello")
    }, [props.shouldFetchOrder])

    useEffect(()=>{
        socket.on('updateOrders',(updatedOrderDetail)=>{
            if(orderList.length> 0){
               const updatedlist = orderList.map((item)=>{
                    if(item._id === updatedOrderDetail._id){
                      item.orderStatusId = updatedOrderDetail.currentOrderstatusId
                    }
                    return item
                  })
                  setOrderList(updatedlist)
            }
		})
    })

    return (
        <div>
            <Search fetchOrders={fetchOrders} />
            <Scrollbars style={{ height: 300, borderRadius: '10px' }} >
                {orderList?.length > 0 ? (orderList.map((item, id) => {
                    return <OrdersCard item={item} fetchOrders={fetchOrders} />
                })) : (
                    <h3>No orders found</h3>
                )}
            </Scrollbars>
            <Stack spacing={2}>
                <Pagination count={totalItem} onChange={(e) => fetchOrders(e.target.textContent)} size="small" />
            </Stack>
        </div>
    )
}

export default OrderList
