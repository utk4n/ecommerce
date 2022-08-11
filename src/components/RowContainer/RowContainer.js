import { useEffect, useState } from 'react'
import { actionType } from '../../context/reducer'
import { useStateValue } from '../../context/StateProvider'
import { motion } from 'framer-motion'

const RowContainer = ({ data }) => {


    const [items, setItems] = useState([])
    const [{ cartItems }, dispatch] = useStateValue()

    const addToCart = () => {

        dispatch({ type: actionType.SET_CART_ITEMS, cartItems: items })
        localStorage.setItem("cartItems", JSON.stringify(items))
    }

    useEffect(() => {
        addToCart()
    }, [items])

    const productDisplayer = data?.map(el => <div key={el.id} className="brand_categories">
        <img src={el.imageUrl} alt="" />
        <div className="properties">
            <p>Title : {el.title}</p>
            <p>Color : {el.color}</p>
            <p>Price : ${el.price}</p>
        </div>
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => setItems([...cartItems, el])}>Add To Cart</motion.button>
    </div>)

    return (


        <div className='row_container'>

            {data?.length <= 0 ? <span>There is no product...</span> : (productDisplayer)}

        </div>

    )
}

export default RowContainer