import React, { createContext } from 'react'
import {main} from '../gemini'
import { useState } from 'react'

export const dataContext=createContext()

const UserContext = ({children}) => {
    const [response,setResponse]=useState()
    const [loading,setLoading]=useState(false)
    async function sent(prompt){
        setLoading(true)
      const res=  await main(prompt)
      setLoading(false)
      setResponse(res)
    }
   
  return (
    <dataContext.Provider value={{sent,response,loading}}>
    {children}
    </dataContext.Provider>
  )
}

export default UserContext