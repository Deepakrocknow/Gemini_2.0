import React, { useContext, useState } from 'react'
import './Sidebar.css'
import {assets} from '../../assets/assets'
import { Context } from '../../context/context';

const Sidebar = () => {
    const [extended,setExtended] = useState(false);
    const {onSent,setRecentprompt,previousprompt,newChat} = useContext(Context);

    const loadPrompt = async(prompt)=>{
          setRecentprompt(prompt);
          await onSent(prompt);
    }
  return (
    <div className='sidebar'>
        <div className="top">
            <img onClick={()=>setExtended(!extended)} className='menu' src={assets.menu_icon} alt=''/>
            <div onClick={()=>newChat()} className="new-chat">
                <img src={assets.plus_icon} alt=''/>
               {extended ?<p>New-Chat</p>:null }
            </div>
            {extended ? 
            <div className="recent">
            <p className='recent-title'>Recent</p> 
            {previousprompt.map((e)=>{
                return (
                    <div onClick={()=>loadPrompt(e)} className="recent-entry">
                    <img src={assets.message_icon} alt=''/>
                    <p>{e.slice(0,18)}</p>
                    </div>
                )
            })}
            </div>
            : null
        }
            
        </div>
        <div className="bottom">
            <div className="bottom-item recent-entry">
                <img src={assets.question_icon} alt=''/>
                {extended ?<p>Help</p>:null}
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.history_icon} alt=''/>
                {extended ?<p>Activity</p>:null}
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.setting_icon} alt=''/>
                {extended ?<p>Settings</p>:null}
            </div>

        </div>
    </div>
  )
}

export default Sidebar