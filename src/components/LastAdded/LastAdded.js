import { useState, useEffect } from 'react'
import { useStateValue } from '../../context/StateProvider'
import { actionType } from '../../context/reducer'

const LastAdded = ({ productItems }) => {

    const [items, setItems] = useState([])
    const [{ cartItems }, dispatch] = useStateValue()

    const addToCart = () => {

        dispatch({ type: actionType.SET_CART_ITEMS, cartItems: items })
        localStorage.setItem("cartItems", JSON.stringify(items))
    }
    useEffect(() => {
        addToCart()
    }, [items])

    const lastAdded = productItems?.map(el => <div key={el.id} className="brand_categories">
        <img src={el.imageUrl} alt="" />
        <div className="properties">
            <p>Brand : {el.category}</p>
            <p>Title : {el.title}</p>
            <p>Color : {el.color}</p>
            <p>Price : ${el.price}</p>
        </div>
        {/* <motion.button onClick={() => setItems([...cartItems, el])} whileTap={{ scale: 0.9 }}>Add To Cart</motion.button> */}
    </div>).slice(0, 5)

    return (
        <div className='last_added'>
            {lastAdded}
        </div>
    )
}

export default LastAdded