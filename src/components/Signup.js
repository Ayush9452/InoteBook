import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credential, setcredential] = useState({name: "", email: "", password: "",cpassword: "" })
  let Navigate = useNavigate()

  const handelsubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name: credential.name, email: credential.email, password: credential.password })
    })
    const json = await res.json();
    // console.log(json)
    if (json.success) {
      localStorage.setItem("token", json.authtoken)
      Navigate("/");
      props.showalert("SignedUp in successfully",'success')
    } else {
      props.showalert("SignUp failed",'danger')
    }
  }

  const onchange = (e) => {
    setcredential({ ...credential, [e.target.name]: e.target.value })
  }
  return (
    <div>
      <h1>Create an account to use InoteBook</h1>
      <form onSubmit={handelsubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" value={credential.name} id="name" name='name' aria-describedby="emailHelp" onChange={onchange} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" value={credential.email} id="email" name='email' aria-describedby="emailHelp" onChange={onchange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" value={credential.password} id="password" name="password" onChange={onchange} minLength={5}/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm password</label>
          <input type="password" className="form-control" value={credential.cpassword} id="cpassword" name="cpassword" onChange={onchange} minLength={5} />
        </div>
        <button disabled={credential.password !== credential.cpassword} type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
