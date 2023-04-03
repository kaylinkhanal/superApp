import { Link } from 'react-router-dom'

import {useRef, useState, useEffect } from 'react'
import NavBar from "../components/header/navBar"
const Home =()=> {
  const myInputRef= useRef(null)
  const [ name ,setName] = useState('hi')

  
  return (
    <div>
      hi
    </div>
  );
}

export default Home;
