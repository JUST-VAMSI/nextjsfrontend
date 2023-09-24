"use client";
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import SideBar from '@/component/SideBar';
import { signOut, useSession } from 'next-auth/react';
import Chart from '@/component/Chart';
import Model from '@/component/Model';
import Image from 'next/image';
import { SignAuth } from '@/component/Authsign';
import styles from '../page.module.css'
import axios from 'axios';

const Dashboard = () => {
    // const {email,setEmail,pass,setPass} = useContext(SignAuth);
   
   
    const [test,setTest]= useState(false);
    const [modalEmail,setModalEmail] = useState(null);
    const [myMail,setMyMail] = useState({
        email:''
    });
   const [modalform,setModalform]=useState({
    name:'',
    email:'',
    phno:Number
   })
   const [checkingProfile,setCheckingProfile]=useState({
    name:'',
    email:'',
    phno:Number
   })
   const [isprofile,setIsProfile] = useState(false);
   const {name,email,phno} =modalform;
    const [showModal,setShowModal] = useState(false);
    const router = useRouter();
    const { data: session } = useSession();

    axios.defaults.withCredentials=true;

    useEffect(()=>{
        axios.get('https://nextbackend-pi.vercel.app/checking')
        .then(res=>{
          if(res.data.Status === "Success" || session?.user)
          {
            if(session?.user )
            {
                setTest(true);
                const newData = session.user.email;
                if(JSON.stringify(newData)!==JSON.stringify(email))
                {
                    setModalform({...modalform,email:session.user.email})
                }
                
            }
            else{
                const newMail = res.data.email;
                if(JSON.stringify(newMail)!== JSON.stringify(email))
                {
                    setModalform({...modalform,email:res.data.email});
                }
                
            }
          }
          else{
            router.push('../');
          }
  
        })
      })

      useEffect(()=>{
        axios.post("https://nextbackend-pi.vercel.app/modaldata",{email}).then((res)=>{
            if(res.data.status === "success")
            {
                setIsProfile(true);
                setCheckingProfile({name:res.data.name,email:res.data.email,phno:res.data.phno});
            }
            else{
                setIsProfile(false);
            }
        })
      })
    // useEffect(()=>{
    //     if(session?.user )
    // {
    //     setTest(true);
    // }

    // })

   const handleModalForm=(e)=>{
    const {name,value}=e.target;
    setModalform({...modalform,[name]:value});

   }
   const handleModalSubmit=(e)=>{
    e.preventDefault();
    console.log(modalform);
    axios.post("https://nextbackend-pi.vercel.app/modalinsert",modalform).then((res)=>{
        if(res.data === "success")
        {
            alert("successfull added");
            setShowModal(false);
        }
    }).catch(e=>{console.log(e)})
   }
    const handleGooLogout = async  () => {
        await signOut("google");
        router.push('../');
    };

    const handleLogout= async(e)=>{
        try{
        const res = await axios.post('https://nextbackend-pi.vercel.app/logout',null,{
            withCredentials:true
        });
          if(res.data.Status === "Success")
          {
            router.push('../');
          }
        }
        catch(err)
        {
            console.log(err);
        }
      }
      
    
  return (
    <div className='row dashboard'>
        <div className='col col-lg-3 col-md-3 col-sm-3 col-3'>
         <SideBar/>
        </div>
        <div className='col col-lg-9 col-md-9 col-sm-9 col-9 mt-5'>
        <div className='row'>
            <div className='col col-lg-7 col-md-7 col-sm-12 col-12'>
                 <h4 className='dash-text'>Dashboard</h4>
            </div>
            <div className='col col-lg-5 col-md-5 col-sm-12 col-12'>
                <div className='row'>
                    <div className='col col-lg-8 col-md-8 col-sm-8 col-8'>
                        <input type='search' placeholder='search...' className='search'></input>
                    </div>
                    <div className='col col-lg-4 col-md-4 col-sm-4 col-4 sign-text'>
                        {test == true ?(<button onClick={handleGooLogout} ><Image alt='..' src={session.user.image} width="100" height="100" className={styles.signoutimage}></Image></button>):(<button className={styles.signoutimage} onClick={handleLogout}>L</button>)}
                    </div>
                </div>
                
                
                
            </div>
        </div>
            <div className='row detail-row'>
                
                <div className='col col-lg-3 col-md-6 col-sm-12 col-12 details'> 
                    <div className='revenue cursor-pointer totalrev'><Image src='images/revenues.svg' alt='..' width="100" height="100" className={styles.revenueimage}></Image></div>
                    <div className='row'><p className='para cursor-pointer'>Total Revenues</p>
                    <div className='col'>
                        <h6 className='cursor-pointer rating'><b>$143456</b></h6>
                    </div>
                    <div className='col percent'>
                        <p className='cursor-pointer'>+2.2%</p>
                    </div>
                    </div>

                </div>
                <div className='col col-lg-3 col-md-6 col-sm-12 col-12 details'>
                    <div className='revenue cursor-pointer totaltrans'><Image src='images/transactions.svg' alt='..' width="100" height="100" className={styles.revenueimage}></Image></div>
                    <div className='row'><p className='para cursor-pointer'>Total Transactions</p>
                    <div className='col'>
                        <h6 className='cursor-pointer rating'><b>1,240</b></h6>
                    </div>
                    <div className='col percent'>
                        <p className='cursor-pointer'>+1.4%</p>
                    </div>
                    </div>

                </div>
                <div className='col col-lg-3 col-md-6 col-sm-12 col-12 details'>
                    <div className='revenue cursor-pointer totallikes'><Image src='images/likes.svg' alt='..' width="100" height="100" className={styles.revenueimage}></Image></div>
                    <div className='row'><p className='para cursor-pointer'>Total Likes</p>
                    <div className='col'>
                        <h6 className='cursor-pointer rating'><b>8,986</b></h6>
                    </div>
                    <div className='col percent'>
                        <p className='cursor-pointer'>+0.8%</p>
                    </div>
                    </div>

                </div>
                <div className='col col-lg-3 col-md-6 col-sm-12 col-12 details'>
                    <div className='revenue cursor-pointer totalusers'><Image src='images/users.svg' alt='..' width="100" height="100" className={styles.revenueimage}></Image></div>
                    <div className='row'><p className='para cursor-pointer'>Total Users</p>
                    <div className='col '>
                        <h6 className='cursor-pointer rating'><b>10,786</b></h6>
                    </div>
                    <div className='col percent'>
                        <p className='cursor-pointer'>+4.8%</p>
                    </div>
                    </div>

                </div>
            </div>
            <div className='row chartstart'>
                <h5 style={{textAlign:'left',margin:"5px"}}>Activities</h5>
               <Chart/>
            </div>
            <div className='row mt-5 mb-5'>
                <div className='col col-lg-6 col-md-6 col-sm-12 col-12 addleftcol'>
                    <div className='row'>
                        <div className='col col-lg-6 col-md-6 col-sm-12 col-12'>
                            <h3>Top Products</h3>
                        </div>
                        <div className='col col-lg-6 col-md-6 col-sm-12 col-12'>
                            <p>may-jun 2021</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col col-lg-6 col-md-6 col-sm-6 col-6'>
                            <Image src='images/chart.svg'  alt='..' width="10" height="100" className={styles.chartimg}></Image>
                        </div>
                        <div className='col col-lg-6 col-md-6 col-sm-6 col-6'>
                            <Image src='images/1.svg' alt='..' width="100" height="100" className={styles.chartsideimg1}/>
                            <Image src='images/2.svg' alt='..' width="100" height="100" className={styles.chartsideimg2}/>
                            <Image src='images/3.svg' alt='..' width="10" height="100" className={styles.chartsideimg3}/>
                        </div>
                    </div>
                </div>
                <div className='col col-lg-6 col-md-6 col-sm-12 col-12 addcol'>
                    
                        {!isprofile?(<div className='row'><div className='col col-lg-12 col-md-12 col-sm-12 col-12 addprofile' onClick={()=>setShowModal(true)}>
                                <h1>+</h1>
                        </div>
                        <div className='col col-lg-12 col-md-12 col-sm-12 col-12'><span>Add Profile</span></div></div>):(<div className='row'>
                            <h1><b>{checkingProfile.name}</b></h1>
                            <h4 style={{marginTop:"25px"}}>{checkingProfile.email}</h4>
                            <h4>{checkingProfile.phno}</h4>
                        </div>)}
                    </div>
                       
                <Model isVisible={showModal} onClose={()=>setShowModal(false)}>
                    <form onSubmit={handleModalSubmit}>
                        <h6 style={{textAlign:"left"}}><b>Add New profile</b></h6>
                        <div className='model-form top-gap'>
                            <span>Name</span>
                        </div>
                        <div className='model-form gap'>
                            <input type='text' placeholder='Name' className='name' value={name} onChange={handleModalForm} required name='name'></input>
                        </div>
                        <div className='model-form'>
                            <span>Email</span>
                        </div>
                        <div className='model-form gap'>
                            {test ? (<input type='email' placeholder='email' className='email' name='email' value={email} readOnly required></input>) : (<input type='email' placeholder='email' className='email' name='email' value={email} readOnly required></input>)}
                            
                        </div>
                        <div className='model-form'>
                            <span>Phone</span>
                        </div>
                        <div className='model-form gap'>
                            <input type='number' placeholder='Ph no' name='phno' className='phno' value={phno} onChange={handleModalForm} required></input>
                        </div>
                        <div>
                            <button type='submit' className='addbtn'>Add</button>
                        </div>
                    </form>
                    </Model>
            </div>
        </div>
    </div>
  )
}

export default Dashboard;
