import './App.css';
import Header from './components/Header/Header';
import { Route, Routes } from 'react-router-dom'
import MainContainer from './components/MainContainer/MainContainer';
import CreateItem from './components/CreateItem/CreateItem';
import { AnimatePresence } from 'framer-motion'
import { useStateValue } from './context/StateProvider';
import { getAllItems } from '../src/firebaseFunctions'
import { useEffect } from 'react';
import { actionType } from '../src/context/reducer'
function App() {

  const [{ productItems }, dispatch] = useStateValue()

  const fetchData = async () => {
    await getAllItems().then(data => {
      dispatch({ type: actionType.SET_PRODUCT_ITEMS, productItems: data })
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <AnimatePresence exitBeforeEnter>
      <div className="App">
        <Header />
        <main className='main_container'>
          <Routes>
            <Route path='/' element={<MainContainer />} />
            <Route path='/createItem' element={<CreateItem />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
