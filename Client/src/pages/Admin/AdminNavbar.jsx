import { Link } from "react-router-dom"
import avater from '../../asserts/Images/profile_avater.png'


const AdminNavbar = () => {
  return (
    <>
      <div className="Admin-nav-bar">
        <div className="d-flex align-items-center justify-content-between mx-5 px-3 navbar">
          <Link to="/" className='nav-link text-dark'>
            <h1 className="h1 font-weight-bold"><span className="text-white">AI</span> Marketing System</h1>
            <p className="golden-color m-0">Send auto notification to your customers by post new products</p>
          </Link>

          <div className="avater d-lg-block d-none">
            <img src={avater} alt="" className="img-fluid"/>
          </div>
        </div>
      </div>
    </>
  )
}



export default AdminNavbar 