import { useState } from "react"
import Axios from 'axios'

const AddProducts = () => {
    const elementSelector = element => document.querySelector(element)

    const [product_name, setProductName] = useState(''),
    [price, setPrice] = useState(''),
    [productCategory, setProductCategory] = useState(''),
    [error, setError] = useState(''),

    product = {
        product_name: product_name.toLowerCase(),
        price: price.toLowerCase(),
        productCategory: productCategory.toLowerCase()
    };

    const add_product = async () => { //ADD PRODUCT 
       const response = await Axios.post('http://localhost:5000/add/product', product)
       setError(response.data)

       if (response.data == 'successful') {
        elementSelector('#product-name').value = ''
        elementSelector('#price').value = ''
        elementSelector('#category').value = ''
       }
    }


  return (
    <>
    <form className="form-group p-lg-5 p-3">
        <div className="h3 font-weight-bold">ADD PRODUCT</div>
        <div className="my-3">
            <label htmlFor="product-name">Product name</label>
            <input type="text" className="form-control" id="product-name" onChange={(e) => {
                setError('')
                setProductName(e.target.value)}}
            />
        </div>

        <div className="my-3">
            <label htmlFor="price">product price</label>
            <input type="text" className="form-control" id="price" onChange={(e) => {
                setError('')
                setPrice(e.target.value)}}
            />
        </div>


        <select className='select py-2 my-3 px-2 form-control' onChange={(e) => {
            setProductCategory(e.target.value)
        }}>
            <option value="0" defaultValue={true} disabled={false}>Select product category</option>
            <option value={"Fruit and vegetables"}>Fruit and vegetables</option>
            <option value={"Non-alcoholic beverages"}>Non-alcoholic beverages</option>
            <option value={"Alcoholic beverages"}>Alcoholic beverages</option>
            <option value={"Electronics"}>Electronics</option>
            <option value={"cars"}>Cars</option>
        </select>

        <div className="d-flex justify-content-end">
            <button className="btn btn-dark text-white px-5 py-2 font-weight-bold" onClick={(e) => {
                e.preventDefault();
                add_product()
            }}>ADD</button>
        </div>

        <div className={error == '' ? 'alert' : "h3 scale_anim alert text-warning text-capitalize text-center"}>{error}</div>
    </form>
    </>
  )
}

export default AddProducts