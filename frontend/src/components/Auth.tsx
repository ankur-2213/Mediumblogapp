import { signupInput } from "@ankur1357/medium-common1";
import { ChangeEvent, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios from "axios";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate=useNavigate();
    const [postInputs,setpostInputs]=useState<signupInput>({
        name:"",
        username:"",
        password:""
    })
   async function  sendRequest(){
      try{
        const  response= await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"?"signup":"signin"}`,postInputs);
        const token=response.data;
        localStorage.setItem("token",token);
        navigate("/blogs")
      }
      catch(e){
        alert("error while signing up")
      }
        
    }
  return <div className="h-screen flex justify-center flex-col">
    <div className="flex justify-center">
        <div>
      <div className="px-10">
        <div className="text-3xl font-extrabold">
          Create an account
        </div>
        <div className="text-slate-400">
            {type==="signin"?"Dont have an account":"Already have an account?"}
          <Link className="pl-2 underline" to={type==="signin"?"/signup":"/signin"}>
          {type==="signin"?"Sign up":"Sign in"}
          </Link>
        </div>
      </div>
      <div>
      
      {type==="signup"?<LabelledInput  type={"name"} label="Name" placeholder="Ankur..." onChange={(e)=>{
        setpostInputs({
            ...postInputs,//existing username and password
            name:e.target.value
        })
      }}/>:null}
      <LabelledInput label="Username"    placeholder="Ankur@gmail.com" onChange={(e)=>{
        setpostInputs({
            ...postInputs,//existing username and password
            username:e.target.value
        })
      }}/>
      <LabelledInput label="Password" placeholder="12345" onChange={(e)=>{
        setpostInputs({
            ...postInputs,//existing username and password
            password:e.target.value
        })
      }}/>
      <button onClick={sendRequest} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700  ">{type === "signup" ? "Signup" : "Signin"}
      </button>
      </div>
      </div>
    </div>
  </div>;
}
interface LabelledInputType{
    label:string;
    placeholder:string;
    onChange:(e: ChangeEvent<HTMLInputElement>)=> void;
    type?:string;
}

function LabelledInput({  label, placeholder, onChange,type }:LabelledInputType) {
    return <div>
      <label className="block mb-2 text-sm font-medium text-black">
        {label}
      </label>
      <input onChange={onChange} type={type||"text"} id="first_name" 
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                 " 
        placeholder={placeholder} required />
    </div>;
  }
  
