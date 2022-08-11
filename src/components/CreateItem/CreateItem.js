import React from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { categories } from '../../categoriesData'
import Loader from '../Loader/Loader'
import { MdCreateNewFolder, MdOutlineDeleteForever, MdOutlineAttachMoney, MdOutlineColorLens, MdOutlineEdit } from 'react-icons/md'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../../firebase.config'
import { saveItem } from '../../firebaseFunctions'
import { useStateValue } from '../../context/StateProvider';
import {getAllItems} from '../../firebaseFunctions'
import {actionType} from '../../context/reducer'

const CreateItem = () => {


  const [title, setTitle] = useState("")
  const [color, setColor] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState(null)
  const [fields, setFields] = useState(false)
  const [imgAsset, setImgAsset] = useState(null)
  const [msg, setMsg] = useState(null)
  const [alertStatus, setAlertStatus] = useState("danger")
  const [isLoading, setIsLoading] = useState(false)

  const uploadImage = (e) => {
    setIsLoading(true)
    const imgFile = e.target.files[0]
    const storageRef = ref(storage, `images/${Date.now()} - ${imgFile.name}`)
    const uploadTask = uploadBytesResumable(storageRef, imgFile);
    uploadTask.on('state_changed', (snapshot) => {
      const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    }, (error) => {
      console.log(error);
      setFields(true);
      setMsg("Error while uploading, try again.");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false)
        setIsLoading(false)
      }, 4000)
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then(downloadUrl => {
        setImgAsset(downloadUrl);
        setIsLoading(false);
        setFields(true)
        setMsg("Image uploaded success");
        setAlertStatus("success")
        setTimeout(() => {
          setFields(false)
        }, 4000)
      })
    })
  }
  const deleteImg = () => { 
    setIsLoading(true)
    const deleteRef = ref(storage, imgAsset);
    deleteObject(deleteRef).then(() => {
      setImgAsset(null)
      setIsLoading(false)
      setFields(true)
      setMsg("Image deleted success");
      setAlertStatus("success")
      setTimeout(() => {
        setFields(false)
      }, 4000)
    })
  }
  const saveInfos = () => {
    setIsLoading(true);
    try{
      if(!title || !color || !imgAsset || !price || !category){
      setFields(true);
      setMsg("Please fill in all blanks.");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false)
        setIsLoading(false)
      }, 4000)
      }else{
        const data ={
          id: `${Date.now()}`,
          title : title,
          imageUrl : imgAsset,
          category : category,
          color: color,
          quantity : 1,
          price: price
        }
        saveItem(data)
        setIsLoading(false)
      setFields(true)
      setMsg("Data uploaded success");
      clearAllInput()
      setAlertStatus("success")
      setTimeout(() => {
        setFields(false)
      }, 4000)
      }
    }catch(error){
      
    }
    fetchData()
   }
  const clearAllInput = () => {
setAlertStatus(null)
setCategory("Select Category")
setColor("")
setImgAsset(null)
setPrice("")
setTitle("")
   }
   const [{productItems}, dispatch] = useStateValue()

   const fetchData = async() => {
    await getAllItems().then(data => {
    dispatch({type: actionType.SET_PRODUCT_ITEMS, productItems : data })
    })
    }

  return (
    <div className='add_product'>
      <div className="add_form">
        {fields && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={`smt_wrong ${alertStatus === "danger" ? "danger" : "success"}`}>
            {msg}
          </motion.p>
        )}
        <div className='form'>
          <div className="title">
            <label>Title <MdOutlineEdit /></label>
            <input type="text" value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give me a title!" />
          </div>
          <div className="select">
            <select onChange={(e) => setCategory(e.target.value)}>
              <option value="other">Select a Category</option>
              {categories && categories.map(item => (
                <option key={item.id} value={item.urlParamName}>{item.name}</option>
              ))}
            </select>
          </div>
          <div className="add_img">
            {isLoading ? <Loader /> : <>
              {!imgAsset ? <label className='attach'>
                <MdCreateNewFolder />
                <p>
                  Click here to upload.
                </p>
                <input type="file" name="uploadimg" accept='image/*' onChange={uploadImage} />
              </label> : <>
                <div className='uploaded_img'>
                  <img src={imgAsset} alt="" />
                  <button className='delete_btn' type='button' onClick={deleteImg}><MdOutlineDeleteForever /></button>
                </div>
              </>}</>}
          </div>
          <div className="title">
            <label>Color <MdOutlineColorLens /></label>
            <input type="text" value={color} onChange={(e) => setColor(e.target.value)} placeholder="What is the color ?" />
          </div>
          <div className="title">
            <label>Price <MdOutlineAttachMoney /></label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="How much ?" />
          </div>
          <button className='save_btn' onClick={saveInfos}>ADD</button>
        </div>
      </div>
    </div>
  )
}

export default CreateItem