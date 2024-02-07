import "./App.css";

import axios from "axios";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

import LoginSignUpPage from "./components/login/LoginSignUpPage";
import { useEffect, useState } from "react";
// import { useEffect } from "react";
// import { RockPaperGame } from "./components/rockPaper/RockPaperGame";

function App() {
  const supabase = createClient(
    "http://127.0.0.1:54321",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0"
  );
    const [skip,setSkip]=useState(0)
    const pageLimit=10
  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data} = await supabase.from("parent").select('*').range(skip,skip+pageLimit)
        console.log(data, "DATA FROM CLIENT",'limit=',pageLimit,"skip=",skip);
      } catch (e) {
        console.error(e, "Error is ...");
      }
    };
    fetchData();
  }, [skip]);

  const url = "http://127.0.0.1:54321/functions/v1/event";
  const headers = {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
    "Content-Type": "application/json"
  };
  
  fetch(url, {
    method: "GET",
    headers: headers
  })
  .then(response => response.json())
  .then(data => {
    console.log('Responseaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:', data);
  })
    .catch((e) => {
      console.log(e, "error is..");
    });
    

  const [data,setData]=useState()
  useEffect(()=>{
    const fetchData=async()=>{
      const {data:catData}=await axios.get('https://api.thecatapi.com/v1/images/search?limit=10')
      console.log(catData,'CatData')
      setData(catData)
    }
    fetchData()
  },[])
  console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',data)
  return (
    <div className="flex wrap flex-row gap-2" onClick={()=>{setSkip(10)}}>
    {
      data?.map((value)=>{return <div className="">
        <img src={value?.url} className="h-15 w-15" />
      </div>})
    }
      
    </div>
  );
}

export default App;
