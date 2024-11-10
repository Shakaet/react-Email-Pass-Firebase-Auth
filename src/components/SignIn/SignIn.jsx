// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import React, { useState } from 'react';
// import { auth } from '../firebase2.init';










// const SignIn = () => {

//       let [errorMessage,setErrormessage]= useState('')

//       let [successmessage,setsuccessmessage] = useState('')
 


//     let handleSubmit=(e)=>{
//         e.preventDefault()
//         let email= e.target.email.value
//         console.log(email)
//         let password= e.target.password.value
//         console.log(password)

//         setErrormessage('')
//         setsuccessmessage('')


//         if(password.length<6){
//             setErrormessage("Password Should be 6 character or longer")
//             return
//         }
    
//         createUserWithEmailAndPassword(auth, email, password)
//       .then((result) => {
//         // Signed up 
//         console.log(result.user)
//         setsuccessmessage("Succesfully Added")
        
//         // ...
//       })
//       .catch((error) => {
//          console.log(error)
//          const errorCode = error.code;
//         const errorMessage = error.message;
//         console.log("eroo",errorCode)
//         console.log("mess",errorMessage)
//          setErrormessage(error.message)
//         // ..
//       });
    
//     }
//     return (
//         <div className='max-w-md mx-auto'>

// <form onSubmit={handleSubmit} className="card-body">
//         <div className='' >
//           <label className="label">
//             <span className="label-text">Email</span>
//           </label>
//           <input type="email" name='email' placeholder="email" className="input input-bordered" required />
//         </div>
//         <div className="">
//           <label className="label">
//             <span className="label-text">Password</span>
//           </label>
//           <input type="password" name='password' placeholder="password" className="input input-bordered" required />
//           <label className="label">
//             <a href="#" className="label-text-alt link link-hover">Forgot password?</a> <br />
//             {
//                 successmessage && <p className='label-text-alt font-bold text-red-700'>{successmessage}</p>
//             }
//           </label>
//         </div>
//         <div className="mt-6">
//           <button className="btn btn-primary">Login</button>
//         </div>
//       </form>

//       {
//         errorMessage && <p className='text-red-700 font-bold'>{errorMessage}</p>
//       }
            
//         </div>
//     );
// };

// export default SignIn;


///  validate with req exp

import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, updateProfile } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { auth } from '../firebase2.init';
import Home from '../Home';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';

const SignIn = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  let emailref=useRef()

  let [showPass,setShowPass]=useState(false)

  let handleShow=()=>{

    setShowPass(!showPass)
  }


  let handleForgat=()=>{

    let email=(emailref.current.value)

    if(!email){
      alert("provide a email address")
    }
    else{

      sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        console.log("sent reset email succesfully")
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });

    }

 
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    let name=e.target.name.value
    let photo=e.target.photo.value
    const email = e.target.email.value;
    const password = e.target.password.value;
    let terms= e.target.terms.checked
    console.log(name,photo)

    // Clear messages
    setErrorMessage('');
    setSuccessMessage('');


    if(!terms){

        setErrorMessage("Please fullfil a terms and condition")
        return
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    // Password length and complexity validation
    if (password.length < 6) {
      setErrorMessage("Password should be at least 6 characters long.");
      return;
    }

    // Optional: Add complexity requirements for the password (e.g., one uppercase letter, one number)
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage("Password should contain at least one uppercase letter and one number.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccessMessage("Successfully registered!");

        sendEmailVerification(auth.currentUser)
        .then(() => {
           console.log("do email verified")
        });

        updateProfile(auth.currentUser, {
          displayName: name, photoURL: photo
        }).then(() => {
           alert("profile Update")
        }).catch((error) => {
          alert("profile Updated Error",error)
        });

      })
      .catch((error) => {
        console.log("Error:", error.code, error.message);
        setErrorMessage(error.message);
      });
  };

  return (
    <div className='max-w-md mx-auto'>
      <form onSubmit={handleSubmit} className="card-body">
      <div>
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" name='name' placeholder="name" className="input input-bordered" required />
        </div>
        <div>
          <label className="label">
            <span className="label-text">PhotoURL</span>
          </label>
          <input type="text" name='photo' placeholder="photoUrl" className="input input-bordered" required />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" ref={emailref} name='email' placeholder="email" className="input input-bordered" required />
        </div>
        <div>
         <div>
         <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type={showPass ?"text":"password"} name='password' placeholder="password" className="input input-bordered relative" required />
          <button onClick={handleShow} className='relative right-6 top-0'>{showPass ?<FaEyeSlash></FaEyeSlash>:<FaEye />}</button>
         </div>
          <label className="label">
            <a onClick={handleForgat} href="#" className="label-text-alt link link-hover">Forgot password?</a>

            
            {successMessage && <p className='label-text-alt font-bold text-green-700'>{successMessage}</p>}
          </label>
        </div>
        <div className="form-control">
  <label className="cursor-pointer label justify-start">
  <input type="checkbox" name='terms' className="checkbox checkbox-secondary" />
    <span className="label-text ml-5">Remember me</span>
    
  </label>
</div>
        <div className="mt-6">
          <button className="btn btn-primary">Sign Up</button>
        </div>
      </form>
      {errorMessage && <p className='text-red-700 font-bold'>{errorMessage}</p>}

      <p className='mt-5 font-bold text-xl'>Already Habe an Account? please <Link to="/login" className='text-blue-500 font-bold'>Log in</Link></p>



    </div>
  );
};

export default SignIn;
