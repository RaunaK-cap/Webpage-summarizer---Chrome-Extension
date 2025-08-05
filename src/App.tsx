import { useState } from "react";

import "./App.css";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import Navbar from "./components/Navbar";
import { RiSendPlaneLine } from "react-icons/ri";
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import type { GenerateContentResponse } from "@google/genai/node";



function App() {
  const [api, setapi] = useState<string>("");
  const [ msg , setmsg ] = useState("")
  console.log("your api msg", api);
  const [ responces , setresponces] = useState("")
  

  const LLM = async() => {
    try {
      setmsg("")
      const ai = new GoogleGenAI({ apiKey: api });    
        const response : GenerateContentResponse = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: ` Always give the answer in bullet points form: and now your answer will start: ${msg}`,
        });
        // console.log(response.text);
        const text = response?.text || "no responces "
        setresponces(text)
      
    } catch (error) {
      setresponces(` Error... , ${error}`)
    }
    
  };

  return (
    <>
      <div className="absolute top-1/2 left-1/2 -translate-y-[50%] -translate-x-[50%] border h-[32rem] w-[25rem]">
        <div className="h-15 ">{<Navbar Setapi={setapi} />}</div>

        <div className="h-[24rem] w-full p-5 overflow-auto scroll-auto">
          <ReactMarkdown>
          {responces}
          </ReactMarkdown>
        </div>
        <div className="relative  flex justify-center items-center gap-1 p-1">
          <Input
            disabled={!api}
            value={msg}
            onChange={(e)=>setmsg(e.target.value)}
            className="rounded m-1 p-5 "
            type="text"
            placeholder="Ask anything about this page "
          />
          <Button size="lg" disabled={!msg} onClick={LLM} variant={"default"}>{<RiSendPlaneLine />} </Button>
        </div>
      </div>
    </>
  );
}

export default App;
