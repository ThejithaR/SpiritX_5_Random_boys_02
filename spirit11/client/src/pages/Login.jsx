import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'
// import { set } from 'mongoose'

const Login = () => {
  const [state,setState] = useState('Sign Up')
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword , setConfirmPassword] = useState('')
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate()

  const {backendUrl,setIsLoggedin,getUserData} = useContext(AppContext)

  const validatePassword = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (password.length >= 12 && strength > 4) strength++;
    return strength;
  };

  const isPasswordValid = (password) => {
    return (
      password.length >= 8 &&
      /[a-z]/.test(password) &&
      /[A-Z]/.test(password) &&
      /[^a-zA-Z0-9]/.test(password)
    );
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if(state === 'Sign Up'){
        setPasswordStrength(validatePassword(newPassword));
    }
  };

  const getStrengthLabel = () => {
    const labels = ['Too Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];
    return labels[passwordStrength - 2];
  };

  const getStrengthColor = () => {
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-blue-500'];
    return colors[passwordStrength - 2];
  };


  const onSubmitHandler = async(e)=>{
    try {
        e.preventDefault();
        setErrorMessage('');
        // setShowPopup(false);
  
        if (state === 'Sign Up') {
          if (!isPasswordValid(password)) {
            setErrorMessage('Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, and a special character.');
            // setShowPopup(true);
            toast.error(errorMessage);
            return;
          }
  
          if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            // setShowPopup(true);
            toast.error(errorMessage);
            return;
          }

          if (username.length < 8) {
            setErrorMessage('Username need to be atleast 8 characters long');
            // setShowPopup(true);
            toast.error(errorMessage);
            return;
          }
  
          axios.defaults.withCredentials = true;
          const { data } = await axios.post(backendUrl + '/api/auth/register', {
            username,
            email,
            password,
          });
  
          if (data.success) {
            setIsLoggedin(true);
            getUserData();
            navigate('/');
          } else {
            toast.error(data.message);
          }
        } else {
          axios.defaults.withCredentials = true;
          const { data } = await axios.post(backendUrl + '/api/auth/login', {
            username,
            password,
          });
  
          if (data.success) {
            setIsLoggedin(true);
            getUserData();
            navigate('/');
          } else {
            toast.error(data.message);
          }
        }
      } catch (err) {
        toast.error(err.message);
    }
  }




  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600'>
        <img onClick={()=>navigate("/")} src={assets.logo} alt="" className='absolute left-5 sm:left-20 top-5 w-15 rounded-full sm:w-15 cursor-pointer'/>
        <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm' >
            <h2 className='text-3xl font-semibold text-white text-center mb-3' >{state === 'Sign Up'?'Create  account':'Login' }</h2>
            <p className='text-center text-sm mb-6'>{state === 'Sign Up'?'Create Your account!':'Login to your account!' }</p>
        

            <form onSubmit={onSubmitHandler}>
                <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                    <img src={assets.person_icon} alt="" />
                    <input value={username} onChange={(e)=>setUsername(e.target.value)} className='bg-transparent outline-none' type="text" placeholder='Enter User Name'required />
                </div>

                {state === 'Sign Up' && (
                                
                    <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                        <img src={assets.mail_icon} alt="" />
                        <input value={email} onChange={(e)=>setEmail(e.target.value)} className='bg-transparent outline-none' type="email" placeholder='Email ID'required />
                    </div>
                )}
                {state === 'Sign Up'? (
                    <div>
                        <div className='mb-4'>
                            <div className='flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                                <img src={assets.lock_icon} alt='' />
                                <input value={password} onChange={handlePasswordChange} className='bg-transparent outline-none flex-1' type={showPassword?'text':'password'} placeholder='Password' required />
                                <img src={showPassword?assets.show:assets.hide} alt='' className='cursor-pointer w-4 h-4' onClick={() => setShowPassword(!showPassword)} />
                            </div>
                            <div className='mt-2 h-2 rounded-full w-full bg-gray-300'>
                                <div className={`h-2 rounded-full ${getStrengthColor()}`} style={{ width: `${(passwordStrength / 6) * 100}%` }}></div>
                            </div>
                            <p className='text-xs mt-1 text-gray-400'>{getStrengthLabel()}</p>
                        </div>

                        <div className={`mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C] ${confirmPassword && confirmPassword !== password ? 'border border-red-500' : ''}`}>
                            <img src={assets.lock_icon} alt='' />
                            <input
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className={`bg-transparent outline-none flex-1`}
                                type={showConfirmPassword?'text':'password'}
                                placeholder='Confirm password'
                                required
                            />
                            <img src={showConfirmPassword?assets.show:assets.hide} alt='' className='cursor-pointer w-4 h-4' onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                        </div>
                        {confirmPassword && confirmPassword !== password && <p className='text-xs text-red-500 text-left'>Passwords do not match</p>}
                        <br></br>
                    </div>
                ):(
                    <div>
                        <div className='mb-4'>
                            <div className='flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                                <img src={assets.lock_icon} alt='' />
                                <input value={password} onChange={handlePasswordChange} className='bg-transparent outline-none flex-1' type={showPassword?'text':'password'} placeholder='Password' required />
                                <img src={showPassword?assets.show:assets.hide} alt='' className='cursor-pointer w-4 h-4' onClick={() => setShowPassword(!showPassword)} />
                            </div>
                        </div>
                    </div>
                )}
                
                    
                
                
                <p onClick={()=>navigate("/reset-password")} className='mb-4 text-indigo-500 cursor-pointer'>Forgot password?</p>
                
                <button className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900  cursor-pointer text-white font-medium'>{state}</button>
            
            </form>
            {state === 'Sign Up' ? (
                  <p className='text-gray-400 text-center text-xs mt-4'>Already have an account?{' '}
                  <span onClick={()=>setState("Login")} className='text-blue-400 cursor-pointer underline'>
                      Login here
                  </span>
              </p>
            ):(
                <p className='text-gray-400 text-center text-xs mt-4'>Don't have an account?{' '}
                    <span onClick={()=>setState('Sign Up')} className='text-blue-400 cursor-pointer underline'>
                        Signup
                    </span>
                 </p>

            ) }
          
            
        </div>
    </div>
  )
}

export default Login