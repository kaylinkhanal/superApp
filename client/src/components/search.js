import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

const Search = (props) => {
    return (
        <>
            <span><SearchIcon /></span><input onKeyUp={(e) => props.fetchOrders('', e.target.value)} placeholder='serach orders..'></input>
        </>
    )
}
export default Search