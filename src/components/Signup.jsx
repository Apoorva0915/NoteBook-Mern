import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "",name:"",Cpassword:"" })
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password,name:credentials.name})
    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
        // Save the auth token and redirect
        localStorage.setItem('token', json.authToken);
        props.showAlert("Successfully Created","success")
        navigate("/");
    }
    else {
        props.showAlert("Invalid Credentials","danger")
    }
}
 
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
}

  return (
    <div className='container'>
      <h2 className='my-3'>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" value={credentials.name} name="name" onChange={onChange} aria-describedby="nameHelp" required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} id="password" minLength={8} required />
        </div>
        <div className="mb-3">
          <label htmlFor="Cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" name="Cpassword" value={credentials.Cpassword} onChange={onChange} id="Cpassword" minLength={8} required />
        </div>
        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
    </div>
  )
}

export default Signup