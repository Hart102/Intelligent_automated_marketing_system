import Axios from "axios";
import { useEffect } from "react";
import { useState } from "react"
import { useNavigate } from "react-router-dom";


const AdminLogin = () => {
  ////////////////////////////////////////////
  Axios.defaults.withCredentials = true
  const [username, setUserName] = useState(''),
  navigation = useNavigate(),

  /////////////////////////////////////////////
  [password, setPwd] = useState(''),
  [errorMsg, setErrorMsg] = useState(''),

  //////////////////////////////////////////////
  user = {
    username,
    password
  };

  /////////////////////////////////////////////////////////////////
  const handle_login = async () => {
    const response = await Axios.post('http://localhost:5000/admin/login', user)
    {response.data != 'true' ? setErrorMsg(response.data) : navigation("/admin/home")}
    setErrorMsg(response.data)
  }

  useEffect(() => {
    Axios.get('http://localhost:5000/admin/login').then(response => {
      if (response.data.loggedIn == true) {
        navigation("/admin/home") 
      } 
    })
  },[])


  //////////////////////////////////////////////////////////////////////
  return (
    <>
     <section className='Admin_login'>
        <form className="form-group p-4 bg-white col-md-4 mx-auto">
          <input type="text" className="form-control p-3 border bg-white my-4" placeholder='Username' onChange={(e) => {
            setErrorMsg('')
            setUserName(e.target.value)}}
            />
          <input type="text" className="form-control p-3 border bg-white my-4" placeholder='password' onChange={(e) => {
            setErrorMsg('')
            setPwd(e.target.value)
          }}/>
          <button className="btn py-3 btn-block btn-success font-weight-bold border-bottom shadow" onClick={(e) => {
            e.preventDefault()
            handle_login()}}
          >LOGIN</button>
          <div className={errorMsg == '' ? 'alert' : "scale_anim alert text-warning text-capitalize text-center"}>{errorMsg}</div>
        </form>
    </section>
    </>
  )
}

export default AdminLogin