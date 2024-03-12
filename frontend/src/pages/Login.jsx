import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import BackButton from "../components/BackButton.jsx"
import { useSnackbar } from 'notistack';
import Spinner from '../components/Spinner';






function Login() {

    

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const Navigate=useNavigate()

    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
         axios.post('http://localhost:5555/login',{ email,password})
            .then(res=>{
                setLoading(false)

                console.log(res)
                if(res.data==="success")
                { enqueueSnackbar('successfully logged in', { variant: 'success' });
                    Navigate('/home')
                }})
                .catch(err=>{
                    setLoading(false);
                    enqueueSnackbar('Error', { variant: 'error' });
                    console.error(err)})
             

    }


    return (
        <div className='p-4'>
        <BackButton />
        <h1 className='text-3xl my-4'>Login</h1>
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
            login
          </button>
          <Link to={'/'} >
            <button className='p-2 bg-sky-800 m-8 text-white' >Signin</button></Link>
        </div>
      </div>
    );
}

export default Login