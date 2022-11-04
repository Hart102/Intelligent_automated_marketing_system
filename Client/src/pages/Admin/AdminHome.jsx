import Axios from 'axios'
import '../Admin/Admin.css'
import AdminNavbar from './AdminNavbar'
import TableHead from '../../components/TableHead'
import TableTitle from '../../components/TableTitle'
import TableBody from '../../components/TableBody'
import { useState } from 'react'
import AddProducts from '../../components/AddProducts'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminHomePage = () => {
    /////////////////////////////////////////////////////
    const [activate_menu, setActivateMenu] = useState(''),
    [products, setProducts] = useState(''),
    [productId, setProductId] = useState(''),
    [customers, setCustomers] = useState(''),
    navigation = useNavigate(),
    menu = arg => setActivateMenu(arg);



    //////////////////////////////////////////////////////
    const fetch_products = async () => { // FETCH PRODUCTS
        const response = await Axios.get('http://localhost:5000/fetch/products')
        setProducts(response.data)
    }



    //////////////////////////////////////////////////////
    const fetch_customers = async () => { // FETCH CUSTOMERS
        const response = await Axios.get('http://localhost:5000/fetch/customer')
        setCustomers(response.data)
    }



    /////////////////////////////////////////////////////
    const delete_product = async (id) => { //DELETE PRODUCTS
        setProductId(id)
        const response = await Axios.post('http://localhost:5000/delete/products', {id: id})
        alert(response.data)
    }



    //////////////////////////////////////////////////////
    const Logout = (e) => { //LOGOUT FUNCTION
        alert('Are you sure you want to logout ?')
        if (e == 'Logout') {
            Axios.get('http://localhost:5000/logout').then(response => { 
                if (response.data == 'true') {
                    navigation("/")
                }
            })
            e = ''
        }
    }


    useEffect(() => {
        fetch_products()
        fetch_customers()

        ///////////////////////////////////////////////////////////////////////////////////
        Axios.get('http://localhost:5000/admin/login').then(response => { //CHECKING SESSION
            if (response.data.loggedIn != true) {
                navigation("/") 
            } 
        })
    }, [])

  return (
    <>
    <AdminNavbar />
    <div className='Admin-home'>
        <div className="mt-5 px-lg-5">
            <div className="heading">
                <div className="px-lg-5 px-4">
                    <div className="create-post shadow d-flex justify-content-between align-items-center pl-3">
                        <div className='admin-name'><b>welcome Hart</b></div>
                        <button className="btn bg-dark py-3 px-4 text-white font-weight-bold" onClick={(e) => Logout(e.target.textContent)}>Logout</button>
                    </div>
                </div>
            </div>


            <div className="admin-content d-flex justify-content-between">
                {/* APP DETAILS RENDERED HERE */}
                <div className="app-details">
                    <div className="title px-3 py-1 border">
                        <p className='mt-3 golden-color'><b className='h6 text-uppercase font-weight-bold'>APP DETAILS</b></p>
                    </div>

                    <ul className='list-unstyled bg-white font-weight-bold'>
                        <li className='pointer border-bottom border-right border-left' onClick={(e) => menu(e.target.textContent)}><p className='p-3'>Overview</p></li>
                        <li className='pointer border' onClick={(e) => menu(e.target.textContent)}><p className='p-3'>Products</p></li>
                        <li className='pointer border-bottom border-right border-left' onClick={(e) => menu(e.target.textContent)}><p className='p-3'>Customers</p></li>
                        <li className='pointer border-bottom border-right border-left' onClick={(e) => menu(e.target.textContent)}><p className='p-3'>Add product</p></li>
                    </ul>

                </div>


                <div className={activate_menu == 'Overview' || activate_menu =='' ? "scale_in posts bg-white mb-5" : 'scale_out'}>
                    <div className="box-container">
                        <div className="display-box shadow p-4 text-center text-white font-weight-bold h3 bg-danger">Customers <br /> {customers.length}</div>
                        <div className="display-box shadow p-4 text-center text-white font-weight-bold h3 bg-warning">Products <br /> {products.length}</div>
                        <div className="display-box shadow p-4 text-center text-white font-weight-bold h3 bg-success">Sent Sms <br /> 75</div>
                    </div>
                </div>

                {/* PRODUCTS RENDERED HERE  */}
                <div className={activate_menu == 'Products' ? "scale_in products posts border bg-white mb-5" : 'scale_out'}>
                    <TableHead tableTitle="products"/>
                    
                    <div className="blog-posts">
                        <TableTitle name={'Product Name'} text={'Price'}/>

                        {products != '' && products.map(product => product.newId != productId &&
                            <div key={product.newId}>
                                <TableBody titleName={product.product_name} text={product.price} onclick={() => {
                                    fetch_products()
                                    delete_product(product.newId)}}
                                />
                            </div>
                        )}
                    </div>
                </div>


                {/* CUSTOMERS RENDERED HERE  */}
                <div className={activate_menu == 'Customers' ? "scale_in customers posts border bg-white mb-5" : 'scale_out'}>
                    <TableHead tableTitle="Customers"/>
                    
                    <div className="blog-posts">
                        <TableTitle name={'Name'} text={'Phone'}/>
                    
                        {customers != '' && customers.map(customer =>
                            <TableBody titleName={customer.name} text={customer.phone}/>
                        )}
                       
                    </div>
                </div>

                {/* ADD PRODUCT  */}
                <div className={activate_menu =="Add product" ? "scale_in add-products posts border bg-white mb-5": "scale_out"}>
                    <div className="blog-posts">
                        <AddProducts />
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default AdminHomePage