import { Link } from 'react-router-dom'

import { useRef, useState, useEffect } from 'react'
import NavBar from "../components/header/navBar"
const Home = () => {
   const myInputRef = useRef(null)
   const [name, setName] = useState('hi')


   return (
      <>
         <NavBar />

         <div className='container'>
            <section id='home'>
               <Link to='/send-orders' style={{ textAlign: 'center', display: 'block', marginBottom: '5px' }}>send orders</Link>
               <div className='form'>
                  <input placeholder="Enter a name" />
                  <button className='btn' onClick={() => myInputRef.current.focus()}>ride</button>
               </div>
            </section>
         </div>
      </>
   );
}

export default Home;
