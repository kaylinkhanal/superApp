import React from "react";

const OrderViewSection = () => {
    return (
        <>
            <button onClick={() => setIsOrderListOpen(!isOrderListOpen)} className="btn" style={{ margin: '0 0 8px 0 ' }}><span>{!isOrderListOpen ? 'Check your orders' : 'Close'}</span></button>
            <div style={{ overflow: 'hidden' }}>
                <div className="order_list" style={!isOrderListOpen ? {
                    transition: `transform 250ms ease-in-out`,
                    transform: "translateY(-101%)"
                } : {
                    transition: `transform 250ms ease-in-out`,
                    transform: "translateY(0)"
                }}>
                    <OrderList />
                </div>
            </div>
        </>
    )
}
export default OrderViewSection