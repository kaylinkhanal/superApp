import { Link, useNavigate, useLocation } from 'react-router-dom'
import {useRef, useState, useEffect } from 'react'
const Products =()=> {
  const [ name ,setName] = useState('hi')
  const {state} =  useLocation()
  return (
    <div>
        {state.productName}
        {state.price}
    </div>
  );
}

export default Products;
