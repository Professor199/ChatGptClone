import React, { useContext, useState } from 'react'
import './App.scss'
import SideBar from './Components/SideBar'
import ChatSection from './Components/ChatSection'
import 'semantic-ui-css/semantic.min.css'
import { dataContext } from './Components/Context/UserContext'
const App = () => {
  // const [widthBar,setWidthBar]=useState()

  const data=useContext(dataContext)
  const [recentPrompt,setRecentPrompt]=useState("")
  console.log(recentPrompt,"+++++main")
  return (
    <div className='chatgpt'>
      <div>
     <SideBar recentPrompt={recentPrompt}/>
      </div>
      <div className='chatsection'>
         <ChatSection setRecentPrompt={(x)=>setRecentPrompt(x)}/>
      </div>
    </div>
  )
}

export default App