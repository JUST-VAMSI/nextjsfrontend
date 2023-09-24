"use client";
import { useRouter } from 'next/navigation';
import styles from './page.module.css'
import {signIn, useSession} from 'next-auth/react'
import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { SignAuth } from '@/component/Authsign';
import axios from 'axios';


export default function Home() {

  // const {email,setEmail,pass,setPass} = useContext(SignAuth);
  
  const router = useRouter();

  const session = useSession();
    console.log(session);

  const [values,setValues] = useState({
    email:'',
    password:''
  });

  const {email,password} = values;

  axios.defaults.withCredentials=true;

  useEffect(()=>{
      axios.get('https://nextbackend-pi.vercel.app/checking')
      .then(res=>{
        if(res.data.Status === "Success" || session.status === "authenticated")
        {
          router.push('./dashboard');
        }

      })
    })

  //   useEffect(()=>{

  // if (session.status === "authenticated") {
  //   router.push('/dashboard');
  // }
  //   })
    
    const handleValue=(e)=>{
      const {name,value}=e.target;
      setValues({...values,[name]:value});
    }
    const handleSubmit = async(e) => {
      e.preventDefault();
      axios.post("https://nextbackend-pi.vercel.app/login",values).then((res)=>{
        if(res.data.status === "success")
        {
          console.log(res.data.tok);
          alert("login success");
          router.push('./dashboard');
        }
        else if(res.data === "invalidpassword")
        {
          alert("please check your details.");
        }
        else{
          alert('user not exist please register');
          router.push("./signup");
        }
      })
  }
  
    
  return (
    <div className={styles.bg}>
      <div className='row'>
        <div className='col small-screen'>
          <h5>Logo</h5>
          <h1>Board.</h1>
          <Image src='images/Frame 2.svg' alt='..' className={styles.social} width="10" height="20"></Image>
        </div>
        <div className='col' >
            <div className='row'>
              <div className='col second-col'>
              <h3><b>Sign In</b></h3>
              <p>Sign in to your account</p>
              </div>
            </div>
            <div className='row goog-row'>
              <div className='col cursor-pointer' onClick={()=>signIn("google")}>
                  <Image src='images/Google Sign In.svg' alt='..' width="250" height="20" className={styles.goog}></Image>
              </div>
              <div className='col cursor-pointer signin-left'>
                  <Image src='images/Apple Sign In.svg' alt='..' width="250" height="20" className={styles.app}></Image>
              </div>
            </div>
            <div className='row mainsign'>
                <div className='col formbg'>
                    <form onSubmit={handleSubmit}>
                      <div>
                        <span>Email Address</span>
                      </div>
                      <div className='gap'>
                        <input type='email' placeholder='email' name='email' className='form-control' required value={email} onChange={handleValue}></input>
                      </div>
                      <div>
                        <span>Password</span>
                      </div>
                      <div className='gap'>
                        <input type='password' placeholder='password' name='password' className='form-control' required value={password} onChange={handleValue}></input>
                      </div>
                      <div className='gap'>
                        <a href='#' className='forgot'>Forgot password?</a>
                      </div>
                      <div className='sign-btn'>
                        <button type='submit'>Sign In</button>
                      </div>
                    </form>
                </div>
                <div className='account'>
                  <p><span>Dont have an account?</span><a href='signup' className='forgot'> Register</a></p>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
