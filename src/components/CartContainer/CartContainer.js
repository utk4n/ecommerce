import CartItem from '../CartItem/CartItem'
import { MdOutlineKeyboardBackspace } from "react-icons/md"
import { RiRefreshFill } from 'react-icons/ri'
import { motion } from 'framer-motion'
import { useStateValue } from '../../context/StateProvider'
import { actionType } from '../../context/reducer'

const CartContainer = () => {

    const [{ cartShow, cartItems, user }, dispatch] = useStateValue()

    let total = cartItems.reduce((sum, item) => (
        sum += item.quantity * item.price
    ), 0)

    const cartClose = () => {
        dispatch({ type: actionType.SET_CART_SHOW, cartShow: !cartShow })
    }
    const clearCart = () => {
        dispatch({
            type: actionType.SET_CART_ITEMS,
            cartItems: []
        })
        localStorage.setItem("cartItems", JSON.stringify([]))
    }
    return (
        <motion.div initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }} className='cart_container'>
            <div className="cart_btns">
                <motion.div whileTap={{ scale: 0.75 }} onClick={cartClose}>  <MdOutlineKeyboardBackspace /> </motion.div>
                <p>Cart</p>
                <motion.p whileTap={{ scale: 0.75 }} onClick={clearCart}>Clear <RiRefreshFill /></motion.p>
            </div>
            {cartItems && cartItems.length > 0 ? (

                cartItems.map(item => (
                    <CartItem key={item.id} item={item} />
                ))
            ) : <p className='empty_cart_warning'>Added some items in your cart.</p>}

            <div className="cart_total_section">
                <div className="total">
                    <p>Price:</p>
                    <p>${total.toFixed(2)}</p>
                </div>
                {user ? (
                    <div className="payment">
                        <button>Check Out</button>
                    </div>
                ) : (
                    <div className="payment">
                        <button>Login</button>
                    </div>
                )
                }
            </div>
        </motion.div>
    )
}

export default CartContainer