"use client";
import React, { useContext } from 'react'
import { createContext,useState } from 'react'

const SignAuth = createContext();

const Authsign = ({children}) => {
   const [email,setEmail] = useState(null);
   const [pass,setPass] = useState(null);
  return (
    <SignAuth.Provider value={{email,setEmail,pass,setPass}}>
        {children}
    </SignAuth.Provider>
  )
}

export {SignAuth,Authsign};