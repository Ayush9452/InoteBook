import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const [credential, setcredential] = useState({email: "",password: "" })
    let Navigate = useNavigate()

    const handelsubmit = async (e)=>{
        e.preventDefault();
        const res = await fetch("http://localhost:5000/api/auth/login",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({email: credential.email,password: credential.password})
        })
        const json = await res.json();
        // console.log(json)
        if(json.success)
        {
            localStorage.setItem("token",json.authtoken)
            Navigate("/");
            props.showalert("Logged in successfully",'success')
        }else{
            props.showalert("Log in failed",'danger')
        }
    }

    const onchange = (e) => {
        setcredential({ ...credential, [e.target.name]: e.target.value})
      }

    return (
        <div>
            <h1>Loggin in to your account</h1>
            <form onSubmit={handelsubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credential.email} id="email" name='email' aria-describedby="emailHelp" onChange={onchange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credential.password} id="password" name="password" onChange={onchange}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login