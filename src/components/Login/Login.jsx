import { sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../firebase2.init';
import { Link } from 'react-router-dom';

const Login = () => {


    let[success,setSuccess]= useState(false)
    let [error,setError] =useState("")


    let handleSubmit=(e)=>{
        e.preventDefault()

        let email= e.target.email.value
        let password= e.target.password.value
        console.log(email,password)

        setSuccess(false)
        setError("")



        signInWithEmailAndPassword(auth, email, password)
  .then((result) => {
    // Signed in 
    console.log(result.user)

    if(!result.user.emailVerified){

      setError("please Varify your email Address")
    }
    else{
      setSuccess(true)
    }
    

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
    setError("Invalid Email or Password")
  });


    }
    return (
        <div className='max-w-md mx-auto'>
             <h2 className='text-3xl font-bold mb-5 mt-5'>Login</h2>

             <form onSubmit={handleSubmit}>
             <label className="input input-bordered flex items-center gap-2 mb-10">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path
                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input type="email" name='email' className="grow" placeholder="Email" />
            </label>

              <label className="input input-bordered flex items-center gap-2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd" />
            </svg>
            <input type="password" name='password' className="grow" placeholder='Password' />
            </label>
            {
                success && <p>Succesfully login</p>
            }
            {
                error && <p className='font-bold text-red-700'>{error}</p>
            }

           
            <button className="btn btn-wide btn-warning mt-5 flex justify-center items-center">Wide</button>
             </form>

             <p className='mt-5 font-bold text-xl'>New User please <Link to="/register2" className='text-blue-500 font-bold'>Sign up</Link></p>
           
        </div>
    );
};

export default Login;