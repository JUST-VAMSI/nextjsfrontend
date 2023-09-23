"use client";
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import styles from '../app/page.module.css'

const SideBar = () => {
    const router = useRouter();
    const [path,setPath] = useState("");
    useEffect(()=>{
        setPath(window.location.pathname);

    },[])
  return (
    <div className='sidebarmenu'>
        <h3>Board.</h3>
        <div className='sideitems cursor-pointer' onClick={()=>router.push('/dashboard')}>
            <Image src='images/dashboard_icon.svg' width="20" height="20" alt='..' className={styles.sideitemsimg}/>
            {path === "/dashboard" ? (<span><b>Dashboard</b></span>) : (<span>Dashboard</span>)}
            
        </div>
        <div className='sideitems cursor-pointer'>
            <Image src='images/transaction_icon.svg' width="20" height="20" alt='..' className={styles.sideitemsimg}/>
            {path === "/transactions" ? (<sapn><b>Transactions</b></sapn>) : (<span>Transactions</span>)}
        </div>
        <div className='sideitems cursor-pointer'>
            <Image src='images/schedule_icon.svg' width="20" height="20" alt='..' className={styles.sideitemsimg}/>
            {path === "/schedules" ? (<span><b>Schedules</b></span>) : (<span>Schedules</span>)}
        </div>
        <div className='sideitems cursor-pointer'>
            <Image src='images/user_icon.svg' width="20" height="20" alt='..' className={styles.sideitemsimg}/>
            {path === "/users" ? (<span><b>Users</b></span>) : (<span>Users</span>)}
        </div>
        <div className='sideitems cursor-pointer'>
            <Image src='images/setting_icon.svg' width="20" height="20" alt='..' className={styles.sideitemsimg}/>
            {path === "/settings" ? (<span><b>Settings</b></span>) : (<span>Settings</span>)}
            <span></span>
        </div>
        <div className='help'>
            <p className='cursor-pointer'>Help</p>
            <p className='cursor-pointer'>Contact Us</p>
        </div>
    </div>
  )
}

export default SideBar