import { useNavigate } from "react-router-dom"
const EcomCard = (props)=> {
    const navigate = useNavigate()
    return (
        <div onClick={()=>navigate("/products/"+ props.item._id, { state: props.item })} style={{backgroundColor:'aqua', width:'200px', height:'200px', margin:'20px'}}>   
            {props.item.productName}
            {props.item.price}
        </div>
    )
}

export default EcomCard