import { useEffect } from 'react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


const Navbar = () => {
  let navigate = useNavigate()

  const handelLogout=()=>{
     localStorage.removeItem("token")
      navigate("/login")
  }
   
    let location=useLocation()
    useEffect(()=>{
    },[location])

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Fifth navbar example">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">Notebook</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarsExample05">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className= { `nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className=  { `nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
          </li>
        </ul>
       { !localStorage.getItem ("token")?<form className='d-flex' >
          <Link className='btn btn-primary mx-2' to="/login" role='button'>Login</Link>
          <Link className='btn btn-primary mx-2' to="/signup" role='button'>SignUp</Link>
          {/* <button className='btn btn-primary mx-2' type='submit'>Login</button>
          <button className='btn btn-primary mx-2' type='submit'>SignUp</button> */}
        </form>:<button onClick={handelLogout} className='btn btn-primary mx-2'>Logout</button>}
      </div>
    </div>
  </nav>
  )
}

export default Navbar