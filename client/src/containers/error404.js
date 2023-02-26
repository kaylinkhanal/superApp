import React from 'react'
import { NavLink } from 'react-router-dom'
import Error404 from '../images/Error.png'

const Error = () => {
    return (
        <div>
            <div className='main_wrapper'
                style={{
                    height: 'auto',
                    display: 'flex',
                    justifyContent:'space-around',
                    flexWrap:'wrap'
                }}>
                <div className='image' style={{width:'50%'}}>
                    <img src={Error404} alt="cry" style={{ height: '90vh' }}></img>
                </div>
                <div className='text' 
                style={{
                    textAlign:'center',
                    display:'flex',
                    flexDirection:'column',
                    justifyContent:'center',
                    alignItems:'center',
                    width:'50%'
                }}
                >
                <h1
                >
                404</h1>
                <h2>Awwww..... Don't Cry.</h2>
                <p>You must have picked the wrong door because I haven't been able to lay my eye on the page you have been searching for.</p>
                <NavLink to={'/'} style={{border:'2px solid black'}}>Back to home</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Error
