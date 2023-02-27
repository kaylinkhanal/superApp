import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Stack } from "@mui/material";
import axios from "axios";
import OrdersCard from "../../components/cards/ordersCard";
const OrderList = () => {
  const { id } = useSelector((state) => state.user);
  const [orderList, setOrderList] = useState([]);
  const fetchOrders = async () => {
    //If user already Logged in fetch the Order, else do nothing.
    if (id) {
      const res = await axios.get(`http://localhost:5000/orders/${id}`);
      setOrderList(res.data.ordersList);
    }
  };
  useEffect(() => {
    //we fetch list of orders in the initial load
    fetchOrders();
  }, []);

  return (
    <Stack spacing={2}>
      {orderList.map((item, id) => {
        return <OrdersCard item={item} />;
      })}
    </Stack>
  );
};

export default OrderList;
