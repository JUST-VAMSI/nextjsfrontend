"use client";
import styles from '../page.module.css'
import {signIn, useSession} from 'next-auth/react'
import { useState,useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { SignAuth } from '@/component/Authsign';
import axios from 'axios';


export default function Signup() {

  // const {email,setEmail,pass,setPass} = useContext(SignAuth);
  const [values,setValues]=useState({
    email:'',
    password:'',
    authpro:'afsuritothme'
})
const {email,password} = values;
  
  const router = useRouter();

  const session = useSession();
    console.log(session);

    useEffect(()=>{
      if(session.status == "authenticated"){
        router.push('/dashboard');
      }
    })

    const handleValue = (e)=>{
      const {name,value} = e.target;
      setValues({...values,[name]:value});
      }

    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post("https://nextbackend-pi.vercel.app/signup",values).then((res)=>{
        if(res.data === "success")
        {
          setValues({email:'',password:'',authpro:'afsuritothme'});
          alert("successfully registered");
          router.push('../');
        }
        else if(res.data === "alreadyexist")
        {
          alert("user already exist please login");
          router.push('../');
        }
        else{
          alert(res.data);
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
              <h3><b>Sign Up</b></h3>
              <p>Sign Up to Openinapp account</p>
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
                        <input type='email' placeholder='email' name='email' className='form-control' required  value={email} onChange={handleValue}></input>
                      </div>
                      <div>
                        <span>Password</span>
                      </div>
                      <div className='gap'>
                        <input type='password' placeholder='password' name='password' className='form-control' value={password} required onChange={handleValue}></input>
                      </div>
                      <div className='gap'>
                        <a href='#' className='forgot'>Forgot password?</a>
                      </div>
                      <div className='sign-btn'>
                        <button type='submit'>Sign Up</button>
                      </div>
                    </form>
                </div>
                <div className='account'>
                  <p><span>Already have an account?</span><a href='../' className='forgot'> Login</a></p>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
