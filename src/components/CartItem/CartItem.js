import React, { useEffect, useState } from 'react'
import { BiMinus, BiPlus } from 'react-icons/bi'
import { motion } from 'framer-motion'
import { useStateValue } from '../../context/StateProvider'
import { actionType } from '../../context/reducer'

const CartItem = ({ item }) => {
    const [{ cartItems }, dispatch] = useStateValue()
    const [items, setItems] = useState([])
    const [quantity, setQuantity] = useState(1)


    const cartUpdate = () => {
        localStorage.setItem("cartItems", JSON.stringify(items))
        dispatch({
            type: actionType.SET_CART_ITEMS,
            cartItems: items
        })
    }

    const updateAmount = (item, id) => {
        if (item === "add") {
            setQuantity(quantity + 1)
            cartItems.map(item => {
                if (item.id == id) {
                    item.quantity += 1
                }
            })
            cartUpdate()
        } else {
            if (quantity === 1) {
                setItems(cartItems.filter(item => item.id !== id))
                cartUpdate()
            } else {
                setQuantity(quantity - 1)
                cartItems.map(item => {
                    if (item.id == id) {
                        item.quantity -= 1
                    }
                })
                cartUpdate()
            }
        }
    }
    useEffect(() => {
        setItems(cartItems)
    }, [quantity])

    const [totalPrice, setTotalPrice] = useState()

    const reduceHandler = () => {
        let total = cartItems.reduce((sum, item) => {
            return sum + item.quantity * item.price
        }, 0)
        setTotalPrice(total)
    }

    useEffect(() => {

        reduceHandler()
    }, [totalPrice])

    return (
        <div className="cart_section">
            <div className="cart_item">
                <img src={item.imageUrl} alt="" />
            </div>
            <div className="cart_item_name">
                <p>{item.title}</p>
                <p>${parseFloat(item.price) * quantity}</p>
            </div>
            <div className="cart_btn_section">
                <motion.div whileTap={{ scale: 0.75 }} onClick={() => updateAmount("desc", item?.id)}>
                    <BiMinus />
                </motion.div>
                <p>{quantity}</p>
                <motion.div whileTap={{ scale: 0.75 }} onClick={() => updateAmount("add", item?.id)}>
                    <BiPlus />
                </motion.div>
            </div>
        </div>
    )
}

export default CartItem