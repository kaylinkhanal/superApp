import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { useState, useEffect } from "react";
import ShareImg from "../images/share.svg"
import axios from 'axios'
import { Link } from 'react-router-dom';
import EcomCard from "../components/cards/ecomCard"
const Home = () => {
	const [productList, setProductList] = useState([])
	const fetchProducts = async()=> {
		const res = await axios.get(`http://localhost:5000/products`)
		setProductList(res.data.productList)
	}
	useEffect(()=>{
		fetchProducts()
	},[])
	return (
		<>
		{productList.length>0 && productList.map((item)=>{
			return <EcomCard item={item}/>
		})}
		</>
	)
}

export default Home;
