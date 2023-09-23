"use client";
import React from 'react'
import {SessionProvider} from "next-auth/react"
import { Authsign } from '../Authsign';

const Authprovider = ({children}) => {
  return (
    <SessionProvider>
      <Authsign>
        {children}
        </Authsign>
    </SessionProvider>
  )
}

export default Authprovider