import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context =  createContext();

const ContextProvider = (props)=>{

    const [input,setInput] = useState("");
    const [recentprompt,setRecentprompt] = useState("");
    const [previousprompt,setPreviousprompt] = useState([]);
    const [showresult,setShowresult] = useState(false);
    const [loading,setLoading] = useState(false);
    const [resultdata,setResultdata] = useState("");

    const delayPara = (index,nextWord)=>{
        setTimeout(function(){
            setResultdata(e=>e+nextWord);
        },75*index)
    }

    const newChat = ()=>{
        setLoading(false);
        setShowresult(false)
    }

    const onSent = async (prompt)=>{
        setResultdata("");
        setLoading(true);
        setShowresult(true);
        let response;
        if(prompt === undefined){
            setPreviousprompt(prev=>[...prev,input]);
            setRecentprompt(input);
            response = await runChat(input);
        }
        else{
            response = await runChat(prompt);
            setRecentprompt(prompt);

        }
        
        let responseArray = response.split("**");
        let newResponse = "";
        for(let i=0;i<responseArray.length;++i){
            if(i%2==0){
                newResponse += responseArray[i];
            }
            else{
                newResponse += "<b>"+ responseArray[i] +"</b>";
            }
        }

        let newResponse2 = newResponse.split("*").join("</br>");
        let newResponse3 = newResponse2.split(" ");
        
        for(let i=0;i<newResponse3.length;++i){
              delayPara(i,newResponse3[i]+" ");
        }

        setLoading(false);
        setInput("");

    }

    const ContextValue = {
        previousprompt,
        setPreviousprompt,
        onSent,
        setRecentprompt,
        recentprompt,
        input,
        setInput,
        showresult,
        loading,
        resultdata,
        newChat
    }

    return(
        <Context.Provider value={ContextValue}>
              {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;   