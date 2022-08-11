import Avatar from '../../img/avatar.png'
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md"
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useStateValue } from '../../context/StateProvider'

import { app } from '../../firebase.config'
import { actionType } from '../../context/reducer'
import { useState } from 'react'
const Header = () => {

  const firebaseAuth = getAuth(app)
  const provider = new GoogleAuthProvider()

  const [{ user, cartShow, cartItems }, dispatch] = useStateValue()
  const [isDrop, setIsDrop] = useState(false)
  const login = async () => {
    if (!user) {
      const { user: { refreshToken, providerData } } = await signInWithPopup(firebaseAuth, provider)
      dispatch({ type: actionType.SET_USER, user: providerData[0] })
      localStorage.setItem('user', JSON.stringify(providerData[0]))
    } else {
      setIsDrop(prev => !prev)
    }
  }

  const logout = () => {
    setIsDrop(false)
    localStorage.clear()
    dispatch({ type: actionType.SET_USER, user: null })
  }
  const showCart = () => {
    dispatch({ type: actionType.SET_CART_SHOW, cartShow: !cartShow })
  }
  return (
    <header>
      {/* --- pc---- */}
      <div className="header_pc_view">
        <Link to='/' className="header_logo">
          <h1>LOGO</h1>
          {/* <img src={Logo} alt="" /> */}
        </Link>
        <div className="header_links_wrapper">
          <motion.ul initial={{ opacity: 0, x: 200 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }} className='nav_list'>
            <li>Home</li>
            <li>Menu</li>
            <li>About Us</li>
            <li>Service</li>
          </motion.ul>
          <div className="shopping_basket" onClick={showCart}>
            <MdShoppingBasket className='basket_icon' />
            {/* BASKET AMOUNT İÇİN DÖNÜŞ YAP SONRADAN */}
            {cartItems && cartItems.length > 0 && (
              <div className="basket_amount">{cartItems.length}</div>
            )}
          </div>
          <div className="profile" onClick={login}>
            <motion.img whileTap={{ scale: 0.6 }} className='profile_photo' src={user ? user.photoURL : Avatar} alt="" />

            {isDrop && (
              <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }} className="profile_drop_down">
                {
                  user && user.email === "utkanocal@gmail.com" &&
                  (
                    <Link to={"/createItem"}>
                      <p>Create Item <MdAdd /></p>
                    </Link>
                  )
                }
                <Link to={"/"}><p className='logout' onClick={logout}>Logout <MdLogout /></p></Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* --- mobile---- */}
      <div className="header_mobile_view">
        <Link to='/' className="header_logo">
          <h1>LOGO</h1>
        </Link>
        <div className="shopping_basket" onClick={showCart}>
          <MdShoppingBasket className='basket_icon' />
          {/* BASKET AMOUNT İÇİN DÖNÜŞ YAP SONRADAN */}
          {cartItems && cartItems.length > 0 && (
            <div className="basket_amount">{cartItems.length}</div>
          )}
        </div>
        <div className="profile">
          <motion.img onClick={login} whileTap={{ scale: 0.6 }} className='profile_photo' src={user ? user.photoURL : Avatar} alt="" />

          {isDrop && (
            <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }} className="profile_drop_down">
              {
                user && user.email === "utkanocal@gmail.com" &&
                (
                  <Link to={"/createItem"}>
                    <p>Create Item <MdAdd /></p>
                  </Link>
                )
              }

              <ul className='nav_list'>
                <li>Home</li>
                <li>Menu</li>
                <li>About Us</li>
                <li>Service</li>
              </ul>

              <p className='logout' onClick={logout}>Logout <MdLogout /></p>
            </motion.div>
          )}
        </div>
      </div>

    </header>
  )
}

export default Header