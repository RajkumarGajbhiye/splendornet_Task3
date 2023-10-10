import { useEffect, useState } from 'react'
import '../App.css'
import {useNavigate} from "react-router-dom"
export default function Login() {
const navigate=useNavigate()
  const [form,setForm]= useState({
    email:"",
    password:"",
  })

  const [isLogin,setIsLogin] = useState(false)

const [errorMesssage,setErrorMessage] = useState({})
  
let data = JSON.parse(localStorage.getItem("user"))

  const handleChange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value})
  }

  const handleLogin=(e)=>{
  e.preventDefault() 
    
if(validation()){
  if(form.email === "sntuser" && form.password === "snt@1234" ){
    localStorage.setItem("user",JSON.stringify(form));
     setIsLogin(true)
   alert("Successful Login!");
    
    setForm({
      email:"",
      password:""
    })
    setTimeout(()=>{
       navigate("/list") 
    },3000)
  
  }else{
      alert("Incorrect credentials!");
    setForm({
      email:"",
      password:""
    })
  }
}
    
  }

  const validation=()=>{
    const errors ={};
    const hasSpecialCharacter = /[!@#$%&*()"{}]/.test(form.password);
    const hasAlphaNumeric = /[A-Za-z]/.test(form.password) && /\d/.test(form.password)
    if(form.email === ""){
      errors.email = "Email is Required!"
    }else if (form.password === ""){
      errors.password = "Password is Required!"
    }else if (form.password.length < 8){
      errors.password = "Password must be minimum 8 digits!"
    }else if (!hasSpecialCharacter){
      errors.password = "Password must be contains one special character!"
    }else if (!hasAlphaNumeric){
      errors.password = "Password must be contains alphanumeric characters!"
    }
    setErrorMessage(errors);
    return Object.keys(errors).length === 0;
  }

  const handleLogOut=(e)=>{
     e.preventDefault();
    localStorage.clear("user");
    setIsLogin(false)
  }

  useEffect(()=>{
    if(data){
      setForm(data)
    }
  },[])
  return (
    <main className='bracket'>
    <form className='container'>
      <h1>Login</h1>
    <label><strong>Email:</strong> </label><br/>
    <input type="email" placeholder='Enter Email...' value={form.email} name="email" onChange={handleChange}/><br/>
      {errorMesssage.email && <p style={{color:"red",fontWeight:"bold"}}>{errorMesssage.email}</p>}

      <label><strong>Password:</strong> </label><br/>
    <input  type="password" placeholder='Enter Password...'  value={form.password} name="password" onChange={handleChange}/><br/><br/>
  {errorMesssage.password && <p style={{color:"red",fontWeight:"bold"}}>{errorMesssage.password}</p>}

      {
        isLogin ? (
           <button  className='btn' onClick={handleLogOut}>LogOut</button>
        ):(
                   <button className='btn' onClick={handleLogin}>Login</button>

          
        )
      }
      
     
     

       
    </form>
    </main>
  )
}
