import { MdMenu } from "react-icons/md";
import { Button } from "./ui/button";
import { useEffect, useState, } from "react";
import { Input } from "./ui/input";
import { RxAvatar } from "react-icons/rx";
import { ModeToggle } from "./mode.toggle";
// import { RiTwitterXLine } from "react-icons/ri";
// import { FiGithub } from "react-icons/fi";

interface NavbarProps{
  Setapi: (key : string) => void
}
const Navbar:  React.FC<NavbarProps> = ({Setapi}) => {
  const [sides, setSides] = useState(false);
  const [keys, setkeys] = useState("")

  useEffect(()=>{
    const savedkey= localStorage.getItem("keys")
    if(savedkey){
      Setapi(savedkey)
      setkeys(savedkey)
    }
  },[Setapi])

  function handler(){
      Setapi(keys)
      localStorage.setItem("keys", keys)
      
  }

  return (
    <div className="relative">
      <div className="fixed h-12 w-full flex justify-between items-center p-2 z-10 bg-gray-200 dark:bg-black border-b  shadow-lg">
        <h2 className="text-xl">{<RxAvatar/>}</h2>
        <h3 className="font-semibold">Summarizer</h3>
        
        <div className="flex gap-2">
        <ModeToggle/>
        <Button variant={"destructive"} onClick={() => setSides((prev) => !prev)}>
          <MdMenu />
        </Button>
        </div>
      </div>

      {sides && (
        <div className="fixed top-10 right-0 h-[calc(60vh-5rem)] border dark:bg-neutral-800 bg-neutral-100 m-1 rounded-xl  w-60 z-20 shadow-lg">
          <div className="p-4 space-y-2 ">
            <p> API's</p>
            <div className="flex flex-col  gap-2">
              <Input
                type="password"
                placeholder="Enter your API's key "
                value={keys}
                onChange={(e)=>{setkeys(e.target.value)}}
              />
              <Button onClick={handler}> Save </Button>
            </div>
            <div>
              <h2 className="font-medium text-sm">NOTE:</h2>
              <p className="text-gray-400 text-sm "> Currently it's only work of the  Free Gemini API's </p>
              </div>
          </div>
          {/* <div className="flex  justify-center items-center gap-1 text-xs">
            <Button size={"sm"} variant={"outline"} onClick={()=> window.open("https://x.com/caps_raunak")}>{<RiTwitterXLine />}</Button>
            <Button size={"sm"} variant={"outline"} onClick={()=> window.open("https://github.com/RaunaK-cap")}>{<FiGithub/>}</Button>
             </div> */}
        </div>
      )}
    </div>
  );
};

export default Navbar;
