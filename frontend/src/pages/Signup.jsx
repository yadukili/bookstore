import React, { useEffect, useState } from "react"
import axios from 'axios'
import Spinner from '../components/Spinner';
import { useSnackbar } from 'notistack';
import BackButton from '../components/BackButton';
import {  Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";



function Signup() {

    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const Navigate=useNavigate()

    const handleSubmit =(e) => {
        e.preventDefault()
        setLoading(true);
        axios.post('http://localhost:5555/signup',{email,password})
        .then(()=>{
            setLoading(false);
            enqueueSnackbar('email Created successfully', { variant: 'success' });
            result => console.log(result)
            Navigate('/login')


        })
        
        
        
        .catch(err => {
            setLoading(false);
            // alert('An error happened. Please Chack console');
            enqueueSnackbar('Error', { variant: 'error' });
            console.log(err)})
    }


    return (
        <div className='p-4'>
          <BackButton />
          <h1 className='text-3xl my-4'>Register</h1>
          {loading ? <Spinner /> : ''}
          <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Email</label>
              <input
                type='text'
            
                onChange={(e) => setEmail(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2 w-full'
              />
            </div>
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Password</label>
              <input
                type='text'
                
                onChange={(e) => setPassword(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2  w-full '
              />
            </div>
            
            <button className='p-2 bg-sky-300 m-8' onClick={handleSubmit}>
              Save
            </button>
          <Link to={'/login'} >
            <button className='p-2 bg-sky-800 m-8 text-white' >Already have an account,Login</button></Link>
          </div>
        </div>
      );
    }
    
    

export default Signup
