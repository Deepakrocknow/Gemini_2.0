import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/context'

const Main = () => {
    const {onSent,recentprompt,input,setInput,loading,showresult,resultdata} = useContext(Context)
  return (
    <div className="main">
        <div className="nav">
            <p>Gemini</p>
            <img src={assets.user_icon} alt=''/>
        </div>
        <div className="main-container">
            {!showresult ? <>
                <div className="greet">
                <p className='lola'><span>Hello, Dev...</span></p>
                <p>How can I help you today?</p>
            </div>
            <div className="cards">
                <div className="card">
                    <p>I’m lost in virginia how to find place near me </p>
                    <img src={assets.compass_icon} alt=''/>
                </div>
                <div className="card">
                    <p>How to turn a startup idea into reality</p>
                    <img src={assets.bulb_icon} alt=''/>
                </div>
                <div className="card">
                    <p>I’m sick and need help crafting a text message for my boss</p>
                    <img src={assets.message_icon} alt=''/>
                </div>
                <div className="card">
                    <p>Help write SQL to generate a report</p>
                    <img src={assets.code_icon} alt=''/>
                </div>
            </div>

            </> : <div className='result'>
                   <div className="result-title">
                       <img src={assets.user_icon} alt=''/>
                       <p>{recentprompt}</p>
                   </div>
                   <div className="result-data">
                       {loading?<img className='tola' src={assets.gemini_icon} alt=''/>: <img className='pola' src={assets.gemini_icon} alt=''/>}
                       {loading?<div className='loader'>
                          <hr/>
                          <hr/>
                          <hr/>
                       </div>:<p dangerouslySetInnerHTML={{__html:resultdata}}></p>}
                   </div>
                </div>}
           
            <div className="main-bottom">
                <div className="search-box">
                    <input type='text' onChange={(e)=>setInput(e.target.value)} value={input} placeholder='Enter a prompt here'/>
                    <div>
                        <img src={assets.gallery_icon} alt=''/>
                        <img src={assets.mic_icon} alt=''/>
                       {input?<img  onClick={()=>onSent()} src={assets.send_icon} alt=''/>:null}
                    </div>
                </div>
                <p className="bottom-info">
                  Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
                </p>
            </div>
        </div>
    </div>
  )
}

export default Main