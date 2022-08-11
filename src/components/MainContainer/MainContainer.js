import CartContainer from '../CartContainer/CartContainer'
import RowContainer from '../RowContainer/RowContainer'
import { useStateValue } from '../../context/StateProvider'
import { useState, useEffect } from 'react'
import { categories } from '../../categoriesData'
import LastAdded from '../LastAdded/LastAdded'
import { motion } from 'framer-motion'

const MainContainer = () => {

  const [filter, setFilter] = useState()
  const [{ productItems, cartShow }, dispatch] = useStateValue()
  useEffect(() => {
  }, [filter])
  useEffect(() => {
  }, [cartShow])

  return (
    <>
      {/* ----------CSS EKLE -------------- */}
      {cartShow && (<CartContainer />)}
      <section className='home_section'>
        <div className="categories">
          {categories && categories.map(category => (
            <motion.div whileTap={{ scale: 0.75 }} key={category.id} className={`category ${filter === category.urlParamName ? "active_card" : "non_active_card"}`} onClick={() => setFilter(category.urlParamName)}><img src={category.src} alt='' /></motion.div>
          ))}</div>

        <div className="product_items" ></div>
        <RowContainer data={productItems?.filter(product => product.category === filter)} />
        <br />
        <h2 className='last_added_title'>Recently Added Products</h2>
        <br />
        <LastAdded productItems={productItems} />
      </section>
    </>
  )
}

export default MainContainer